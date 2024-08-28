import { useState, useEffect } from 'react';
import { CategoryEnum, SourceEnum } from '@/news/types/news-service.type.ts';

export interface Preferences {
  sources: string[];
  categories: string[];
  authors: string[];
}

const defaultPreferences: Preferences = {
  sources: Object.values(SourceEnum),
  categories: Object.values(CategoryEnum),
  authors: [],
};

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const savedPreferences = localStorage.getItem('preferences');
    return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (newPreferences: Preferences) => {
    setPreferences(newPreferences);
  };

  return { preferences, updatePreferences };
};
