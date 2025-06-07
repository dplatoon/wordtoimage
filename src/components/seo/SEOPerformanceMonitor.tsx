
import { useEffect } from 'react';

interface SEOMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

// Proper types for Performance API entries
interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

export const SEOPerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals for SEO
    const monitorWebVitals = () => {
      // First Contentful Paint
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
              console.log('FCP:', entry.startTime);
              // Track for SEO analytics
              if (window.gtag) {
                window.gtag('event', 'timing_complete', {
                  name: 'first_contentful_paint',
                  value: Math.round(entry.startTime)
                });
              }
            }
          });
        });
        
        observer.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
          
          if (window.gtag) {
            window.gtag('event', 'timing_complete', {
              name: 'largest_contentful_paint',
              value: Math.round(lastEntry.startTime)
            });
          }
        });
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as LayoutShiftEntry;
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
            }
          }
          console.log('CLS:', clsValue);
          
          if (window.gtag) {
            window.gtag('event', 'timing_complete', {
              name: 'cumulative_layout_shift',
              value: Math.round(clsValue * 1000)
            });
          }
        });
        
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }

      // Page Load Time
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page Load Time:', loadTime);
        
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'page_load_time',
            value: loadTime
          });
        }
      });
    };

    monitorWebVitals();

    // SEO-specific performance tracking
    const trackSEOMetrics = () => {
      // Track DOM size for SEO
      const domSize = document.querySelectorAll('*').length;
      console.log('DOM Size:', domSize);
      
      // Track image optimization
      const images = document.querySelectorAll('img');
      let unoptimizedImages = 0;
      images.forEach(img => {
        if (!img.loading || img.loading !== 'lazy') {
          unoptimizedImages++;
        }
      });
      
      console.log('Images without lazy loading:', unoptimizedImages);
      
      // Track structured data presence
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
      console.log('Structured data scripts:', structuredData.length);
      
      // Track meta tags
      const metaTags = document.querySelectorAll('meta');
      const seoMetaTags = Array.from(metaTags).filter(meta => 
        meta.getAttribute('name') === 'description' ||
        meta.getAttribute('property')?.startsWith('og:') ||
        meta.getAttribute('name')?.startsWith('twitter:')
      );
      console.log('SEO meta tags:', seoMetaTags.length);
    };

    // Run SEO metrics check after page load
    if (document.readyState === 'complete') {
      trackSEOMetrics();
    } else {
      window.addEventListener('load', trackSEOMetrics);
    }

    return () => {
      window.removeEventListener('load', trackSEOMetrics);
    };
  }, []);

  return null; // This component doesn't render anything
};
