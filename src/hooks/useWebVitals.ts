
import { useEffect, useCallback } from 'react';

interface WebVitalsMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export const useWebVitals = (onMetric?: (metric: { name: string; value: number }) => void) => {
  const reportMetric = useCallback((metric: { name: string; value: number }) => {
    // Report to analytics or monitoring service
    console.log(`[Web Vitals] ${metric.name}:`, metric.value);
    onMetric?.(metric);
  }, [onMetric]);

  useEffect(() => {
    // LCP (Largest Contentful Paint) monitoring
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry) {
            reportMetric({ name: 'LCP', value: Math.round(lastEntry.startTime) });
            
            if (lastEntry.startTime > 2500) {
              console.warn('LCP is slow (>2.5s), consider optimizing largest contentful element');
            }
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (First Input Delay) monitoring
        const fidObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime;
            reportMetric({ name: 'FID', value: Math.round(fid) });
            
            if (fid > 100) {
              console.warn('FID is slow (>100ms), consider optimizing JavaScript execution');
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS (Cumulative Layout Shift) monitoring
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          reportMetric({ name: 'CLS', value: parseFloat(clsValue.toFixed(4)) });
          
          if (clsValue > 0.1) {
            console.warn(`CLS is high (>${clsValue.toFixed(4)}), check for layout shifts`);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // FCP (First Contentful Paint)
        const fcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            reportMetric({ name: 'FCP', value: Math.round(entry.startTime) });
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Cleanup observers
        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
          fcpObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance observer not supported or failed:', error);
      }
    }

    // TTFB (Time to First Byte) using Navigation Timing
    if ('performance' in window && 'timing' in performance) {
      const navigation = performance.timing;
      const ttfb = navigation.responseStart - navigation.navigationStart;
      if (ttfb > 0) {
        reportMetric({ name: 'TTFB', value: ttfb });
      }
    }
  }, [reportMetric]);

  // Memory usage monitoring
  useEffect(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryInfo = {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
      };
      
      console.log('[Memory Usage]', memoryInfo);
      
      if (memoryInfo.used / memoryInfo.limit > 0.8) {
        console.warn('High memory usage detected:', memoryInfo);
      }
    }
  }, []);

  return {
    reportMetric
  };
};
