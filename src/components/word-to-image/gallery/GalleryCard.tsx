
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Edit, Heart, Share2, ImageOff } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface GalleryCardProps {
  imageUrl: string;
  index: number;
  favorites: number[];
  onEdit: (url: string) => void;
  toggleFavorite: (index: number) => void;
  hoveredImage: number | null;
  setHoveredImage: (index: number | null) => void;
}

export function GalleryCard({
  imageUrl,
  index,
  favorites,
  onEdit,
  toggleFavorite,
  hoveredImage,
  setHoveredImage,
}: GalleryCardProps) {
  const isHovered = hoveredImage === index;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const fallbackImage = "https://images.unsplash.com/photo-1686002359940-6a51b0d8184b?auto=format&fit=crop&w=400&q=75";
  
  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (!imageUrl || !imgRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          // Only set the src when the image is visible
          if (img.dataset.src) {
            img.src = useFallback ? fallbackImage : img.dataset.src;
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '100px', // Load when image is 100px from viewport
      threshold: 0.1
    });
    
    observer.observe(imgRef.current);
    
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [imageUrl, useFallback]);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    console.error('Failed to load gallery card image:', imageUrl);
    if (!useFallback) {
      setUseFallback(true);
      if (imgRef.current) {
        imgRef.current.src = fallbackImage;
      }
    } else {
      setImageError(true);
      setImageLoaded(false);
    }
  };
  
  return (
    <Card 
      className="relative group rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setHoveredImage(index)}
      onMouseLeave={() => setHoveredImage(null)}
    >
      <CardContent className="p-0">
        <div className="relative">
          {imageError ? (
            <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center p-4">
              <ImageOff className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-sm text-gray-400">Image unavailable</p>
            </div>
          ) : (
            <>
              <div className="w-full h-48 bg-gray-50"></div> {/* Placeholder */}
              <img
                ref={imgRef}
                data-src={imageUrl}
                loading="lazy"
                alt={`Generated ${index}`}
                className={`w-full h-48 object-cover transition-all duration-500 absolute top-0 left-0 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } ${isHovered ? 'scale-105 brightness-90' : ''}`}
                width="300"
                height="192"
                decoding="async" 
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          )}
          
          {/* Only show overlays and actions if the image loaded successfully */}
          {(!imageError && imageLoaded) && (
            <>
              {/* Gradient overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                  transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              ></div>
              
              {/* Actions overlay */}
              <div 
                className={`absolute inset-0 flex items-end justify-between p-4 transition-opacity duration-300 
                  ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="bg-white/90 hover:bg-white text-gray-800 shadow-md transition-all duration-300 hover:scale-105"
                          onClick={() => window.open(useFallback ? fallbackImage : imageUrl, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Save</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="sm" 
                          onClick={() => onEdit(useFallback ? fallbackImage : imageUrl)} 
                          className="bg-white/90 hover:bg-white text-gray-800 shadow-md transition-all duration-300 hover:scale-105"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit this image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="rounded-full h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-800 shadow-md transition-all duration-300 hover:scale-110"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className={`rounded-full h-8 w-8 p-0 ${
                            favorites.includes(index)
                              ? 'bg-red-100 text-red-500'
                              : 'bg-white/90 hover:bg-white text-gray-800'
                          } shadow-md transition-all duration-300 hover:scale-110`}
                          onClick={() => toggleFavorite(index)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${favorites.includes(index) ? 'fill-red-500' : ''}`} 
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{favorites.includes(index) ? 'Remove from favorites' : 'Save to favorites'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
