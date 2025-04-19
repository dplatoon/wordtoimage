
import { useState } from 'react';
import { generateImage } from '@/services/runwareService';
import { toast } from '@/components/ui/sonner';
import { getErrorMessage, getErrorDisplayDetails } from '@/utils/imageGenerationErrors';

interface UseImageGenerationProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
}

export const useImageGeneration = ({
  onImageGenerated,
  onGeneratingChange,
  onError,
}: UseImageGenerationProps) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const generateImageFromPrompt = async (prompt: string, tempApiKey: string, retry: boolean = false) => {
    if (!tempApiKey) {
      toast.error('API Key Required', {
        description: 'Please enter your OpenAI API key to generate images.',
        action: {
          label: 'Add API Key',
          onClick: () => {} // This will be handled by the parent component
        }
      });
      return;
    }

    if (!prompt.trim()) {
      const error = getErrorMessage(new Error('Empty prompt'));
      const errorDetails = getErrorDisplayDetails(error);
      
      toast.error(errorDetails.title, {
        description: errorDetails.description,
        duration: 5000,
        action: {
          label: 'Dismiss',
          onClick: () => {}
        }
      });
      return;
    }
    
    if (isRetrying && !retry) return;
    setIsRetrying(retry);
    onGeneratingChange(true);
    onError(null);
    
    try {
      const options = { 
        prompt: prompt.trim(),
        size: '1024x1024' as '1024x1024',
        quality: 'standard' as 'standard'
      };
      
      const result = await generateImage(options);
      
      if (result.error) {
        const error = getErrorMessage(result.error);
        const errorDetails = getErrorDisplayDetails(error);
        throw new Error(errorDetails.description);
      }
      
      if (result.imageUrl) {
        onImageGenerated(result.imageUrl);
        toast.success("Image Generated!", {
          description: "Your custom graphic is ready to download.",
          duration: 5000,
          action: {
            label: 'Generate Another',
            onClick: () => generateImageFromPrompt(prompt, tempApiKey, false)
          }
        });
      } else {
        throw new Error("No image URL received");
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
      
      const processedError = getErrorMessage(error);
      const errorDetails = getErrorDisplayDetails(processedError);
      
      onError(errorDetails.description);
      
      toast.error(errorDetails.title, {
        description: errorDetails.description,
        duration: 8000,
        action: errorDetails.action ? {
          label: errorDetails.action,
          onClick: () => {
            if (errorDetails.action === 'Retry') {
              generateImageFromPrompt(prompt, tempApiKey, true);
            }
          }
        } : undefined
      });
    } finally {
      onGeneratingChange(false);
      setIsRetrying(false);
    }
  };

  return { generateImageFromPrompt, isRetrying };
};
