
export type ImageGenerationErrorType = 
  | 'VALIDATION_ERROR'
  | 'API_ERROR'
  | 'RATE_LIMIT'
  | 'INVALID_API_KEY'
  | 'CONNECTION_ERROR'
  | 'TIMEOUT_ERROR'
  | 'NSFW_CONTENT'
  | 'UNKNOWN_ERROR';

export interface ImageGenerationError {
  type: ImageGenerationErrorType;
  message: string;
  details?: string;
}

export const getErrorMessage = (error: unknown): ImageGenerationError => {
  if (error instanceof Error) {
    // Check for specific error messages to categorize them
    if (error.message.includes('API key')) {
      return {
        type: 'INVALID_API_KEY',
        message: 'Invalid API key. Please check your credentials.',
        details: error.message
      };
    }
    
    if (error.message.includes('rate limit')) {
      return {
        type: 'RATE_LIMIT',
        message: 'Too many requests. Please try again later.',
        details: error.message
      };
    }

    if (error.message.includes('NSFW')) {
      return {
        type: 'NSFW_CONTENT',
        message: 'Content flagged as inappropriate. Please modify your prompt.',
        details: error.message
      };
    }

    if (error.message.includes('network') || error.message.includes('connection')) {
      return {
        type: 'CONNECTION_ERROR',
        message: 'Network connection error. Please check your internet connection.',
        details: error.message
      };
    }

    return {
      type: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
      details: error.message
    };
  }

  return {
    type: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
    details: String(error)
  };
};

export const getErrorDisplayDetails = (error: ImageGenerationError): {
  title: string;
  description: string;
  action?: string;
} => {
  switch (error.type) {
    case 'INVALID_API_KEY':
      return {
        title: 'Authentication Failed',
        description: 'Your API key appears to be invalid. Please check your credentials.',
        action: 'Update API Key'
      };
    case 'RATE_LIMIT':
      return {
        title: 'Rate Limit Exceeded',
        description: 'You\'ve reached the maximum number of requests. Please try again later.',
      };
    case 'CONNECTION_ERROR':
      return {
        title: 'Connection Error',
        description: 'Unable to connect to the service. Please check your internet connection.',
        action: 'Retry'
      };
    case 'NSFW_CONTENT':
      return {
        title: 'Content Warning',
        description: 'Your prompt may generate inappropriate content. Please modify it.',
      };
    case 'VALIDATION_ERROR':
      return {
        title: 'Invalid Input',
        description: 'Please check your input and try again.',
      };
    default:
      return {
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
      };
  }
};
