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
      const stored = storageService.getImages();
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
      <div className="space-y-6" aria-busy="true" aria-label="Loading images">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Generated Images</h2>
          <div className="flex gap-2" aria-hidden="true">
            <div className="h-9 w-24 bg-muted rounded animate-pulse"></div>
            <div className="h-9 w-32 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
        <ImageGallery images={[]} onEdit={handleEdit} loading={true} />
      </div>
    );
  }

  // Empty state for no images
  if (images.length === 0 && storedImages.length === 0) {
    return (
      <div className="text-center py-12" role="status">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4" aria-hidden="true">
          <Grid3X3 className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No images yet</h3>
        <p className="text-muted-foreground">Generate your first AI image to get started!</p>
      </div>
    );
  }

  return (
    <section className="space-y-6" aria-labelledby="gallery-heading">
      {/* Header with controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <h2 id="gallery-heading" className="text-xl font-semibold text-foreground">
            {viewMode === 'gallery' ? 'Generated Images' : 'Gallery Manager'}
          </h2>
          <span 
            className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full"
            aria-live="polite"
          >
            {viewMode === 'gallery' ? images.length : storedImages.length} image{(viewMode === 'gallery' ? images.length : storedImages.length) !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {images.length > 0 && viewMode === 'gallery' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadAll}
              aria-label={`Download all ${images.length} images`}
              className="hover:bg-primary/10 hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Download className="h-4 w-4 mr-2" aria-hidden="true" />
              Download All
            </Button>
          )}
          
          <Button
            variant={viewMode === 'manager' ? 'default' : 'outline'}
            size="sm"
            onClick={handleToggleManager}
            aria-pressed={viewMode === 'manager'}
            aria-label={viewMode === 'manager' ? 'Switch to gallery view' : 'Open gallery manager'}
            className={cn(
              "transition-colors focus-visible:ring-2 focus-visible:ring-primary",
              viewMode === 'manager' 
                ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                : "hover:bg-primary/10 hover:border-primary/30"
            )}
          >
            {viewMode === 'manager' ? (
              <>
                <Grid3X3 className="h-4 w-4 mr-2" aria-hidden="true" />
                Gallery View
              </>
            ) : (
              <>
                <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
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
          className="bg-card rounded-xl border border-border p-6"
        />
      )}

      {/* Gallery tips for new users */}
      {storedImages.length > 0 && storedImages.length < 5 && viewMode === 'gallery' && (
        <aside className="bg-primary/10 border border-primary/20 rounded-lg p-4" role="note" aria-label="Gallery tip">
          <div className="flex items-start gap-3">
            <Search className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Gallery Tip</h3>
              <p className="text-muted-foreground text-sm">
                All your images are automatically saved! Use the Gallery Manager to organize, search, and manage your collection as it grows.
              </p>
            </div>
          </div>
        </aside>
      )}
    </section>
  );
}
