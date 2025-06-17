
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { logger } from '@/utils/logger';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  const isApiNotFoundError = error?.includes('not configured') || error?.includes('not available');
  
  // Log error for debugging in development
  logger.error('Image generation error:', error);
  
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="mb-6">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Failed to load image</h3>
          <p className="text-sm text-gray-500 mb-4">The generated image could not be displayed</p>
          
          {isApiNotFoundError ? (
            <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-md mb-4">
              Your prompt may be too short or unclear. Try adding more details to your description.
            </p>
          ) : (
            <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-md mb-4">{error}</p>
          )}
        </div>
        
        <Button 
          size="sm" 
          variant="outline"
          className="flex items-center gap-2" 
          onClick={onRetry}
        >
          <RefreshCw className="h-4 w-4" /> 
          Try Again
        </Button>
      </div>
    </div>
  );
};
