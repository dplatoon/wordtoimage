
import { toast } from "@/components/ui/sonner";
import { ServiceError, RunwareErrorResponse } from "@/types/errors";
import { ImageGenerationError, handleApiError, getErrorDisplayMessage } from "@/utils/errorUtils";

interface GenerateImageOptions {
  prompt: string;
  width?: number;
  height?: number;
  model?: string;
  numberResults?: number;
}

interface GenerateImageResponse {
  imageUrl: string;
  error?: ServiceError;
}

export const generateImage = async ({
  prompt,
  width = 1024,
  height = 1024,
  model = "runware:100@1",
  numberResults = 1
}: GenerateImageOptions): Promise<GenerateImageResponse> => {
  const apiKey = localStorage.getItem('temp_runware_key');
  
  console.log('Image Generation Request:', { 
    prompt, 
    width, 
    height, 
    model, 
    numberResults, 
    hasApiKey: !!apiKey 
  });
  
  try {
    if (!apiKey) {
      throw new Error('No API key found. Please add a Runware API key.');
    }

    if (!prompt?.trim()) {
      throw new ImageGenerationError('Prompt is required', 'VALIDATION_ERROR');
    }

    const response = await fetch('/api/generate-runware-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        positivePrompt: prompt,
        width,
        height,
        model,
        numberResults
      })
    });

    console.log('Runware API Response Status:', response.status);

    if (!response.ok) {
      let errorData: RunwareErrorResponse;
      try {
        errorData = await response.json();
        console.error('Runware API Error:', errorData);

        // Handle case where we receive a proper error response
        throw new ImageGenerationError(
          errorData.errorMessage || `Failed to generate image: ${response.statusText}`,
          'API_ERROR',
          JSON.stringify(errorData.errors)
        );
      } catch (jsonError) {
        // If we can't parse the error response JSON, throw a generic error
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
