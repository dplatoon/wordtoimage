
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';
import { storageService, StoredImage } from '@/services/storageService';
import { GalleryToolbar } from './GalleryToolbar';
import { GalleryImageGrid } from './GalleryImageGrid';
import { GalleryFilters } from './GalleryFilters';

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
      {/* Filters */}
      <GalleryFilters
        searchQuery={searchQuery}
        activeFilters={activeFilters}
        filteredCount={filteredImages.length}
        totalCount={images.length}
        onSearch={setSearchQuery}
        onFilter={setActiveFilters}
        onClearFilters={() => {
          setSearchQuery('');
          setActiveFilters({});
        }}
      />

      {/* Toolbar */}
      <GalleryToolbar
        selectedImages={selectedImages}
        filteredImages={filteredImages}
        viewMode={viewMode}
        sortBy={sortBy}
        onSelectAll={handleSelectAll}
        onDownloadSelected={handleDownloadSelected}
        onDeleteSelected={handleDeleteSelected}
        onViewModeChange={setViewMode}
        onSortChange={setSortBy}
        onExportData={handleExportData}
      />

      {/* Gallery Grid */}
      <GalleryImageGrid
        images={filteredImages}
        selectedImages={selectedImages}
        viewMode={viewMode}
        onSelectImage={handleSelectImage}
        onToggleFavorite={toggleFavorite}
      />

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No images in your gallery yet</p>
          <p className="text-sm text-gray-400 mt-1">Start generating some amazing AI art!</p>
        </div>
      )}
    </div>
  );
}
