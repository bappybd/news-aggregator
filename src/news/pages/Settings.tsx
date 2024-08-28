import React, { useState } from 'react';
import { usePreferences } from '../hooks/usePreferences';
import { Button } from '@/components/ui';
import { CategoryEnum, SourceEnum } from '@/news/types/news-service.type.ts';
import { MultiSelect } from '@/components/ui/multi-select';
import { useToast } from '@/components/ui/use-toast.ts';

const sources = Object.values(SourceEnum);
const categories = Object.values(CategoryEnum);
const authors = ['Author 1', 'Author 2', 'Author 3']; // This can be dynamically fetched

const Settings: React.FC = () => {
  const { preferences, updatePreferences } = usePreferences();
  const { toast } = useToast();
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
    toast({
      title: 'Success',
      description: 'Preferences saved successfully',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Customize Your News Feed</h2>

      <div className="flex justify-center mb-4 gap-2">
        <h3 className="text-lg font-semibold w-1/2">Select Sources: </h3>
        <div className="flex flex-wrap gap-2 w-1/2">
          <div className="sm:w-full md:w-full">
            <MultiSelect
              options={sources?.map((source) => ({
                value: source,
                label: source,
              }))}
              onValueChange={setSelectedSources}
              defaultValue={selectedSources}
              placeholder="Select Source"
              variant="inverted"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-4 gap-2">
        <h3 className="text-lg font-semibold w-1/2">Select Categories: </h3>
        <div className="flex flex-wrap gap-2 w-1/2">
          <MultiSelect
            options={categories?.map((category) => ({
              value: category,
              label: category,
            }))}
            onValueChange={setSelectedCategories}
            defaultValue={selectedCategories}
            placeholder="Select Category"
            variant="inverted"
          />
        </div>
      </div>

      <div className="flex justify-center mb-4 gap-2">
        <h3 className="text-lg font-semibold w-1/2">Select Authors: </h3>
        <div className="flex flex-wrap gap-2 w-1/2">
          <MultiSelect
            options={authors?.map((author) => ({
              value: author,
              label: author,
            }))}
            onValueChange={setSelectedAuthors}
            defaultValue={selectedAuthors}
            placeholder="Select Author"
            variant="inverted"
          />
        </div>
      </div>

      <Button onClick={handleSave} className="mt-4">
        Save Preferences
      </Button>
    </div>
  );
};

export default Settings;
