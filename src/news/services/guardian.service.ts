import axios from 'axios';
import {
  ArticleGuardian,
  FilterSearch,
  NewsService,
  SourceEnum,
} from '@/news/types/news-service.type.ts';
import { Article } from '@/news/types/article.type.ts';

export const guardianService: NewsService = {
  async fetchArticles(filter: FilterSearch): Promise<Article[]> {
    const { page, keyword, date, category, source } = filter;

    const API_KEY = import.meta.env.VITE_API_KEY_THE_GUARDIAN;
    const BASE_URL = 'https://content.guardianapis.com';
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        page: page,
        q: keyword,
        'show-fields': 'thumbnail,trailText',
        'show-tags': 'all',
        'show-references': 'author',
        'from-date': date,
        tag: category,
        'api-key': API_KEY,
      },
    });
    return response.data.response.results.map(
      (article: ArticleGuardian) =>
        ({
          title: article.webTitle,
          description: article.fields.trailText,
          // author: article.author,
          url: article.webUrl,
          source: source,
          date: article.webPublicationDate,
          category: article.tags?.at(0)?.sectionId,
          image: article.fields?.thumbnail,
          dataSource: SourceEnum.Guardian,
        }) as Article
    ) as Article[];
  },
};
