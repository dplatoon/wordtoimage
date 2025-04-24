
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SettingsModal } from '@/components/word-to-image/SettingsModal';
import { PromptInput } from '@/components/word-to-image/PromptInput';
import { IntensitySlider } from '@/components/word-to-image/IntensitySlider';
import { ImageGallery } from '@/components/word-to-image/ImageGallery';
import { EditImageModal } from '@/components/word-to-image/EditImageModal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  const [error, setError] = useState<string | null>(null);

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

  const runProgressSimulation = () => {
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 95) {
          clearInterval(progressInterval);
          return 95; // Keep at 95% until we actually get the response
        }
        return newProgress;
      });
    }, 200);
    return progressInterval;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first!");
      return;
    }
    
    setLoading(true);
    setImages([]);
    setProgress(0);
    setError(null);

    // Format the prompt with the intensity value
    const formattedPrompt = formatPrompt(prompt, styleIntensity);
    console.log('Sending prompt to OpenAI:', formattedPrompt);

    try {
      // Start progress animation
      const progressInterval = runProgressSimulation();

      const { data, error } = await supabase.functions.invoke('generate-runware-image', {
        body: { 
          prompt: formattedPrompt,
          size: '1024x1024',
          quality: styleIntensity > 70 ? 'hd' : 'standard'
        }
      });

      clearInterval(progressInterval);

      if (error) {
        console.error('Error generating image:', error);
        setError(error.message || "An unexpected error occurred");
        toast.error("Failed to generate image", { 
          description: error.message || "An unexpected error occurred",
          action: {
            label: "Try Again",
            onClick: handleGenerate
          }
        });
        setLoading(false);
        setProgress(0);
        return;
      }

      if (data?.imageUrl) {
        // Successfully generated the image
        setImages([{ url: data.imageUrl }]);
        setProgress(100);
        toast.success("Image generated successfully!");
      } else {
        setError("No image was returned from the API");
        toast.error("Generation failed", {
          description: "No image was returned from the API",
          action: {
            label: "Try Again",
            onClick: handleGenerate
          }
        });
      }
    } catch (error: any) {
      console.error('Error generating image:', error);
      setError(error?.message || "An unexpected error occurred");
      toast.error("Failed to generate image", {
        description: error?.message || "Something went wrong while processing your request",
        action: {
          label: "Try Again",
          onClick: handleGenerate
        }
      });
    } finally {
      setLoading(false);
      // Ensure progress completes even in error cases
      setProgress(100);
      
      // Reset progress after a short delay
      setTimeout(() => {
        if (!loading) setProgress(0);
      }, 1000);
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
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500 mr-2">Generating image...</span>
            <span className="text-sm font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {error && !loading && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Generation Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGenerate} 
            className="mt-2"
          >
            Try Again
          </Button>
        </Alert>
      )}

      <Button 
        onClick={handleGenerate} 
        disabled={loading || !prompt.trim()} 
        className="mb-6 w-full md:w-auto"
      >
        {loading ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
            Generating...
          </span>
        ) : 'Generate Image'}
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
