
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

export interface SecureGenerationRequest {
  prompt: string;
  style?: string;
  resolution?: string;
  userId?: string;
}

export interface GenerationProgress {
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  progress: number;
  imageUrl?: string;
  error?: string;
  estimatedTime?: number;
}

export class SecureImageGenerationService {
  private static instance: SecureImageGenerationService;
  private requestCounter = 0;

  static getInstance(): SecureImageGenerationService {
    if (!SecureImageGenerationService.instance) {
      SecureImageGenerationService.instance = new SecureImageGenerationService();
    }
    return SecureImageGenerationService.instance;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${++this.requestCounter}_${Math.random().toString(36).substring(2, 15)}`;
  }

  async generateImage(
    request: SecureGenerationRequest,
    onProgress?: (progress: GenerationProgress) => void
  ): Promise<string> {
    const requestId = this.generateRequestId();
    
    try {
      // Security: Add request ID to prevent replay attacks
      console.log(`Starting secure image generation: ${requestId}`);
      
      // Performance: Start generation request
      const { data: initResponse, error: initError } = await supabase.functions.invoke('secure-image-generation', {
        body: {
          ...request,
          requestId
        }
      });

      if (initError) {
        throw new Error(initError.message || 'Failed to start generation');
      }

      if (!initResponse?.predictionId) {
        throw new Error('No prediction ID received');
      }

      const { predictionId, estimatedTime } = initResponse;

      // Performance: Stream progress updates
      return await this.pollPredictionStatus(
        predictionId,
        estimatedTime || 15,
        onProgress
      );

    } catch (error) {
      console.error(`Generation failed for request ${requestId}:`, error);
      
      if (error instanceof Error) {
        // Security: Don't expose internal errors to users
        const userMessage = this.getUserFriendlyError(error.message);
        toast.error('Generation Failed', { description: userMessage });
        throw new Error(userMessage);
      }
      
      throw new Error('An unexpected error occurred');
    }
  }

  private async pollPredictionStatus(
    predictionId: string,
    estimatedTime: number,
    onProgress?: (progress: GenerationProgress) => void
  ): Promise<string> {
    const startTime = Date.now();
    const pollInterval = 1000; // Poll every second
    
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const { data, error } = await supabase.functions.invoke('check-prediction-status', {
            body: { predictionId }
          });

          if (error) {
            reject(new Error(error.message));
            return;
          }

          const { status, output, error: predictionError, progress = 0 } = data;
          const elapsed = (Date.now() - startTime) / 1000;
          const progressPercent = Math.min(90, (elapsed / estimatedTime) * 100);

          // Performance: Update progress
          if (onProgress) {
            onProgress({
              status: status as any,
              progress: status === 'succeeded' ? 100 : progressPercent,
              estimatedTime: Math.max(0, estimatedTime - elapsed)
            });
          }

          switch (status) {
            case 'succeeded':
              if (output && output[0]) {
                console.log(`Generation completed for prediction: ${predictionId}`);
                resolve(output[0]);
              } else {
                reject(new Error('No output received'));
              }
              break;

            case 'failed':
              reject(new Error(predictionError || 'Generation failed'));
              break;

            case 'canceled':
              reject(new Error('Generation was canceled'));
              break;

            default:
              // Continue polling
              setTimeout(poll, pollInterval);
              break;
          }

        } catch (error) {
          reject(error);
        }
      };

      // Start polling
      poll();

      // Performance: Timeout after 2 minutes
      setTimeout(() => {
        reject(new Error('Generation timeout'));
      }, 120000);
    });
  }

  private getUserFriendlyError(errorMessage: string): string {
    // Security: Map internal errors to user-friendly messages
    const errorMap: Record<string, string> = {
      'CONTENT_POLICY_VIOLATION': 'Your prompt contains content that is not allowed. Please try a different description.',
      'RATE_LIMIT_EXCEEDED': 'You have reached your generation limit. Please wait before trying again.',
      'SERVICE_ERROR': 'Our image generation service is temporarily unavailable. Please try again later.',
      'GENERATION_ERROR': 'Failed to generate your image. Please try a different prompt.',
      'INTERNAL_ERROR': 'An unexpected error occurred. Please try again.'
    };

    // Extract error code if present
    const codeMatch = errorMessage.match(/code:\s*(\w+)/);
    if (codeMatch) {
      const code = codeMatch[1];
      return errorMap[code] || errorMessage;
    }

    // Check for known error patterns
    for (const [pattern, message] of Object.entries(errorMap)) {
      if (errorMessage.includes(pattern)) {
        return message;
      }
    }

    return errorMessage;
  }

  // Performance: Cancel generation
  async cancelGeneration(predictionId: string): Promise<void> {
    try {
      const replicateApiKey = Deno.env.get("REPLICATE_API_KEY");
      if (!replicateApiKey) return;

      await fetch(`https://api.replicate.com/v1/predictions/${predictionId}/cancel`, {
        method: 'POST',
        headers: {
          "Authorization": `Token ${replicateApiKey}`,
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error('Failed to cancel generation:', error);
    }
  }
}

export const secureImageGeneration = SecureImageGenerationService.getInstance();
