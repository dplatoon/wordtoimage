
import React from 'react';
import { CardActions } from './CardActions';

interface CardOverlayProps {
  isVisible: boolean;
  imageUrl: string;
  index: number;
  favorites: number[];
  onEdit: (url: string) => void;
  toggleFavorite: (index: number) => void;
  useFallback: boolean;
  fallbackImage: string;
}

export function CardOverlay({
  isVisible,
  imageUrl,
  index,
  favorites,
  onEdit,
  toggleFavorite,
  useFallback,
  fallbackImage
}: CardOverlayProps) {
  if (!isVisible) return null;
  
  return (
    <>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 opacity-100"></div>
      
      {/* Actions overlay */}
      <CardActions
        imageUrl={imageUrl}
        index={index}
        favorites={favorites}
        onEdit={onEdit}
        toggleFavorite={toggleFavorite}
        useFallback={useFallback}
        fallbackImage={fallbackImage}
      />
    </>
  );
}
