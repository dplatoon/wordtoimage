
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
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    if (isGenerating) {
      setImageLoaded(false);
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const nextProgress = prev + Math.random() * 5;
          return nextProgress >= 95 ? 95 : nextProgress;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  // Add new image to gallery when generated
  useEffect(() => {
    if (imageUrl && !isGenerating) {
      setGallery((g) => {
        if (g.find((img) => img.url === imageUrl)) return g;
        return [...g, { url: imageUrl, prompt: '' }].slice(-12);
      });
      setLoadingProgress(100);
      setTimeout(() => setImageLoaded(true), 300);
    }
  }, [imageUrl, isGenerating]);

  return { gallery, setGallery, imageLoaded, loadingProgress };
};

export const ImagePreview = ({ imageUrl, isGenerating, error }: ImagePreviewProps) => {
  const { gallery, imageLoaded, loadingProgress } = useImageGallery(imageUrl, isGenerating);
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
      <div className="h-[300px] sm:h-[350px] bg-white rounded-xl flex items-center justify-center overflow-hidden relative shadow-md border border-gray-200">
        {isGenerating ? (
          <div className="text-center px-4 sm:px-8 w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="relative w-12 h-12 mb-4">
                <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
                <div className="absolute inset-1 rounded-full border-2 border-blue-200"></div>
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
                  className="mt-2 flex items-center" 
                  onClick={handleRetry}
                >
                  <RefreshCw className="mr-1 h-3 w-3" /> Try Again
                </Button>
              </div>
            </div>
          </Alert>
        ) : imageUrl ? (
          <div className="relative w-full h-full group">
            {!imageLoaded && <Skeleton className="absolute inset-0" />}
            <img
              src={imageUrl}
              alt="Generated image"
              className={`w-full h-full object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setTimeout(() => trackEvent(events.IMAGE_LOADED, {}), 100)}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 ease-in-out flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                variant="secondary"
                size={isMobile ? "default" : "lg"}
                onClick={handleDownload}
                className="gap-2 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/90 hover:bg-white shadow-lg"
              >
                <Download className="h-5 w-5" />
                {isMobile ? "Download" : "Download Image"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center px-4 sm:px-8 py-8 bg-gray-50 rounded-lg w-full h-full flex flex-col items-center justify-center">
            <div className="p-3 bg-gray-100 rounded-full mb-4">
              <Image className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2 font-medium">Enter a prompt above to generate your image</p>
            <p className="text-xs text-gray-400 max-w-xs">Be descriptive for best results. Try mentioning style, colors, and subject</p>
          </div>
        )}
      </div>
      <GenerationGallery images={gallery} />
    </div>
  );
};
