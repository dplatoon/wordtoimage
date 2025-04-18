
import { useState } from 'react';
import { HeroHeader } from './hero/HeroHeader';
import { ImageGenerationForm } from './hero/ImageGenerationForm';
import { ImagePreview } from './hero/ImagePreview';

export const HeroSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1">
            <HeroHeader />
          </div>
          <div className="flex-1">
            <div className="relative">
              <ImageGenerationForm
                onImageGenerated={setGeneratedImageUrl}
                onGeneratingChange={setIsGenerating}
                onError={setGenerationError}
              />
              <div className="mt-4">
                <ImagePreview
                  imageUrl={generatedImageUrl}
                  isGenerating={isGenerating}
                  error={generationError}
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-yellow-900 font-medium px-4 py-2 rounded-full transform rotate-12 shadow-lg">
                Runware AI!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
