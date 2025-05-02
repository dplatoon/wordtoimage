
import React, { useRef } from 'react';
import { Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useImageWithFallback } from '@/hooks/useImageWithFallback';
import { ImageErrorState } from './ImageErrorState';

interface ImageDisplayProps {
  imageUrl: string;
  index: number;
  onLoad: () => void;
  onError: () => void;
}

export function ImageDisplay({ imageUrl, index, onLoad, onError }: ImageDisplayProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  
  const {
    imageSrc,
    isLoading,
    isError,
    handleLoad,
    handleError
  } = useImageWithFallback({
    src: imageUrl,
    fallbackSrc: "https://images.unsplash.com/photo-1686002359940-6a51b0d8184b?auto=format&fit=crop&w=400&q=75",
    onLoadSuccess: onLoad,
    onLoadError: onError,
    trackSuccess: true,
    trackEvent: 'gallery_image',
  });
  
  // Error state
  if (isError) {
    return <ImageErrorState />;
  }
  
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
  
  // Successfully loaded image
  return (
    <div className="relative w-full h-48 overflow-hidden">
      <img
        ref={imgRef}
        src={imageSrc}
        alt={`Generated image ${index}`}
        className="w-full h-full object-cover transition-all duration-300"
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
