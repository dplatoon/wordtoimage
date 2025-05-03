import { useState, useEffect, lazy, Suspense } from 'react';
import { ImageGenerationForm } from './hero/ImageGenerationForm';
import { ImagePreview } from './hero/ImagePreview';
import { HeroHeader } from './hero/HeroHeader';
import { DecorativeBackground } from './DecorativeBackground';
import { trackEvent, events } from '@/utils/analytics';
import { useIsMobile } from '@/hooks/use-mobile';

// Use dynamic import for better performance
const GenerationGallery = lazy(() => import('./hero/GenerationGallery'));

export const HeroSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<{
    url: string;
    prompt: string;
    style?: string;
    resolution?: string;
    timestamp?: number;
  }[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isGenerating) {
      trackEvent(events.GENERATION_STARTED, {});
    } else if (generatedImageUrl) {
      trackEvent(events.IMAGE_DISPLAYED, {});
    }
  }, [isGenerating, generatedImageUrl]);

  // Load saved gallery from localStorage on component mount
  useEffect(() => {
    try {
      const savedGallery = localStorage.getItem('imageGenerationGallery');
      if (savedGallery) {
        const parsed = JSON.parse(savedGallery);
        if (Array.isArray(parsed)) {
          setGalleryImages(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load gallery from localStorage:', e);
    }
  }, []);

  const handleNewGalleryRow = (row: {
    url: string;
    prompt: string;
    style?: string;
    resolution?: string;
    timestamp?: number;
  }[]) => {
    setGalleryImages(prev => {
      const newGallery = [...prev, ...row];
      // Store the updated gallery in localStorage
      try {
        localStorage.setItem('imageGenerationGallery', JSON.stringify(newGallery));
      } catch (e) {
        console.error('Failed to save gallery to localStorage:', e);
      }
      return newGallery;
    });
  };

  return (
    <section className="py-8 md:py-20 lg:py-24 relative overflow-hidden image-generation-section">
      <DecorativeBackground />
      
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
              gallery={galleryImages}
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
