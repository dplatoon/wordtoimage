
import { GalleryImage } from './GalleryImage';

interface GalleryImage {
  url: string;
  prompt: string;
  style?: string;
  resolution?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  favorites: Record<string, boolean>;
  onDownload: (image: GalleryImage, index: number) => void;
  onShare: (image: GalleryImage, index: number) => void;
  onFavoriteToggle: (index: number) => void;
}

export const GalleryGrid = ({ 
  images, 
  favorites, 
  onDownload, 
  onShare, 
  onFavoriteToggle 
}: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {images.map((img, i) => {
        const imageKey = `${img.url}_${i}`;
        return (
          <GalleryImage
            key={imageKey}
            image={img}
            index={i}
            onDownload={onDownload}
            onShare={onShare}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={!!favorites[imageKey]}
          />
        );
      })}
    </div>
  );
};
