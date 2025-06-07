
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
    const generateButton = document.querySelector('button[type="submit"]');
    if (generateButton && generateButton instanceof HTMLButtonElement) {
      const textarea = document.querySelector('textarea[aria-label="Image description"]') as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
        textarea.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  if (loading) {
    return (
      <div
        className="animate-fade-in"
        role="status"
        aria-label="Generating images"
      >
        <GallerySkeleton />
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="animate-fade-in">
        <EmptyState onGenerateClick={handleGenerateClick} />
      </div>
    );
  }

  return (
    <div
      className="animate-fade-in"
      role="region"
      aria-label="Generated images gallery"
    >
      <GalleryHeader imageCount={images.length} />
      <div className="animate-fade-in">
        <GalleryGrid
          images={images.map((img, index) => ({
            ...img,
            // Add descriptive alt text using index for uniqueness
            alt: `AI generated image ${index + 1}`
          }))}
          favorites={favorites}
          hoveredImage={hoveredImage}
          setHoveredImage={setHoveredImage}
          toggleFavorite={toggleFavorite}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}
