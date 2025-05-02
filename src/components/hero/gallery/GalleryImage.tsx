
import React, { useState, useRef, useEffect } from 'react';
import { ImageActions } from './ImageActions';
import { ImageOverlay } from './ImageOverlay';

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
  fallback
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

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
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div 
      className="relative w-full h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageError && fallback ? (
        <div className="w-full h-full">{fallback}</div>
      ) : (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
          )}
          
          <img
            ref={imgRef}
            src=""
            data-src={url}
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
