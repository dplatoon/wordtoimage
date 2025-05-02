
import React, { useState } from 'react';
import { GalleryHeader } from './gallery/GalleryHeader';
import { GalleryGrid } from './gallery/GalleryGrid';
import { GallerySkeleton } from './gallery/GallerySkeleton';
import { EmptyState } from './gallery/EmptyState';

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

  const handleGenerateClick = () => {
    const generateButton = document.querySelector('button:has(.h-5.w-5[aria-hidden="true"])');
    if (generateButton && generateButton instanceof HTMLButtonElement) {
      generateButton.click();
    }
  };
  
  if (loading) {
    return <GallerySkeleton />;
  }

  if (!images || images.length === 0) {
    return <EmptyState onGenerateClick={handleGenerateClick} />;
  }

  return (
    <div>
      <GalleryHeader imageCount={images.length} />
      <GalleryGrid
        images={images}
        favorites={favorites}
        hoveredImage={hoveredImage}
        setHoveredImage={setHoveredImage}
        toggleFavorite={toggleFavorite}
        onEdit={onEdit}
      />
    </div>
  );
}
