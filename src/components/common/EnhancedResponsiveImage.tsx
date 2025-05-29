
import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

interface EnhancedResponsiveImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  aspectRatio?: string;
  sizes?: string;
}

export const EnhancedResponsiveImage: React.FC<EnhancedResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  onLoad,
  onError,
  aspectRatio = '16/9',
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
        rootMargin: priority ? '0px' : '100px',
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate responsive sources
  const generateResponsiveSources = (baseSrc: string) => {
    if (!baseSrc || baseSrc.startsWith('http') || baseSrc.startsWith('data:') || baseSrc.startsWith('blob:')) {
      return {
        webp: baseSrc,
        avif: baseSrc,
        fallback: baseSrc
      };
    }

    const extension = baseSrc.split('.').pop()?.toLowerCase();
    if (extension === 'svg') {
      return {
        webp: baseSrc,
        avif: baseSrc,
        fallback: baseSrc
      };
    }

    const basePath = baseSrc.replace(/\.[^/.]+$/, '');
    return {
      avif: `${basePath}.avif`,
      webp: `${basePath}.webp`,
      fallback: baseSrc
    };
  };

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

  const responsiveSources = generateResponsiveSources(src);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height 
      }}
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
            sizes={sizes} 
          />
          {/* WebP fallback */}
          <source 
            srcSet={responsiveSources.webp} 
            type="image/webp" 
            sizes={sizes} 
          />
          {/* Original format fallback */}
          <img
            ref={imgRef}
            src={responsiveSources.fallback}
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
            sizes={sizes}
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
