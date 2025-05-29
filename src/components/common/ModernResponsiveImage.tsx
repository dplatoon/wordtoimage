
import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

interface ModernResponsiveImageProps {
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
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export const ModernResponsiveImage: React.FC<ModernResponsiveImageProps> = ({
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
  objectFit = 'cover',
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
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate modern format sources
  const generateModernSources = (baseSrc: string) => {
    if (baseSrc.startsWith('http') || baseSrc.startsWith('data:') || baseSrc.includes('.svg')) {
      return { avif: baseSrc, webp: baseSrc, fallback: baseSrc };
    }
    
    const basePath = baseSrc.replace(/\.[^/.]+$/, '');
    const widths = [320, 640, 768, 1024, 1280, 1536];
    
    return {
      avif: widths.map(w => `${basePath}-${w}w.avif ${w}w`).join(', '),
      webp: widths.map(w => `${basePath}-${w}w.webp ${w}w`).join(', '),
      fallback: widths.map(w => `${basePath}-${w}w.jpg ${w}w`).join(', ')
    };
  };

  const { avif, webp, fallback } = generateModernSources(src);

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

  const containerStyle = {
    aspectRatio,
    width,
    height,
  };

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
            srcSet={avif} 
            type="image/avif" 
            sizes={sizes} 
          />
          {/* WebP fallback */}
          <source 
            srcSet={webp} 
            type="image/webp" 
            sizes={sizes} 
          />
          {/* Original format fallback */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ 
              objectFit,
              width: '100%',
              height: '100%'
            }}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            width={width}
            height={height}
            sizes={sizes}
            srcSet={fallback}
          />
        </picture>
      ) : (
        <div 
          className="w-full h-full bg-gray-100" 
          style={{ aspectRatio }}
          aria-label="Loading..."
        />
      )}
    </div>
  );
};
