
// Resource optimization utilities
export class ResourceOptimizer {
  private preloadedResources: Set<string> = new Set();

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

  getPreloadedResourcesCount(): number {
    return this.preloadedResources.size;
  }
}
