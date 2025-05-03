
import { useState } from 'react';
import { generateImage } from '@/services/runwareService';
import { toast } from '@/components/ui/sonner';
import { getErrorMessage, getErrorDisplayDetails } from '@/utils/imageGenerationErrors';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ImageGenerationHookProps, 
  ImageGenerationOptions, 
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
  
  // Get the current authenticated user
  const { user } = useAuth();

  const generateImageFromPrompt = async (
    prompt: string, 
    tempApiKey: string, 
    retry: boolean = false,
    sourceImage: string = ''
  ): Promise<void> => {
    // If this is a retry and we're already retrying, skip
    if (state.isRetrying && !retry) return;
    
    // Empty prompt check
    if (!prompt.trim() && !retry) {
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
      // For server key check, use a simplified special prompt
      const finalPrompt = retry && prompt.includes('server key check') 
        ? prompt 
        : prompt.trim().replace(/^\[(.*?)\]\s*/i, ''); // Remove style tags for better compatibility
      
      const options: ImageGenerationOptions = {
        prompt: finalPrompt,
        size: '1024x1024',
        quality: 'standard',
        numberResults: 1,
        apiKey: tempApiKey || null, // Pass API key only if provided
        userId: user?.id || null,    // Pass user ID if authenticated
        sourceImage: sourceImage || undefined // Pass source image if available
      };
      
      console.log("Calling generate image with options:", {
        prompt: options.prompt.substring(0, 20) + "...",
        size: options.size,
        quality: options.quality,
        userId: options.userId ? "provided" : "not provided",
        hasSourceImage: !!sourceImage
      });
      
      const result = await generateImage(options);
      
      if (result.error) {
        console.error("Generation error in result:", result.error);
        const error = getErrorMessage(result.error);
        const errorDetails = getErrorDisplayDetails(error);
        throw new Error(errorDetails.description);
      }
      
      if (result.imageUrl) {
        // Update state with info about whether we're using server key
        setState(prev => ({
          ...prev,
          usingServerKey: result.usingServerKey || false
        }));
        
        onImageGenerated(result.imageUrl);
        
        if (!retry) {
          toast.success("Image Generated!", {
            description: "Your custom graphic is ready to download.",
            duration: 5000,
            action: {
              label: 'Generate Another',
              onClick: () => generateImageFromPrompt(prompt, tempApiKey, false, sourceImage)
            }
          });
        }
      } else {
        throw new Error("No image URL received");
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
      
      if (retry) {
        // If this was a server key check and it failed, don't show error toast
        console.log("Server key check failed");
        throw error;
      }
      
      const processedError = getErrorMessage(error);
      const errorDetails = getErrorDisplayDetails(processedError);
      
      setState(prev => ({
        ...prev,
        error: errorDetails.description
      }));
      
      onError(errorDetails.description);
      
      toast.error(errorDetails.title, {
        description: errorDetails.description,
        duration: 8000,
        action: errorDetails.action ? {
          label: errorDetails.action,
          onClick: () => {
            if (errorDetails.action === 'Retry') {
              generateImageFromPrompt(prompt, tempApiKey, true, sourceImage);
            }
          }
        } : undefined
      });
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
