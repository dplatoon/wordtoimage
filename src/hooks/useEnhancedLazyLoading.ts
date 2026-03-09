
import { useState, useEffect, useRef, RefObject } from 'react';

interface UseEnhancedLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  enablePrefetch?: boolean;
  priorityHint?: 'high' | 'low' | 'auto';
}

export const useEnhancedLazyLoading = <T extends HTMLElement = HTMLDivElement>(
  options: UseEnhancedLazyLoadingOptions = {}
): [RefObject<T>, boolean, boolean] => {
  const {
    threshold = 0.1,
    rootMargin = '100px',
    triggerOnce = true,
    delay = 0,
    enablePrefetch = true,
    priorityHint = 'auto'
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<T>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    // Use modern intersection observer with improved performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay for better performance on mobile
            if (delay > 0) {
              timeoutRef.current = setTimeout(() => {
                setIsIntersecting(true);
                setIsLoaded(true);
              }, delay);
            } else {
              setIsIntersecting(true);
              setIsLoaded(true);
            }

            if (triggerOnce && ref.current) {
              observer.unobserve(ref.current);
            }
          } else if (!triggerOnce) {
            setIsIntersecting(false);
          }
        });
      },
      { 
        threshold, 
        rootMargin,
        // Use passive observation for better performance
        passive: true
      } as IntersectionObserverInit
    );

    if (ref.current) {
      observer.observe(ref.current);

      // Prefetch optimization for mobile
      if (enablePrefetch && 'connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.effectiveType === '4g') {
          // Aggressive prefetch for fast connections
          const prefetchObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  // Prefetch nearby content
                  const images = entry.target.querySelectorAll('img[data-src]');
                  images.forEach((img) => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = (img as HTMLImageElement).dataset.src || '';
                    link.as = 'image';
                    if (priorityHint !== 'auto') {
                      (link as any).fetchPriority = priorityHint;
                    }
                    document.head.appendChild(link);
                  });
                }
              });
            },
            { rootMargin: '300px' }
          );
          
          if (ref.current) {
            prefetchObserver.observe(ref.current);
          }
        }
      }
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, enablePrefetch, priorityHint]);

  return [ref, isIntersecting, isLoaded];
};

// Mobile-optimized lazy loading for images
export const useMobileLazyImage = (src: string, options: UseEnhancedLazyLoadingOptions = {}) => {
  const [ref, isIntersecting, isLoaded] = useEnhancedLazyLoading(options);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isIntersecting && src) {
      // Check if we're on a slow connection
      const connection = (navigator as any).connection;
      if (connection && connection.effectiveType && ['slow-2g', '2g'].includes(connection.effectiveType)) {
        // Use lower quality for slow connections
        const lowQualityUrl = src.includes('?') 
          ? `${src}&q=60&w=400` 
          : `${src}?q=60&w=400`;
        setImageSrc(lowQualityUrl);
      } else {
        setImageSrc(src);
      }
    }
  }, [isIntersecting, src]);

  const handleError = () => {
    setImageError(true);
    // Fallback to original URL on error
    if (imageSrc !== src) {
      setImageSrc(src);
    }
  };

  return {
    ref,
    imageSrc,
    isLoaded,
    imageError,
    handleError
  };
};
