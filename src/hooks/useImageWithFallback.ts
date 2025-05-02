
import { useState, useEffect } from 'react';
import { trackEvent, events } from '@/utils/analytics';

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
  fallbackSrc = "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=512&q=80",
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

  useEffect(() => {
    if (src !== imageSrc && !useFallback) {
      setImageSrc(src);
      setIsLoading(true);
      setIsError(false);
      setFallbackAttempted(false);
    }
  }, [src, imageSrc, useFallback]);

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
        trackEvent(events.IMAGE_LOADED, { source: trackEventName });
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
  }, [imageSrc, fallbackSrc, onLoadSuccess, onLoadError, trackSuccess, trackEventName, fallbackAttempted, lazyLoad]);

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
    imageSrc: useFallback ? fallbackSrc : src,
    isLoading,
    isError,
    handleLoad,
    handleError,
    useFallback,
  };
};
