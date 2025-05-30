
import { toast } from "@/components/ui/sonner";
import { ServiceError } from "@/types/errors";
import { getErrorMessage, getErrorDisplayDetails } from "@/utils/imageGenerationErrors";
import { ImageGenerationOptions, ImageGenerationResponse } from "@/types/imageGeneration";
import { supabase } from "@/integrations/supabase/client";

// Service health check
const checkServiceHealth = async (): Promise<{ replicate: boolean; openai: boolean }> => {
  console.log('Checking service health...');
  
  try {
    // Test Replicate connection with a simple request
    const replicateTest = await supabase.functions.invoke('generate-replicate-image', {
      body: { prompt: 'server key check' }
    });
    
    return {
      replicate: !replicateTest.error,
      openai: true // We'll assume OpenAI is available if user provides key
    };
  } catch (error) {
    console.error('Service health check failed:', error);
    return { replicate: false, openai: false };
  }
};

export const generateImageWithAI = async (options: ImageGenerationOptions): Promise<ImageGenerationResponse> => {
  console.log('AI Image Generation Request:', {
    ...options,
    prompt: options.prompt.substring(0, 30) + '...',
    hasSourceImage: !!options.sourceImage,
    apiKey: options.apiKey ? '[API KEY PROVIDED]' : '[NO API KEY]'
  });
  
  try {
    if (!options.prompt?.trim()) {
      const error = getErrorMessage(new Error('Prompt is required'));
      throw new Error(error.message);
    }

    // Check service health
    const serviceHealth = await checkServiceHealth();
    console.log('Service health:', serviceHealth);

    // Determine which service to use based on requirements and availability
    const useReplicate = !!options.sourceImage || !options.apiKey || !serviceHealth.openai;
    
    if (useReplicate && !serviceHealth.replicate) {
      throw new Error('AI service is temporarily unavailable. Please try again later.');
    }
    
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
      console.log('Replicate Response:', { 
        hasData: !!data, 
        hasError: !!error,
        imageUrl: data?.imageUrl ? 'received' : 'missing'
      });

      if (error) {
        console.error('Replicate Edge Function Error:', error);
        const processedError = getErrorMessage(new Error(error.message || 'Failed to generate image with Replicate'));
        throw new Error(processedError.message);
      }

      if (!data || !data.imageUrl) {
        console.error('No image URL received from Replicate');
        throw new Error('No image URL received from AI service');
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
      console.log('DALL-E Response:', { 
        hasData: !!data, 
        hasError: !!error,
        imageUrl: data?.imageUrl ? 'received' : 'missing'
      });

      if (error) {
        console.error('DALL-E Edge Function Error:', error);
        const processedError = getErrorMessage(new Error(error.message || 'Failed to generate image with DALL-E'));
        throw new Error(processedError.message);
      }

      if (!data || !data.imageUrl) {
        console.error('No image URL received from DALL-E');
        throw new Error('No image URL received from AI service');
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
    
    const processedError = getErrorMessage(error);
    const errorDetails = getErrorDisplayDetails(processedError);
    
    toast.error(errorDetails.title, {
      description: errorDetails.description,
      duration: 8000,
      action: errorDetails.action ? {
        label: errorDetails.action,
        onClick: () => {}
      } : undefined
    });

    return {
      imageUrl: '',
      error: {
        code: processedError.type,
        message: processedError.message,
        details: processedError.details
      }
    };
  }
};
