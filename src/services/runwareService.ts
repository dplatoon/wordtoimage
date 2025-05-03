
import { toast } from "@/components/ui/sonner";
import { ServiceError } from "@/types/errors";
import { ImageGenerationError, handleApiError, getErrorDisplayMessage } from "@/utils/errorUtils";
import { ImageGenerationOptions, ImageGenerationResponse } from "@/types/imageGeneration";
import { supabase } from "@/integrations/supabase/client";

const isDevelopmentMode = false; // Set this to false now that we have a real API key

export const generateImage = async (options: ImageGenerationOptions): Promise<ImageGenerationResponse> => {
  console.log('Image Generation Request:', {
    ...options,
    prompt: options.prompt.substring(0, 20) + '...',
    apiKey: options.apiKey ? '[API KEY PROVIDED]' : '[NO API KEY]',
    sourceImage: options.sourceImage ? '[SOURCE IMAGE PROVIDED]' : '[NO SOURCE IMAGE]'
  });
  
  try {
    if (!options.prompt?.trim()) {
      throw new ImageGenerationError('Prompt is required', 'VALIDATION_ERROR');
    }

    console.log('Calling Supabase Edge Function: generate-runware-image');
    
    const response = await supabase.functions.invoke('generate-runware-image', {
      body: {
        prompt: options.prompt,
        n: options.numberResults || 1,
        size: options.size || '1024x1024',
        quality: options.quality || 'standard',
        apiKey: options.apiKey || null,
        userId: options.userId || null,
        sourceImage: options.sourceImage || null
      }
    });
    
    const { data, error } = response;
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

    const usingServerKey = data.usingServerKey === true;
    console.log('Image generation successful', usingServerKey ? 'using server API key' : 'using user API key');
    
    return {
      imageUrl: data.imageUrl,
      usingServerKey,
      metadata: data.metadata || {}
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
