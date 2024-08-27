import React, { useState } from 'react';

import SearchBar from '../components/SearchBar';

import ArticleList from '../components/ArticleList';
import FilterPanel from '@/news/components/FilterPanel.tsx';
import { useFetchArticles } from '@/news/hooks/useFetchArticles.ts';
import { FilterSearch, SourceEnum } from '@/news/types/news-service.type.ts';
import { SkeletonCards } from '@/news/components/SkeletonCard.tsx';

const HomePage: React.FC = () => {
  const [filter, setFilter] = useState<FilterSearch>({
    page: 1,
    keyword: 'news',
  });
  const { articles, loading } = useFetchArticles(filter);

  const handleSearch = async (keyword: string) => {
    setFilter((state) => {
      return { ...state, keyword: keyword?.trim(), page: 1 };
    });
  };

  const handleFilterChange = (
    source: SourceEnum,
    date: Date | undefined,
    category: string | undefined
  ) => {
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
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilter={handleFilterChange} />
      {!loading ? <ArticleList articles={articles} /> : <SkeletonCards />}
    </div>
  );
};

export default HomePage;
