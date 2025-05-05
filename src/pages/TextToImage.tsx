
import React, { useState, useEffect } from 'react';
import { TextToImageForm } from '@/components/word-to-image/TextToImageForm';
import { toast } from '@/components/ui/sonner';
import { ImageGallery } from '@/components/word-to-image/ImageGallery';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModalDialog } from '@/components/hero/AuthModalDialog';
import { trackEvent } from '@/utils/analytics';

export default function TextToImage() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<{url: string}[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const { user, isLoading } = useAuth();

  const { generateImageFromPrompt } = useImageGeneration({
    onImageGenerated: (url) => {
      setGeneratedImageUrl(url);
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
  
  const handleGenerate = async (prompt: string) => {
    if (!user && !isLoading) {
      setAuthModalOpen(true);
      trackEvent('auth_modal_opened', { source: 'text_to_image' });
      return;
    }
    
    try {
      trackEvent('text_to_image_generate_attempt', { promptLength: prompt.length });
      await generateImageFromPrompt(prompt, '', false);
    } catch (error) {
      console.error('Failed to generate image:', error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to generate image", {
        description: errorMessage
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Text to Image Generator</h1>
      
      <div className="max-w-md mx-auto">
        <TextToImageForm 
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
        
        <ImageGallery 
          images={generatedImages}
          onEdit={() => {}}
          loading={isGenerating}
        />
      </div>
      
      <AuthModalDialog 
        open={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </div>
  );
}
