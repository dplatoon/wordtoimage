
import { useState } from 'react';
import { ImageGenerationForm } from './hero/ImageGenerationForm';
import { ImagePreview } from './hero/ImagePreview';
import { HeroHeader } from './hero/HeroHeader';
import { DecorativeBackground } from './DecorativeBackground';

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
    <section className="py-8 md:py-16 lg:py-20 relative overflow-hidden image-generation-section bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <DecorativeBackground />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <HeroHeader />
        
        {/* Enhanced main container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 md:p-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <ImageGenerationForm 
              onImageGenerated={setGeneratedImageUrl} 
              onGeneratingChange={setIsGenerating} 
              onError={setGenerationError} 
              onNewGalleryRow={handleNewGalleryRow} 
            />
          </div>
          
          <div className="max-w-4xl mx-auto mt-8">
            <ImagePreview 
              imageUrl={generatedImageUrl} 
              isGenerating={isGenerating} 
              error={generationError}
              gallery={galleryImages}
            />
          </div>
        </div>
        
        {/* Enhanced footer text */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/50 shadow-sm">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Free to try</span>
              <span className="text-gray-400">•</span>
              <span>No credit card required</span>
              <span className="text-gray-400">•</span>
              <span>Instant results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
