
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GallerySearch } from './GallerySearch';

interface GalleryFiltersProps {
  searchQuery: string;
  activeFilters: {
    favorites?: boolean;
    style?: string;
    dateRange?: { start: Date; end: Date };
  };
  filteredCount: number;
  totalCount: number;
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
  onClearFilters: () => void;
}

export function GalleryFilters({
  searchQuery,
  activeFilters,
  filteredCount,
  totalCount,
  onSearch,
  onFilter,
  onClearFilters
}: GalleryFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <GallerySearch
        onSearch={onSearch}
        onFilter={onFilter}
        onClearFilters={onClearFilters}
        activeFilters={activeFilters}
      />

      {/* Results Info */}
      {filteredCount !== totalCount && (
        <Alert>
          <AlertDescription>
            Showing {filteredCount} of {totalCount} images
            {searchQuery && ` matching "${searchQuery}"`}
          </AlertDescription>
        </Alert>
      )}

      {/* Empty State for Filtered Results */}
      {filteredCount === 0 && totalCount > 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">No images match your search criteria</p>
          <Button variant="outline" onClick={onClearFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
