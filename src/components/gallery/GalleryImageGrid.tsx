
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { LazyImage } from '@/components/common/LazyImage';
import { Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StoredImage } from '@/services/storageService';

interface GalleryImageGridProps {
  images: StoredImage[];
  selectedImages: Set<string>;
  viewMode: 'grid' | 'list';
  onSelectImage: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function GalleryImageGrid({
  images,
  selectedImages,
  viewMode,
  onSelectImage,
  onToggleFavorite
}: GalleryImageGridProps) {
  const handleDownloadImage = (image: StoredImage) => {
    const a = document.createElement('a');
    a.href = image.url;
    a.download = `generated-${image.id}.png`;
    a.click();
  };

  return (
    <div className={cn(
      viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        : "space-y-4"
    )}>
      {images.map((image) => (
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
              onCheckedChange={() => onSelectImage(image.id)}
              className="bg-white/80 border-white"
            />
          </div>

          {/* Image */}
          <div className={cn(
            "relative overflow-hidden",
            viewMode === 'list' ? "w-32 h-32 flex-shrink-0" : "aspect-square"
          )}>
            <LazyImage
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-cover"
              aspectRatio={viewMode === 'list' ? 1 : 1}
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
                onClick={() => onToggleFavorite(image.id)}
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
                  onClick={() => handleDownloadImage(image)}
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
  );
}
