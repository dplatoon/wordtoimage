
import React, { useState } from 'react';
import { trackEvent, events } from '@/utils/analytics';
import { GenerationGallery } from './GenerationGallery';
import { useImageLoader } from './preview/useImageLoader';
import { useGalleryState } from './preview/useGalleryState';
import { LoadingState } from './preview/LoadingState';
import { ErrorState } from './preview/ErrorState';
import { EmptyState } from './preview/EmptyState';
import { GeneratedImage } from './preview/GeneratedImage';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImagePreviewProps {
  imageUrl: string;
  isGenerating: boolean;
  error: string | null;
}

export const ImagePreview = ({ imageUrl, isGenerating, error }: ImagePreviewProps) => {
  const { imageLoaded, imageError, loadingProgress, handleImageLoad, handleImageError } = 
    useImageLoader(imageUrl, isGenerating);
  const { gallery } = useGalleryState(imageUrl, isGenerating);
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
      <div className="bg-gray-50 border border-gray-200 h-[250px] sm:h-[300px] md:h-[350px] rounded-xl flex items-center justify-center overflow-hidden relative shadow-md group transition-all duration-300 hover:shadow-lg">
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
      
      <GenerationGallery images={gallery} />
    </div>
  );
};
