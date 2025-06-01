
import React, { useState, useRef, useEffect } from 'react';
import { useOptimizedLazyLoading } from '@/hooks/useOptimizedLazyLoading';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

interface OptimizedResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  sizes?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const OptimizedResponsiveImage: React.FC<OptimizedResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  aspectRatio = '16/9',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError,
  placeholder = 'blur',
  blurDataURL
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { optimizeImageSrc, preloadImage } = usePerformanceOptimization();
  const [containerRef, isIntersecting] = useOptimizedLazyLoading<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: priority ? '0px' : '100px',
    priority,
    triggerOnce: true
  });

  // Generate optimized image sources
  const generateSources = () => {
    if (!src) return { sources: [], fallbackSrc: '' };

    const fallbackSrc = optimizeImageSrc(src, 800, 85);
    
    // For production, you would generate different formats and sizes
    const sources = [
      {
        srcSet: `${optimizeImageSrc(src, 320)} 320w, ${optimizeImageSrc(src, 640)} 640w, ${optimizeImageSrc(src, 768)} 768w, ${optimizeImageSrc(src, 1024)} 1024w, ${optimizeImageSrc(src, 1280)} 1280w`,
        sizes,
        type: 'image/webp'
      },
      {
        srcSet: `${optimizeImageSrc(src, 320)} 320w, ${optimizeImageSrc(src, 640)} 640w, ${optimizeImageSrc(src, 768)} 768w, ${optimizeImageSrc(src, 1024)} 1024w, ${optimizeImageSrc(src, 1280)} 1280w`,
        sizes,
        type: 'image/jpeg'
      }
    ];

    return { sources, fallbackSrc };
  };

  const { sources, fallbackSrc } = generateSources();

  // Preload critical images
  useEffect(() => {
    if (priority && src) {
      preloadImage(src);
    }
  }, [priority, src, preloadImage]);

  // Load image when in viewport or if priority
  useEffect(() => {
    if ((isIntersecting || priority) && !currentSrc && !hasError) {
      setCurrentSrc(fallbackSrc);
    }
  }, [isIntersecting, priority, fallbackSrc, currentSrc, hasError]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    const error = new Error(`Failed to load image: ${src}`);
    onError?.(error);
    console.warn('Image failed to load:', src);
  };

  // Blur-up placeholder styles
  const placeholderStyle = placeholder === 'blur' ? {
    backgroundImage: blurDataURL ? `url(${blurDataURL})` : 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)',
    backgroundSize: blurDataURL ? 'cover' : '20px 20px',
    backgroundPosition: blurDataURL ? 'center' : '0 0, 10px 10px',
    filter: 'blur(10px)',
    transform: 'scale(1.1)'
  } : {};

  if (hasError) {
    return (
      <div 
        ref={containerRef}
        className={`${className} bg-gray-200 flex items-center justify-center text-gray-500 text-sm`}
        style={{ aspectRatio }}
        role="img"
        aria-label={`Failed to load: ${alt}`}
      >
        <span>Image failed to load</span>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 animate-pulse bg-gray-200"
          style={placeholderStyle}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {currentSrc && (
        <picture>
          {sources.map((source, index) => (
            <source
              key={index}
              srcSet={source.srcSet}
              sizes={source.sizes}
              type={source.type}
            />
          ))}
          <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              aspectRatio,
              imageRendering: 'auto',
              transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
              transition: 'transform 0.3s ease, opacity 0.3s ease'
            }}
          />
        </picture>
      )}

      {/* Loading indicator */}
      {!isLoaded && !hasError && currentSrc && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
          aria-label="Image loading"
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
