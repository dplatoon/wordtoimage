
import React from 'react';
import { GalleryCard } from './GalleryCard';

interface GalleryGridProps {
  images: Array<{ url: string }>;
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
  onEdit,
}: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {images.map((img, idx) => (
        <GalleryCard
          key={`${img.url}_${idx}`}
          imageUrl={img.url}
          index={idx}
          favorites={favorites}
          onEdit={onEdit}
          toggleFavorite={toggleFavorite}
          hoveredImage={hoveredImage}
          setHoveredImage={setHoveredImage}
        />
      ))}
    </div>
  );
}
