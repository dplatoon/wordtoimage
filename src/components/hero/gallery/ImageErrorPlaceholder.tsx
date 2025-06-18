
import React from 'react';
import { ImageOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageErrorPlaceholderProps {
  onRetry?: () => void;
  showRetry?: boolean;
  message?: string;
}

export const ImageErrorPlaceholder = ({ 
  onRetry, 
  showRetry = false, 
  message = "Image unavailable" 
}: ImageErrorPlaceholderProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
      <ImageOff className="h-8 w-8 text-gray-300 mb-2" />
      <p className="text-xs text-gray-400 text-center mb-2">{message}</p>
      {showRetry && onRetry && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRetry}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Try again
        </Button>
      )}
    </div>
  );
};
