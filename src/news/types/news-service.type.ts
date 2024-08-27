import { Article } from '@/news/types/article.type.ts';

export enum SourceEnum {
  NewsAPI = 'NewsAPI',
  Guardian = 'Guardian',
  NYT = 'NYT',
}

export type FilterSearch = {
  page: number;
  keyword?: string;
  date?: Date | undefined;
  category?: string;
  source?: SourceEnum;
};

export type ArticleNewsAPI = {
  title: string;
  description: string;
  author?: string;
  url: string;
  publishedAt: string;
  category: string;
  urlToImage: string;
};

export type ArticleGuardian = {
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  sectionId: string;
  fields: {
    trailText: string;
    thumbnail: string;
  };
  tags: {
    sectionId: string;
    sectionName: string;
  }[];
};

export type ArticleNyt = {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: {
    type: string;
    url: string;
  }[];
  headline: {
    main: string;
  };
  keywords: {
    name: string;
    value: string;
  }[];
  pub_date: string;
};

export type NewsService = {
  fetchArticles: (filter: FilterSearch) => Promise<Article[]>;
};
