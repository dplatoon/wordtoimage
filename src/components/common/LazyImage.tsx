
import { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  aspectRatio?: number;
}

export const LazyImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError,
  aspectRatio,
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const containerStyle = aspectRatio 
    ? { aspectRatio: aspectRatio.toString() }
    : { width, height };

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
      role="img"
      aria-label={alt}
    >
      {isLoading && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-muted text-muted-foreground">
          <ImageOff className="h-8 w-8 mb-2" aria-hidden="true" />
          <p className="text-xs text-center">Image unavailable</p>
          <span className="sr-only">{alt}</span>
        </div>
      ) : isInView ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoading ? 'opacity-0 blur-md scale-105' : 'opacity-100 blur-0 scale-100'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority && { fetchPriority: 'high' })}
          onLoad={handleLoad}
          onError={handleError}
          width={width}
          height={height}
          sizes={sizes}
        />
      ) : (
        <div className="w-full h-full bg-muted" aria-label="Loading..." />
      )}
    </div>
  );
};
