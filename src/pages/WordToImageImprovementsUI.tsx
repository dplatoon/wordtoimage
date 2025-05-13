
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PromptInput } from '@/components/word-to-image/PromptInput';
import { ImageGallery } from '@/components/word-to-image/ImageGallery';
import { EditImageModal } from '@/components/word-to-image/EditImageModal';
import { SettingsPanel } from '@/components/word-to-image/settings/SettingsPanel';
import { StyleSlider } from '@/components/word-to-image/style/StyleSlider';
import { GenerateSection } from '@/components/word-to-image/generate/GenerateSection';
import { supabase } from '@/integrations/supabase/client';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function WordToImageImprovementsUI() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [styleIntensity, setStyleIntensity] = useState(50);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const promptSuggestions = [
    "A futuristic cityscape at dusk, watercolor style",
    "Serene mountain lake with reflection, photorealistic",
    "Abstract geometric patterns in vibrant colors",
    "Whimsical forest with magical creatures, illustration style"
  ];

  const formatPrompt = (basePrompt: string, intensity: number) => {
    if (!basePrompt.trim()) return '';
    
    let formattedPrompt = basePrompt.trim();
    
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
          return 95;
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

    const formattedPrompt = formatPrompt(prompt, styleIntensity);
    console.log('Sending prompt to OpenAI:', formattedPrompt);

    try {
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
        return;
      }

      if (data?.imageUrl) {
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
      setProgress(100);
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <PromptInput
            prompt={prompt}
            onPromptChange={setPrompt}
            suggestions={promptSuggestions}
          />

          <StyleSlider
            value={styleIntensity}
            onChange={setStyleIntensity}
          />

          {error && !loading && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Generation Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <GenerateSection
            loading={loading}
            progress={progress}
            onGenerate={handleGenerate}
            disabled={!prompt.trim()}
          />

          <div className="mt-8">
            {images.length > 0 && !loading && (
              <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Generated Image</h2>
                <div className="max-w-xl mx-auto">
                  <AspectRatio ratio={1} className="overflow-hidden rounded-lg shadow-md">
                    <img 
                      src={images[0].url} 
                      alt="AI generated image" 
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                  <div className="mt-4 flex justify-center space-x-4">
                    <Button 
                      onClick={() => openEditor(images[0].url)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Edit Image
                    </Button>
                    <Button
                      onClick={() => window.open(images[0].url, '_blank')}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <ImageGallery
              images={images}
              onEdit={openEditor}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <EditImageModal
        imageUrl={selectedImage}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />
    </div>
  );
}

const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) => {
  return (
    <button
      className={`flex items-center justify-center font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
