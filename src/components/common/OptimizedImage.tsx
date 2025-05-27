
import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip lazy loading for priority images

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate WebP and fallback sources
  const generateSources = (baseSrc: string) => {
    if (baseSrc.startsWith('http') || baseSrc.startsWith('data:')) {
      return { webp: baseSrc, fallback: baseSrc };
    }
    
    const extension = baseSrc.split('.').pop()?.toLowerCase();
    if (extension === 'svg') {
      return { webp: baseSrc, fallback: baseSrc };
    }
    
    const basePath = baseSrc.replace(/\.[^/.]+$/, '');
    return {
      webp: `${basePath}.webp`,
      fallback: baseSrc,
    };
  };

  const { webp, fallback } = generateSources(src);

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

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width, height }}>
      {isLoading && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-100">
          <ImageOff className="h-8 w-8 text-gray-300 mb-2" />
          <p className="text-xs text-gray-400 text-center">Image unavailable</p>
        </div>
      ) : isInView ? (
        <picture>
          <source srcSet={webp} type="image/webp" sizes={sizes} />
          <img
            ref={imgRef}
            src={fallback}
            alt={alt}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            width={width}
            height={height}
          />
        </picture>
      ) : (
        <div className="w-full h-full bg-gray-100" />
      )}
    </div>
  );
};
