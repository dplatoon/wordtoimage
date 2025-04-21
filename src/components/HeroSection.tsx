import { useState } from 'react';
import { HeroHeader } from './hero/HeroHeader';
import { ImageGenerationForm } from './hero/ImageGenerationForm';
import { ImagePreview } from './hero/ImagePreview';

export const HeroSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);

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

        <div className="mt-16 py-8 px-6 bg-white rounded-xl shadow-md border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Implementation Roadmap</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-500 font-bold mb-2 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">1</span>
                Wireframe
              </div>
              <p className="text-sm text-gray-600">Sketch the input, controls, button, and gallery in your design tool</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-500 font-bold mb-2 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">2</span>
                Update Spec
              </div>
              <p className="text-sm text-gray-600">Document components and copy, then generate React UI</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-500 font-bold mb-2 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">3</span>
                Edge Cases
              </div>
              <p className="text-sm text-gray-600">Test long prompts, network failures, and auth flows</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-500 font-bold mb-2 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">4</span>
                Feedback
              </div>
              <p className="text-sm text-gray-600">Roll out to beta users and use Hotjar for user insights</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-500 font-bold mb-2 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">5</span>
                Polish
              </div>
              <p className="text-sm text-gray-600">Refine styling, animations, and A/B test messaging</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
