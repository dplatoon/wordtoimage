
import React, { useState } from 'react';
import { GalleryHeader } from './gallery/GalleryHeader';
import { GalleryGrid } from './gallery/GalleryGrid';
import { GallerySkeleton } from './gallery/GallerySkeleton';
import { EmptyState } from './gallery/EmptyState';
import { motion } from 'framer-motion';

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
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.focus();
        textarea.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GallerySkeleton />
      </motion.div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <EmptyState onGenerateClick={handleGenerateClick} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GalleryHeader imageCount={images.length} />
      <GalleryGrid
        images={images}
        favorites={favorites}
        hoveredImage={hoveredImage}
        setHoveredImage={setHoveredImage}
        toggleFavorite={toggleFavorite}
        onEdit={onEdit}
      />
    </motion.div>
  );
}
