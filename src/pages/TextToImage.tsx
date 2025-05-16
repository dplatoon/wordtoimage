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
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { SkipToContent } from '@/components/home/SkipToContent';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export default function TextToImage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceImage, setSourceImage] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<{
    url: string;
  }[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const isMobile = useIsMobile();
  
  const { generateImageFromPrompt } = useImageGeneration({
    onImageGenerated: url => {
      setGeneratedImages(prev => [...prev, { url }]);
      toast.success("Image generated successfully!");
      trackEvent('text_to_image_generated');
    },
    onGeneratingChange: setIsGenerating,
    onError: errorMsg => {
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
    "Tropical beach with crystal clear water"
  ];
  
  const handleGenerate = async (promptText: string) => {
    if (!user && !isLoading) {
      setAuthModalOpen(true);
      trackEvent('auth_modal_opened', {
        source: 'text_to_image'
      });
      return;
    }
    
    try {
      trackEvent('text_to_image_generate_attempt', {
        promptLength: promptText.length,
        hasSourceImage: !!sourceImage
      });
      await generateImageFromPrompt(promptText, '', false, sourceImage);
    } catch (error) {
      console.error('Failed to generate image:', error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to generate image", {
        description: errorMessage
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
      <SkipToContent />
      <Nav />
      
      <div className={cn(
        "container mx-auto px-4 py-8 flex-grow",
        isMobile ? "px-2" : "py-12"
      )} id="main-content">
        <motion.div 
          className={cn(
            "mx-auto text-center mb-8",
            isMobile ? "max-w-full" : "max-w-3xl mb-10"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className={cn(
            "font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600",
            isMobile ? "text-2xl" : "text-3xl md:text-4xl"
          )}>
            AI-Powered Text to Image Generation
          </h1>
          <p className={cn(
            "text-gray-600",
            isMobile ? "text-base px-4" : "text-lg"
          )}>
            Generate beautiful visuals with AI – create exactly what you imagine.
          </p>
        </motion.div>
        
        <motion.div 
          className={cn(
            "mx-auto bg-white rounded-xl shadow-lg border border-gray-100",
            isMobile ? "p-3 max-w-full" : "p-6 max-w-3xl"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="mb-6">
            <TextToImageForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>
          
          <div className="mt-8">
            <ImageGallery images={generatedImages} onEdit={() => {}} loading={isGenerating} />
          </div>
          
          {!user && !isLoading && (
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className={cn(
                "text-indigo-700 text-center",
                isMobile ? "text-xs" : "text-sm"
              )}>
                <span className="font-semibold">Pro tip:</span> Sign up for free to save your images and generate HD quality renders
              </p>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className={cn(
            "mx-auto mt-12",
            isMobile ? "max-w-full" : "max-w-4xl mt-16"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">🎨</div>
              <h3 className="font-semibold mb-1 md:mb-2">HD Renders</h3>
              <p className="text-xs md:text-sm text-gray-600">Unlock 2K+ images with no watermarks</p>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1 md:mb-2">Faster Generation</h3>
              <p className="text-xs md:text-sm text-gray-600">Pro users get results 3× faster</p>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">💾</div>
              <h3 className="font-semibold mb-1 md:mb-2">Save History</h3>
              <p className="text-xs md:text-sm text-gray-600">Keep your renders in your gallery</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
      
      <AuthModalDialog open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
