
import { useEffect } from 'react';

export const WebVitalsMonitor = () => {
  useEffect(() => {
    // Monitor Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry.startTime;
        
        console.log('📊 Core Web Vital - LCP:', {
          value: Math.round(lcp),
          rating: lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs improvement' : 'poor',
          threshold: lcp <= 2500 ? '✅ Good' : lcp <= 4000 ? '⚠️ Needs Improvement' : '❌ Poor'
        });
        
        // Track in analytics if available
        if (window.gtag) {
          window.gtag('event', 'web_vital_lcp', {
            event_category: 'Performance',
            value: Math.round(lcp),
            rating: lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs_improvement' : 'poor'
          });
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          
          console.log('📊 Core Web Vital - FID:', {
            value: Math.round(fid),
            rating: fid <= 100 ? 'good' : fid <= 300 ? 'needs improvement' : 'poor',
            threshold: fid <= 100 ? '✅ Good' : fid <= 300 ? '⚠️ Needs Improvement' : '❌ Poor'
          });
          
          if (window.gtag) {
            window.gtag('event', 'web_vital_fid', {
              event_category: 'Performance',
              value: Math.round(fid),
              rating: fid <= 100 ? 'good' : fid <= 300 ? 'needs_improvement' : 'poor'
            });
          }
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        console.log('📊 Core Web Vital - CLS:', {
          value: clsValue.toFixed(4),
          rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs improvement' : 'poor',
          threshold: clsValue <= 0.1 ? '✅ Good' : clsValue <= 0.25 ? '⚠️ Needs Improvement' : '❌ Poor'
        });
        
        if (window.gtag) {
          window.gtag('event', 'web_vital_cls', {
            event_category: 'Performance',
            value: parseFloat(clsValue.toFixed(4)),
            rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs_improvement' : 'poor'
          });
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Cleanup observers
      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
};
