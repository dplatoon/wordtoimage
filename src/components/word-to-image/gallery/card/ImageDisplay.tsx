
import React, { useState, useRef, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageDisplayProps {
  imageUrl: string;
  index: number;
  onLoad: () => void;
  onError: () => void;
}

export function ImageDisplay({ imageUrl, index, onLoad, onError }: ImageDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const fallbackImage = "https://images.unsplash.com/photo-1686002359940-6a51b0d8184b?auto=format&fit=crop&w=400&q=75";
  
  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (!imageUrl || !imgRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          // Only set the src when the image is visible
          if (img.dataset.src) {
            img.src = useFallback ? fallbackImage : img.dataset.src;
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '100px', // Load when image is 100px from viewport
      threshold: 0.1
    });
    
    observer.observe(imgRef.current);
    
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [imageUrl, useFallback]);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad();
  };
  
  const handleImageError = () => {
    console.error('Failed to load gallery card image:', imageUrl);
    if (!useFallback) {
      setUseFallback(true);
      if (imgRef.current) {
        imgRef.current.src = fallbackImage;
      }
    } else {
      setImageError(true);
      setImageLoaded(false);
      onError();
    }
  };

  if (imageError) {
    return (
      <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center p-4">
        <ImageOff className="h-10 w-10 text-gray-300 mb-2" />
        <p className="text-sm text-gray-400">Image unavailable</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="w-full h-48 bg-gray-50"></div> {/* Placeholder */}
      <img
        ref={imgRef}
        data-src={imageUrl}
        loading="lazy"
        alt={`Generated ${index}`}
        className={`w-full h-48 object-cover transition-all duration-500 absolute top-0 left-0 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        width="300"
        height="192"
        decoding="async" 
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  );
}
