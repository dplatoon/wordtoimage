
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
        if (g.find((img) => img.url === imageUrl)) return g; // prevent duplicates
        return [...g, { url: imageUrl, prompt: '' }].slice(-12); // Store more images for the enhanced gallery
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
      
      // Track download event
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
            <p className="text-gray-500">Generating your custom graphic...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="w-full max-w-md mx-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Image Generation Error</AlertTitle>
            <AlertDescription>
              {isApiNotFoundError ? (
                <div>
                  <p className="mb-2">{error}</p>
                  <p className="text-sm">
                    The API endpoint for image generation is not available.
                    This is likely because the Supabase edge function isn't deployed or properly configured.
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
              alt="Generated social media graphic"
              className="w-full h-full object-contain"
              loading="lazy" 
              decoding="async"
              width="1024" 
              height="1024"
              fetchPriority="high"
              style={{contentVisibility: 'auto'}}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                variant="secondary"
                size="lg"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center px-8">
            <Image className="h-10 w-10 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Enter a prompt and generate your custom social media graphic with WordToImage AI</p>
          </div>
        )}
      </div>
      <GenerationGallery images={gallery} />
    </div>
  );
};
