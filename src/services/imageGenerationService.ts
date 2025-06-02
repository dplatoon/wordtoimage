
import { toast } from "@/components/ui/sonner";
import { ServiceError } from "@/types/errors";
import { ImageGenerationError, handleApiError, getErrorDisplayMessage } from "@/utils/errorUtils";
import { ImageGenerationOptions, ImageGenerationResponse } from "@/types/imageGeneration";
import { supabase } from "@/integrations/supabase/client";

export const generateImageWithAI = async (options: ImageGenerationOptions): Promise<ImageGenerationResponse> => {
  console.log('AI Image Generation Request:', {
    ...options,
    prompt: options.prompt.substring(0, 20) + '...',
    hasSourceImage: !!options.sourceImage,
    apiKey: options.apiKey ? '[API KEY PROVIDED]' : '[NO API KEY]'
  });
  
  try {
    if (!options.prompt?.trim()) {
      throw new ImageGenerationError('Prompt is required', 'VALIDATION_ERROR');
    }

    // Use Replicate for image-to-image, or when user prefers it
    // Use DALL-E for simple text-to-image
    const useReplicate = !!options.sourceImage || !options.apiKey;
    
    if (useReplicate) {
      console.log('Using Replicate API for image generation');
      
      const response = await supabase.functions.invoke('generate-replicate-image', {
        body: {
          prompt: options.prompt,
          sourceImage: options.sourceImage || null,
          size: options.size || '1024x1024',
          userId: options.userId || null
        }
      });
      
      const { data, error } = response;
      console.log('Replicate Response:', data, error);

      if (error) {
        console.error('Replicate Edge Function Error:', error);
        throw new ImageGenerationError(
          error.message || 'Failed to generate image with Replicate',
          'API_ERROR',
          JSON.stringify(error)
        );
      }

      if (!data || !data.imageUrl) {
        console.error('No image URL received from Replicate');
        throw new ImageGenerationError('No image URL received', 'API_ERROR');
      }

      console.log('Replicate image generation successful');
      
      return {
        imageUrl: data.imageUrl,
        usingServerKey: data.usingServerKey === true,
        metadata: data.metadata || {}
      };
      
    } else {
      // Fallback to existing DALL-E service
      console.log('Using DALL-E API for image generation');
      
      const response = await supabase.functions.invoke('generate-runware-image', {
        body: {
          prompt: options.prompt,
          n: options.numberResults || 1,
          size: options.size || '1024x1024',
          quality: options.quality || 'standard',
          apiKey: options.apiKey || null,
          userId: options.userId || null,
          sourceImage: null // DALL-E doesn't support source images
        }
      });
      
      const { data, error } = response;

      if (error) {
        console.error('DALL-E Edge Function Error:', error);
        throw new ImageGenerationError(
          error.message || 'Failed to generate image with DALL-E',
          'API_ERROR',
          JSON.stringify(error)
        );
      }

      if (!data || !data.imageUrl) {
        console.error('No image URL received from DALL-E');
        throw new ImageGenerationError('No image URL received', 'API_ERROR');
      }

      console.log('DALL-E image generation successful');
      
      return {
        imageUrl: data.imageUrl,
        usingServerKey: data.usingServerKey === true,
        metadata: data.metadata || {}
      };
    }
    
  } catch (error) {
    console.error('Error generating image:', error);
    
    const serviceError = handleApiError(error);
    const displayMessage = getErrorDisplayMessage(serviceError);
    
    toast.error("Generation Failed", {
      description: displayMessage
    });

    return {
      imageUrl: '',
      error: serviceError
    };
  }
};
