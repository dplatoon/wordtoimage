
import { useState } from 'react';
import { Download, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

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

  const imageKey = `${image.url}_${index}`;
  
  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-md bg-white transition-all hover:shadow-lg"
      style={{ borderRadius: 8 }}
    >
      {/* Show skeleton while loading */}
      {!isLoaded && !hasError && (
        <div className="w-full h-48 bg-gray-100 animate-pulse flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      
      {/* Show error placeholder if image fails to load */}
      {hasError && (
        <div className="w-full h-48 bg-gray-50 flex flex-col items-center justify-center p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16" />
          </svg>
          <p className="text-xs text-gray-500">Image unavailable</p>
        </div>
      )}
      
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white text-sm font-medium line-clamp-2 mb-2">{image.prompt}</p>
          {image.style && (
            <span className="inline-block px-2 py-1 bg-white/20 text-white text-xs rounded mb-2">{image.style}</span>
          )}
        </div>
      )}
      
      {/* Action buttons */}
      {isLoaded && (
        <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow"
            onClick={() => onDownload(image, index)}
            title="Download"
          >
            <Download className="h-4 w-4 text-gray-700" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow"
            onClick={() => onShare(image, index)}
            title="Share"
          >
            <Share2 className="h-4 w-4 text-gray-700" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className={`h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow ${
              isFavorite ? 'text-red-500' : 'text-gray-700'
            }`}
            onClick={() => onFavoriteToggle(index)}
            title="Favorite"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
          </Button>
        </div>
      )}
    </div>
  );
};
