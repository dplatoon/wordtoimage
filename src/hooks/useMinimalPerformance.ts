
import { useCallback, useRef } from 'react';
import { MinimalPerformanceOptimizer } from '@/utils/performanceOptimizer';

export const useMinimalPerformance = () => {
  const optimizer = useRef(MinimalPerformanceOptimizer.getInstance());

  const optimizeImage = useCallback((src: string, width?: number, quality?: number) => {
    return optimizer.current.optimizeImageSrc(src, width, quality);
  }, []);

  const measurePerformance = useCallback((name: string, fn: () => void | Promise<void>) => {
    const start = performance.now();
    const result = fn();
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const end = performance.now();
        // Only track if extremely slow (>1000ms)
        if (end - start > 1000) {
          optimizer.current.getMetrics()[name] = end - start;
        }
      });
    } else {
      const end = performance.now();
      if (end - start > 1000) {
        optimizer.current.getMetrics()[name] = end - start;
      }
      return result;
    }
  }, []);

  const getMetrics = useCallback(() => {
    return optimizer.current.getMetrics();
  }, []);

  return {
    optimizeImage,
    measurePerformance,
    getMetrics
  };
};
