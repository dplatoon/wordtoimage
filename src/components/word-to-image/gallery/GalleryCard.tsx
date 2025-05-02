
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ImageDisplay } from './card/ImageDisplay';
import { CardOverlay } from './card/CardOverlay';

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
  
  const fallbackImage = "https://images.unsplash.com/photo-1686002359940-6a51b0d8184b?auto=format&fit=crop&w=400&q=75";
  
  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => {
    setImageError(true);
    setUseFallback(true);
  };
  
  return (
    <Card 
      className="relative group rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setHoveredImage(index)}
      onMouseLeave={() => setHoveredImage(null)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <ImageDisplay 
            imageUrl={imageUrl}
            index={index}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {/* Only show overlays and actions if the image loaded successfully */}
          {(!imageError && imageLoaded) && (
            <>
              <div className={`absolute inset-0 transition-all duration-300 ${
                isHovered ? 'scale-105 brightness-90' : ''
              }`}></div>
              
              <CardOverlay 
                isVisible={isHovered}
                imageUrl={imageUrl}
                index={index}
                favorites={favorites}
                onEdit={onEdit}
                toggleFavorite={toggleFavorite}
                useFallback={useFallback}
                fallbackImage={fallbackImage}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
