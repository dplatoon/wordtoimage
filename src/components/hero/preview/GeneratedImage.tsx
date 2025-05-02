
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/sonner';
import { trackEvent, events } from '@/utils/analytics';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const imgRef = useRef<HTMLImageElement>(null);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  
  // Fallback image for when the main image fails to load
  const fallbackImageUrl = "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=512&q=80";
  
  // Optimize image loading with progressive enhancement
  useEffect(() => {
    if (imageUrl && imgRef.current) {
      // Create a new image to preload
      const img = new Image();
      img.src = imageUrl;
      img.onload = onLoad;
      img.onerror = () => {
        console.error('Failed to load image:', imageUrl);
        if (!fallbackAttempted) {
          setFallbackAttempted(true);
          setUseFallback(true);
        } else {
          onError();
        }
      };
    }
  }, [imageUrl, onLoad, onError, fallbackAttempted]);
  
  // Second useEffect to handle fallback image loading
  useEffect(() => {
    if (useFallback && imgRef.current) {
      const fallbackImg = new Image();
      fallbackImg.src = fallbackImageUrl;
      fallbackImg.onload = onLoad;
      fallbackImg.onerror = onError;
    }
  }, [useFallback, onLoad, onError]);
  
  const handleDownload = () => {
    const downloadUrl = useFallback ? fallbackImageUrl : imageUrl;
    if (!downloadUrl) return;
    
    try {
      window.open(downloadUrl, '_blank');
      
      trackEvent(events.DOWNLOAD_IMAGE, {
        location: 'main_preview' 
      });
      
      toast.success("Image opened in a new tab");
    } catch (error) {
      console.error('Opening error:', error);
      toast.error('Failed to open image');
    }
  };

  return (
    <div className="relative w-full h-full">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <Skeleton className="w-full h-full animate-pulse" />
        </div>
      )}
      
      {imageError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-600 text-sm font-medium">Failed to load image</p>
        </div>
      )}
      
      <img
        ref={imgRef}
        src={useFallback ? fallbackImageUrl : imageUrl}
        alt="Generated"
        className={`w-full h-full object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        decoding="async"
        width="512"
        height="512"
        onLoad={onLoad}
        onError={onError}
      />
      
      {imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30 flex items-end justify-center p-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownload}
            className="gap-2 bg-white/95 hover:bg-white shadow-md"
          >
            <Download className="h-4 w-4 text-blue-600" />
            <span>Open Image</span>
          </Button>
        </div>
      )}
    </div>
  );
};
