
import React, { useState, useRef, useEffect } from 'react';
import { ImageOff, Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageDisplayProps {
  imageUrl: string;
  index: number;
  onLoad: () => void;
  onError: () => void;
}

export function ImageDisplay({ imageUrl, index, onLoad, onError }: ImageDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (!imageUrl) {
      setImageError(true);
      setIsLoading(false);
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start loading the image when it becomes visible
          setIsLoading(true);
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => {
            setImageLoaded(true);
            setIsLoading(false);
            onLoad();
          };
          img.onerror = () => {
            console.error('Failed to load gallery image:', imageUrl);
            setImageError(true);
            setIsLoading(false);
            onError();
          };
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '200px', // Start loading when image is 200px from viewport
      threshold: 0.1
    });
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [imageUrl, onLoad, onError]);
  
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="relative w-full h-48">
        <Skeleton className="absolute inset-0 w-full h-full rounded-t-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="h-6 w-6 text-gray-400 animate-spin" />
        </div>
      </div>
    );
  }
  
  // Error state
  if (imageError) {
    return (
      <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center p-4">
        <ImageOff className="h-8 w-8 text-gray-300 mb-2" />
        <p className="text-sm text-gray-400">Image unavailable</p>
      </div>
    );
  }
  
  // Successfully loaded image
  return (
    <div className="relative w-full h-48 overflow-hidden">
      <img
        ref={imgRef}
        src={imageUrl}
        alt={`Generated image ${index}`}
        className="w-full h-full object-cover transition-all duration-300"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
