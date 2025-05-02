import { useState, useEffect } from 'react';
import { HeroHeader } from './hero/HeroHeader';
import { ImageGenerationForm } from './hero/ImageGenerationForm';
import { ImagePreview } from './hero/ImagePreview';
import { trackEvent, events } from '@/utils/analytics';
import { useIsMobile } from '@/hooks/use-mobile';
export const HeroSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [galleryRows, setGalleryRows] = useState<{
    url: string;
    prompt: string;
    style?: string;
    resolution?: string;
  }[][]>([]);
  const isMobile = useIsMobile();

  // Track when generation starts and image is shown
  useEffect(() => {
    if (isGenerating) {
      trackEvent(events.GENERATION_STARTED, {});
    } else if (generatedImageUrl) {
      trackEvent(events.IMAGE_DISPLAYED, {});
    }
  }, [isGenerating, generatedImageUrl]);
  const handleNewGalleryRow = (row: {
    url: string;
    prompt: string;
    style?: string;
    resolution?: string;
  }[]) => {
    setGalleryRows(prev => {
      // Store only the last 10 rows to avoid memory issues
      const newRows = [...prev, row];
      return newRows.slice(-10);
    });
  };
  return <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 rounded-full">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
            Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Text to Image</span> with AI
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Create stunning, unique images from your text descriptions using our advanced AI image generator
          </p>
        </div>
        
        {/* Form section - Now full width */}
        <div className="max-w-2xl mx-auto mb-12">
          <ImageGenerationForm onImageGenerated={setGeneratedImageUrl} onGeneratingChange={setIsGenerating} onError={setGenerationError} onNewGalleryRow={handleNewGalleryRow} />
        </div>
        
        {/* Preview section - Now below the form */}
        <div className="max-w-4xl mx-auto">
          <ImagePreview imageUrl={generatedImageUrl} isGenerating={isGenerating} error={generationError} />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Powered by state-of-the-art AI models • Free to try • No credit card required
          </p>
        </div>
      </div>
    </section>;
};