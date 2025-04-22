
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Image, Download, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { GenerationGallery } from './GenerationGallery';
import { trackEvent, events } from '@/utils/analytics';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImagePreviewProps {
  imageUrl: string;
  isGenerating: boolean;
  error: string | null;
}

const useImageGallery = (imageUrl: string, isGenerating: boolean) => {
  const [gallery, setGallery] = useState<{ url: string; prompt: string }[]>([]);

  useEffect(() => {
    if (imageUrl && !isGenerating) {
      setGallery((g) => {
        if (g.find((img) => img.url === imageUrl)) return g;
        return [...g, { url: imageUrl, prompt: '' }].slice(-12);
      });
    }
  }, [imageUrl, isGenerating]);

  return { gallery, setGallery };
};

export const ImagePreview = ({ imageUrl, isGenerating, error }: ImagePreviewProps) => {
  const { gallery } = useImageGallery(imageUrl, isGenerating);
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
        description: 'Please try right-clicking the image and selecting "Save image as..."'
      });
    }
  };

  const isApiNotFoundError = error?.includes('not configured') || error?.includes('not available');

  return (
    <div>
      <div className="h-[350px] md:h-[400px] bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden relative shadow-sm border border-gray-100">
        {isGenerating ? (
          <div className="text-center px-4 sm:px-8">
            <div className="animate-pulse flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Creating your masterpiece...</p>
              <p className="text-xs text-gray-500 mt-2">This may take a few seconds</p>
            </div>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="w-full max-w-md mx-4 border-2 border-red-200 shadow-md bg-white">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <AlertTitle className="text-red-600 font-semibold">Generation Error</AlertTitle>
            <AlertDescription className="text-gray-700">
              {isApiNotFoundError ? (
                <div>
                  <p className="mb-2 font-medium">Unable to generate image</p>
                  <p className="text-sm">
                    Your prompt may be too short or unclear. Try adding more details to your description.
                  </p>
                </div>
              ) : (
                <div className="font-medium">{error}</div>
              )}
            </AlertDescription>
          </Alert>
        ) : imageUrl ? (
          <div className="relative w-full h-full group">
            <img
              src={imageUrl}
              alt="Generated image"
              className="w-full h-full object-contain"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 ease-in-out flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                variant="secondary"
                size={isMobile ? "default" : "lg"}
                onClick={handleDownload}
                className="gap-2 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/90 hover:bg-white"
              >
                <Download className="h-5 w-5" />
                {isMobile ? "Download" : "Download Image"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center px-4 sm:px-8 py-8 bg-gray-50 rounded-lg w-full h-full flex flex-col items-center justify-center">
            <Image className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-2">Enter a prompt above to generate your image</p>
            <p className="text-xs text-gray-400">Be descriptive for best results</p>
          </div>
        )}
      </div>
      <GenerationGallery images={gallery} />
    </div>
  );
};
