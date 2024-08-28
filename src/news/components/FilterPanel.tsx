import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { FilterSearch, SourceEnum } from '@/news/types/news-service.type.ts';
import { usePreferences } from '@/news/hooks/usePreferences.ts';

interface FiltersProps {
  filter: FilterSearch;
  onFilter: (
    source: SourceEnum[],
    date: Date | undefined,
    category: string | undefined
  ) => void;
}

const FiltersPanel: React.FC<FiltersProps> = ({ filter, onFilter }) => {
  const { preferences } = usePreferences();

  const [userSources] = useState(
    preferences?.sources?.map((userSource) => ({
      value: userSource,
      label: userSource,
    })) || []
  );
  const [userCategories] = useState(
    preferences?.categories?.map((userCategory) => ({
      value: userCategory,
      label: userCategory,
    })) || []
  );

  const [selectedSource, setSelectedSource] = useState<string[]>(
    filter.source as string[]
  );
  const [date, setDate] = useState<Date | undefined>(filter.date);
  const [category, setCategory] = useState<string | undefined>(filter.category);

  const handleFilter = () => {
    onFilter(selectedSource as SourceEnum[], date, category);
  };

  /*const clearAllFilter = () => {
    setSelectedSource([]);
    setDate(undefined);
    setCategory(undefined);

    handleFilter();
  };*/

  return (
    <div className="flex flex-col md:flex-row p-4 gap-2 w-full">
      <div className="sm:w-full md:w-full">
        <MultiSelect
          options={userSources}
          onValueChange={setSelectedSource}
          defaultValue={selectedSource}
          placeholder="Select Source"
          variant="inverted"
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className={'flex sm:w-full md:w-full'}>
        <Select
          value={category?.toString()}
          onValueChange={(e: SourceEnum) => setCategory(e)}
        >
          <SelectTrigger className="sm:w-full md:w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {userCategories.map((category) => (
              <React.Fragment key={category.value}>
                <SelectItem value={category.value}>
                  <span className={'capitalize'}>{category.label}</span>
                </SelectItem>
              </React.Fragment>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className={'flex justify-center gap-2'}>
        <Button onClick={handleFilter}>Apply Filters</Button>
        {/*<Button variant={'secondary'} onClick={clearAllFilter}>
          Reset
        </Button>*/}
      </div>
    </div>
  );
};

export default FiltersPanel;
