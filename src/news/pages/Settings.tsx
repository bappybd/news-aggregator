import React, { useState } from 'react';
import { usePreferences, Preferences } from '../hooks/usePreferences';
import { Checkbox, Button } from '@/components/ui';

const sources = ['NewsAPI', 'The Guardian', 'New York Times'];
const categories = ['Technology', 'Sports', 'Politics', 'Entertainment'];
const authors = ['Author 1', 'Author 2', 'Author 3']; // This can be dynamically fetched

const Settings: React.FC = () => {
  const { preferences, updatePreferences } = usePreferences();
  const [selectedSources, setSelectedSources] = useState(preferences.sources);
  const [selectedCategories, setSelectedCategories] = useState(
    preferences.categories
  );
  const [selectedAuthors, setSelectedAuthors] = useState(preferences.authors);

  const handleSave = () => {
    updatePreferences({
      sources: selectedSources,
      categories: selectedCategories,
      authors: selectedAuthors,
    });
  };

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Customize Your News Feed</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Select Sources</h3>
        <div className="flex flex-col items-center gap-2">
          {sources.map((source) => (
            <React.Fragment key={source}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedSources.includes(source)}
                  onCheckedChange={() =>
                    toggleSelection(source, selectedSources, setSelectedSources)
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {source}
                </label>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Select Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Checkbox
              key={category}
              checked={selectedCategories.includes(category)}
              onChange={() =>
                toggleSelection(
                  category,
                  selectedCategories,
                  setSelectedCategories
                )
              }
              label={category}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Select Authors</h3>
        <div className="flex flex-wrap gap-2">
          {authors.map((author) => (
            <Checkbox
              key={author}
              checked={selectedAuthors.includes(author)}
              onChange={() =>
                toggleSelection(author, selectedAuthors, setSelectedAuthors)
              }
              label={author}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="mt-4">
        Save Preferences
      </Button>
    </div>
  );
};

export default Settings;
