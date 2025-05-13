
import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';
import { defaultFallbackImage, isExternalUrl } from '@/utils/imageUtils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
  trackEvent?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  fallbackSrc = defaultFallbackImage,
  className = '',
  width,
  height,
  aspectRatio,
  objectFit = 'cover',
  onLoad,
  onError,
  trackEvent: trackEventName,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [usedFallback, setUsedFallback] = useState(false);

  // Handle local vs external URLs differently
  const isExternal = isExternalUrl(src);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    
    if (onLoad) onLoad();
    
    // Track successful image load if tracking is enabled
    if (trackEventName) {
      trackEvent(trackEventName + '_loaded', { src: imageSrc, isExternal });
    }
  };

  const handleError = () => {
    console.error('Image failed to load:', imageSrc);
    
    if (!usedFallback && fallbackSrc) {
      // Try loading the fallback image
      setImageSrc(fallbackSrc);
      setUsedFallback(true);
    } else {
      // If fallback also fails or no fallback provided
      setIsLoading(false);
      setHasError(true);
      if (onError) onError();
      
      // Track error if tracking is enabled
      if (trackEventName) {
        trackEvent(trackEventName + '_error', { src: imageSrc, isExternal });
      }
    }
  };

  const ImageComponent = () => (
    <img
      src={imageSrc}
      alt={alt}
      className={`w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      style={{ objectFit }}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-100">
          <ImageOff className="h-8 w-8 text-gray-300 mb-2" />
          <p className="text-xs text-gray-400 text-center">Image unavailable</p>
        </div>
      ) : aspectRatio ? (
        <AspectRatio ratio={aspectRatio}>
          <ImageComponent />
        </AspectRatio>
      ) : (
        <ImageComponent />
      )}
    </div>
  );
};
