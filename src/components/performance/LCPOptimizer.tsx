
import { useEffect, useCallback } from 'react';

export const LCPOptimizer = () => {
  const optimizeLCP = useCallback(() => {
    // Mark LCP candidate elements with high priority
    const lcpCandidates = document.querySelectorAll('img, h1, .hero-section');
    
    lcpCandidates.forEach((element) => {
      if (element.tagName === 'IMG') {
        const img = element as HTMLImageElement;
        img.setAttribute('fetchpriority', 'high');
        img.setAttribute('loading', 'eager');
        
        // Add AVIF/WebP sources for better compression
        if (!img.closest('picture')) {
          const picture = document.createElement('picture');
          const webpSource = document.createElement('source');
          const avifSource = document.createElement('source');
          
          const originalSrc = img.src;
          const basePath = originalSrc.replace(/\.[^/.]+$/, '');
          
          avifSource.srcset = `${basePath}.avif`;
          avifSource.type = 'image/avif';
          
          webpSource.srcset = `${basePath}.webp`;
          webpSource.type = 'image/webp';
          
          img.parentNode?.insertBefore(picture, img);
          picture.appendChild(avifSource);
          picture.appendChild(webpSource);
          picture.appendChild(img);
        }
      }
    });

    // Monitor and report LCP
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry.startTime;
        
        console.log(`🎯 LCP: ${lcp.toFixed(2)}ms`, {
          element: lastEntry.element?.tagName,
          url: lastEntry.url,
          status: lcp <= 2500 ? '✅ Good' : lcp <= 4000 ? '⚠️ Needs Improvement' : '❌ Poor'
        });

        // Track LCP in analytics
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            metric_name: 'LCP',
            metric_value: Math.round(lcp),
            metric_rating: lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs_improvement' : 'poor'
          });
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }, []);

  useEffect(() => {
    // Run optimization after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeLCP);
    } else {
      optimizeLCP();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', optimizeLCP);
    };
  }, [optimizeLCP]);

  return null;
};
