
import { useState, useEffect } from 'react';
import { trackEvent, events } from '@/utils/analytics';
import { defaultFallbackImage } from '@/utils/imageUtils';

interface UseImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  onLoadSuccess?: () => void;
  onLoadError?: () => void;
  trackSuccess?: boolean;
  trackEvent?: string;
  lazyLoad?: boolean;
}

interface UseImageWithFallbackResult {
  imageSrc: string;
  isLoading: boolean;
  isError: boolean;
  handleLoad: () => void;
  handleError: () => void;
  useFallback: boolean;
}

/**
 * A custom hook for handling image loading states, errors, and fallback logic.
 * Supports lazy loading, error tracking, and analytics events.
 */
export const useImageWithFallback = ({
  src,
  fallbackSrc = defaultFallbackImage,
  onLoadSuccess,
  onLoadError,
  trackSuccess = false,
  trackEvent: trackEventName,
  lazyLoad = true,
}: UseImageWithFallbackProps): UseImageWithFallbackResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(src);
  
  // Reset states when source changes
  useEffect(() => {
    if (src) {
      setImageSrc(src);
      setIsLoading(true);
      setIsError(false);
      setUseFallback(false);
      setFallbackAttempted(false);
    }
  }, [src]);

  // Load the image and handle states
  useEffect(() => {
    if (!imageSrc || !lazyLoad) return;

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      setIsLoading(false);
      setIsError(false);
      onLoadSuccess?.();

      if (trackSuccess && trackEventName) {
        trackEvent(events.IMAGE_LOADED, { 
          source: trackEventName,
          fallback: useFallback ? 'yes' : 'no'
        });
      }
    };

    img.onerror = () => {
      console.error('Failed to load image:', imageSrc);
      
      if (!fallbackAttempted && fallbackSrc) {
        setFallbackAttempted(true);
        setUseFallback(true);
        setImageSrc(fallbackSrc);
      } else {
        setIsLoading(false);
        setIsError(true);
        onLoadError?.();
      }
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc, fallbackSrc, onLoadSuccess, onLoadError, trackSuccess, trackEventName, fallbackAttempted, lazyLoad, useFallback]);

  const handleLoad = () => {
    setIsLoading(false);
    setIsError(false);
    onLoadSuccess?.();
  };

  const handleError = () => {
    if (!fallbackAttempted && fallbackSrc) {
      setFallbackAttempted(true);
      setUseFallback(true);
      setImageSrc(fallbackSrc);
    } else {
      setIsLoading(false);
      setIsError(true);
      onLoadError?.();
    }
  };

  return {
    imageSrc,
    isLoading,
    isError,
    handleLoad,
    handleError,
    useFallback,
  };
};
