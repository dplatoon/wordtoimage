
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
  forceMobileReload?: boolean;
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
 * Enhanced hook for handling image loading with mobile-specific optimizations
 */
export const useImageWithFallback = ({
  src,
  fallbackSrc = defaultFallbackImage,
  onLoadSuccess,
  onLoadError,
  trackSuccess = false,
  trackEvent: trackEventName,
  lazyLoad = true,
  forceMobileReload = false,
}: UseImageWithFallbackProps): UseImageWithFallbackResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset states when source changes
  useEffect(() => {
    if (src) {
      let finalSrc = src;
      
      // Add cache busting for mobile if requested
      if (forceMobileReload && isMobile) {
        finalSrc = `${src}?mobile=${Date.now()}`;
        console.log('📱 Adding mobile cache busting:', finalSrc);
      }
      
      setImageSrc(finalSrc);
      setIsLoading(true);
      setIsError(false);
      setUseFallback(false);
      setFallbackAttempted(false);
    }
  }, [src, forceMobileReload, isMobile]);

  // Enhanced image loading with mobile optimizations
  useEffect(() => {
    if (!imageSrc || !lazyLoad) return;

    console.log('🖼️ Loading image:', { imageSrc, isMobile, useFallback });

    const img = new Image();
    
    // Mobile-specific settings
    if (isMobile) {
      img.crossOrigin = 'anonymous';
    }
    
    img.src = imageSrc;

    const handleSuccess = () => {
      console.log('✅ Image loaded successfully:', imageSrc);
      setIsLoading(false);
      setIsError(false);
      onLoadSuccess?.();

      if (trackSuccess && trackEventName) {
        trackEvent(events.IMAGE_LOADED, { 
          source: trackEventName,
          fallback: useFallback ? 'yes' : 'no',
          mobile: isMobile ? 'yes' : 'no'
        });
      }
    };

    const handleFailure = () => {
      console.error('❌ Failed to load image:', imageSrc);
      
      if (!fallbackAttempted && fallbackSrc) {
        console.log('🔄 Attempting fallback:', fallbackSrc);
        setFallbackAttempted(true);
        setUseFallback(true);
        setImageSrc(fallbackSrc);
      } else {
        setIsLoading(false);
        setIsError(true);
        onLoadError?.();
      }
    };

    img.onload = handleSuccess;
    img.onerror = handleFailure;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc, fallbackSrc, onLoadSuccess, onLoadError, trackSuccess, trackEventName, fallbackAttempted, lazyLoad, useFallback, isMobile]);

  const handleLoad = () => {
    console.log('📸 Image handleLoad called');
    setIsLoading(false);
    setIsError(false);
    onLoadSuccess?.();
  };

  const handleError = () => {
    console.log('❌ Image handleError called');
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
