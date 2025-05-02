
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Edit, Heart, Share2 } from 'lucide-react';
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
  
  return (
    <Card 
      className="relative group rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setHoveredImage(index)}
      onMouseLeave={() => setHoveredImage(null)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={imageUrl}
            loading="lazy"
            alt={`Generated ${index}`}
            className={`w-full h-48 object-cover transition-all duration-500 ${
              isHovered ? 'scale-105 brightness-90' : ''
            }`}
            decoding="async"
          />
          
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
                      onClick={() => onEdit(imageUrl)} 
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
        </div>
      </CardContent>
    </Card>
  );
}
