
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SettingsModal } from '@/components/word-to-image/SettingsModal';
import { PromptInput } from '@/components/word-to-image/PromptInput';
import { IntensitySlider } from '@/components/word-to-image/IntensitySlider';
import { ImageGallery } from '@/components/word-to-image/ImageGallery';
import { EditImageModal } from '@/components/word-to-image/EditImageModal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

export default function WordToImageImprovementsUI() {
  const [prompt, setPrompt] = useState('');
  const [history] = useState<string[]>([]);
  const [suggestions] = useState<string[]>([
    'Futuristic cityscape at dusk, watercolor style',
    'Surreal desert landscape with neon lights',
    'Portrait of a cyberpunk character, cinematic lighting'
  ]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [styleIntensity, setStyleIntensity] = useState(50);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Format the prompt for better compatibility with DALL-E
  const formatPrompt = (basePrompt: string, intensity: number) => {
    if (!basePrompt.trim()) return '';
    
    let formattedPrompt = basePrompt.trim();
    
    // Only add intensity modifiers if it's not at the default level
    if (intensity !== 50) {
      const intensityPhrase = intensity > 50 
        ? `Detailed, high quality render with ${intensity}% enhanced details.` 
        : `Simple, minimalist style with ${intensity}% reduced details.`;
      
      formattedPrompt = `${formattedPrompt}. ${intensityPhrase}`;
    }
    
    return formattedPrompt;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first!");
      return;
    }
    
    setLoading(true);
    setImages([]);
    setProgress(0);

    // Format the prompt with the intensity value
    const formattedPrompt = formatPrompt(prompt, styleIntensity);
    console.log('Sending prompt to OpenAI:', formattedPrompt);

    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 95) {
            clearInterval(progressInterval);
            return 95; // Keep at 95% until we actually get the response
          }
          return newProgress;
        });
      }, 200);

      const { data, error } = await supabase.functions.invoke('generate-runware-image', {
        body: { prompt: formattedPrompt }
      });

      clearInterval(progressInterval);

      if (error) {
        console.error('Error generating image:', error);
        toast.error("Failed to generate image", { 
          description: error.message || "An unexpected error occurred" 
        });
        setLoading(false);
        setProgress(0);
        return;
      }

      if (data?.imageUrl) {
        // Successfully generated the image
        setImages([{ url: data.imageUrl }]);
        toast.success("Image generated successfully!");
      } else {
        toast.error("No image was returned from the API");
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error("Failed to generate image", {
        description: "Something went wrong while processing your request"
      });
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const openEditor = (imgUrl: string) => {
    setSelectedImage(imgUrl);
    setEditModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setSettingsModalOpen(true)}
        >
          Settings
        </Button>
      </div>

      <PromptInput
        prompt={prompt}
        onPromptChange={setPrompt}
        suggestions={suggestions}
      />

      <IntensitySlider
        value={styleIntensity}
        onChange={setStyleIntensity}
      />

      {loading && (
        <motion.div
          className="h-1 bg-blue-500 mb-4 rounded"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
        />
      )}

      <Button onClick={handleGenerate} disabled={loading} className="mb-6">
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate'}
      </Button>

      <ImageGallery
        images={images}
        onEdit={openEditor}
        loading={loading}
      />

      <EditImageModal
        imageUrl={selectedImage}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />

      <SettingsModal
        open={settingsModalOpen}
        onOpenChange={setSettingsModalOpen}
      />
    </div>
  );
}
