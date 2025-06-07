
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, 
  Trash2, 
  SelectAll, 
  Grid3X3, 
  List, 
  SortAsc, 
  SortDesc,
  FileDown,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';
import { storageService, StoredImage } from '@/services/storageService';
import { GallerySearch } from './GallerySearch';

interface GalleryManagerProps {
  images: StoredImage[];
  onImagesChange: (images: StoredImage[]) => void;
  className?: string;
}

export function GalleryManager({ images, onImagesChange, className }: GalleryManagerProps) {
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'favorites'>('newest');
  const [filteredImages, setFilteredImages] = useState<StoredImage[]>(images);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<{
    favorites?: boolean;
    style?: string;
    dateRange?: { start: Date; end: Date };
  }>({});

  // Load preferences on mount
  useEffect(() => {
    const preferences = storageService.getPreferences();
    setViewMode(preferences.viewMode);
    setSortBy(preferences.sortBy);
  }, []);

  // Save preferences when they change
  useEffect(() => {
    storageService.savePreferences({ viewMode, sortBy });
  }, [viewMode, sortBy]);

  // Filter and sort images
  const processedImages = useMemo(() => {
    let result = [...images];

    // Apply search
    if (searchQuery) {
      result = storageService.searchImages(searchQuery);
    }

    // Apply filters
    if (Object.keys(activeFilters).length > 0) {
      result = result.filter(image => {
        if (activeFilters.favorites && !image.favorite) return false;
        if (activeFilters.style && image.style !== activeFilters.style) return false;
        if (activeFilters.dateRange) {
          const imgDate = new Date(image.timestamp);
          if (imgDate < activeFilters.dateRange.start || imgDate > activeFilters.dateRange.end) {
            return false;
          }
        }
        return true;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.timestamp - b.timestamp;
        case 'favorites':
          if (a.favorite && !b.favorite) return -1;
          if (!a.favorite && b.favorite) return 1;
          return b.timestamp - a.timestamp;
        case 'newest':
        default:
          return b.timestamp - a.timestamp;
      }
    });

    return result;
  }, [images, searchQuery, activeFilters, sortBy]);

  useEffect(() => {
    setFilteredImages(processedImages);
  }, [processedImages]);

  const handleSelectAll = () => {
    if (selectedImages.size === filteredImages.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(filteredImages.map(img => img.id)));
    }
  };

  const handleSelectImage = (id: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedImages(newSelected);
  };

  const handleDeleteSelected = () => {
    const idsToDelete = Array.from(selectedImages);
    storageService.deleteImages(idsToDelete);
    
    const updatedImages = images.filter(img => !selectedImages.has(img.id));
    onImagesChange(updatedImages);
    setSelectedImages(new Set());
    
    toast.success(`Deleted ${idsToDelete.length} image${idsToDelete.length > 1 ? 's' : ''}`);
  };

  const handleDownloadSelected = async () => {
    const selectedImageData = filteredImages.filter(img => selectedImages.has(img.id));
    
    for (const image of selectedImageData) {
      try {
        const response = await fetch(image.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `generated-${image.id}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Failed to download image:', error);
        toast.error(`Failed to download image ${image.id}`);
      }
    }
    
    toast.success(`Downloaded ${selectedImageData.length} image${selectedImageData.length > 1 ? 's' : ''}`);
  };

  const handleExportData = () => {
    const data = storageService.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `wordtoimage-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Gallery data exported successfully');
  };

  const toggleFavorite = (id: string) => {
    storageService.toggleFavorite(id);
    const updatedImages = images.map(img => 
      img.id === id ? { ...img, favorite: !img.favorite } : img
    );
    onImagesChange(updatedImages);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search and Filters */}
      <GallerySearch
        onSearch={setSearchQuery}
        onFilter={setActiveFilters}
        onClearFilters={() => setActiveFilters({})}
        activeFilters={activeFilters}
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Selection Controls */}
          {filteredImages.length > 0 && (
            <>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedImages.size === filteredImages.length && filteredImages.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  <SelectAll className="h-4 w-4 mr-1" />
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
                    onClick={handleDownloadSelected}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteSelected}
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
            onChange={(e) => setSortBy(e.target.value as any)}
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
              onClick={() => setViewMode('grid')}
              className="rounded-r-none border-r border-gray-300"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Export */}
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <FileDown className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Results Info */}
      {filteredImages.length !== images.length && (
        <Alert>
          <AlertDescription>
            Showing {filteredImages.length} of {images.length} images
            {searchQuery && ` matching "${searchQuery}"`}
          </AlertDescription>
        </Alert>
      )}

      {/* Gallery Grid/List */}
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          : "space-y-4"
      )}>
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className={cn(
              "relative group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow",
              viewMode === 'list' && "flex"
            )}
          >
            {/* Selection Checkbox */}
            <div className="absolute top-2 left-2 z-10">
              <Checkbox
                checked={selectedImages.has(image.id)}
                onCheckedChange={() => handleSelectImage(image.id)}
                className="bg-white/80 border-white"
              />
            </div>

            {/* Image */}
            <div className={cn(
              "relative overflow-hidden",
              viewMode === 'list' ? "w-32 h-32 flex-shrink-0" : "aspect-square"
            )}>
              <img
                src={image.url}
                alt={image.prompt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Favorite Badge */}
              {image.favorite && (
                <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                  <div className="w-2 h-2" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 flex-1">
              <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                {image.prompt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(image.timestamp).toLocaleDateString()}</span>
                {image.style && (
                  <Badge variant="secondary" className="text-xs">
                    {image.style}
                  </Badge>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(image.id)}
                  className="text-xs"
                >
                  {image.favorite ? 'Unfavorite' : 'Favorite'}
                </Button>
                
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(image.url, '_blank')}
                    className="p-1"
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = image.url;
                      a.download = `generated-${image.id}.png`;
                      a.click();
                    }}
                    className="p-1"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && images.length > 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">No images match your search criteria</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setActiveFilters({});
          }}>
            Clear all filters
          </Button>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No images in your gallery yet</p>
          <p className="text-sm text-gray-400 mt-1">Start generating some amazing AI art!</p>
        </div>
      )}
    </div>
  );
}
