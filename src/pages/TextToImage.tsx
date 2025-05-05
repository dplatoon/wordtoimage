
import React, { useState, useEffect } from 'react';
import { TextToImageForm } from '@/components/word-to-image/TextToImageForm';
import { toast } from '@/components/ui/sonner';
import { ImageGallery } from '@/components/word-to-image/ImageGallery';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModalDialog } from '@/components/hero/AuthModalDialog';
import { useNavigate } from 'react-router-dom';

export default function TextToImage() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<{url: string}[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const { generateImageFromPrompt } = useImageGeneration({
    onImageGenerated: (url) => {
      setGeneratedImageUrl(url);
      setGeneratedImages(prev => [...prev, { url }]);
      toast.success("Image generated successfully!");
    },
    onGeneratingChange: setIsGenerating,
    onError: setError
  });
  
  const handleGenerate = async (prompt: string) => {
    if (!user && !isLoading) {
      setAuthModalOpen(true);
      return;
    }
    
    try {
      await generateImageFromPrompt(prompt, '', false);
    } catch (error) {
      console.error('Failed to generate image:', error);
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
