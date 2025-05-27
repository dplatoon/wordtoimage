import React, { useState } from 'react';
import { GalleryHeader } from './gallery/GalleryHeader';
import { GalleryGrid } from './gallery/GalleryGrid';
import { GallerySkeleton } from './gallery/GallerySkeleton';
import { EmptyState } from './gallery/EmptyState';
import { motion, AnimatePresence } from 'framer-motion';

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        role="status"
        aria-label="Generating images"
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
      role="region"
      aria-label="Generated images gallery"
    >
      <GalleryHeader imageCount={images.length} />
      <AnimatePresence mode="wait">
        <motion.div
          key={images.length}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
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
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
