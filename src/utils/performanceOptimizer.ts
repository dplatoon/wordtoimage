// Comprehensive performance optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private criticalResources: Set<string> = new Set();
  private preloadedResources: Set<string> = new Set();
  private webVitalsMetrics: Map<string, number> = new Map();

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

  // Enhanced image optimization with multiple formats
  optimizeImageSrc(src: string, width: number, quality: number = 85): string {
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
      return src;
    }

    // For external URLs, add optimization parameters if possible
    if (src.startsWith('http')) {
      try {
        const url = new URL(src);
        // Add optimization parameters for supported CDNs
        if (url.hostname.includes('unsplash') || url.hostname.includes('images')) {
          url.searchParams.set('w', width.toString());
          url.searchParams.set('q', quality.toString());
          url.searchParams.set('auto', 'format');
          url.searchParams.set('fit', 'crop');
          return url.toString();
        }
      } catch {
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

  // Enhanced Web Vitals monitoring with reporting
  initWebVitalsMonitoring(onMetric?: (metric: { name: string; value: number }) => void): void {
    if (typeof window === 'undefined') return;

    const reportMetric = (name: string, value: number) => {
      this.webVitalsMetrics.set(name, value);
      console.log(`[Web Vitals] ${name}:`, Math.round(value), 'ms');
      onMetric?.({ name, value });

      // Performance thresholds and warnings
      const thresholds = {
        LCP: { good: 2500, poor: 4000 },
        FID: { good: 100, poor: 300 },
        CLS: { good: 0.1, poor: 0.25 },
        FCP: { good: 1800, poor: 3000 },
        TTFB: { good: 800, poor: 1800 }
      };

      const threshold = thresholds[name as keyof typeof thresholds];
      if (threshold) {
        if (value > threshold.poor) {
          console.warn(`❌ ${name} is poor (${Math.round(value)}). Consider optimization.`);
        } else if (value > threshold.good) {
          console.warn(`⚠️ ${name} needs improvement (${Math.round(value)}).`);
        } else {
          console.log(`✅ ${name} is good (${Math.round(value)}).`);
        }
      }
    };

    // LCP monitoring
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      if (lastEntry) {
        reportMetric('LCP', Math.round(lastEntry.startTime));
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID monitoring
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry: any) => {
        const fid = entry.processingStart - entry.startTime;
        reportMetric('FID', Math.round(fid));
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
      reportMetric('CLS', parseFloat(clsValue.toFixed(4)));
    }).observe({ entryTypes: ['layout-shift'] });

    // FCP (First Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        reportMetric('FCP', Math.round(entry.startTime));
      });
    }).observe({ entryTypes: ['paint'] });

    // TTFB (Time to First Byte) using Navigation Timing
    if ('performance' in window && 'timing' in performance) {
      const navigation = performance.timing;
      const ttfb = navigation.responseStart - navigation.navigationStart;
      if (ttfb > 0) {
        reportMetric('TTFB', ttfb);
      }
    }

    // Memory monitoring
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        const limitMB = Math.round(memory.jsHeapSizeLimit / 1024 / 1024);
        
        if (usedMB / limitMB > 0.8) {
          console.warn(`High memory usage: ${usedMB}MB / ${limitMB}MB`);
        }
      };
      
      setInterval(checkMemory, 30000); // Check every 30 seconds
    }
  }

  // Resource cleanup with enhanced memory management
  cleanupResources(): void {
    // Clean up blob URLs
    document.querySelectorAll('img[src^="blob:"]').forEach((img) => {
      const src = (img as HTMLImageElement).src;
      URL.revokeObjectURL(src);
    });

    // Clear metrics cache
    if (this.webVitalsMetrics.size > 50) {
      const oldestEntries = Array.from(this.webVitalsMetrics.entries())
        .slice(0, this.webVitalsMetrics.size - 25);
      oldestEntries.forEach(([key]) => this.webVitalsMetrics.delete(key));
    }

    // Force garbage collection if available
    if ('gc' in window && typeof (window as any).gc === 'function') {
      try {
        (window as any).gc();
      } catch (e) {
        // GC not available in this context
      }
    }
  }

  // Performance budgets and monitoring
  checkPerformanceBudget(): { passed: boolean; violations: string[] } {
    const violations: string[] = [];
    const budgets = {
      LCP: 2500,
      FID: 100,
      CLS: 0.1,
      FCP: 1800,
      TTFB: 800
    };

    Object.entries(budgets).forEach(([metric, budget]) => {
      const value = this.webVitalsMetrics.get(metric);
      if (value && value > budget) {
        violations.push(`${metric}: ${Math.round(value)} exceeds budget of ${budget}`);
      }
    });

    return {
      passed: violations.length === 0,
      violations
    };
  }

  // Initialize performance optimizations
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

  // Get performance report
  getPerformanceReport(): Record<string, any> {
    return {
      webVitals: Object.fromEntries(this.webVitalsMetrics),
      resourceCounts: {
        preloaded: this.preloadedResources.size,
        critical: this.criticalResources.size
      },
      budget: this.checkPerformanceBudget(),
      timestamp: new Date().toISOString()
    };
  }
}

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  const optimizer = PerformanceOptimizer.getInstance();
  optimizer.init();
};
