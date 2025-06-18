
import React, { useState, useCallback } from 'react';
import { ImageOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
  showRetry?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackClassName,
  onLoad,
  onError,
  showRetry = false
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    setHasError(false);
    setIsLoading(true);
    // Force reload by adding a cache-busting parameter
    setCurrentSrc(`${src}?retry=${retryCount + 1}`);
  }, [src, retryCount]);

  if (hasError) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg",
        fallbackClassName
      )}>
        <ImageOff className="h-8 w-8 text-gray-400 mb-2" />
        <p className="text-xs text-gray-500 text-center mb-2">
          Failed to load image
        </p>
        {showRetry && retryCount < 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRetry}
            className="text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={cn(
          "absolute inset-0 bg-gray-200 animate-pulse rounded-lg",
          fallbackClassName
        )} />
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          className,
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </>
  );
}
