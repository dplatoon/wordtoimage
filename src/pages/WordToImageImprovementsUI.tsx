
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ImageGallery } from '@/components/word-to-image/ImageGallery';
import { EditImageModal } from '@/components/word-to-image/EditImageModal';
import { TextToImageForm } from '@/components/word-to-image/TextToImageForm';
import { supabase } from '@/integrations/supabase/client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

export default function WordToImageImprovementsUI() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState('');

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

  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first!");
      return;
    }
    
    setLoading(true);
    setImages([]);
    setProgress(0);
    setError(null);
    setCurrentPrompt(prompt);

    console.log('Generating image with prompt:', prompt);

    try {
      const progressInterval = runProgressSimulation();

      const { data, error } = await supabase.functions.invoke('generate-runware-image', {
        body: { 
          prompt: prompt,
          size: '1024x1024',
          quality: 'standard'
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
            onClick: () => handleGenerate(prompt)
          }
        });
        return;
      }

      if (data?.imageUrl) {
        const newImage = { url: data.imageUrl };
        setImages([newImage]);
        setProgress(100);
        toast.success("Image generated successfully!");
        console.log('Image generated successfully:', data.imageUrl);
      } else {
        setError("No image was returned from the API");
        toast.error("Generation failed", {
          description: "No image was returned from the API",
          action: {
            label: "Try Again",
            onClick: () => handleGenerate(prompt)
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
          onClick: () => handleGenerate(prompt)
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

  const handleDownload = (imageUrl: string) => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image download started');
    } catch (error) {
      console.error('Download failed:', error);
      window.open(imageUrl, '_blank');
      toast.success('Image opened in new tab');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <TextToImageForm
            onGenerate={handleGenerate}
            isGenerating={loading}
          />

          {error && !loading && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Generation Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading && (
            <div className="mt-6 text-center">
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-gray-600">Generating your image... {Math.round(progress)}%</p>
              <p className="text-sm text-gray-500 mt-1">"{currentPrompt}"</p>
            </div>
          )}

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
                      loading="lazy"
                      onError={(e) => {
                        console.error('Failed to load generated image:', images[0].url);
                        toast.error('Failed to load the generated image');
                      }}
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
                      onClick={() => handleDownload(images[0].url)}
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
