import { useEffect, useRef } from 'react';

interface LighthouseOptimizations {
  preloadCriticalAssets: boolean;
  enableImageOptimization: boolean;
  deferNonCriticalScripts: boolean;
}

export const EnhancedLighthouseOptimizer = ({
  preloadCriticalAssets = true,
  enableImageOptimization = true,
  deferNonCriticalScripts = true
}: Partial<LighthouseOptimizations> = {}) => {
  const hasInitialized = useRef(false);
  
  useEffect(() => {
    // Prevent duplicate initialization
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Use requestIdleCallback to avoid blocking main thread
    const runOptimizations = () => {
      if (preloadCriticalAssets) {
        preloadCriticalResources();
      }
      
      if (enableImageOptimization) {
        optimizeImages();
      }
      
      if (deferNonCriticalScripts) {
        deferScripts();
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(runOptimizations, { timeout: 2000 });
    } else {
      setTimeout(runOptimizations, 100);
    }
  }, [preloadCriticalAssets, enableImageOptimization, deferNonCriticalScripts]);

  const preloadCriticalResources = () => {
    // Only preload if not already done
    if (document.querySelector('link[rel="preload"][data-lighthouse]')) return;

    const heroImageUrls = [
      '/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png',
      '/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png'
    ];
    
    heroImageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      link.setAttribute('data-lighthouse', 'true');
      document.head.appendChild(link);
    });
  };

  const optimizeImages = () => {
    // Use a single IntersectionObserver for all images
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (!img.hasAttribute('loading')) {
              img.loading = 'lazy';
            }
            if (!img.hasAttribute('decoding')) {
              img.decoding = 'async';
            }
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    // Batch DOM reads to avoid forced reflows
    requestAnimationFrame(() => {
      const images = document.querySelectorAll('img:not([data-optimized])');
      images.forEach((img) => {
        img.setAttribute('data-optimized', 'true');
        observer.observe(img);
      });
    });
  };

  const deferScripts = () => {
    // Defer third-party scripts without triggering reflows
    requestAnimationFrame(() => {
      const scripts = document.querySelectorAll('script[src*="analytics"], script[src*="gtag"]');
      scripts.forEach((script: Element) => {
        const scriptEl = script as HTMLScriptElement;
        if (!scriptEl.async && !scriptEl.defer) {
          scriptEl.defer = true;
        }
      });
    });
  };

  return null;
};
