
import React, { memo } from 'react';
import { trackEvent, events } from '@/utils/analytics';
import { GalleryHeader } from './gallery/GalleryHeader';
import { GalleryGrid } from './gallery/GalleryGrid';
import { useGallery } from './gallery/useGallery';

interface GalleryImage {
  url: string;
  prompt: string;
  style?: string;
  resolution?: string;
  timestamp?: number;
}

interface GenerationGalleryProps {
  images: GalleryImage[];
}

export const GenerationGallery = ({ images }: GenerationGalleryProps) => {
  const { favorites, handleDownload, handleShare, toggleFavorite } = useGallery(images);
  
  if (!images?.length) return null;
  
  // Track gallery view once we have images
  if (images.length > 0) {
    trackEvent(events.VIEW_GALLERY, { imageCount: images.length });
  }
  
  // Sort by timestamp (newest first) and limit to 8
  const galleryImages = [...images]
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    .slice(0, 8);
  
  return (
    <div className="mt-8 w-full">
      <GalleryHeader 
        title="Your Recent Creations" 
        imageCount={images.length}
      />
      <GalleryGrid 
        images={galleryImages}
        favorites={favorites}
        onDownload={handleDownload}
        onShare={handleShare}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

// Export as default as well for compatibility with existing imports
export default GenerationGallery;
