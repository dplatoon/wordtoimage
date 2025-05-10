
import React, { useState, useRef, useEffect } from 'react';
import { ImageActions } from './ImageActions';
import { ImageOverlay } from './ImageOverlay';
import { ImageErrorPlaceholder } from './ImageErrorPlaceholder';
import { trackEvent, events } from '@/utils/analytics';
import { defaultFallbackImage } from '@/utils/imageUtils';

interface GalleryImageProps {
  url: string;
  prompt: string;
  favorite: boolean;
  onDownload: () => void;
  onShare: () => void;
  onFavoriteToggle: () => void;
  fallback?: React.ReactNode;
}

export const GalleryImage: React.FC<GalleryImageProps> = ({
  url,
  prompt,
  favorite,
  onDownload,
  onShare,
  onFavoriteToggle,
  fallback = <ImageErrorPlaceholder />
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Extract a unique ID from the URL to prevent browser caching
  const uniqueUrl = url.includes('?') ? url : `${url}?random=${Math.random()}`;

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (!url || !imgRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          // Only set the src when the image is visible
          if (img.dataset.src) {
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '200px', // Load when image is 200px from viewport
      threshold: 0.01
    });

    observer.observe(imgRef.current);
    
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [uniqueUrl]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    trackEvent(events.IMAGE_LOADED, { location: 'gallery' });
  };

  const handleImageError = () => {
    console.error('Failed to load gallery image:', uniqueUrl);
    if (!useFallback) {
      setUseFallback(true);
      if (imgRef.current) {
        imgRef.current.src = defaultFallbackImage;
      }
    } else {
      setImageError(true);
      setImageLoaded(false);
    }
  };

  return (
    <div 
      className="relative w-full h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageError ? (
        // Use provided fallback or default
        React.isValidElement(fallback) ? fallback : <ImageErrorPlaceholder />
      ) : (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
          )}
          
          <img
            ref={imgRef}
            src=""
            data-src={useFallback ? defaultFallbackImage : uniqueUrl}
            alt={prompt || 'Generated image'}
            className={`w-full h-full object-cover transition duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            decoding="async"
            width="300"
            height="300"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {imageLoaded && (
            <>
              <ImageOverlay isVisible={isHovered} />
              <ImageActions
                isVisible={isHovered}
                favorite={favorite}
                onDownload={onDownload}
                onShare={onShare}
                onFavoriteToggle={onFavoriteToggle}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
