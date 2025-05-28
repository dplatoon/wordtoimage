
import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';
import { PerformanceOptimizer } from '@/utils/performanceOptimizer';

interface OptimizedResponsiveImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  aspectRatio?: number;
  sizes?: string;
}

export const OptimizedResponsiveImage: React.FC<OptimizedResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  onLoad,
  onError,
  aspectRatio,
  sizes,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const optimizer = PerformanceOptimizer.getInstance();

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
      { 
        rootMargin: priority ? '0px' : '100px',
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate optimized sources
  const responsiveSources = optimizer.generateResponsiveSources(src);
  const optimizedSrc = optimizer.optimizeImageSrc(src, 
    typeof width === 'number' ? width : 800, 
    quality
  );

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
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-400">
          <ImageOff className="h-8 w-8 mb-2" aria-hidden="true" />
          <p className="text-xs text-center">Image unavailable</p>
          <span className="sr-only">{alt}</span>
        </div>
      ) : isInView ? (
        <picture>
          {/* AVIF for maximum compression */}
          <source 
            srcSet={responsiveSources.avif} 
            type="image/avif" 
            sizes={sizes || responsiveSources.sizes} 
          />
          {/* WebP fallback */}
          <source 
            srcSet={responsiveSources.webp} 
            type="image/webp" 
            sizes={sizes || responsiveSources.sizes} 
          />
          {/* Original format fallback */}
          <img
            ref={imgRef}
            src={optimizedSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            width={width}
            height={height}
            sizes={sizes || responsiveSources.sizes}
            // Prevent layout shift by setting dimensions
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </picture>
      ) : (
        <div className="w-full h-full bg-gray-100" aria-label="Loading..." />
      )}
    </div>
  );
};
