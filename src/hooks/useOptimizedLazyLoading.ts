
import { useState, useEffect, useRef, RefObject } from 'react';

interface UseOptimizedLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  priority?: boolean;
  onIntersect?: () => void;
}

export const useOptimizedLazyLoading = <T extends HTMLElement = HTMLDivElement>(
  options: UseOptimizedLazyLoadingOptions = {}
): [RefObject<T>, boolean, boolean] => {
  const {
    threshold = 0.01,
    rootMargin = '100px',
    triggerOnce = true,
    priority = false,
    onIntersect,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(priority);
  const [hasIntersected, setHasIntersected] = useState(priority);
  const ref = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority) return;

    // Use Intersection Observer v2 if available
    const IntersectionObserverClass = window.IntersectionObserver;
    
    observerRef.current = new IntersectionObserverClass(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          
          if (isVisible) {
            setIsIntersecting(true);
            setHasIntersected(true);
            onIntersect?.();
            
            if (triggerOnce && ref.current) {
              observerRef.current?.unobserve(ref.current);
            }
          } else if (!triggerOnce) {
            setIsIntersecting(false);
          }
        });
      },
      { 
        threshold, 
        rootMargin,
        // Use trackVisibility for better performance if supported
        ...(('trackVisibility' in IntersectionObserverClass.prototype) && {
          trackVisibility: true,
          delay: 100
        })
      }
    );

    if (ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, priority, onIntersect]);

  return [ref, isIntersecting, hasIntersected];
};
