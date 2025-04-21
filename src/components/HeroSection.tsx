
import { useState } from 'react';
import { HeroHeader } from './hero/HeroHeader';
import { ImageGenerationForm } from './hero/ImageGenerationForm';
import { ImagePreview } from './hero/ImagePreview';
import { trackEvent, events } from '@/utils/analytics';

export const HeroSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [galleryRows, setGalleryRows] = useState<{url: string; prompt: string; style?: string; resolution?: string}[][]>([]);

  const handleNewGalleryRow = (row: {url: string; prompt: string; style?: string; resolution?: string}[]) => {
    setGalleryRows(prev => [...prev, row]);
  };

  return (
    <section className="py-16 md:py-28 bg-gradient-to-br from-blue-50 via-white to-purple-50 image-generation-section" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1">
            <HeroHeader />
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Turn your ideas into vivid images in seconds—no design skills needed.
              Create professional-looking visuals for social media, presentations, or inspiration.
            </p>
          </div>
          <div className="flex-1 w-full">
            <div className="relative">
              <ImageGenerationForm
                onImageGenerated={setGeneratedImageUrl}
                onGeneratingChange={setIsGenerating}
                onError={setGenerationError}
                onNewGalleryRow={handleNewGalleryRow}
              />
              <div className="mt-6">
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
