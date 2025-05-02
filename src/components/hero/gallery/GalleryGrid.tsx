
import React from 'react';
import { GalleryImage } from './GalleryImage';
import { ImageErrorPlaceholder } from './ImageErrorPlaceholder';

interface GalleryImage {
  url: string;
  prompt?: string;
  style?: string;
  resolution?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  favorites: string[];
  onDownload: (imageUrl: string) => void;
  onShare: (imageUrl: string) => void;
  toggleFavorite: (imageUrl: string) => void;
}

export const GalleryGrid = ({
  images,
  favorites,
  onDownload,
  onShare,
  toggleFavorite
}: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {images.map((image, index) => (
        <div key={`${image.url}-${index}`} className="aspect-square rounded-lg overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center bg-gray-50">
          <GalleryImage
            url={image.url}
            prompt={image.prompt || ''}
            favorite={favorites.includes(image.url)}
            onDownload={() => onDownload(image.url)}
            onShare={() => onShare(image.url)}
            onFavoriteToggle={() => toggleFavorite(image.url)}
            fallback={<ImageErrorPlaceholder />}
          />
        </div>
      ))}
    </div>
  );
};
