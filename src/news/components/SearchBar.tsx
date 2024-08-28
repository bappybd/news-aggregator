import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

interface SearchBarProps {
  q: string;
  onSearch: (q: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ q, onSearch }) => {
  const [query, setQuery] = useState(q);

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex justify-center p-4 gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
