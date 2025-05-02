
import React, { useState, useRef, useEffect } from 'react';
import { useImageWithFallback } from '@/hooks/useImageWithFallback';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
  errorComponent?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  trackEvent?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  fallbackSrc,
  className = '',
  width,
  height,
  objectFit = 'cover',
  onLoad,
  onError,
  errorComponent,
  loadingComponent,
  trackEvent,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);

  const {
    imageSrc,
    isLoading,
    isError,
    handleLoad,
    handleError,
  } = useImageWithFallback({
    src,
    fallbackSrc,
    onLoadSuccess: onLoad,
    onLoadError: onError,
    trackSuccess: !!trackEvent,
    trackEvent,
    lazyLoad: true,
  });

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  // Default error component
  const DefaultErrorComponent = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-50">
      <ImageOff className="h-8 w-8 text-gray-300 mb-2" />
      <p className="text-xs text-gray-400 text-center">Image unavailable</p>
    </div>
  );

  // Default loading component
  const DefaultLoadingComponent = () => (
    <Skeleton className="w-full h-full animate-pulse" />
  );

  if (isError) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ width, height }}
      >
        {errorComponent || <DefaultErrorComponent />}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (loadingComponent || <DefaultLoadingComponent />)}
      
      {isInView && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className={`${
            isLoading ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300 w-full h-full`}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};
