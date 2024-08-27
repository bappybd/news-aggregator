import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input.tsx';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { SourceEnum } from '@/news/types/news-service.type.ts';

interface FiltersProps {
  onFilter: (
    source: SourceEnum,
    date: Date | undefined,
    category: string | undefined
  ) => void;
}

const FiltersPanel: React.FC<FiltersProps> = ({ onFilter }) => {
  const [source, setSource] = useState<SourceEnum>(SourceEnum.NewsAPI);
  const [date, setDate] = useState<Date | undefined>();
  const [category, setCategory] = useState<string | undefined>();

  const handleFilter = () => {
    onFilter(source, date, category);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-2 w-full">
      <Select onValueChange={(e: SourceEnum) => setSource(e)}>
        <SelectTrigger className="w-1/4">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={SourceEnum.NewsAPI}>NewsAPI</SelectItem>
          <SelectItem value={SourceEnum.Guardian}>The Guardian</SelectItem>
          <SelectItem value={SourceEnum.NYT}>New York Times</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-1/4 justify-start text-left font-normal',
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

      <div className={'flex basis-1/4'}>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
      </div>
      <div className={'flex justify-end w-1/4'}>
        <Button onClick={handleFilter}>Apply Filters</Button>
      </div>
    </div>
  );
};

export default FiltersPanel;
