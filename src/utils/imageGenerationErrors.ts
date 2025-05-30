
export type ImageGenerationErrorType = 
  | 'VALIDATION_ERROR'
  | 'API_ERROR'
  | 'RATE_LIMIT'
  | 'INVALID_API_KEY'
  | 'CONNECTION_ERROR'
  | 'TIMEOUT_ERROR'
  | 'NSFW_CONTENT'
  | 'SERVER_ERROR'
  | 'PROMPT_ERROR'
  | 'MODEL_ERROR'
  | 'PAYMENT_ERROR'
  | 'UNKNOWN_ERROR'
  | 'IMAGE_UPLOAD_ERROR'
  | 'SERVICE_UNAVAILABLE';

export interface ImageGenerationError {
  type: ImageGenerationErrorType;
  message: string;
  details?: string;
  retryable?: boolean;
  severity?: 'error' | 'warning' | 'info';
}

export const getErrorMessage = (error: unknown): ImageGenerationError => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    // API Key related errors
    if (message.includes('api key') || message.includes('authentication') || message.includes('unauthorized')) {
      return {
        type: 'INVALID_API_KEY',
        message: 'Invalid or missing API key',
        details: error.message,
        retryable: false,
        severity: 'error'
      };
    }
    
    // Rate limiting errors
    if (message.includes('rate limit') || message.includes('too many requests')) {
      return {
        type: 'RATE_LIMIT',
        message: 'Rate limit exceeded',
        details: error.message,
        retryable: true,
        severity: 'warning'
      };
    }

    // Content filtering errors
    if (message.includes('nsfw') || message.includes('inappropriate') || message.includes('content policy')) {
      return {
        type: 'NSFW_CONTENT',
        message: 'Content flagged as inappropriate',
        details: error.message,
        retryable: false,
        severity: 'error'
      };
    }

    // Network related errors
    if (message.includes('network') || message.includes('connection') || message.includes('timeout')) {
      return {
        type: 'CONNECTION_ERROR',
        message: 'Network connection error',
        details: error.message,
        retryable: true,
        severity: 'warning'
      };
    }

    // Empty prompt errors
    if (message.includes('empty prompt') || !message.trim()) {
      return {
        type: 'PROMPT_ERROR',
        message: 'Please enter a description',
        details: 'The prompt cannot be empty',
        retryable: false,
        severity: 'info'
      };
    }

    // Image upload errors
    if (message.includes('image format') || message.includes('upload') || message.includes('file')) {
      return {
        type: 'IMAGE_UPLOAD_ERROR',
        message: 'Image upload failed',
        details: error.message,
        retryable: true,
        severity: 'error'
      };
    }

    // Service unavailable
    if (message.includes('service') || message.includes('unavailable') || message.includes('503')) {
      return {
        type: 'SERVICE_UNAVAILABLE',
        message: 'AI service temporarily unavailable',
        details: error.message,
        retryable: true,
        severity: 'warning'
      };
    }

    // Model related errors
    if (message.includes('model')) {
      return {
        type: 'MODEL_ERROR',
        message: 'AI model error',
        details: error.message,
        retryable: true,
        severity: 'error'
      };
    }

    // Payment related errors
    if (message.includes('payment') || message.includes('billing') || message.includes('subscription')) {
      return {
        type: 'PAYMENT_ERROR',
        message: 'Payment required',
        details: 'Please check your account billing status',
        retryable: false,
        severity: 'error'
      };
    }

    return {
      type: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
      details: error.message,
      retryable: true,
      severity: 'error'
    };
  }

  return {
    type: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
    details: String(error),
    retryable: true,
    severity: 'error'
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
        description: 'Your API key appears to be invalid or expired. Please check your API key and try again.',
        action: 'Update API Key'
      };
    case 'RATE_LIMIT':
      return {
        title: 'Too Many Requests',
        description: 'You\'ve reached the rate limit for image generation. Please wait a moment before trying again.',
        action: 'Retry Later'
      };
    case 'CONNECTION_ERROR':
      return {
        title: 'Connection Error',
        description: 'Unable to connect to AI servers. Please check your internet connection.',
        action: 'Retry'
      };
    case 'NSFW_CONTENT':
      return {
        title: 'Content Warning',
        description: 'Your prompt may generate inappropriate content. Please modify it to comply with content policy.'
      };
    case 'PROMPT_ERROR':
      return {
        title: 'Invalid Prompt',
        description: 'Please enter a description for the image you want to generate.'
      };
    case 'IMAGE_UPLOAD_ERROR':
      return {
        title: 'Upload Failed',
        description: 'Failed to process the uploaded image. Please try with a different image.',
        action: 'Try Again'
      };
    case 'SERVICE_UNAVAILABLE':
      return {
        title: 'Service Unavailable',
        description: 'AI service is temporarily unavailable. Please try again in a few moments.',
        action: 'Retry'
      };
    case 'MODEL_ERROR':
      return {
        title: 'AI Model Error',
        description: 'The AI model encountered an issue processing your request. Please try with a different prompt.',
        action: 'Retry'
      };
    case 'PAYMENT_ERROR':
      return {
        title: 'Payment Required',
        description: 'There may be an issue with your account billing. Please check your account status.',
        action: 'Check Account'
      };
    default:
      return {
        title: 'Error',
        description: error.message || 'An unexpected error occurred while generating your image.',
        action: error.retryable ? 'Retry' : undefined
      };
  }
};
