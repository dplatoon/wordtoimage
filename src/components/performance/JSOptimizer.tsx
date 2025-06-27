
import { useEffect, useCallback } from 'react';

export const JSOptimizer = () => {
  const deferNonCriticalJS = useCallback(() => {
    // Defer analytics and other non-critical scripts
    const deferScript = (src: string, id?: string) => {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.async = false;
      if (id) script.id = id;
      document.head.appendChild(script);
    };

    // Load analytics after critical content
    setTimeout(() => {
      if (!document.getElementById('gtag-analytics')) {
        deferScript('https://www.googletagmanager.com/gtag/js?id=G-KND5GPN1W7', 'gtag-analytics');
      }
    }, 1000);
  }, []);

  const optimizeTBT = useCallback(() => {
    // Break up long tasks using scheduler API or setTimeout
    const yieldToMain = () => {
      return new Promise(resolve => {
        if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
          (window as any).scheduler.postTask(resolve, { priority: 'user-blocking' });
        } else {
          setTimeout(resolve, 0);
        }
      });
    };

    // Monitor Total Blocking Time
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        let totalBlockingTime = 0;
        
        list.getEntries().forEach((entry: any) => {
          if (entry.duration > 50) {
            totalBlockingTime += entry.duration - 50;
          }
        });

        if (totalBlockingTime > 0) {
          console.log(`⏱️ Total Blocking Time: ${totalBlockingTime.toFixed(2)}ms`);
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              metric_name: 'TBT',
              metric_value: Math.round(totalBlockingTime),
              metric_rating: totalBlockingTime <= 200 ? 'good' : totalBlockingTime <= 600 ? 'needs_improvement' : 'poor'
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    }

    return yieldToMain;
  }, []);

  const preloadKeyRequests = useCallback(() => {
    // Preload critical fonts
    const preloadFont = (href: string, type: string = 'font/woff2') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.type = type;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Preload Inter font
    preloadFont('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2');

    // Preload critical API endpoints
    const preloadAPI = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'fetch';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Add your critical API endpoints here
    // preloadAPI('/api/generate-image');
  }, []);

  useEffect(() => {
    deferNonCriticalJS();
    optimizeTBT();
    preloadKeyRequests();

    // Bundle splitting - dynamic imports for heavy libraries
    const loadHeavyLibraries = async () => {
      // Example: Load PDF.js only when needed
      if (window.location.pathname.includes('pdf')) {
        try {
          const { default: pdfjs } = await import('pdfjs-dist');
          console.log('📚 PDF.js loaded dynamically');
        } catch (error) {
          console.warn('Failed to load PDF.js:', error);
        }
      }
    };

    // Load heavy libraries after initial render
    setTimeout(loadHeavyLibraries, 2000);

    // Cleanup function
    return () => {
      // Clean up any observers or timers if needed
    };
  }, [deferNonCriticalJS, optimizeTBT, preloadKeyRequests]);

  return null;
};
