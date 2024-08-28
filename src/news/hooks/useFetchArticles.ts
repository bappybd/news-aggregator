import { useEffect, useState } from 'react';
import { newsAPIService } from '@/news/services/news-api.service.ts';
import { guardianService } from '@/news/services/guardian.service.ts';
import { nyTimesService } from '@/news/services/nyt.service.ts';
import { Article } from '@/news/types/article.type.ts';
import { FilterSearch, SourceEnum } from '@/news/types/news-service.type.ts';

import pLimit from 'p-limit';
import { usePreferences } from '@/news/hooks/usePreferences.ts';
const limit = pLimit(2); // Throttling: Limit to 2 concurrent requests

export const useFetchArticles = (filter: FilterSearch) => {
  const { preferences } = usePreferences();

  const { page, keyword, date, category, source } = filter;
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!filter.keyword) return;

      setLoading(true);
      /* Concurrent Requests with Promise.allSettled: */
      const sources =
        filter?.source && filter.source?.length > 0
          ? filter.source
          : preferences.sources;
      const sourcePromises: any[] = [];
      sources.forEach((_source) => {
        if (_source === SourceEnum.NewsAPI)
          sourcePromises.push(
            limit(() => newsAPIService.fetchArticles(filter))
          );
        else if (_source === SourceEnum.NYT)
          sourcePromises.push(
            limit(() => nyTimesService.fetchArticles(filter))
          );
        else if (_source === SourceEnum.Guardian)
          sourcePromises.push(
            limit(() => guardianService.fetchArticles(filter))
          );
      });
      const responses = await Promise.allSettled(sourcePromises);

      let fetchedArticles: Article[] = [];
      responses.forEach((result) => {
        if (result.status === 'fulfilled') {
          fetchedArticles = [...fetchedArticles, ...result.value];
        }
      });

      setArticles(fetchedArticles);
      setLoading(false);
      setCurrentPage(page);
    };
    fetchArticles().then();
  }, [source, category, date, filter, keyword, page]);

  return { articles, loading, currentPage };
};
