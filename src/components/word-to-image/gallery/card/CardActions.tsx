
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
    <div className="absolute inset-0 flex items-end justify-between p-4">
      <div className="flex gap-2">
        <ActionButton
          icon={Download}
          label="Save"
          tooltipText="Download image"
          onClick={() => window.open(displayUrl, '_blank')}
        />
        
        <ActionButton
          icon={Edit}
          label="Edit"
          tooltipText="Edit this image"
          onClick={() => onEdit(displayUrl)}
        />
      </div>
      
      <div className="flex gap-2">
        <ActionButton
          icon={Share2}
          label="Share"
          tooltipText="Share image"
          rounded={true}
        />
        
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
