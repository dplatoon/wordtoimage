
import React, { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery';
import { GalleryManager } from '../gallery/GalleryManager';
import { Button } from '../ui/button';
import { storageService, StoredImage } from '@/services/storageService';
import { Download, Settings, Grid3X3, List, Search } from 'lucide-react';
import { toast } from '../ui/sonner';
import { cn } from '@/lib/utils';

interface EnhancedImageGalleryProps {
  images: Array<{
    url: string;
    prompt?: string;
    timestamp?: number;
  }>;
  loading?: boolean;
  showGalleryManager?: boolean;
  onToggleGalleryManager?: (show: boolean) => void;
}

export function EnhancedImageGallery({ 
  images, 
  loading = false, 
  showGalleryManager = false,
  onToggleGalleryManager 
}: EnhancedImageGalleryProps) {
  const [storedImages, setStoredImages] = useState<StoredImage[]>([]);
  const [viewMode, setViewMode] = useState<'gallery' | 'manager'>('gallery');

  // Load stored images from localStorage
  useEffect(() => {
    const loadStoredImages = () => {
      const stored = storageService.getAllImages();
      setStoredImages(stored);
    };

    loadStoredImages();
    
    // Set up periodic refresh to catch changes from other tabs
    const interval = setInterval(loadStoredImages, 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto-save new images to storage
  useEffect(() => {
    images.forEach(image => {
      if (image.url && image.timestamp) {
        const existingImage = storedImages.find(stored => stored.url === image.url);
        if (!existingImage) {
          const storedImage: StoredImage = {
            id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            url: image.url,
            prompt: image.prompt || 'Generated image',
            timestamp: image.timestamp,
            favorite: false,
            tags: [],
            style: 'auto',
            resolution: '1024x1024'
          };
          
          storageService.saveImage(storedImage);
          setStoredImages(prev => [...prev, storedImage]);
          
          console.log('Auto-saved image to gallery:', storedImage.id);
        }
      }
    });
  }, [images, storedImages]);

  // Handle gallery manager toggle
  useEffect(() => {
    if (showGalleryManager) {
      setViewMode('manager');
    } else {
      setViewMode('gallery');
    }
  }, [showGalleryManager]);

  const handleToggleManager = () => {
    const newMode = viewMode === 'gallery' ? 'manager' : 'gallery';
    setViewMode(newMode);
    onToggleGalleryManager?.(newMode === 'manager');
  };

  const handleImagesChange = (updatedImages: StoredImage[]) => {
    setStoredImages(updatedImages);
  };

  const handleDownloadAll = async () => {
    if (images.length === 0) {
      toast.error("No images to download");
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const image of images) {
      try {
        // Open each image in a new tab for download
        window.open(image.url, '_blank');
        successCount++;
        
        // Add delay between downloads to prevent browser blocking
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Failed to download image:', error);
        errorCount++;
      }
    }

    if (successCount > 0) {
      toast.success(`Opened ${successCount} image${successCount > 1 ? 's' : ''} for download`);
    }
    
    if (errorCount > 0) {
      toast.error(`Failed to open ${errorCount} image${errorCount > 1 ? 's' : ''}`);
    }
  };

  const handleEdit = (url: string) => {
    // For now, just copy the image URL to clipboard
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Image URL copied to clipboard", {
        description: "You can paste this into other applications"
      });
    }).catch(() => {
      toast.error("Failed to copy URL");
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Generated Images</h2>
          <div className="flex gap-2">
            <div className="h-9 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-9 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <ImageGallery images={[]} onEdit={handleEdit} loading={true} />
      </div>
    );
  }

  // Empty state for no images
  if (images.length === 0 && storedImages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Grid3X3 className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
        <p className="text-gray-500">Generate your first AI image to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {viewMode === 'gallery' ? 'Generated Images' : 'Gallery Manager'}
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {viewMode === 'gallery' ? images.length : storedImages.length} image{(viewMode === 'gallery' ? images.length : storedImages.length) !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {images.length > 0 && viewMode === 'gallery' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadAll}
              className="hover:bg-blue-50 hover:border-blue-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          )}
          
          <Button
            variant={viewMode === 'manager' ? 'default' : 'outline'}
            size="sm"
            onClick={handleToggleManager}
            className={cn(
              "transition-colors",
              viewMode === 'manager' 
                ? "bg-violet-600 hover:bg-violet-700 text-white" 
                : "hover:bg-violet-50 hover:border-violet-300"
            )}
          >
            {viewMode === 'manager' ? (
              <>
                <Grid3X3 className="h-4 w-4 mr-2" />
                Gallery View
              </>
            ) : (
              <>
                <Settings className="h-4 w-4 mr-2" />
                Gallery Manager
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'gallery' ? (
        <ImageGallery 
          images={images.map(img => ({ url: img.url }))} 
          onEdit={handleEdit} 
          loading={loading}
        />
      ) : (
        <GalleryManager
          images={storedImages}
          onImagesChange={handleImagesChange}
          className="bg-white rounded-xl border border-gray-200 p-6"
        />
      )}

      {/* Gallery tips for new users */}
      {storedImages.length > 0 && storedImages.length < 5 && viewMode === 'gallery' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Search className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Gallery Tip</h3>
              <p className="text-blue-800 text-sm">
                All your images are automatically saved! Use the Gallery Manager to organize, search, and manage your collection as it grows.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
