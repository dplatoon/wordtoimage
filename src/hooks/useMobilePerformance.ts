
import { useEffect, useCallback, useRef } from 'react';
import { useIsMobile } from './use-mobile';

interface MobilePerformanceOptions {
  enableImageLazyLoading?: boolean;
  enableTouchOptimizations?: boolean;
  enableBatteryOptimizations?: boolean;
  enableNetworkOptimizations?: boolean;
}

export const useMobilePerformance = (options: MobilePerformanceOptions = {}) => {
  const {
    enableImageLazyLoading = true,
    enableTouchOptimizations = true,
    enableBatteryOptimizations = true,
    enableNetworkOptimizations = true
  } = options;
  
  const isMobile = useIsMobile();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const touchOptimizedRef = useRef(false);

  // Optimize images for mobile viewport
  const optimizeImageForMobile = useCallback((src: string, width?: number) => {
    if (!src || !isMobile) return src;
    
    // Use appropriate size for mobile
    const mobileWidth = width || (window.innerWidth > 480 ? 480 : window.innerWidth);
    
    // For external images, add optimization parameters
    try {
      const url = new URL(src);
      if (url.hostname.includes('unsplash') || url.hostname.includes('images')) {
        url.searchParams.set('w', mobileWidth.toString());
        url.searchParams.set('q', '75'); // Lower quality for mobile
        url.searchParams.set('auto', 'format');
        return url.toString();
      }
    } catch {
      // If URL parsing fails, return original
    }
    
    return src;
  }, [isMobile]);

  // Set up lazy loading for images
  useEffect(() => {
    if (!enableImageLazyLoading || !isMobile || !('IntersectionObserver' in window)) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              // Load optimized image
              img.src = optimizeImageForMobile(img.dataset.src);
              img.removeAttribute('data-src');
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px', // Smaller margin for mobile
        threshold: 0.1
      }
    );

    // Observe all images with data-src
    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => observerRef.current?.observe(img));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [enableImageLazyLoading, isMobile, optimizeImageForMobile]);

  // Touch optimizations
  useEffect(() => {
    if (!enableTouchOptimizations || !isMobile || touchOptimizedRef.current) return;

    // Disable 300ms tap delay
    const style = document.createElement('style');
    style.textContent = `
      * {
        touch-action: manipulation;
      }
      
      button, a, [role="button"] {
        touch-action: manipulation;
        -webkit-tap-highlight-color: rgba(0,0,0,0.1);
      }
    `;
    document.head.appendChild(style);

    // Optimize scroll performance - using type assertion for vendor prefixes
    const optimizeScroll = () => {
      const bodyStyle = document.body.style as any;
      bodyStyle.webkitOverflowScrolling = 'touch';
      bodyStyle.overscrollBehavior = 'contain';
    };
    
    optimizeScroll();
    touchOptimizedRef.current = true;

    return () => {
      document.head.removeChild(style);
    };
  }, [enableTouchOptimizations, isMobile]);

  // Battery and network optimizations
  useEffect(() => {
    if (!isMobile) return;

    const checkBatteryStatus = async () => {
      if (!enableBatteryOptimizations || !('getBattery' in navigator)) return;
      
      try {
        const battery = await (navigator as any).getBattery();
        const isLowBattery = battery.level < 0.2;
        const isCharging = battery.charging;
        
        if (isLowBattery && !isCharging) {
          // Reduce animation and effects for battery saving
          document.documentElement.style.setProperty('--animation-duration', '0ms');
          console.log('🔋 Low battery detected - animations disabled');
        }
      } catch (error) {
        console.log('Battery API not supported');
      }
    };

    const checkNetworkStatus = () => {
      if (!enableNetworkOptimizations || !('connection' in navigator)) return;
      
      const connection = (navigator as any).connection;
      if (connection) {
        const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                                connection.effectiveType === '2g';
        
        if (isSlowConnection) {
          // Reduce image quality and disable non-essential features
          console.log('📶 Slow connection detected - optimizing content');
          document.documentElement.classList.add('slow-connection');
        }
      }
    };

    checkBatteryStatus();
    checkNetworkStatus();
  }, [enableBatteryOptimizations, enableNetworkOptimizations, isMobile]);

  // Performance monitoring
  const measurePerformance = useCallback((name: string, fn: () => void | Promise<void>) => {
    if (!isMobile) {
      return fn();
    }

    const start = performance.now();
    const result = fn();
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const end = performance.now();
        const duration = end - start;
        if (duration > 100) { // Warn if operation takes > 100ms on mobile
          console.warn(`🐌 Slow mobile operation: ${name} took ${duration.toFixed(2)}ms`);
        }
      });
    } else {
      const end = performance.now();
      const duration = end - start;
      if (duration > 16) { // Warn if operation takes > 16ms (one frame)
        console.warn(`🐌 Slow mobile operation: ${name} took ${duration.toFixed(2)}ms`);
      }
      return result;
    }
  }, [isMobile]);

  // Cleanup function
  const cleanup = useCallback(() => {
    // Clean up blob URLs
    document.querySelectorAll('img[src^="blob:"]').forEach((img) => {
      const src = (img as HTMLImageElement).src;
      URL.revokeObjectURL(src);
    });
  }, []);

  return {
    isMobile,
    optimizeImageForMobile,
    measurePerformance,
    cleanup,
    // Performance constants
    MOBILE_IMAGE_WIDTH: 480,
    MOBILE_QUALITY: 75,
    TOUCH_TARGET_SIZE: 48,
    ANIMATION_DURATION: isMobile ? 150 : 250
  };
};
