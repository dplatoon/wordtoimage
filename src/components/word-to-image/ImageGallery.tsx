
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Edit, Heart, Share2, Info, ImagePlus, ArrowRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Image {
  url: string;
}

interface ImageGalleryProps {
  images: Image[];
  onEdit: (url: string) => void;
  loading?: boolean;
}

export function ImageGallery({ images, onEdit, loading }: ImageGalleryProps) {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (index: number) => {
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, idx) => (
          <Card key={idx} className="overflow-hidden rounded-xl shadow-md">
            <CardContent className="p-0">
              <div className="relative h-48 w-full bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              </div>
              <div className="p-3 flex justify-center gap-2">
                <Skeleton className="h-8 w-14" />
                <Skeleton className="h-8 w-14" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-dashed border-gray-200 transition-all duration-300 hover:shadow-md">
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mb-4 transition-transform duration-500 hover:scale-110 hover:rotate-3">
          <ImagePlus className="h-8 w-8 text-indigo-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No images generated yet</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Enter a prompt above and click Generate to create your first AI-powered image.
        </p>
        <Button 
          variant="outline" 
          onClick={() => {
            const generateButton = document.querySelector('button:has(.h-5.w-5[aria-hidden="true"])');
            if (generateButton && generateButton instanceof HTMLButtonElement) {
              generateButton.click();
            }
          }}
          className="bg-white group transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white border-gray-200 hover:border-transparent"
        >
          Try it now
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-medium mb-4 text-gray-800 flex items-center">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Generated Images</span>
        <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
          {images.length} {images.length === 1 ? 'image' : 'images'}
        </span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img, idx) => (
          <Card 
            key={idx} 
            className="relative group rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            onMouseEnter={() => setHoveredImage(idx)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={img.url}
                  loading="lazy"
                  alt={`Generated ${idx}`}
                  className={`w-full h-48 object-cover transition-all duration-500 ${
                    hoveredImage === idx ? 'scale-105 brightness-90' : ''
                  }`}
                  decoding="async"
                />
                
                {/* Gradient overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                    transition-opacity duration-300 ${hoveredImage === idx ? 'opacity-100' : 'opacity-0'}`}
                ></div>
                
                {/* Actions overlay */}
                <div 
                  className={`absolute inset-0 flex items-end justify-between p-4 transition-opacity duration-300 
                    ${hoveredImage === idx ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="bg-white/90 hover:bg-white text-gray-800 shadow-md transition-all duration-300 hover:scale-105"
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
                            onClick={() => onEdit(img.url)} 
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
                              favorites.includes(idx)
                                ? 'bg-red-100 text-red-500'
                                : 'bg-white/90 hover:bg-white text-gray-800'
                            } shadow-md transition-all duration-300 hover:scale-110`}
                            onClick={() => toggleFavorite(idx)}
                          >
                            <Heart 
                              className={`h-4 w-4 ${favorites.includes(idx) ? 'fill-red-500' : ''}`} 
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{favorites.includes(idx) ? 'Remove from favorites' : 'Save to favorites'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
