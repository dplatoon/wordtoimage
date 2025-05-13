
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/sonner';
import { trackEvent, events } from '@/utils/analytics';
import { useImageWithFallback } from '@/hooks/useImageWithFallback';
import { useIsMobile } from '@/hooks/use-mobile';
import { defaultFallbackImage } from '@/utils/imageUtils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface GeneratedImageProps {
  imageUrl: string;
  imageLoaded: boolean;
  imageError: boolean;
  onLoad: () => void;
  onError: () => void;
}

export const GeneratedImage = ({ 
  imageUrl, 
  imageLoaded, 
  imageError, 
  onLoad, 
  onError 
}: GeneratedImageProps) => {
  const isMobile = useIsMobile();
  
  const {
    imageSrc,
    isLoading,
    isError,
    handleLoad,
    handleError,
    useFallback,
  } = useImageWithFallback({
    src: imageUrl,
    fallbackSrc: defaultFallbackImage,
    onLoadSuccess: onLoad,
    onLoadError: onError,
    trackSuccess: true,
    trackEvent: 'main_preview',
  });
  
  const handleDownload = () => {
    const downloadUrl = imageSrc;
    if (!downloadUrl) return;
    
    try {
      window.open(downloadUrl, '_blank');
      
      trackEvent(events.DOWNLOAD_IMAGE, {
        location: 'main_preview',
        fallback: useFallback ? 'yes' : 'no'
      });
      
      toast.success("Image opened in a new tab");
    } catch (error) {
      console.error('Opening error:', error);
      toast.error('Failed to open image');
    }
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <Skeleton className="w-full h-full animate-pulse" />
        </div>
      )}
      
      {isError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-600 text-sm font-medium">Failed to load image</p>
        </div>
      )}
      
      <img
        src={imageSrc}
        alt="Generated"
        className={`w-full h-full object-contain ${isLoading || isError ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        decoding="async"
        width="512"
        height="512"
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {!isLoading && !isError && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <Button
            variant="default"
            size="lg"
            onClick={handleDownload}
            className="gap-2 bg-white/95 hover:bg-white text-blue-600 shadow-lg border border-blue-100 px-6 py-2 h-auto"
          >
            <Download className="h-5 w-5" />
            <span>{isMobile ? "Open" : "Open Image"}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
