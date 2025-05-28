
import { useEffect, useCallback, useRef } from 'react';
import { useResponsiveDesign } from './useResponsiveDesign';

interface PerformanceOptions {
  enableLazyLoading?: boolean;
  enableImageOptimization?: boolean;
  enablePreloading?: boolean;
  enableServiceWorker?: boolean;
  debounceDelay?: number;
}

export const usePerformanceOptimization = (options: PerformanceOptions = {}) => {
  const {
    enableLazyLoading = true,
    enableImageOptimization = true,
    enablePreloading = true,
    debounceDelay = 300
  } = options;
  
  const { isMobile, prefersReducedMotion } = useResponsiveDesign();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Debounce utility
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Lazy loading setup
  useEffect(() => {
    if (!enableLazyLoading || !('IntersectionObserver' in window)) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: isMobile ? '50px' : '100px',
        threshold: 0.1
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [enableLazyLoading, isMobile]);

  // Image optimization utilities
  const optimizeImageSrc = useCallback((src: string, width?: number, height?: number) => {
    if (!enableImageOptimization) return src;
    
    // For mobile, use smaller images
    const targetWidth = width || (isMobile ? 400 : 800);
    const targetHeight = height || (isMobile ? 400 : 800);
    
    // If it's a blob URL or data URL, return as-is
    if (src.startsWith('blob:') || src.startsWith('data:')) {
      return src;
    }
    
    // Add responsive image parameters (implementation depends on your image service)
    const url = new URL(src);
    url.searchParams.set('w', targetWidth.toString());
    url.searchParams.set('h', targetHeight.toString());
    url.searchParams.set('q', isMobile ? '75' : '85'); // Lower quality for mobile
    
    return url.toString();
  }, [enableImageOptimization, isMobile]);

  // Preload critical resources
  const preloadImage = useCallback((src: string) => {
    if (!enablePreloading) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }, [enablePreloading]);

  // Performance monitoring
  const measurePerformance = useCallback((name: string, fn: () => void | Promise<void>) => {
    const start = performance.now();
    
    const result = fn();
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const end = performance.now();
        console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
      });
    } else {
      const end = performance.now();
      console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
      return result;
    }
  }, []);

  // Memory cleanup utilities
  const cleanupImages = useCallback(() => {
    // Cleanup blob URLs to prevent memory leaks
    const images = document.querySelectorAll('img[src^="blob:"]');
    images.forEach((img) => {
      const src = (img as HTMLImageElement).src;
      if (src.startsWith('blob:')) {
        URL.revokeObjectURL(src);
      }
    });
  }, []);

  // Responsive animation settings
  const getAnimationSettings = useCallback(() => {
    return {
      duration: prefersReducedMotion ? 0 : isMobile ? 200 : 300,
      easing: 'ease-out',
      staggerDelay: prefersReducedMotion ? 0 : 50
    };
  }, [prefersReducedMotion, isMobile]);

  // Bundle size optimization - dynamic imports
  const loadComponent = useCallback(async (componentPath: string) => {
    try {
      const module = await import(componentPath);
      return module.default;
    } catch (error) {
      console.error(`Failed to load component: ${componentPath}`, error);
      return null;
    }
  }, []);

  return {
    // Utilities
    debounce,
    observerRef,
    optimizeImageSrc,
    preloadImage,
    measurePerformance,
    cleanupImages,
    getAnimationSettings,
    loadComponent,
    
    // Settings
    isMobile,
    prefersReducedMotion,
    
    // Constants
    LAZY_LOAD_MARGIN: isMobile ? '50px' : '100px',
    DEBOUNCE_DELAY: debounceDelay,
    ANIMATION_DURATION: prefersReducedMotion ? 0 : (isMobile ? 200 : 300)
  };
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      // This would integrate with web-vitals library if installed
      console.log('Performance monitoring active');
    }
    
    // Monitor memory usage
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log('Memory usage:', {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
      });
    }
  }, []);
};
