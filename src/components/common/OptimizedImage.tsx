import React, { useState, useRef, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 80,
  onLoad,
  onError,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}) => {
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
      { 
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate optimized sources for different formats
  const generateSources = () => {
    if (!src) return { webp: src, avif: src, fallback: src };
    
    // For external URLs, try to add optimization parameters
    try {
      const url = new URL(src);
      if (url.hostname.includes('unsplash') || url.hostname.includes('images')) {
        url.searchParams.set('auto', 'format');
        url.searchParams.set('q', quality.toString());
        url.searchParams.set('w', typeof width === 'number' ? width.toString() : '800');
        
        const baseUrl = url.toString();
        return {
          avif: baseUrl + '&fm=avif',
          webp: baseUrl + '&fm=webp',
          fallback: baseUrl
        };
      }
    } catch {
      // If URL parsing fails, return original
    }
    
    return { webp: src, avif: src, fallback: src };
  };

  const sources = generateSources();

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

  // Calculate aspect ratio style to prevent CLS
  const aspectRatioStyle = width && height 
    ? { aspectRatio: `${width} / ${height}` } 
    : undefined;

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, ...aspectRatioStyle }}
    >
      {isLoading && !hasError && (
        <div className="absolute inset-0 w-full h-full bg-muted animate-pulse" />
      )}
      
      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-muted text-muted-foreground">
          <ImageOff className="h-8 w-8 mb-2" />
          <p className="text-xs text-center">Image unavailable</p>
        </div>
      ) : isInView ? (
        <picture>
          <source 
            srcSet={sources.avif} 
            type="image/avif" 
            sizes={sizes}
          />
          <source 
            srcSet={sources.webp} 
            type="image/webp" 
            sizes={sizes}
          />
          <img
            ref={imgRef}
            src={sources.fallback}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            width={typeof width === 'number' ? width : undefined}
            height={typeof height === 'number' ? height : undefined}
            sizes={sizes}
          />
        </picture>
      ) : (
        <div className="w-full h-full bg-muted" style={aspectRatioStyle} />
      )}
    </div>
  );
};
