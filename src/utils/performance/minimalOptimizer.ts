
// Minimal performance optimizer - replace the heavy one
import { LightweightPerformanceMonitor } from './lightweightMonitor';

export class MinimalPerformanceOptimizer {
  private static instance: MinimalPerformanceOptimizer;
  private monitor: LightweightPerformanceMonitor;

  private constructor() {
    this.monitor = LightweightPerformanceMonitor.getInstance();
  }

  static getInstance(): MinimalPerformanceOptimizer {
    if (!MinimalPerformanceOptimizer.instance) {
      MinimalPerformanceOptimizer.instance = new MinimalPerformanceOptimizer();
    }
    return MinimalPerformanceOptimizer.instance;
  }

  // Essential initialization only
  init(): void {
    // Mark start
    this.monitor.mark('app-start');
    
    // Track critical vitals silently
    this.monitor.trackCriticalVitals();
    
    // Preconnect to critical domains
    this.preconnectCriticalDomains();
  }

  private preconnectCriticalDomains(): void {
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Optimize image source for mobile
  optimizeImageSrc(src: string, width: number = 800, quality: number = 75): string {
    if (!src) return src;
    
    try {
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', quality.toString());
      return url.toString();
    } catch {
      return src;
    }
  }

  // Get performance metrics for reporting
  getMetrics(): Record<string, number> {
    return this.monitor.getMetrics();
  }
}

export const initMinimalPerformanceOptimizations = (): void => {
  const optimizer = MinimalPerformanceOptimizer.getInstance();
  optimizer.init();
};
