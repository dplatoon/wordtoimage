
// Lightweight performance monitoring - minimal overhead
class LightweightPerformanceMonitor {
  private static instance: LightweightPerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): LightweightPerformanceMonitor {
    if (!LightweightPerformanceMonitor.instance) {
      LightweightPerformanceMonitor.instance = new LightweightPerformanceMonitor();
    }
    return LightweightPerformanceMonitor.instance;
  }

  // Mark performance points (no logging)
  mark(name: string): void {
    if (typeof performance !== 'undefined') {
      this.metrics.set(name, performance.now());
    }
  }

  // Get metric value without logging
  getMeasure(startMark: string): number {
    const startTime = this.metrics.get(startMark);
    if (!startTime) return 0;
    return performance.now() - startTime;
  }

  // Only track critical web vitals - no console output
  trackCriticalVitals(): void {
    if (typeof window === 'undefined') return;

    try {
      // LCP tracking - silent
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.set('lcp', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID tracking - silent
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          this.metrics.set('fid', fid);
        });
      }).observe({ entryTypes: ['first-input'] });
    } catch (error) {
      // Silent fail
    }
  }

  // Get all metrics for reporting (no logging)
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }
}

export { LightweightPerformanceMonitor };
