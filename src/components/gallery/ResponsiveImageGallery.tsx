
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Image {
  id: string;
  url: string;
  title: string;
  description?: string;
}

interface ResponsiveImageGalleryProps {
  images: Image[];
  className?: string;
}

export const ResponsiveImageGallery = ({ images, className }: ResponsiveImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFavorite = (imageId: string) => {
    setFavorites(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  if (!images.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No images to display
      </div>
    );
  }

  return (
    <div className={cn("relative w-full animate-fade-in", className)}>
      {/* Main image display */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
        />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorite(images[currentIndex].id)}
            className="bg-white/80 hover:bg-white"
          >
            <Heart className={cn(
              "h-4 w-4",
              favorites.includes(images[currentIndex].id) && "fill-red-500 text-red-500"
            )} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/80 hover:bg-white"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image info */}
      <div className="mt-4 animate-fade-in">
        <h3 className="text-lg font-semibold">{images[currentIndex].title}</h3>
        {images[currentIndex].description && (
          <p className="text-gray-600 text-sm mt-1">{images[currentIndex].description}</p>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all duration-200",
                index === currentIndex 
                  ? "border-blue-500 scale-110" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
