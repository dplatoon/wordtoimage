
import React, { useState, useRef, useEffect } from 'react';
import { ImageActions } from './ImageActions';
import { ImageOverlay } from './ImageOverlay';
import { ImageErrorPlaceholder } from './ImageErrorPlaceholder';

interface GalleryImageProps {
  url: string;
  prompt: string;
  favorite: boolean;
  onDownload: () => void;
  onShare: () => void;
  onFavoriteToggle: () => void;
}

export const GalleryImage: React.FC<GalleryImageProps> = ({
  url,
  prompt,
  favorite,
  onDownload,
  onShare,
  onFavoriteToggle
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const fallbackImage = "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?auto=format&fit=crop&w=300&h=300&q=80";

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
  }, [url]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error('Failed to load gallery image:', url);
    if (!useFallback) {
      setUseFallback(true);
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
        <ImageErrorPlaceholder />
      ) : (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
          )}
          
          <img
            ref={imgRef}
            src=""
            data-src={useFallback ? fallbackImage : url}
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
