
import React, { useState, useEffect } from 'react';
import { TextToImageForm } from '@/components/word-to-image/TextToImageForm';
import { toast } from '@/components/ui/sonner';
import { ImageGallery } from '@/components/word-to-image/ImageGallery';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModalDialog } from '@/components/hero/AuthModalDialog';
import { trackEvent } from '@/utils/analytics';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PromptInput } from '@/components/word-to-image/PromptInput';

export default function TextToImage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<{url: string}[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const { user, isLoading } = useAuth();

  const { generateImageFromPrompt } = useImageGeneration({
    onImageGenerated: (url) => {
      setGeneratedImages(prev => [...prev, { url }]);
      toast.success("Image generated successfully!");
      trackEvent('text_to_image_generated');
    },
    onGeneratingChange: setIsGenerating,
    onError: (errorMsg) => {
      setError(errorMsg);
      toast.error("Failed to generate image", {
        description: errorMsg || "An unexpected error occurred"
      });
      trackEvent('text_to_image_error', {
        errorMessage: errorMsg
      });
    }
  });
  
  const promptSuggestions = [
    "A futuristic cityscape at night with neon lights",
    "Serene mountain lake at sunset with reflection",
    "Abstract geometric patterns in vibrant colors",
    "Tropical beach with crystal clear water and palm trees"
  ];

  const handleGenerate = async (promptText: string) => {
    if (!user && !isLoading) {
      setAuthModalOpen(true);
      trackEvent('auth_modal_opened', { source: 'text_to_image' });
      return;
    }
    
    try {
      trackEvent('text_to_image_generate_attempt', { promptLength: promptText.length });
      await generateImageFromPrompt(promptText, '', false);
    } catch (error) {
      console.error('Failed to generate image:', error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to generate image", {
        description: errorMessage
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6 text-center">Text to Image Generator</h1>
        
        <div className="max-w-2xl mx-auto">
          <PromptInput 
            prompt={prompt}
            onPromptChange={setPrompt}
            suggestions={promptSuggestions}
          />
          
          <div className="mt-4">
            <button
              onClick={() => handleGenerate(prompt)}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : "Generate Image"}
            </button>
          </div>
          
          <ImageGallery 
            images={generatedImages}
            onEdit={() => {}}
            loading={isGenerating}
          />
        </div>
      </div>
      
      <Footer />
      
      <AuthModalDialog 
        open={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </div>
  );
}
