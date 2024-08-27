import { useEffect, useState } from 'react';
import { newsAPIService } from '@/news/services/news-api.service.ts';
import { guardianService } from '@/news/services/guardian.service.ts';
import { nyTimesService } from '@/news/services/nytService.ts';
import { Article } from '@/news/types/article.type.ts';
import { FilterSearch } from '@/news/types/news-service.type.ts';

export const useFetchArticles = (filter: FilterSearch) => {
  const { page, keyword, date, category, source } = filter;
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      const response = await Promise.all([
        newsAPIService.fetchArticles(filter),
        nyTimesService.fetchArticles(filter),
        guardianService.fetchArticles(filter),
      ]);

      const fetchedArticles = response.flat();
      setArticles(fetchedArticles);
      setLoading(false);
      setCurrentPage(page);
    };
    fetchArticles().then();
  }, [source, category, date, filter, keyword, page]);

  return { articles, loading, currentPage };
};
