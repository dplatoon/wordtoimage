
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Image, Download, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { GenerationGallery } from './GenerationGallery';
import { SkeletonGallery } from './SkeletonGallery';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImagePreviewProps {
  imageUrl: string;
  isGenerating: boolean;
  error: string | null;
}

// Track generated images in memory for session gallery
const useImageGallery = (imageUrl: string, isGenerating: boolean) => {
  const [gallery, setGallery] = useState<{ url: string; prompt: string }[]>([]);

  useEffect(() => {
    if (imageUrl && !isGenerating) {
      setGallery((g) => {
        if (g.find((img) => img.url === imageUrl)) return g; // prevent duplicates
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
      a.download = `runware-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download image', {
        description: 'Please try right-clicking the image and selecting "Save image as..."'
      });
    }
  };

  // Error helpers
  const isApiNotFoundError = error?.includes('not configured') || error?.includes('not available');

  // Determine preview height based on screen size
  const previewHeight = isMobile ? 'h-[250px]' : 'h-[350px] md:h-[400px]';

  // Original preview logic for current image, plus gallery below
  return (
    <div>
      <div className={`${previewHeight} bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative`}>
        {isGenerating ? (
          <div className="text-center px-8" aria-live="polite">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" role="progressbar" aria-label="Generating image"></div>
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
              loading="eager" // Load the primary image eagerly
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                variant="secondary"
                size={isMobile ? "default" : "lg"}
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
            <p className="text-gray-500">Enter a prompt and generate your custom social media graphic with Runware AI</p>
          </div>
        )}
      </div>
      {/* Session Gallery or Skeleton during generation */}
      {isGenerating ? <SkeletonGallery /> : <GenerationGallery images={gallery} />}
    </div>
  );
};
