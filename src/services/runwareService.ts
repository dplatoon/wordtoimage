
import { toast } from "@/components/ui/sonner";
import { ServiceError } from "@/types/errors";
import { ImageGenerationError, handleApiError, getErrorDisplayMessage } from "@/utils/errorUtils";
import { ImageGenerationOptions, ImageGenerationResponse } from "@/types/imageGeneration";

export const generateImage = async (options: ImageGenerationOptions): Promise<ImageGenerationResponse> => {
  console.log('Image Generation Request:', options);
  
  try {
    if (!options.prompt?.trim()) {
      throw new ImageGenerationError('Prompt is required', 'VALIDATION_ERROR');
    }

    const response = await fetch('/api/generate-runware-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: options.prompt,
        n: options.numberResults || 1,
        size: options.size,
        quality: options.quality
      })
    });

    console.log('API Response Status:', response.status);

    if (!response.ok) {
      // Check specifically for 404 errors (endpoint not found)
      if (response.status === 404) {
        throw new ImageGenerationError(
          'Image generation service is not available. Please make sure the API is properly configured.',
          'API_NOT_FOUND'
        );
      }
      
      let errorData;
      try {
        errorData = await response.json();
        console.error('API Error:', errorData);

        throw new ImageGenerationError(
          errorData.errorMessage || `Failed to generate image: ${response.statusText}`,
          'API_ERROR',
          JSON.stringify(errorData.errors)
        );
      } catch (jsonError) {
        if (jsonError instanceof ImageGenerationError) {
          throw jsonError;
        }
        
        console.error('Failed to parse error response:', jsonError);
        throw new ImageGenerationError(
          `Failed to generate image (HTTP ${response.status})`,
          'API_ERROR'
        );
      }
    }

    let data;
    try {
      data = await response.json();
      console.log('Received Image Data:', data);
    } catch (parseError) {
      console.error('Failed to parse response JSON:', parseError);
      throw new ImageGenerationError('Invalid response format', 'API_ERROR');
    }

    if (!data || typeof data !== 'object') {
      throw new ImageGenerationError('Invalid response format', 'API_ERROR');
    }

    if (!data.imageUrl) {
      throw new ImageGenerationError('No image URL received', 'API_ERROR');
    }

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
