
import { toast } from "@/components/ui/sonner";
import { ServiceError, RunwareErrorResponse } from "@/types/errors";

interface GenerateImageOptions {
  prompt: string;
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  n?: number;
}

interface GenerateImageResponse {
  imageUrl: string;
  error?: ServiceError;
}

const handleServiceError = (error: unknown): ServiceError => {
  if (error instanceof Response) {
    return {
      code: 'API_ERROR',
      message: `OpenAI API Error: ${error.statusText}`,
      details: `Status: ${error.status}`
    };
  }

  if (error instanceof Error) {
    return {
      code: 'RUNTIME_ERROR',
      message: error.message,
      details: error.stack
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
    details: String(error)
  };
};

const validateImageResponse = (data: any): boolean => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response format');
  }

  if (!data.imageUrl && !data.error) {
    throw new Error('Response missing required fields');
  }

  return true;
};

export const generateImage = async ({
  prompt,
  size = '1024x1024',
  quality = 'standard',
  n = 1
}: GenerateImageOptions): Promise<GenerateImageResponse> => {
  try {
    if (!prompt?.trim()) {
      throw new Error('Prompt is required');
    }

    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        n,
        size,
        quality
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to generate image: ${response.statusText}`);
    }

    const data = await response.json();
    validateImageResponse(data);

    return {
      imageUrl: data.imageUrl
    };
  } catch (error) {
    console.error('Error generating image:', error);
    
    const serviceError = handleServiceError(error);
    
    let toastMessage = 'Failed to generate image';
    let toastDescription = serviceError.message;
    
    switch (serviceError.code) {
      case 'API_ERROR':
        toastMessage = 'OpenAI API Error';
        break;
      case 'RUNTIME_ERROR':
        toastMessage = 'Application Error';
        break;
      case 'VALIDATION_ERROR':
        toastMessage = 'Invalid Input';
        break;
      default:
        toastMessage = 'Unexpected Error';
    }

    toast.error(toastMessage, {
      description: toastDescription
    });

    return {
      imageUrl: '',
      error: serviceError
    };
  }
};

