
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
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { PricingTable } from '@/components/pricing/PricingTable';
import { motion } from 'framer-motion';

export default function TextToImage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<{
    url: string;
  }[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, isLoading } = useAuth();
  
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
    "Tropical beach with crystal clear water and palm trees", 
    "A magical forest with glowing mushrooms and fairies", 
    "Modern minimalist interior design with plants"
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
        promptLength: promptText.length
      });
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
      <Nav />
      
      <div className="container mx-auto px-4 py-12 flex-grow">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            AI-Powered Text to Image Generation
          </h1>
          <p className="text-gray-600 text-lg">
            Generate beautiful visuals with AI – create exactly what you imagine.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="mb-6">
            <PromptInput prompt={prompt} onPromptChange={setPrompt} suggestions={promptSuggestions} />
          </div>
          
          <Button 
            onClick={() => handleGenerate(prompt)} 
            disabled={isGenerating || !prompt.trim()} 
            className="w-full py-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium text-lg transition-all hover:shadow-lg"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-5 w-5 mr-3 border-b-2 border-white rounded-full"></span>
                Generating...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Image
              </span>
            )}
          </Button>
          
          <div className="mt-8">
            <ImageGallery images={generatedImages} onEdit={() => {}} loading={isGenerating} />
          </div>
          
          {!user && !isLoading && (
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-sm text-indigo-700 text-center">
                <span className="font-semibold">Pro tip:</span> Sign up for free to save your images and generate HD quality renders
              </p>
            </div>
          )}
        </motion.div>
        
        {/* Pricing Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <PricingTable />
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">🎨</div>
              <h3 className="font-semibold mb-2">HD Renders</h3>
              <p className="text-sm text-gray-600">Unlock 2K+ images with no watermarks</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Faster Generation</h3>
              <p className="text-sm text-gray-600">Pro users get results 3× faster</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">💾</div>
              <h3 className="font-semibold mb-2">Save History</h3>
              <p className="text-sm text-gray-600">Keep your renders in your gallery</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
      
      <AuthModalDialog open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
