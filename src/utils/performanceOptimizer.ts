
// Comprehensive performance optimization utilities - Enhanced version
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private criticalResources: Set<string> = new Set();
  private preloadedResources: Set<string> = new Set();
  private performanceMetrics: Map<string, number> = new Map();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Enhanced critical resource preloading
  preloadCriticalResources(): void {
    const criticalImages = [
      '/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png',
      '/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png'
    ];

    const criticalFonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
    ];

    // Preload critical images with high priority
    criticalImages.forEach(src => {
      if (!this.preloadedResources.has(src)) {
        this.preloadResource(src, 'image', 'high');
        this.preloadedResources.add(src);
      }
    });

    // Preload critical fonts
    criticalFonts.forEach(src => {
      if (!this.preloadedResources.has(src)) {
        this.preloadResource(src, 'style', 'high');
        this.preloadedResources.add(src);
      }
    });

    console.log('✅ Critical resources preloaded');
  }

  private preloadResource(href: string, as: string, fetchPriority: 'high' | 'low' | 'auto' = 'auto'): void {
    if (typeof document === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    link.crossOrigin = 'anonymous';
    
    // Set fetch priority for supported browsers
    if (fetchPriority !== 'auto') {
      (link as any).fetchPriority = fetchPriority;
    }
    
    // Add error handling
    link.onerror = () => console.warn(`⚠️ Failed to preload: ${href}`);
    link.onload = () => console.log(`✅ Preloaded: ${href}`);
    
    document.head.appendChild(link);
  }

  // Enhanced image optimization with WebP/AVIF support
  optimizeImageSrc(src: string, width: number, quality: number = 75): string {
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
      return src;
    }

    // For external URLs, add optimization parameters
    if (src.startsWith('http')) {
      try {
        const url = new URL(src);
        // Add optimization for supported CDNs
        if (url.hostname.includes('unsplash') || url.hostname.includes('images')) {
          url.searchParams.set('w', Math.min(width, 1920).toString());
          url.searchParams.set('q', quality.toString());
          url.searchParams.set('auto', 'format,compress');
          url.searchParams.set('fit', 'crop');
          return url.toString();
        }
      } catch {
        return src;
      }
    }

    return src;
  }

  // Generate responsive image sources with modern formats
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
        sizes: '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw'
      };
    }

    const extension = baseSrc.split('.').pop()?.toLowerCase();
    if (extension === 'svg') {
      return {
        webp: baseSrc,
        avif: baseSrc,
        fallback: baseSrc,
        sizes: 'auto'
      };
    }

    const basePath = baseSrc.replace(/\.[^/.]+$/, '');
    return {
      avif: `${basePath}.avif`,
      webp: `${basePath}.webp`,
      fallback: baseSrc,
      sizes: '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw'
    };
  }

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

  // Resource cleanup with memory optimization
  cleanupResources(): void {
    // Clean up blob URLs
    document.querySelectorAll('img[src^="blob:"]').forEach((img) => {
      const src = (img as HTMLImageElement).src;
      URL.revokeObjectURL(src);
    });

    // Clear old performance entries
    if (performance.clearMeasures) {
      performance.clearMeasures();
    }

    // Clear preloaded resources cache if it gets too large
    if (this.preloadedResources.size > 50) {
      this.preloadedResources.clear();
      console.log('🧹 Cleared preloaded resources cache');
    }

    console.log('🧹 Resources cleaned up');
  }

  // Generate performance report
  generatePerformanceReport(): {
    timestamp: string;
    metrics: { [key: string]: number };
    recommendations: string[];
    overallScore: number;
  } {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: Object.fromEntries(this.performanceMetrics),
      recommendations: this.getPerformanceRecommendations(),
      overallScore: this.calculateOverallScore()
    };
    
    console.log('📊 Performance Report:', report);
    return report;
  }

  private getPerformanceRecommendations(): string[] {
    const recommendations: string[] = [];
    
    const lcp = this.performanceMetrics.get('LCP') || 0;
    const fid = this.performanceMetrics.get('FID') || 0;
    const cls = this.performanceMetrics.get('CLS') || 0;
    
    if (lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint (LCP)');
    }
    if (fid > 100) {
      recommendations.push('Reduce First Input Delay (FID)');
    }
    if (cls > 0.1) {
      recommendations.push('Minimize Cumulative Layout Shift (CLS)');
    }
    
    return recommendations;
  }

  private calculateOverallScore(): number {
    const lcp = this.performanceMetrics.get('LCP') || 0;
    const fid = this.performanceMetrics.get('FID') || 0;
    const cls = this.performanceMetrics.get('CLS') || 0;
    
    let score = 100;
    
    // LCP scoring (0-40 points)
    if (lcp > 4000) score -= 40;
    else if (lcp > 2500) score -= 20;
    
    // FID scoring (0-30 points)
    if (fid > 300) score -= 30;
    else if (fid > 100) score -= 15;
    
    // CLS scoring (0-30 points)
    if (cls > 0.25) score -= 30;
    else if (cls > 0.1) score -= 15;
    
    return Math.max(0, score);
  }

  // Initialize all optimizations
  init(): void {
    console.log('🚀 Initializing Performance Optimizer...');
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Start monitoring
    this.initWebVitalsMonitoring();
    
    // Set up periodic cleanup
    setInterval(() => {
      this.cleanupResources();
    }, 300000); // Every 5 minutes
    
    // Generate performance report after initial load
    setTimeout(() => {
      this.generatePerformanceReport();
    }, 5000);
    
    console.log('✅ Performance optimizer initialized');
  }
}

// Enhanced initialization function
export const initPerformanceOptimizations = () => {
  const optimizer = PerformanceOptimizer.getInstance();
  optimizer.init();
  
  // Additional performance optimizations
  if (typeof window !== 'undefined') {
    // Prevent unnecessary re-renders
    window.addEventListener('resize', debounce(() => {
      console.log('📱 Viewport resized - optimizations may apply');
    }, 250));
    
    // Monitor memory usage
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
        console.warn('⚠️ High memory usage detected - consider optimizing');
      }
    }
  }
};

// Utility function for debouncing
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
