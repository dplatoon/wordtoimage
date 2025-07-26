
// Performance monitoring and optimization utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Mark performance timing
  mark(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(name);
      this.metrics.set(name, performance.now());
    }
  }

  // Measure performance between two marks
  measure(name: string, startMark: string, endMark?: string): number {
    if (typeof performance !== 'undefined') {
      const startTime = this.metrics.get(startMark) || 0;
      const endTime = endMark ? this.metrics.get(endMark) || performance.now() : performance.now();
      const duration = endTime - startTime;
      
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
      return duration;
    }
    return 0;
  }

  // Monitor Core Web Vitals
  observeWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Optimized Core Web Vitals monitoring - only warn for poor scores
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry.startTime;
        if (lcp > 2500) {
          console.warn(`[Performance] LCP needs improvement: ${lcp.toFixed(0)}ms`);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          if (fid > 100) {
            console.warn(`[Performance] FID needs improvement: ${fid.toFixed(0)}ms`);
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        if (clsValue > 0.1) {
          console.warn(`[Performance] CLS needs improvement: ${clsValue.toFixed(3)}`);
        }
      }).observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      // Silently fail if performance observers aren't supported
    }
  }
}

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string): void => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
};

// Prefetch resources for future navigation
export const prefetchResource = (href: string): void => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

// Critical CSS injection
export const injectCriticalCSS = (css: string): void => {
  if (typeof document === 'undefined') return;

  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
};

// Initialize performance monitoring
export const initPerformanceMonitoring = (): void => {
  const monitor = PerformanceMonitor.getInstance();
  monitor.observeWebVitals();
  monitor.mark('app-start');
};
