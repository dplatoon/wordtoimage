
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ContentSearchProps {
  onSearch: (query: string) => void;
  onFilter: (filters: string[]) => void;
  categories?: string[];
  selectedFilters?: string[];
  placeholder?: string;
}

export const ContentSearch: React.FC<ContentSearchProps> = ({
  onSearch,
  onFilter,
  categories = [],
  selectedFilters = [],
  placeholder = "Search content..."
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterToggle = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    onFilter(newFilters);
  };

  const clearFilters = () => {
    onFilter([]);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Filter Button */}
        {categories.length > 0 && (
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {selectedFilters.length > 0 && (
              <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
                {selectedFilters.length}
              </span>
            )}
          </Button>
        )}
      </div>
      
      {/* Filter Options */}
      {showFilters && categories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Categories</h4>
            {selectedFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterToggle(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedFilters.includes(category)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
