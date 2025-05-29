
// Comprehensive performance optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private criticalResources: Set<string> = new Set();
  private preloadedResources: Set<string> = new Set();
  private observedImages: WeakSet<Element> = new WeakSet();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Enhanced preload critical resources with modern formats
  preloadCriticalResources(): void {
    const criticalImages = [
      '/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png',
      '/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png'
    ];

    criticalImages.forEach(src => {
      if (!this.preloadedResources.has(src)) {
        this.preloadModernImage(src);
        this.preloadedResources.add(src);
      }
    });

    // Preload critical CSS with high priority
    this.preloadResource('/fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap', 'style', 'high');
  }

  private preloadModernImage(src: string): void {
    if (typeof document === 'undefined') return;

    // Preload AVIF if supported
    if (this.supportsImageFormat('avif')) {
      const avifSrc = this.convertToModernFormat(src, 'avif');
      this.preloadResource(avifSrc, 'image', 'high');
    }
    // Preload WebP if supported
    else if (this.supportsImageFormat('webp')) {
      const webpSrc = this.convertToModernFormat(src, 'webp');
      this.preloadResource(webpSrc, 'image', 'high');
    }
    // Fallback to original
    else {
      this.preloadResource(src, 'image', 'high');
    }
  }

  private supportsImageFormat(format: 'webp' | 'avif'): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0;
  }

  private convertToModernFormat(src: string, format: 'webp' | 'avif'): string {
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    
    const extension = src.split('.').pop()?.toLowerCase();
    if (extension === 'svg') return src;
    
    const basePath = src.replace(/\.[^/.]+$/, '');
    return `${basePath}.${format}`;
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
    
    link.onerror = () => console.warn(`Failed to preload: ${href}`);
    document.head.appendChild(link);
  }

  // Enhanced image optimization with responsive sizing
  generateResponsiveSrcSet(baseSrc: string): {
    srcSet: string;
    sizes: string;
    avifSrcSet?: string;
    webpSrcSet?: string;
  } {
    if (!baseSrc || baseSrc.startsWith('http') || baseSrc.startsWith('data:')) {
      return {
        srcSet: baseSrc,
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      };
    }

    const basePath = baseSrc.replace(/\.[^/.]+$/, '');
    const widths = [320, 640, 768, 1024, 1280, 1536];
    
    const generateSrcSet = (format: string) => {
      return widths.map(width => `${basePath}-${width}w.${format} ${width}w`).join(', ');
    };

    return {
      srcSet: generateSrcSet('jpg'),
      avifSrcSet: generateSrcSet('avif'),
      webpSrcSet: generateSrcSet('webp'),
      sizes: '(max-width: 320px) 280px, (max-width: 640px) 600px, (max-width: 768px) 720px, (max-width: 1024px) 960px, (max-width: 1280px) 1200px, 1440px'
    };
  }

  // Enhanced lazy loading with Intersection Observer v2
  setupAdvancedLazyLoading(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.observedImages.has(entry.target)) {
            const img = entry.target as HTMLImageElement;
            this.loadImageWithModernFormats(img);
            this.observedImages.add(img);
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.01
      }
    );

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  private loadImageWithModernFormats(img: HTMLImageElement): void {
    const dataSrc = img.dataset.src;
    if (!dataSrc) return;

    // Create picture element for modern format support
    const picture = document.createElement('picture');
    
    // Add AVIF source
    if (this.supportsImageFormat('avif')) {
      const avifSource = document.createElement('source');
      avifSource.srcset = this.convertToModernFormat(dataSrc, 'avif');
      avifSource.type = 'image/avif';
      picture.appendChild(avifSource);
    }

    // Add WebP source
    if (this.supportsImageFormat('webp')) {
      const webpSource = document.createElement('source');
      webpSource.srcset = this.convertToModernFormat(dataSrc, 'webp');
      webpSource.type = 'image/webp';
      picture.appendChild(webpSource);
    }

    // Set the final src
    img.src = dataSrc;
    img.removeAttribute('data-src');
  }

  // Enhanced Core Web Vitals monitoring with actionable insights
  initEnhancedWebVitalsMonitoring(): void {
    if (typeof window === 'undefined') return;

    // LCP monitoring with recommendations
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      const lcpTime = Math.round(lastEntry.startTime);
      
      console.log('LCP:', lcpTime, 'ms');
      
      if (lcpTime > 2500) {
        console.warn(`LCP is slow (${lcpTime}ms). Consider: preloading LCP image, optimizing server response, using CDN`);
        this.suggestLCPOptimizations(lastEntry.element);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Enhanced CLS monitoring with layout shift prevention
    let clsValue = 0;
    let clsEntries: any[] = [];
    
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      });
      
      if (clsValue > 0.1) {
        console.warn(`CLS is high (${clsValue.toFixed(4)}). Implementing fixes...`);
        this.fixLayoutShifts(clsEntries);
      }
    }).observe({ entryTypes: ['layout-shift'] });

    // INP monitoring (replaces FID)
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry: any) => {
        const inp = entry.processingStart - entry.startTime;
        console.log('INP:', Math.round(inp), 'ms');
        
        if (inp > 200) {
          console.warn(`INP is slow (${inp}ms). Consider: code splitting, reducing JS execution time, optimizing event handlers`);
        }
      });
    }).observe({ entryTypes: ['first-input'] });
  }

  private suggestLCPOptimizations(lcpElement: Element): void {
    if (lcpElement?.tagName === 'IMG') {
      const img = lcpElement as HTMLImageElement;
      if (!img.hasAttribute('fetchpriority')) {
        img.setAttribute('fetchpriority', 'high');
        console.log('Applied fetchpriority="high" to LCP image');
      }
    }
  }

  private fixLayoutShifts(entries: any[]): void {
    entries.forEach(entry => {
      entry.sources?.forEach((source: any) => {
        const element = source.node;
        if (element && element.tagName === 'IMG') {
          const img = element as HTMLImageElement;
          if (!img.style.aspectRatio && !img.width && !img.height) {
            // Set aspect ratio to prevent layout shift
            img.style.aspectRatio = '16/9';
            console.log('Applied aspect-ratio to prevent layout shift');
          }
        }
      });
    });
  }

  // Asset optimization - defer non-critical resources
  deferNonCriticalAssets(): void {
    if (typeof document === 'undefined') return;

    // Defer non-critical CSS
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    nonCriticalCSS.forEach(link => {
      const linkElement = link as HTMLLinkElement;
      linkElement.media = 'print';
      linkElement.onload = () => { linkElement.media = 'all'; };
    });

    // Defer non-critical JavaScript
    const nonCriticalJS = document.querySelectorAll('script:not([data-critical])');
    nonCriticalJS.forEach(script => {
      const scriptElement = script as HTMLScriptElement;
      if (!scriptElement.defer && !scriptElement.async) {
        scriptElement.defer = true;
      }
    });
  }

  // Resource cleanup to prevent memory leaks
  cleanupResources(): void {
    // Clean up blob URLs
    document.querySelectorAll('img[src^="blob:"]').forEach((img) => {
      const src = (img as HTMLImageElement).src;
      URL.revokeObjectURL(src);
    });

    // Clear caches periodically
    if (this.preloadedResources.size > 50) {
      this.preloadedResources.clear();
    }
  }

  // Initialize all optimizations
  init(): void {
    console.log('🚀 Initializing enhanced performance optimizations...');
    
    // Core optimizations
    this.preloadCriticalResources();
    this.deferNonCriticalAssets();
    this.setupAdvancedLazyLoading();
    this.initEnhancedWebVitalsMonitoring();
    
    // Periodic cleanup
    setInterval(() => {
      this.cleanupResources();
    }, 300000); // Every 5 minutes
    
    console.log('✅ Enhanced performance optimizer initialized');
  }
}

// Initialize enhanced performance optimizations
export const initPerformanceOptimizations = () => {
  const optimizer = PerformanceOptimizer.getInstance();
  optimizer.init();
};
