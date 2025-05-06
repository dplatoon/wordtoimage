
import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

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
  trackEvent?: string;
  priority?: boolean;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  fallbackSrc = "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=300&h=300&q=80",
  className = '',
  width,
  height,
  objectFit = 'cover',
  onLoad,
  onError,
  trackEvent: trackEventName,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(priority ? src : null);
  const [usedFallback, setUsedFallback] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // Use intersection observer for better lazy loading
  useEffect(() => {
    if (!priority && imgRef.current && !imageSrc) {
      observer.current = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.current?.disconnect();
        }
      }, {
        rootMargin: '200px', // Load when image is 200px from viewport
        threshold: 0.01
      });
      
      observer.current.observe(imgRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [src, imageSrc, priority]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    
    if (onLoad) onLoad();
    
    // Track successful image load if tracking is enabled
    if (trackEventName) {
      trackEvent(trackEventName + '_loaded', { src: imageSrc });
    }
  };

  const handleError = () => {
    console.error('Image failed to load:', imageSrc);
    
    if (!usedFallback && fallbackSrc) {
      // Try loading the fallback image
      setImageSrc(fallbackSrc);
      setUsedFallback(true);
    } else {
      // If fallback also fails or no fallback provided
      setIsLoading(false);
      setHasError(true);
      if (onError) onError();
      
      // Track error if tracking is enabled
      if (trackEventName) {
        trackEvent(trackEventName + '_error', { src: imageSrc });
      }
    }
  };

  // Generate srcset for responsive images if width is provided
  const getSrcSet = () => {
    if (!imageSrc) return undefined;
    
    // Only generate srcset for URLs that support sizing parameters
    if (imageSrc.includes('unsplash.com')) {
      return `${imageSrc}&w=300 300w, ${imageSrc}&w=600 600w, ${imageSrc}&w=900 900w`;
    }
    
    return undefined;
  };

  // Generate sizes attribute for responsive images
  const getSizes = () => {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-100">
          <ImageOff className="h-8 w-8 text-gray-300 mb-2" />
          <p className="text-xs text-gray-400 text-center">Image unavailable</p>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={imageSrc || ''}
          srcSet={getSrcSet()}
          sizes={getSizes()}
          alt={alt}
          className={`w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          fetchPriority={priority ? "high" : "auto"}
        />
      )}
    </div>
  );
};
