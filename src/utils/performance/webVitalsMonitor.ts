
// Web Vitals monitoring utilities
export class WebVitalsMonitor {
  private performanceMetrics: Map<string, number> = new Map();

  // Enhanced Web Vitals monitoring with reporting
  initWebVitalsMonitoring(): void {
    if (typeof window === 'undefined') return;

    try {
      // Enhanced LCP monitoring
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = Math.round(lastEntry.startTime);
        
        this.performanceMetrics.set('LCP', lcp);
        console.log(`📊 LCP: ${lcp}ms`, lcp <= 2500 ? '✅ Good' : lcp <= 4000 ? '⚠️ Needs Improvement' : '❌ Poor');
        
        // Automatic optimization suggestions
        if (lcp > 4000) {
          console.warn('🚨 Critical LCP issue detected. Consider:', [
            '• Optimize largest image with WebP/AVIF',
            '• Implement critical CSS',
            '• Use CDN for static assets',
            '• Preload critical resources'
          ].join('\n'));
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Enhanced FID monitoring
      new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          const fid = Math.round(entry.processingStart - entry.startTime);
          this.performanceMetrics.set('FID', fid);
          console.log(`📊 FID: ${fid}ms`, fid <= 100 ? '✅ Good' : fid <= 300 ? '⚠️ Needs Improvement' : '❌ Poor');
          
          if (fid > 300) {
            console.warn('🚨 Critical FID issue detected. Consider:', [
              '• Reduce JavaScript execution time',
              '• Implement code splitting',
              '• Use web workers for heavy tasks',
              '• Defer non-critical JavaScript'
            ].join('\n'));
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Enhanced CLS monitoring
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.performanceMetrics.set('CLS', clsValue);
        console.log(`📊 CLS: ${clsValue.toFixed(4)}`, clsValue <= 0.1 ? '✅ Good' : clsValue <= 0.25 ? '⚠️ Needs Improvement' : '❌ Poor');
        
        if (clsValue > 0.25) {
          console.warn('🚨 Critical CLS issue detected. Consider:', [
            '• Set explicit dimensions for images',
            '• Reserve space for dynamic content',
            '• Avoid inserting content above existing content',
            '• Use transform animations instead of changing layout properties'
          ].join('\n'));
        }
      }).observe({ entryTypes: ['layout-shift'] });

      // Track Time to First Byte (TTFB)
      new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          if (entry.entryType === 'navigation') {
            const ttfb = Math.round(entry.responseStart - entry.requestStart);
            this.performanceMetrics.set('TTFB', ttfb);
            console.log(`📊 TTFB: ${ttfb}ms`, ttfb <= 800 ? '✅ Good' : ttfb <= 1800 ? '⚠️ Needs Improvement' : '❌ Poor');
          }
        });
      }).observe({ entryTypes: ['navigation'] });

    } catch (error) {
      console.warn('⚠️ Performance monitoring setup failed:', error);
    }
  }

  getMetrics(): Map<string, number> {
    return this.performanceMetrics;
  }
}
