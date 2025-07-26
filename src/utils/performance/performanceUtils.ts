// Performance optimization utilities

// Service Worker registration
export const initPerformanceOptimizations = async (): Promise<void> => {
  // Register service worker for caching
  if ('serviceWorker' in navigator && 'caches' in window) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'imports'
      });
      
      console.log('✅ Service Worker registered:', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🔄 New version available');
            }
          });
        }
      });
    } catch (error) {
      console.warn('⚠️ Service Worker registration failed:', error);
    }
  }

  // Preconnect to critical domains
  preconnectToDomains([
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://images.unsplash.com'
  ]);

  // Initialize resource hints
  addResourceHints();

  // Optimize critical rendering path
  optimizeCriticalRenderingPath();
};

// Preconnect to external domains
const preconnectToDomains = (domains: string[]): void => {
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Add resource hints for better performance
const addResourceHints = (): void => {
  // DNS prefetch for external resources
  const dnsPrefetch = [
    '//api.runware.ai',
    '//cdn.jsdelivr.net'
  ];

  dnsPrefetch.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Optimize critical rendering path
const optimizeCriticalRenderingPath = (): void => {
  // Defer non-critical CSS
  const deferCSS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
  ];

  deferCSS.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  });

  // Prefetch next pages
  requestIdleCallback(() => {
    const nextPages = ['/gallery', '/advanced', '/history'];
    nextPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  });
};

// Image optimization utility
export const optimizeImageLoading = (): void => {
  // Add intersection observer for lazy loading
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Connection-aware loading
export const getConnectionInfo = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      saveData: connection.saveData
    };
  }
  return null;
};

// Adaptive loading based on connection
export const shouldLoadHighQualityAssets = (): boolean => {
  const connection = getConnectionInfo();
  if (!connection) return true;
  
  return !(
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g' ||
    connection.saveData ||
    connection.downlink < 1
  );
};

// Critical performance monitoring
export const trackCoreWebVitals = (): void => {
  // LCP tracking
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry.startTime;
        
        if (lcp > 4000) {
          console.warn('🚨 Poor LCP detected:', lcp + 'ms');
        } else if (lcp > 2500) {
          console.warn('⚠️ LCP needs improvement:', lcp + 'ms');
        } else {
          console.log('✅ Good LCP:', lcp + 'ms');
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('Performance monitoring setup failed:', error);
    }
  }
};

// Memory management
export const cleanupMemory = (): void => {
  // Clean up blob URLs
  document.querySelectorAll('img[src^="blob:"]').forEach(img => {
    const src = (img as HTMLImageElement).src;
    URL.revokeObjectURL(src);
  });

  // Clear performance entries
  if (performance.clearMeasures) {
    performance.clearMeasures();
  }
  if (performance.clearMarks) {
    performance.clearMarks();
  }

  // Force garbage collection if available
  if ('gc' in window) {
    (window as any).gc();
  }
};

// Request idle callback polyfill
const requestIdleCallback = window.requestIdleCallback || ((cb: IdleRequestCallback) => {
  const start = Date.now();
  return setTimeout(() => {
    cb({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
});