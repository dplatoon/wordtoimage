
import { useState } from 'react';
import { ImageSkeleton } from './ImageSkeleton';
import { ImageErrorPlaceholder } from './ImageErrorPlaceholder';
import { ImageOverlay } from './ImageOverlay';
import { ImageActions } from './ImageActions';

interface GalleryImageProps {
  image: {
    url: string;
    prompt: string;
    style?: string;
    resolution?: string;
  };
  index: number;
  onDownload: (image: any, index: number) => void;
  onShare: (image: any, index: number) => void;
  onFavoriteToggle: (index: number) => void;
  isFavorite: boolean;
}

export const GalleryImage = ({ 
  image, 
  index, 
  onDownload, 
  onShare, 
  onFavoriteToggle, 
  isFavorite 
}: GalleryImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    console.error(`Failed to load image: ${image.url}`);
  };
  
  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-md bg-white transition-all hover:shadow-lg"
      style={{ borderRadius: 8 }}
    >
      {/* Show skeleton while loading */}
      {!isLoaded && !hasError && <ImageSkeleton />}
      
      {/* Show error placeholder if image fails to load */}
      {hasError && <ImageErrorPlaceholder />}
      
      {/* Actual image with onLoad and onError handlers */}
      <img
        src={image.url}
        alt={image.prompt || "Generated image"}
        className={`w-full h-48 object-cover transition-transform group-hover:scale-105 ${isLoaded ? 'block' : 'hidden'}`}
        width="256" 
        height="192"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        style={{ contentVisibility: 'auto' }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Image details overlay */}
      {isLoaded && (
        <ImageOverlay prompt={image.prompt} style={image.style} />
      )}
      
      {/* Action buttons */}
      {isLoaded && (
        <ImageActions
          onDownload={() => onDownload(image, index)}
          onShare={() => onShare(image, index)}
          onFavoriteToggle={() => onFavoriteToggle(index)}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
};
