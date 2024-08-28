import {
  ArticleNyt,
  FilterSearch,
  NewsService,
  SourceEnum,
} from '@/news/types/news-service.type.ts';
import { Article } from '@/news/types/article.type.ts';
import { fetchWithRetryAndCache } from '@/lib/utils.ts';

export const nyTimesService: NewsService = {
  async fetchArticles(filter: FilterSearch): Promise<Article[]> {
    const { page, keyword, date, category } = filter;
    const API_KEY = import.meta.env.VITE_API_KEY_NY_TIMES;
    const BASE_URL = 'https://api.nytimes.com';

    const filtersArray = [];
    if (category) filtersArray.push(`section_name:("${category}")`);
    if (date) filtersArray.push(`pub_date:${date.toLocaleDateString()}`);
    const fq = filtersArray.join(' AND ');

    const response = await fetchWithRetryAndCache(
      `${BASE_URL}/svc/search/v2/articlesearch.json`,
      {
        params: {
          page: page,
          q: keyword,
          fq: fq,
          'api-key': API_KEY,
        },
      }
    );
    return (
      (response?.data?.response?.docs.map(
        (article: ArticleNyt) =>
          ({
            title: article.headline.main,
            description: article.lead_paragraph,
            // author: article.author,
            url: article.web_url,
            source: article.source,
            date: article.pub_date,
            category: article?.keywords?.at(0)?.value,
            image:
              'https://static01.nyt.com/' +
              article.multimedia.find((x) => x.type === 'image')?.url,
            dataSource: SourceEnum.NYT,
          }) as Article
      ) as Article[]) || []
    );
  },
};
