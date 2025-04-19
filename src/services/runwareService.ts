
import { toast } from "@/components/ui/sonner";
import { ServiceError } from "@/types/errors";
import { ImageGenerationError, handleApiError, getErrorDisplayMessage } from "@/utils/errorUtils";

interface GenerateImageOptions {
  prompt: string;
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  numberResults?: number;
}

interface GenerateImageResponse {
  imageUrl: string;
  error?: ServiceError;
}

export const generateImage = async ({
  prompt,
  size = '1024x1024',
  quality = 'standard',
  numberResults = 1
}: GenerateImageOptions): Promise<GenerateImageResponse> => {
  console.log('Image Generation Request:', { 
    prompt, 
    size, 
    quality, 
    numberResults
  });
  
  try {
    if (!prompt?.trim()) {
      throw new ImageGenerationError('Prompt is required', 'VALIDATION_ERROR');
    }

    const response = await fetch('/api/generate-runware-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        n: numberResults,
        size,
        quality
      })
    });

    console.log('API Response Status:', response.status);

    if (!response.ok) {
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
