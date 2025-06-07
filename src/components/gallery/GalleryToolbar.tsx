
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Trash2, 
  CheckSquare, 
  Grid3X3, 
  List,
  FileDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryToolbarProps {
  selectedImages: Set<string>;
  filteredImages: any[];
  viewMode: 'grid' | 'list';
  sortBy: 'newest' | 'oldest' | 'favorites';
  onSelectAll: () => void;
  onDownloadSelected: () => void;
  onDeleteSelected: () => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSortChange: (sort: 'newest' | 'oldest' | 'favorites') => void;
  onExportData: () => void;
}

export function GalleryToolbar({
  selectedImages,
  filteredImages,
  viewMode,
  sortBy,
  onSelectAll,
  onDownloadSelected,
  onDeleteSelected,
  onViewModeChange,
  onSortChange,
  onExportData
}: GalleryToolbarProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Selection Controls */}
        {filteredImages.length > 0 && (
          <>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedImages.size === filteredImages.length && filteredImages.length > 0}
                onCheckedChange={onSelectAll}
              />
              <Button variant="outline" size="sm" onClick={onSelectAll}>
                <CheckSquare className="h-4 w-4 mr-1" />
                {selectedImages.size === filteredImages.length ? 'Deselect' : 'Select'} All
              </Button>
            </div>

            {selectedImages.size > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {selectedImages.size} selected
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDownloadSelected}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDeleteSelected}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="favorites">Favorites First</option>
        </select>

        {/* View Mode */}
        <div className="flex items-center border border-gray-300 rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="rounded-r-none border-r border-gray-300"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* Export */}
        <Button variant="outline" size="sm" onClick={onExportData}>
          <FileDown className="h-4 w-4 mr-1" />
          Export
        </Button>
      </div>
    </div>
  );
}
