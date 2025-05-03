
import React, { useState, lazy, Suspense } from 'react';
import { trackEvent, events } from '@/utils/analytics';
import { useImageLoader } from './preview/useImageLoader';
import { LoadingState } from './preview/LoadingState';
import { ErrorState } from './preview/ErrorState';
import { EmptyState } from './preview/EmptyState';
import { GeneratedImage } from './preview/GeneratedImage';
import { useIsMobile } from '@/hooks/use-mobile';

// Lazy load the gallery component to improve initial load time
const GenerationGallery = lazy(() => import('./GenerationGallery').then(module => ({ 
  default: module.GenerationGallery 
})));

interface ImagePreviewProps {
  imageUrl: string;
  isGenerating: boolean;
  error: string | null;
  gallery?: {
    url: string;
    prompt: string;
    style?: string;
    resolution?: string;
    timestamp?: number;
  }[];
}

export const ImagePreview = ({ 
  imageUrl, 
  isGenerating, 
  error,
  gallery = []
}: ImagePreviewProps) => {
  const { imageLoaded, imageError, loadingProgress, handleImageLoad, handleImageError } = 
    useImageLoader(imageUrl, isGenerating);
  const [retryCount, setRetryCount] = useState(0);
  const isMobile = useIsMobile();

  const handleRetry = () => {
    setRetryCount(count => count + 1);
    trackEvent(events.RETRY_GENERATION, { 
      error: error || 'unknown',
      retryCount: retryCount + 1
    });
  };

  return (
    <div>
      <div className="bg-gray-50 border border-gray-200 h-[250px] sm:h-[300px] md:h-[350px] rounded-xl flex items-center justify-center overflow-hidden relative shadow-md group">
        {isGenerating ? (
          <LoadingState progress={loadingProgress} />
        ) : error ? (
          <ErrorState error={error} onRetry={handleRetry} />
        ) : imageUrl ? (
          <GeneratedImage 
            imageUrl={imageUrl}
            imageLoaded={imageLoaded}
            imageError={imageError}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <EmptyState />
        )}
      </div>
      
      <Suspense fallback={<div className="h-12 w-full bg-gray-100 animate-pulse mt-6 rounded"></div>}>
        {gallery && gallery.length > 0 && <GenerationGallery images={gallery} />}
      </Suspense>
    </div>
  );
};
