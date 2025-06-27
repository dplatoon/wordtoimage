
import { useEffect } from 'react';

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export const PerformanceMonitor = () => {
  useEffect(() => {
    const measureWebVitals = () => {
      const vitals: WebVital[] = [];

      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          const lcp = lastEntry.startTime;
          
          vitals.push({
            name: 'LCP',
            value: lcp,
            rating: lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs-improvement' : 'poor'
          });

          console.log(`🎯 LCP: ${lcp.toFixed(2)}ms (${vitals[vitals.length - 1].rating})`);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime;
            
            vitals.push({
              name: 'FID',
              value: fid,
              rating: fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor'
            });

            console.log(`⚡ FID: ${fid.toFixed(2)}ms (${vitals[vitals.length - 1].rating})`);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });

          vitals.push({
            name: 'CLS',
            value: clsValue,
            rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor'
          });

          console.log(`📐 CLS: ${clsValue.toFixed(4)} (${vitals[vitals.length - 1].rating})`);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }

      // Send vitals to analytics after collection
      setTimeout(() => {
        if (vitals.length > 0 && window.gtag) {
          vitals.forEach(vital => {
            window.gtag('event', 'web_vitals', {
              metric_name: vital.name,
              metric_value: Math.round(vital.value),
              metric_rating: vital.rating,
              custom_parameter: {
                debug_target: window.location.pathname
              }
            });
          });

          // Generate performance report
          const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            vitals: vitals,
            userAgent: navigator.userAgent,
            connection: (navigator as any).connection ? {
              effectiveType: (navigator as any).connection.effectiveType,
              saveData: (navigator as any).connection.saveData
            } : null
          };

          console.log('📊 Performance Report:', report);
        }
      }, 5000);
    };

    // Start measuring when page is interactive
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', measureWebVitals);
    } else {
      measureWebVitals();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', measureWebVitals);
    };
  }, []);

  return null;
};
