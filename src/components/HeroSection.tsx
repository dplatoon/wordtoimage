
import { useState } from 'react';
import { HeroHeader } from './hero/HeroHeader';
import { ImageGenerationForm } from './hero/ImageGenerationForm';
import { ImagePreview } from './hero/ImagePreview';
import { trackEvent, events } from '@/utils/analytics';
import { useIsMobile } from '@/hooks/use-mobile';

export const HeroSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [galleryRows, setGalleryRows] = useState<{url: string; prompt: string; style?: string; resolution?: string}[][]>([]);
  const isMobile = useIsMobile();

  const handleNewGalleryRow = (row: {url: string; prompt: string; style?: string; resolution?: string}[]) => {
    setGalleryRows(prev => [...prev, row]);
  };

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 image-generation-section" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          <div className={`${isMobile ? "w-full" : "flex-1"} mb-6 lg:mb-0`}>
            <HeroHeader />
          </div>
          <div className={`${isMobile ? "w-full" : "flex-1"}`}>
            <div className="relative">
              <ImageGenerationForm
                onImageGenerated={setGeneratedImageUrl}
                onGeneratingChange={setIsGenerating}
                onError={setGenerationError}
                onNewGalleryRow={handleNewGalleryRow}
              />
              <div className="mt-5">
                <ImagePreview
                  imageUrl={generatedImageUrl}
                  isGenerating={isGenerating}
                  error={generationError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
