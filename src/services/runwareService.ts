
import { toast } from "@/components/ui/sonner";
import { ServiceError } from "@/types/errors";
import { ImageGenerationError, handleApiError, getErrorDisplayMessage } from "@/utils/errorUtils";
import { ImageGenerationOptions, ImageGenerationResponse } from "@/types/imageGeneration";
import { supabase } from "@/integrations/supabase/client";

export const generateImage = async (options: ImageGenerationOptions): Promise<ImageGenerationResponse> => {
  console.log('Image Generation Request:', options);
  
  try {
    if (!options.prompt?.trim()) {
      throw new ImageGenerationError('Prompt is required', 'VALIDATION_ERROR');
    }

    // Call the Supabase Edge Function
    console.log('Calling Supabase Edge Function: generate-runware-image');
    const { data, error } = await supabase.functions.invoke('generate-runware-image', {
      body: {
        prompt: options.prompt,
        n: options.numberResults || 1,
        size: options.size || '1024x1024',
        quality: options.quality || 'standard'
      }
    });

    console.log('Edge Function Response:', data, error);

    if (error) {
      console.error('Supabase Edge Function Error:', error);
      throw new ImageGenerationError(
        error.message || 'Failed to generate image',
        'API_ERROR',
        JSON.stringify(error)
      );
    }

    if (!data || !data.imageUrl) {
      console.error('No image URL received');
      throw new ImageGenerationError('No image URL received', 'API_ERROR');
    }

    console.log('Image generation successful');
    return {
      imageUrl: data.imageUrl
    };
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
