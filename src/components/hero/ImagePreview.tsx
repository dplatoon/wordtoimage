
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Image, Download, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { GenerationGallery } from './GenerationGallery';
import { trackEvent, events } from '@/utils/analytics';

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
      <div className="h-[350px] md:h-[400px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
        {isGenerating ? (
          <div className="text-center px-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Creating your masterpiece...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="w-full max-w-md mx-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Generation Error</AlertTitle>
            <AlertDescription>
              {isApiNotFoundError ? (
                <div>
                  <p className="mb-2">Unable to generate image at this time</p>
                  <p className="text-sm">
                    Please try again in a few moments. If the problem persists, contact support.
                  </p>
                </div>
              ) : (
                error
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
                size="lg"
                onClick={handleDownload}
                className="gap-2 transform scale-90 group-hover:scale-100 transition-all duration-300"
              >
                <Download className="h-5 w-5" />
                Download Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center px-8">
            <Image className="h-10 w-10 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Enter a prompt above to generate your custom image with AI</p>
          </div>
        )}
      </div>
      <GenerationGallery images={gallery} />
    </div>
  );
};
