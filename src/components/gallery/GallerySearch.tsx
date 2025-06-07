
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Search, Filter, Calendar as CalendarIcon, X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { storageService } from '@/services/storageService';
import { format } from 'date-fns';

interface GallerySearchProps {
  onSearch: (query: string) => void;
  onFilter: (filters: {
    favorites?: boolean;
    style?: string;
    dateRange?: { start: Date; end: Date };
  }) => void;
  onClearFilters: () => void;
  activeFilters: {
    favorites?: boolean;
    style?: string;
    dateRange?: { start: Date; end: Date };
  };
}

export function GallerySearch({ onSearch, onFilter, onClearFilters, activeFilters }: GallerySearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});

  useEffect(() => {
    setSearchHistory(storageService.getSearchHistory());
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
    
    if (query.trim()) {
      storageService.addSearchTerm(query.trim());
      setSearchHistory(storageService.getSearchHistory());
    }
    setShowHistory(false);
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    handleSearch(term);
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...activeFilters, [key]: value };
    onFilter(newFilters);
  };

  const handleDateRangeChange = (range: { start?: Date; end?: Date }) => {
    setDateRange(range);
    if (range.start && range.end) {
      handleFilterChange('dateRange', { start: range.start, end: range.end });
    }
  };

  const clearDateRange = () => {
    setDateRange({});
    const { dateRange, ...otherFilters } = activeFilters;
    onFilter(otherFilters);
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  const styles = ['auto', '3d_anime', '3d_model', 'japanese_anime', 'movie', 'comic'];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchQuery);
              }
            }}
            onFocus={() => setShowHistory(true)}
            placeholder="Search your images by prompt, style, or tags..."
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                handleSearch('');
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Search History Dropdown */}
        {showHistory && searchHistory.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="p-2 border-b border-gray-100 flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              Recent searches
            </div>
            <div className="max-h-48 overflow-y-auto">
              {searchHistory.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSearch(term)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant={showFilters ? "default" : "outline"}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 min-w-5 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {/* Quick Filters */}
        <Button
          variant={activeFilters.favorites ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('favorites', !activeFilters.favorites)}
        >
          Favorites Only
        </Button>

        {/* Active Filter Badges */}
        {activeFilters.style && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Style: {activeFilters.style}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => handleFilterChange('style', undefined)}
            />
          </Badge>
        )}

        {activeFilters.dateRange && (
          <Badge variant="secondary" className="flex items-center gap-1">
            {format(activeFilters.dateRange.start, 'MMM d')} - {format(activeFilters.dateRange.end, 'MMM d')}
            <X className="h-3 w-3 cursor-pointer" onClick={clearDateRange} />
          </Badge>
        )}

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Style Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Style</label>
              <Select
                value={activeFilters.style || ''}
                onValueChange={(value) => handleFilterChange('style', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All styles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All styles</SelectItem>
                  {styles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.start && dateRange.end
                      ? `${format(dateRange.start, 'MMM d')} - ${format(dateRange.end, 'MMM d')}`
                      : 'Select range'
                    }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{
                      from: dateRange.start,
                      to: dateRange.end
                    }}
                    onSelect={(range) => {
                      if (range) {
                        handleDateRangeChange({
                          start: range.from,
                          end: range.to
                        });
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
