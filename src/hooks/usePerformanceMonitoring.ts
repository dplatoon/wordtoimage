
import { useEffect, useCallback, useRef } from 'react';
import { PerformanceOptimizer } from '@/utils/performanceOptimizer';

interface PerformanceMetrics {
  componentMountTime: number;
  renderCount: number;
  lastRenderTime: number;
}

export const usePerformanceMonitoring = (componentName: string) => {
  const mountTime = useRef<number>(performance.now());
  const renderCount = useRef<number>(0);
  const lastRenderTime = useRef<number>(performance.now());
  const optimizer = PerformanceOptimizer.getInstance();

  // Track component mounting and rendering
  useEffect(() => {
    renderCount.current += 1;
    lastRenderTime.current = performance.now();
    
    const renderTime = lastRenderTime.current - mountTime.current;
    
    // Log slow renders in development
    if (process.env.NODE_ENV === 'development' && renderTime > 100) {
      console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
    }
  });

  // Measure function performance
  const measurePerformance = useCallback(<T extends any[], R>(
    fn: (...args: T) => R,
    fnName: string
  ) => {
    return (...args: T): R => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      
      const duration = end - start;
      if (duration > 50) { // Log functions taking > 50ms
        console.log(`[${componentName}] ${fnName}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    };
  }, [componentName]);

  // Optimize image loading
  const optimizeImage = useCallback((src: string, width?: number, quality?: number) => {
    return optimizer.optimizeImageSrc(src, width || 800, quality || 85);
  }, [optimizer]);

  // Get performance metrics
  const getMetrics = useCallback((): PerformanceMetrics => ({
    componentMountTime: mountTime.current,
    renderCount: renderCount.current,
    lastRenderTime: lastRenderTime.current,
  }), []);

  // Report performance issues
  const reportSlowRender = useCallback((threshold: number = 100) => {
    const renderTime = lastRenderTime.current - mountTime.current;
    if (renderTime > threshold) {
      console.warn(`${componentName} render exceeded ${threshold}ms: ${renderTime.toFixed(2)}ms`);
      return true;
    }
    return false;
  }, [componentName]);

  return {
    measurePerformance,
    optimizeImage,
    getMetrics,
    reportSlowRender,
    renderCount: renderCount.current
  };
};

// Hook for monitoring page performance
export const usePagePerformance = (pageName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    // Monitor when page becomes interactive
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'measure' && entry.name === 'page-interactive') {
          console.log(`${pageName} became interactive in: ${entry.duration.toFixed(2)}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['measure'] });
    
    // Mark page as loaded
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      console.log(`${pageName} loaded in: ${loadTime.toFixed(2)}ms`);
      
      // Mark as interactive
      performance.mark('page-interactive-start');
      performance.mark('page-interactive-end');
      performance.measure('page-interactive', 'page-interactive-start', 'page-interactive-end');
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    return () => {
      observer.disconnect();
      window.removeEventListener('load', handleLoad);
    };
  }, [pageName]);
};
