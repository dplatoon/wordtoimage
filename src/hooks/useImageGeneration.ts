import { useState } from 'react';
import { generateImage, GenerateImageResponse } from '@/services/api/imageGeneration';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ImageGenerationHookProps, 
  ImageGenerationState,
  ImageGenerationHookReturn
} from '@/types/imageGeneration';

export const useImageGeneration = ({
  onImageGenerated,
  onGeneratingChange,
  onError,
}: ImageGenerationHookProps): ImageGenerationHookReturn => {
  const [state, setState] = useState<ImageGenerationState>({
    isGenerating: false,
    isRetrying: false,
    error: null,
    lastPrompt: null,
    usingServerKey: false
  });
  
  const { user } = useAuth();

  const generateImageFromPrompt = async (
    prompt: string, 
    tempApiKey: string, 
    retry: boolean = false,
    sourceImage: string = ''
  ): Promise<void> => {
    if (state.isRetrying && !retry) return;
    
    if (!prompt.trim() && !retry) {
      toast.error("Empty Prompt", {
        description: "Please enter a description for your image.",
        duration: 5000,
      });
      return;
    }

    if (!user) {
      toast.error("Authentication Required", {
        description: "Please sign in to generate images.",
        duration: 5000,
      });
      return;
    }
    
    setState(prev => ({
      ...prev,
      isGenerating: true,
      isRetrying: retry,
      error: null,
      lastPrompt: prompt
    }));
    
    onGeneratingChange(true);
    onError(null);
    
    try {
      const cleanPrompt = prompt.trim().replace(/^\[(.*?)\]\s*/i, '');
      
      console.log("Generating image with prompt:", cleanPrompt.substring(0, 50) + "...");
      
      const result: GenerateImageResponse = await generateImage({
        prompt: cleanPrompt,
        resolution: '1024x1024',
      });
      
      if (!result.success || !result.generation) {
        throw new Error(result.error || "Generation failed");
      }
      
      const imageUrl = result.generation.image_url;
      
      setState(prev => ({
        ...prev,
        usingServerKey: true
      }));
      
      onImageGenerated(imageUrl);
      
      const creditsMsg = result.creditsRemaining === "unlimited" 
        ? "Premium account - unlimited generations" 
        : `${result.creditsRemaining} credits remaining`;
      
      toast.success("Image Generated!", {
        description: creditsMsg,
        duration: 5000,
      });
      
    } catch (error: any) {
      console.error('Failed to generate image:', error);
      
      const errorMessage = error.message || "Failed to generate image";
      
      setState(prev => ({
        ...prev,
        error: errorMessage
      }));
      
      onError(errorMessage);
      
      // Handle specific error cases
      if (errorMessage.includes("Insufficient credits")) {
        toast.error("Out of Credits", {
          description: "Upgrade to premium for unlimited generations.",
          duration: 8000,
        });
      } else if (errorMessage.includes("Unauthorized")) {
        toast.error("Session Expired", {
          description: "Please sign in again to continue.",
          duration: 8000,
        });
      } else {
        toast.error("Generation Failed", {
          description: errorMessage,
          duration: 8000,
        });
      }
    } finally {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        isRetrying: false
      }));
      onGeneratingChange(false);
    }
  };

  return { 
    generateImageFromPrompt, 
    isRetrying: state.isRetrying,
    state
  };
};
