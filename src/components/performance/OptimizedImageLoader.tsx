
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImageLoader = ({
  src,
  alt,
  className,
  priority = false,
  quality = 75,
  width,
  height,
  onLoad,
  onError
}: OptimizedImageLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState(src);

  useEffect(() => {
    // Try to use WebP format if supported
    const canvas = document.createElement('canvas');
    const supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
    if (supportsWebP && src.includes('lovable-uploads')) {
      // For uploaded images, we can try WebP format
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      setOptimizedSrc(webpSrc);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    // Fallback to original src if WebP fails
    if (optimizedSrc !== src) {
      setOptimizedSrc(src);
      return;
    }
    
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gray-100 text-gray-500",
        className
      )}>
        <span className="text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          contentVisibility: priority ? 'visible' : 'auto',
          containIntrinsicSize: width && height ? `${width}px ${height}px` : 'auto'
        }}
      />
    </div>
  );
};
