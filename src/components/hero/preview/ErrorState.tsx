
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  const isApiNotFoundError = error?.includes('not configured') || error?.includes('not available');
  
  return (
    <Alert variant="destructive" className="w-full max-w-md mx-4 border border-red-200 shadow-md bg-white">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
        <div className="flex-1">
          <AlertTitle className="text-red-600 font-semibold text-sm mb-1">Generation Error</AlertTitle>
          <AlertDescription className="text-gray-700 text-xs">
            {isApiNotFoundError ? (
              <div>
                <p className="mb-1 font-medium">Unable to generate image</p>
                <p>Your prompt may be too short or unclear. Try adding more details to your description.</p>
              </div>
            ) : (
              <div className="font-medium">{error}</div>
            )}
          </AlertDescription>
          <Button 
            size="sm" 
            variant="secondary"
            className="mt-2 flex items-center bg-gradient-to-r from-rose-100 to-red-100 hover:from-rose-200 hover:to-red-200 text-red-700" 
            onClick={onRetry}
          >
            <RefreshCw className="mr-1 h-3 w-3" /> Try Again
          </Button>
        </div>
      </div>
    </Alert>
  );
};
