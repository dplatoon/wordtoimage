
import { toast } from "@/components/ui/sonner";
import { ServiceError, RunwareErrorResponse } from "@/types/errors";

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

const handleServiceError = (error: unknown): ServiceError => {
  if (error instanceof Response) {
    return {
      code: 'API_ERROR',
      message: `API Error: ${error.statusText}`,
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
  width = 1024,
  height = 1024,
  model = "runware:100@1",
  numberResults = 1
}: GenerateImageOptions): Promise<GenerateImageResponse> => {
  try {
    if (!prompt?.trim()) {
      throw new Error('Prompt is required');
    }

    const response = await fetch('/api/generate-runware-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        positivePrompt: prompt,
        width,
        height,
        model,
        numberResults
      })
    });

    if (!response.ok) {
      const errorData: RunwareErrorResponse = await response.json();
      throw new Error(errorData.errorMessage || `Failed to generate image: ${response.statusText}`);
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
        toastMessage = 'API Service Error';
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
