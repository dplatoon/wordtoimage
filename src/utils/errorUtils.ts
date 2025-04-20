
import { ServiceError } from '@/types/errors';

export class ImageGenerationError extends Error {
  code: string;
  details?: string;

  constructor(message: string, code: string = 'GENERATION_ERROR', details?: string) {
    super(message);
    this.name = 'ImageGenerationError';
    this.code = code;
    this.details = details;
  }
}

export const handleApiError = (error: unknown): ServiceError => {
  if (error instanceof ImageGenerationError) {
    return {
      code: error.code,
      message: error.message,
      details: error.details
    };
  }

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

export const getErrorDisplayMessage = (error: ServiceError): string => {
  switch (error.code) {
    case 'INVALID_API_KEY':
      return 'Invalid API key. Please check your credentials.';
    case 'RATE_LIMIT':
      return 'Rate limit exceeded. Please try again later.';
    case 'VALIDATION_ERROR':
      return 'Invalid input parameters. Please check your prompt.';
    case 'API_ERROR':
      if (error.details?.includes('openai') || error.details?.includes('API')) {
        return `OpenAI API error: ${error.message}`;
      }
      return `Service is temporarily unavailable. ${error.details || ''}`;
    case 'API_NOT_FOUND':
      return 'Image generation API is not configured. Please check the server setup.';
    default:
      return error.message || 'An unexpected error occurred';
  }
};
