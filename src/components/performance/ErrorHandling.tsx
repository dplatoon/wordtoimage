import { useEffect } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{error: Error}>;
}

interface ErrorInfo {
  componentStack: string;
}

// Performance-focused error handler that doesn't block rendering
export const PerformanceErrorHandler = () => {
  useEffect(() => {
    // Global error handler for unhandled promises and JS errors
    const handleError = (event: ErrorEvent) => {
      console.error('Global JS Error:', event.error);
      
      // Don't let errors block critical rendering path
      if (event.error?.name === 'ChunkLoadError') {
        // Handle code splitting errors gracefully
        window.location.reload();
        return;
      }
      
      // Log performance-impacting errors
      if (event.error?.message?.includes('performance') || 
          event.error?.message?.includes('timeout')) {
        console.warn('Performance Error Detected:', event.error.message);
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled Promise Rejection:', event.reason);
      
      // Prevent errors from blocking the UI
      event.preventDefault();
      
      // Handle common async operation failures
      if (event.reason?.message?.includes('Failed to fetch')) {
        console.warn('Network error - continuing with offline functionality');
      }
    };

    // Add global error listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Performance monitoring error detection
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            // Detect long tasks that might be blocking rendering
            if (entry.entryType === 'longtask' && entry.duration > 50) {
              console.warn('Long task detected:', entry.duration + 'ms');
            }
          });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
      } catch (error) {
        console.warn('Performance observer not supported');
      }
    }

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
};

// Critical Resource Error Recovery
export const CriticalResourceErrorHandler = () => {
  useEffect(() => {
    // Monitor for critical resource load failures
    const images = document.querySelectorAll('img[loading="eager"], img[fetchpriority="high"]') as NodeListOf<HTMLImageElement>;
    const scripts = document.querySelectorAll('script[async], script[defer]') as NodeListOf<HTMLScriptElement>;
    
    images.forEach((img) => {
      img.addEventListener('error', () => {
        console.warn('Critical image failed to load:', img.src);
        // Replace with placeholder or retry
        img.style.display = 'none';
      });
    });

    scripts.forEach((script) => {
      script.addEventListener('error', () => {
        console.warn('Critical script failed to load:', script.src);
      });
    });

    // Check for critical CSS load failures
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const sheet = styleSheets[i];
        if (sheet.href && !sheet.cssRules) {
          console.warn('CSS failed to load:', sheet.href);
        }
      } catch (e) {
        // Cross-origin CSS - expected error
      }
    }
  }, []);

  return null;
};