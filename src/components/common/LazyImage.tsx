
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

  // Generate WebP and AVIF sources for modern browsers - with fallback optimization
  const generateOptimizedSources = (baseSrc: string) => {
    if (baseSrc.startsWith('http') || baseSrc.startsWith('data:')) {
      return { webp: baseSrc, avif: baseSrc, fallback: baseSrc };
    }
    
    const extension = baseSrc.split('.').pop()?.toLowerCase();
    if (extension === 'svg') {
      return { webp: baseSrc, avif: baseSrc, fallback: baseSrc };
    }
    
    // Only generate optimized formats for local images if they likely exist
    const basePath = baseSrc.replace(/\.[^/.]+$/, '');
    
    // For better performance, skip WebP/AVIF checks and use original
    // This prevents 404 requests that slow down loading
    console.log('WebP not available, keeping original');
    return {
      avif: baseSrc, // Use original as fallback
      webp: baseSrc, // Use original as fallback  
      fallback: baseSrc,
    };
  };

  const { avif, webp, fallback } = generateOptimizedSources(src);

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
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-brand-slate-100 text-brand-slate-400">
          <ImageOff className="h-8 w-8 mb-2" aria-hidden="true" />
          <p className="text-xs text-center">Image unavailable</p>
          <span className="sr-only">{alt}</span>
        </div>
      ) : isInView ? (
        <picture>
          <source srcSet={avif} type="image/avif" sizes={sizes} />
          <source srcSet={webp} type="image/webp" sizes={sizes} />
          <img
            ref={imgRef}
            src={fallback}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
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
        </picture>
      ) : (
        <div className="w-full h-full bg-brand-slate-100" aria-label="Loading..." />
      )}
    </div>
  );
};
