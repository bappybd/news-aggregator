import { useState, useEffect } from 'react';

export interface Preferences {
  sources: string[];
  categories: string[];
  authors: string[];
}

const defaultPreferences: Preferences = {
  sources: ['NewsAPI'],
  categories: [],
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
