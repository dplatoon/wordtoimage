
import { toast } from "@/components/ui/sonner";
import { ServiceError } from "@/types/errors";
import { ImageGenerationError, handleApiError, getErrorDisplayMessage } from "@/utils/errorUtils";
import { ImageGenerationOptions, ImageGenerationResponse } from "@/types/imageGeneration";
import { supabase } from "@/integrations/supabase/client";

// Sample placeholder images for development mode
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1682687220363-35e4589b28b0?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1682687220499-d9c06b872eee?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1688590361364-2d30405168e4?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1682687220208-22ac9ae8b817?w=500&auto=format&fit=crop&q=60"
];

// Toggle for development mode - change to false to enable real API calls
const isDevelopmentMode = false; // <-- set false to stop auto-generate simulation

export const generateImage = async (options: ImageGenerationOptions): Promise<ImageGenerationResponse> => {
  console.log('Image Generation Request:', options);
  
  try {
    if (!options.prompt?.trim()) {
      throw new ImageGenerationError('Prompt is required', 'VALIDATION_ERROR');
    }

    if (isDevelopmentMode) {
      console.log('DEVELOPMENT MODE: Using placeholder image instead of API call');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get a random placeholder image
      const randomIndex = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
      const placeholderUrl = PLACEHOLDER_IMAGES[randomIndex];
      
      return {
        imageUrl: placeholderUrl,
        usingServerKey: true,
        metadata: {
          model: "dall-e-3-dev-mode",
          promptId: `dev-${Date.now()}`,
          size: options.size,
          createdAt: new Date().toISOString(),
          userId: options.userId || undefined
        }
      };
    }

    // PRODUCTION CODE - Will be used when isDevelopmentMode is false
    console.log('Calling Supabase Edge Function: generate-runware-image');
    const { data, error } = await supabase.functions.invoke('generate-runware-image', {
      body: {
        prompt: options.prompt,
        n: options.numberResults || 1,
        size: options.size || '1024x1024',
        quality: options.quality || 'standard',
        apiKey: options.apiKey || null, // Pass user API key only if provided
        userId: options.userId || null  // Pass user ID if available
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

    // Add information about whether we used server key
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
