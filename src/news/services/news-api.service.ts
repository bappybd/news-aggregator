import axios from 'axios';
import {
  ArticleNewsAPI,
  FilterSearch,
  NewsService,
  SourceEnum,
} from '@/news/types/news-service.type.ts';
import { Article } from '@/news/types/article.type.ts';

export const newsAPIService: NewsService = {
  async fetchArticles(filter: FilterSearch): Promise<Article[]> {
    const { page, keyword, date, category, source } = filter;

    const API_KEY = import.meta.env.VITE_API_KEY_NEWS_API;
    const BASE_URL = 'https://newsapi.org/v2';
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        page: page,
        q: keyword,
        from: date,
        category: category,
        apiKey: API_KEY,
      },
    });
    return response.data.articles.map(
      (article: ArticleNewsAPI) =>
        ({
          title: article.title,
          description: article.description,
          author: article.author,
          url: article.url,
          source: source,
          date: article.publishedAt,
          category: article.category || 'General',
          image: article.urlToImage || null,
          dataSource: SourceEnum.NewsAPI,
        }) as Article
    ) as Article[];
  },
};
