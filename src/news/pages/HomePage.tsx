import React, { useState } from 'react';

import SearchBar from '../components/SearchBar';

import ArticleList from '../components/ArticleList';
import FilterPanel from '@/news/components/FilterPanel.tsx';
import { useFetchArticles } from '@/news/hooks/useFetchArticles.ts';
import { FilterSearch, SourceEnum } from '@/news/types/news-service.type.ts';
import { SkeletonCards } from '@/news/components/SkeletonCard.tsx';
import { useSearchParams } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Read values from URL query parameters
  const query = searchParams.get('q') || 'news';
  const category = searchParams.get('category') || undefined;
  const source = searchParams.get('source')
    ? (decodeURIComponent(searchParams.get('source') as string).split(
        ','
      ) as SourceEnum[])
    : [];
  const date = searchParams.get('date') || '';

  const [filter, setFilter] = useState<FilterSearch>({
    page: 1,
    keyword: query,
    source: source,
    category: category,
    date: date ? new Date(date) : undefined,
  });
  const { articles, loading } = useFetchArticles(filter);

  const handleSearch = async (newQuery: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), q: newQuery });
    setFilter((state) => {
      return { ...state, keyword: newQuery?.trim(), page: 1 };
    });
  };

  const handleFilterChange = (
    source: SourceEnum[],
    date: Date | undefined,
    category: string | undefined
  ) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      source: source?.join(',') || '',
      date: date ? date.toLocaleDateString() : '',
      category: category as string,
    });
    setFilter((state) => {
      return {
        ...state,
        source: source,
        date: date,
        category: category,
        page: 1,
      };
    });
  };

  return (
    <div>
      <SearchBar q={query} onSearch={handleSearch} />
      <FilterPanel filter={filter} onFilter={handleFilterChange} />
      {!loading ? <ArticleList articles={articles} /> : <SkeletonCards />}
    </div>
  );
};

export default HomePage;
