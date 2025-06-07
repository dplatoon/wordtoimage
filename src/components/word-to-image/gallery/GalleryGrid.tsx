
import React from 'react';
import { Download, Heart, Edit, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/sonner';

interface Image {
  url: string;
  alt?: string;
}

interface GalleryGridProps {
  images: Image[];
  favorites: number[];
  hoveredImage: number | null;
  setHoveredImage: (index: number | null) => void;
  toggleFavorite: (index: number) => void;
  onEdit: (url: string) => void;
}

export function GalleryGrid({
  images,
  favorites,
  hoveredImage,
  setHoveredImage,
  toggleFavorite,
  onEdit
}: GalleryGridProps) {
  const isMobile = useIsMobile();

  const handleImageLoad = (index: number) => {
    console.log(`Image ${index + 1} loaded successfully`);
  };

  const handleImageError = (index: number) => {
    console.error(`Failed to load image ${index + 1}`);
    toast.error(`Failed to load image ${index + 1}`);
  };

  const handleDownload = (imageUrl: string, index: number) => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `generated-image-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image download started');
    } catch (error) {
      console.error('Download failed:', error);
      window.open(imageUrl, '_blank');
      toast.success('Image opened in new tab');
    }
  };

  return (
    <div className={cn(
      "grid gap-4",
      isMobile ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3"
    )} role="grid" aria-label="Generated images">
      {images.map((image, index) => (
        <div
          key={`${image.url}-${index}`}
          className="relative group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
          onMouseEnter={() => setHoveredImage(index)}
          onMouseLeave={() => setHoveredImage(null)}
          role="gridcell"
        >
          <div className="aspect-square relative overflow-hidden">
            <img
              src={image.url}
              alt={image.alt || `AI generated image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.open(image.url, '_blank');
                }
              }}
              aria-describedby={`image-actions-${index}`}
            />
            
            <div className={cn(
              "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center",
              hoveredImage === index ? "opacity-100" : ""
            )}>
              <div className="flex gap-2" id={`image-actions-${index}`} role="group" aria-label="Image actions">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-gray-900 shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(image.url, index);
                  }}
                  aria-label={`Download image ${index + 1}`}
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  className={cn(
                    "bg-white/90 hover:bg-white text-gray-900 shadow-sm",
                    favorites.includes(index) && "text-red-500"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(index);
                  }}
                  aria-label={`${favorites.includes(index) ? 'Remove from' : 'Add to'} favorites`}
                  aria-pressed={favorites.includes(index)}
                >
                  <Heart className={cn("h-4 w-4", favorites.includes(index) && "fill-current")} />
                  <span className="sr-only">
                    {favorites.includes(index) ? 'Remove from favorites' : 'Add to favorites'}
                  </span>
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-gray-900 shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(image.url);
                  }}
                  aria-label={`Edit image ${index + 1}`}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-gray-900 shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(image.url, '_blank');
                  }}
                  aria-label={`View image ${index + 1} in full size`}
                >
                  <Maximize2 className="h-4 w-4" />
                  <span className="sr-only">View full size</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-white">
            <p className="text-xs text-gray-500 truncate">
              Generated image {index + 1}
            </p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-400">Ready for download</span>
              {favorites.includes(index) && (
                <Heart className="h-3 w-3 text-red-500 fill-current" aria-label="Favorited" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
