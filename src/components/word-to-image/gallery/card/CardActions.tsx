
import React from 'react';
import { Download, Edit, Heart, Share2 } from 'lucide-react';
import { ActionButton } from './ActionButton';

interface CardActionsProps {
  imageUrl: string;
  index: number;
  favorites: number[];
  onEdit: (url: string) => void;
  toggleFavorite: (index: number) => void;
  useFallback: boolean;
  fallbackImage: string;
}

export function CardActions({ 
  imageUrl, 
  index, 
  favorites, 
  onEdit, 
  toggleFavorite,
  useFallback,
  fallbackImage
}: CardActionsProps) {
  const isFavorite = favorites.includes(index);
  const displayUrl = useFallback ? fallbackImage : imageUrl;
  
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 bg-gradient-to-t from-black/70 to-transparent">
      <div className="flex gap-2">
        <ActionButton
          icon={Download}
          label="Save"
          tooltipText="Download image"
          onClick={() => window.open(displayUrl, '_blank')}
          variant="default"
        />
        
        <ActionButton
          icon={Edit}
          label="Edit"
          tooltipText="Edit this image"
          onClick={() => onEdit(displayUrl)}
          variant="default"
        />
      </div>
      
      <div className="flex gap-2">
        <ActionButton
          icon={Heart}
          label="Favorite"
          tooltipText={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          onClick={() => toggleFavorite(index)}
          rounded={true}
          active={isFavorite}
        />
      </div>
    </div>
  );
}
