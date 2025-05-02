
import { useState, useEffect, lazy, Suspense } from 'react';
import { ImageGenerationForm } from './hero/ImageGenerationForm';
import { ImagePreview } from './hero/ImagePreview';
import { HeroHeader } from './hero/HeroHeader';
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
      const newRows = [...prev, row];
      return newRows.slice(-5); // Store fewer rows to reduce memory usage
    });
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden image-generation-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <HeroHeader />
        
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
          <div className="max-w-4xl mx-auto">
            <ImageGenerationForm 
              onImageGenerated={setGeneratedImageUrl} 
              onGeneratingChange={setIsGenerating} 
              onError={setGenerationError} 
              onNewGalleryRow={handleNewGalleryRow} 
            />
          </div>
          
          <div className="max-w-4xl mx-auto mt-6">
            <ImagePreview 
              imageUrl={generatedImageUrl} 
              isGenerating={isGenerating} 
              error={generationError} 
            />
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Free to try • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};
