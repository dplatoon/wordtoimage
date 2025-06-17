
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
  trackEvent?: string;
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  onLoad,
  onError,
  trackEvent,
  priority = false,
  sizes,
  srcSet,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();

    // Track image load for analytics
    if (trackEvent && window.gtag) {
      window.gtag('event', trackEvent + '_loaded', {
        event_category: 'interaction',
        custom_parameters: {
          src: src,
          isExternal: !src.startsWith('/') && !src.startsWith(window.location.origin)
        }
      });
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();

    console.error('Failed to load image:', src);
  };

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-0',
        hasError && 'hidden',
        className
      )}
      width={width}
      height={height}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(sizes && { sizes })}
      {...(srcSet && { srcSet })}
    />
  );
};
