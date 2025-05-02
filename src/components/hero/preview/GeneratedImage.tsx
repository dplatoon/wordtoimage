
import { useState } from 'react';
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
  
  const handleDownload = () => {
    if (!imageUrl) return;
    try {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `wordtoimage-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      trackEvent(events.DOWNLOAD_IMAGE, {
        location: 'main_preview' 
      });
      
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download image', {
        description: 'Please try right-clicking the image and selecting "Save image as..."',
        action: {
          label: 'Try Again',
          onClick: handleDownload
        }
      });
    }
  };

  return (
    <div className="relative w-full h-full group transition-transform duration-300">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <Skeleton className="w-full h-full animate-pulse" />
        </div>
      )}
      
      {imageError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-600 text-sm mb-1 font-medium">Failed to load image</p>
          <p className="text-gray-500 text-xs text-center">The generated image could not be displayed</p>
        </div>
      )}
      
      <img
        src={imageUrl}
        alt="Generated image"
        className={`w-full h-full object-contain transition-all duration-500 ${
          imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        loading="lazy"
        decoding="async"
        width="512"
        height="512"
        fetchPriority="high"
        onLoad={onLoad}
        onError={onError}
      />
      
      {imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
          <Button
            variant="secondary"
            size={isMobile ? "default" : "lg"}
            onClick={handleDownload}
            className="gap-2 transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-white/95 hover:bg-white shadow-lg border-2 border-white/50"
          >
            <Download className="h-5 w-5 text-blue-600" />
            <span>
              {isMobile ? "Download" : "Download Image"}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};
