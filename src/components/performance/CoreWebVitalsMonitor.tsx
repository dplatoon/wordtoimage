
import { useEffect, useRef } from 'react';

interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export const CoreWebVitalsMonitor = () => {
  const metricsRef = useRef<Map<string, WebVitalMetric>>(new Map());

  useEffect(() => {
    // Core Web Vitals thresholds
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 }
    };

    const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
      const threshold = thresholds[name as keyof typeof thresholds];
      if (!threshold) return 'good';
      
      if (value <= threshold.good) return 'good';
      if (value <= threshold.poor) return 'needs-improvement';
      return 'poor';
    };

    const reportMetric = (metric: WebVitalMetric) => {
      metricsRef.current.set(metric.name, metric);
      
      // Console logging for development
      console.log(`📊 Core Web Vital - ${metric.name}:`, {
        value: `${Math.round(metric.value)}${metric.name === 'CLS' ? '' : 'ms'}`,
        rating: metric.rating,
        threshold: metric.rating === 'good' ? '✅ Good' : 
                   metric.rating === 'needs-improvement' ? '⚠️ Needs Improvement' : '❌ Poor'
      });

      // Send to analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: metric.name,
          value: Math.round(metric.value),
          custom_parameter: metric.rating
        });
      }

      // Report performance issues
      if (metric.rating === 'poor') {
        console.warn(`🐌 Performance Issue Detected: ${metric.name} is ${metric.rating}`, {
          value: metric.value,
          recommendation: getRecommendation(metric.name, metric.value)
        });
      }
    };

    const getRecommendation = (name: string, value: number): string => {
      switch (name) {
        case 'LCP':
          return value > 4000 
            ? 'Optimize images, use CDN, implement preloading for critical resources'
            : 'Consider image optimization and resource prioritization';
        case 'FID':
          return value > 300
            ? 'Reduce JavaScript execution time, use code splitting, defer non-critical scripts'
            : 'Optimize JavaScript execution and reduce main thread blocking';
        case 'CLS':
          return value > 0.25
            ? 'Add size attributes to images, reserve space for dynamic content, avoid layout shifts'
            : 'Minimize layout shifts and ensure stable visual elements';
        case 'FCP':
          return 'Optimize critical rendering path, inline critical CSS, reduce server response time';
        case 'TTFB':
          return 'Optimize server response time, use CDN, implement caching strategies';
        default:
          return 'Monitor and optimize this metric for better user experience';
      }
    };

    // LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          
          if (lastEntry) {
            reportMetric({
              name: 'LCP',
              value: lastEntry.startTime,
              delta: lastEntry.startTime,
              id: 'lcp',
              rating: getRating('LCP', lastEntry.startTime)
            });
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime;
            reportMetric({
              name: 'FID',
              value: fid,
              delta: fid,
              id: 'fid',
              rating: getRating('FID', fid)
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              reportMetric({
                name: 'CLS',
                value: clsValue,
                delta: entry.value,
                id: 'cls',
                rating: getRating('CLS', clsValue)
              });
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // FCP (First Contentful Paint)
        const fcpObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            reportMetric({
              name: 'FCP',
              value: entry.startTime,
              delta: entry.startTime,
              id: 'fcp',
              rating: getRating('FCP', entry.startTime)
            });
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Navigation timing for TTFB
        window.addEventListener('load', () => {
          setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0] as any;
            if (navigation) {
              const ttfb = navigation.responseStart - navigation.requestStart;
              reportMetric({
                name: 'TTFB',
                value: ttfb,
                delta: ttfb,
                id: 'ttfb',
                rating: getRating('TTFB', ttfb)
              });
            }
          }, 0);
        });

      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }
    }

    // Memory usage monitoring
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log('🧠 Memory Usage:', {
        used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`,
        usage: `${Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)}%`
      });
    }

    // Resource timing analysis
    window.addEventListener('load', () => {
      setTimeout(() => {
        const resources = performance.getEntriesByType('resource');
        const slowResources = resources.filter((resource: any) => resource.duration > 1000);
        
        if (slowResources.length > 0) {
          console.warn('🐌 Slow Resources Detected:', 
            slowResources.map((r: any) => ({
              name: r.name.split('/').pop(),
              duration: `${Math.round(r.duration)}ms`,
              size: r.transferSize ? `${Math.round(r.transferSize / 1024)}KB` : 'Unknown'
            }))
          );
        }

        // Image optimization analysis
        const images = resources.filter((r: any) => r.initiatorType === 'img');
        const largeImages = images.filter((img: any) => img.transferSize > 500 * 1024); // > 500KB
        
        if (largeImages.length > 0) {
          console.warn('🖼️ Large Images Detected (>500KB):', 
            largeImages.map((img: any) => ({
              name: img.name.split('/').pop(),
              size: `${Math.round(img.transferSize / 1024)}KB`,
              recommendation: 'Consider compression or WebP format'
            }))
          );
        }
      }, 1000);
    });

  }, []);

  return null; // This is a monitoring component, no UI needed
};
