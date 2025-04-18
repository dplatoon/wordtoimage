
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
  | 'UNKNOWN_ERROR';

export interface ImageGenerationError {
  type: ImageGenerationErrorType;
  message: string;
  details?: string;
  retryable?: boolean;
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
        retryable: false
      };
    }
    
    // Rate limiting errors
    if (message.includes('rate limit') || message.includes('too many requests')) {
      return {
        type: 'RATE_LIMIT',
        message: 'Rate limit exceeded',
        details: error.message,
        retryable: true
      };
    }

    // Content filtering errors
    if (message.includes('nsfw') || message.includes('inappropriate') || message.includes('content policy')) {
      return {
        type: 'NSFW_CONTENT',
        message: 'Content flagged as inappropriate',
        details: error.message,
        retryable: false
      };
    }

    // Network related errors
    if (message.includes('network') || message.includes('connection') || message.includes('timeout')) {
      return {
        type: 'CONNECTION_ERROR',
        message: 'Network connection error',
        details: error.message,
        retryable: true
      };
    }

    // Prompt related errors
    if (message.includes('prompt')) {
      return {
        type: 'PROMPT_ERROR',
        message: 'Invalid or inappropriate prompt',
        details: error.message,
        retryable: false
      };
    }

    // Model related errors
    if (message.includes('model')) {
      return {
        type: 'MODEL_ERROR',
        message: 'Model processing error',
        details: error.message,
        retryable: true
      };
    }

    // Payment/quota errors
    if (message.includes('quota') || message.includes('payment') || message.includes('subscription')) {
      return {
        type: 'PAYMENT_ERROR',
        message: 'Payment or quota error',
        details: error.message,
        retryable: false
      };
    }

    // Server errors
    if (message.includes('server') || message.includes('5xx')) {
      return {
        type: 'SERVER_ERROR',
        message: 'Server error occurred',
        details: error.message,
        retryable: true
      };
    }

    return {
      type: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
      details: error.message,
      retryable: true
    };
  }

  return {
    type: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
    details: String(error),
    retryable: true
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
        description: 'Please check your API key and try again.',
        action: 'Update API Key'
      };
    case 'RATE_LIMIT':
      return {
        title: 'Too Many Requests',
        description: 'Please wait a moment before trying again.',
        action: 'Retry Later'
      };
    case 'CONNECTION_ERROR':
      return {
        title: 'Connection Error',
        description: 'Please check your internet connection.',
        action: 'Retry'
      };
    case 'NSFW_CONTENT':
      return {
        title: 'Content Warning',
        description: 'Your prompt may generate inappropriate content. Please modify it.',
      };
    case 'PROMPT_ERROR':
      return {
        title: 'Invalid Prompt',
        description: 'Please modify your prompt and try again.'
      };
    case 'MODEL_ERROR':
      return {
        title: 'Model Error',
        description: 'The AI model encountered an error. Please try again.',
        action: 'Retry'
      };
    case 'PAYMENT_ERROR':
      return {
        title: 'Payment Required',
        description: 'Please check your subscription or quota.',
      };
    case 'SERVER_ERROR':
      return {
        title: 'Server Error',
        description: 'Our servers are experiencing issues. Please try again later.',
        action: 'Retry'
      };
    default:
      return {
        title: 'Error',
        description: error.message,
        action: error.retryable ? 'Retry' : undefined
      };
  }
};
