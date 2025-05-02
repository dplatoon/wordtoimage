import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Image, Download, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { GenerationGallery } from './GenerationGallery';
import { trackEvent, events } from '@/utils/analytics';
import { useIsMobile } from '@/hooks/use-mobile';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

interface ImagePreviewProps {
  imageUrl: string;
  isGenerating: boolean;
  error: string | null;
}

const useImageGallery = (imageUrl: string, isGenerating: boolean) => {
  const [gallery, setGallery] = useState<{ url: string; prompt: string }[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading progress with enhanced animation
  useEffect(() => {
    if (isGenerating) {
      setImageLoaded(false);
      setImageError(false);
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          // More dynamic and realistic progress simulation
          const increment = Math.random() * (prev < 50 ? 8 : (prev < 80 ? 5 : 2));
          const nextProgress = prev + increment;
          return nextProgress >= 95 ? 95 : nextProgress;
        });
      }, 200); // Slightly lower frequency for better performance
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  // Add new image to gallery when generated
  useEffect(() => {
    if (imageUrl && !isGenerating) {
      setGallery((g) => {
        if (g.find((img) => img.url === imageUrl)) return g;
        return [...g, { url: imageUrl, prompt: '' }].slice(-8); // Limit to 8 images
      });
      setLoadingProgress(100);
    }
  }, [imageUrl, isGenerating]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    setTimeout(() => trackEvent(events.IMAGE_LOADED, {}), 100);
  };

  const handleImageError = () => {
    console.error('Failed to load image:', imageUrl);
    setImageError(true);
    setImageLoaded(false);
  };

  return { gallery, setGallery, imageLoaded, imageError, loadingProgress, handleImageLoad, handleImageError };
};

export const ImagePreview = ({ imageUrl, isGenerating, error }: ImagePreviewProps) => {
  const { gallery, imageLoaded, imageError, loadingProgress, handleImageLoad, handleImageError } = useImageGallery(imageUrl, isGenerating);
  const isMobile = useIsMobile();
  const [retryCount, setRetryCount] = useState(0);

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

  const handleRetry = () => {
    setRetryCount(count => count + 1);
    trackEvent(events.RETRY_GENERATION, { 
      error: error || 'unknown',
      retryCount: retryCount + 1
    });
  };

  const isApiNotFoundError = error?.includes('not configured') || error?.includes('not available');

  return (
    <div>
      <div className="h-[300px] sm:h-[350px] bg-white rounded-xl flex items-center justify-center overflow-hidden relative shadow-md border border-gray-200 group transition-all duration-300 hover:shadow-lg">
        {isGenerating ? (
          <div className="text-center px-4 sm:px-8 w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="relative w-16 h-16 mb-4">
                {/* Simplified loading animation */}
                <div className="absolute inset-0 rounded-full border-4 border-t-4 border-blue-500 border-b-purple-500 border-l-indigo-500 border-r-indigo-300 animate-spin"></div>
              </div>
              <p className="text-gray-700 font-medium text-lg">Creating your masterpiece...</p>
              <div className="w-full max-w-[250px] mt-4">
                <div className="flex justify-between mb-1 text-xs text-gray-500">
                  <span>Processing</span>
                  <span>{Math.round(loadingProgress)}%</span>
                </div>
                <Progress value={loadingProgress} className="h-2" />
              </div>
              <p className="text-xs text-gray-500 mt-3">This may take a few seconds</p>
            </div>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="w-full max-w-md mx-4 border border-red-200 shadow-md bg-white">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <div className="flex-1">
                <AlertTitle className="text-red-600 font-semibold text-sm mb-1">Generation Error</AlertTitle>
                <AlertDescription className="text-gray-700 text-xs">
                  {isApiNotFoundError ? (
                    <div>
                      <p className="mb-1 font-medium">Unable to generate image</p>
                      <p>Your prompt may be too short or unclear. Try adding more details to your description.</p>
                    </div>
                  ) : (
                    <div className="font-medium">{error}</div>
                  )}
                </AlertDescription>
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="mt-2 flex items-center bg-gradient-to-r from-rose-100 to-red-100 hover:from-rose-200 hover:to-red-200 text-red-700" 
                  onClick={handleRetry}
                >
                  <RefreshCw className="mr-1 h-3 w-3" /> Try Again
                </Button>
              </div>
            </div>
          </Alert>
        ) : imageUrl ? (
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
              fetchpriority="high"
              onLoad={handleImageLoad}
              onError={handleImageError}
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
        ) : (
          <div className="text-center px-4 sm:px-8 py-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg w-full h-full flex flex-col items-center justify-center">
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-full mb-4 shadow-inner border border-gray-100">
              <Image className="h-12 w-12 text-indigo-400" />
            </div>
            <p className="text-gray-600 mb-2 font-medium">Enter a prompt above to generate your image</p>
            <p className="text-xs text-gray-500 max-w-xs">Be descriptive for best results. Try mentioning style, colors, and subject</p>
          </div>
        )}
      </div>
      
      <GenerationGallery images={gallery} />
    </div>
  );
};
