import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/utils/analytics';

interface PerformanceMetrics {
  renderCount: number;
  averageRenderTime: number;
  slowRenders: number;
  lastRenderTime: number;
}

interface PerformanceMonitoringResult {
  measurePerformance: <T extends any[], R>(fn: (...args: T) => R, fnName: string) => (...args: T) => R;
  optimizeImage: (src: string, width?: number, quality?: number) => string;
  getMetrics: () => PerformanceMetrics;
  reportSlowRender: (threshold?: number) => boolean;
  renderCount: number;
  trackInteraction: (element: string, action: string, details?: Record<string, any>) => void;
}

export const usePerformanceMonitoring = (componentName: string): PerformanceMonitoringResult => {
  const [renderCount, setRenderCount] = useState(0);
  const renderTimes = useRef<number[]>([]);
  const lastRenderStart = useRef<number>(0);

  useEffect(() => {
    lastRenderStart.current = performance.now();
    setRenderCount(prev => prev + 1);
    
    return () => {
      const renderTime = performance.now() - lastRenderStart.current;
      renderTimes.current.push(renderTime);
      
      // Keep only last 100 render times for memory efficiency
      if (renderTimes.current.length > 100) {
        renderTimes.current = renderTimes.current.slice(-100);
      }
    };
  });

  const measurePerformance = <T extends any[], R>(
    fn: (...args: T) => R, 
    fnName: string
  ) => {
    return (...args: T): R => {
      const start = performance.now();
      const result = fn(...args);
      const duration = performance.now() - start;
      
      if (duration > 16) { // Longer than a frame
        trackEvent({
          action: 'performance_slow_function',
          category: 'performance',
          label: `${componentName}.${fnName}`,
          value: Math.round(duration)
        });
      }
      
      return result;
    };
  };

  const optimizeImage = (src: string, width?: number, quality?: number): string => {
    if (!src) return '';
    
    // For external URLs, try to add optimization parameters
    try {
      const url = new URL(src);
      if (width) url.searchParams.set('w', width.toString());
      if (quality) url.searchParams.set('q', quality.toString());
      return url.toString();
    } catch {
      return src;
    }
  };

  const getMetrics = (): PerformanceMetrics => {
    const times = renderTimes.current;
    const averageRenderTime = times.length > 0 
      ? times.reduce((sum, time) => sum + time, 0) / times.length 
      : 0;
    const slowRenders = times.filter(time => time > 16).length;
    const lastRenderTime = times[times.length - 1] || 0;
    
    return {
      renderCount,
      averageRenderTime,
      slowRenders,
      lastRenderTime
    };
  };

  const reportSlowRender = (threshold = 16): boolean => {
    const metrics = getMetrics();
    const isSlow = metrics.lastRenderTime > threshold;
    
    if (isSlow) {
      trackEvent({
        action: 'performance_slow_render',
        category: 'performance',
        label: componentName,
        value: Math.round(metrics.lastRenderTime)
      });
    }
    
    return isSlow;
  };

  const trackInteraction = (element: string, action: string, details?: Record<string, any>) => {
    trackEvent({
      action: 'user_interaction',
      category: 'engagement',
      label: `${componentName}.${element}.${action}`,
      custom_parameters: details
    });
  };

  return {
    measurePerformance,
    optimizeImage,
    getMetrics,
    reportSlowRender,
    renderCount,
    trackInteraction
  };
};
