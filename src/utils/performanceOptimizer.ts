
// Comprehensive performance optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private criticalResources: Set<string> = new Set();
  private preloadedResources: Set<string> = new Set();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Preload critical resources
  preloadCriticalResources(): void {
    const criticalImages = [
      '/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png',
      '/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png'
    ];

    criticalImages.forEach(src => {
      if (!this.preloadedResources.has(src)) {
        this.preloadResource(src, 'image', 'high');
        this.preloadedResources.add(src);
      }
    });

    // Preload critical CSS
    this.preloadResource('/fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap', 'style');
  }

  private preloadResource(href: string, as: string, fetchPriority: 'high' | 'low' | 'auto' = 'auto'): void {
    if (typeof document === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (fetchPriority !== 'auto') {
      (link as any).fetchPriority = fetchPriority;
    }
    
    // Add error handling
    link.onerror = () => console.warn(`Failed to preload: ${href}`);
    
    document.head.appendChild(link);
  }

  // Optimize images for different viewports
  optimizeImageSrc(src: string, width: number, quality: number = 85): string {
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
      return src;
    }

    // For external URLs, add optimization parameters if possible
    if (src.startsWith('http')) {
      try {
        const url = new URL(src);
        // Only add params if it looks like a CDN that supports them
        if (url.hostname.includes('unsplash') || url.hostname.includes('images')) {
          url.searchParams.set('w', width.toString());
          url.searchParams.set('q', quality.toString());
          url.searchParams.set('auto', 'format');
          return url.toString();
        }
      } catch {
        // If URL parsing fails, return original
        return src;
      }
    }

    return src;
  }

  // Generate responsive image sources
  generateResponsiveSources(baseSrc: string): { 
    webp: string; 
    avif: string; 
    fallback: string;
    sizes: string;
  } {
    if (!baseSrc || baseSrc.startsWith('http') || baseSrc.startsWith('data:')) {
      return {
        webp: baseSrc,
        avif: baseSrc,
        fallback: baseSrc,
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      };
    }

    const extension = baseSrc.split('.').pop()?.toLowerCase();
    if (extension === 'svg') {
      return {
        webp: baseSrc,
        avif: baseSrc,
        fallback: baseSrc,
        sizes: '100vw'
      };
    }

    const basePath = baseSrc.replace(/\.[^/.]+$/, '');
    return {
      avif: `${basePath}.avif`,
      webp: `${basePath}.webp`,
      fallback: baseSrc,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    };
  }

  // Defer non-critical scripts
  deferScript(src: string, onLoad?: () => void): void {
    if (typeof document === 'undefined') return;

    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.async = true;
    
    if (onLoad) {
      script.onload = onLoad;
    }
    
    document.body.appendChild(script);
  }

  // Monitor Core Web Vitals
  initWebVitalsMonitoring(): void {
    if (typeof window === 'undefined') return;

    // LCP monitoring
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      console.log('LCP:', Math.round(lastEntry.startTime), 'ms');
      
      if (lastEntry.startTime > 2500) {
        console.warn('LCP is slow, consider optimizing largest contentful element');
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID monitoring
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry: any) => {
        const fid = entry.processingStart - entry.startTime;
        console.log('FID:', Math.round(fid), 'ms');
        
        if (fid > 100) {
          console.warn('FID is slow, consider optimizing JavaScript execution');
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS monitoring
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      if (clsValue > 0.1) {
        console.warn('CLS is high, check for layout shifts. Current CLS:', clsValue.toFixed(4));
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Clean up resources to prevent memory leaks
  cleanupResources(): void {
    // Clean up blob URLs
    document.querySelectorAll('img[src^="blob:"]').forEach((img) => {
      const src = (img as HTMLImageElement).src;
      URL.revokeObjectURL(src);
    });

    // Clear preloaded resources cache periodically
    if (this.preloadedResources.size > 20) {
      this.preloadedResources.clear();
    }
  }

  // Set up performance optimizations
  init(): void {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Start monitoring
    this.initWebVitalsMonitoring();
    
    // Set up periodic cleanup
    setInterval(() => {
      this.cleanupResources();
    }, 300000); // Every 5 minutes
    
    console.log('✅ Performance optimizer initialized');
  }
}

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  const optimizer = PerformanceOptimizer.getInstance();
  optimizer.init();
};
