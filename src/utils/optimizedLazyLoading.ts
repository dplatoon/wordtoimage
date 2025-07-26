// Optimized lazy loading utilities for maximum performance

interface LazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
  enableOnSlowConnection?: boolean;
}

export class OptimizedLazyLoader {
  private static instance: OptimizedLazyLoader;
  private observer: IntersectionObserver | null = null;
  private imageCache = new Map<string, HTMLImageElement>();
  private isSlowConnection = false;

  private constructor() {
    this.checkConnectionSpeed();
    this.initializeObserver();
  }

  static getInstance(): OptimizedLazyLoader {
    if (!OptimizedLazyLoader.instance) {
      OptimizedLazyLoader.instance = new OptimizedLazyLoader();
    }
    return OptimizedLazyLoader.instance;
  }

  private checkConnectionSpeed() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.isSlowConnection = connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
    }
  }

  private initializeObserver() {
    if (!('IntersectionObserver' in window)) return;

    const options: IntersectionObserverInit = {
      rootMargin: this.isSlowConnection ? '50px' : '200px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          this.loadImage(img);
          this.observer?.unobserve(img);
        }
      });
    }, options);
  }

  private async loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    if (!src) return;

    // Check cache first
    if (this.imageCache.has(src)) {
      const cachedImg = this.imageCache.get(src)!;
      img.src = cachedImg.src;
      img.classList.add('loaded');
      return;
    }

    // Show loading state
    img.classList.add('loading');

    try {
      const imageLoader = new Image();
      imageLoader.onload = () => {
        img.src = src;
        img.classList.remove('loading');
        img.classList.add('loaded');
        this.imageCache.set(src, imageLoader);
      };
      
      imageLoader.onerror = () => {
        img.classList.remove('loading');
        img.classList.add('error');
        // Fallback to a placeholder
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NzM4ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIFVuYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
      };
      
      imageLoader.src = src;
    } catch (error) {
      console.error('Error loading image:', error);
      img.classList.remove('loading');
      img.classList.add('error');
    }
  }

  public observeImage(img: HTMLImageElement) {
    if (this.observer && img.dataset.src) {
      this.observer.observe(img);
    }
  }

  public disconnect() {
    this.observer?.disconnect();
    this.imageCache.clear();
  }
}

// Utility function for React components
export const useLazyImage = (src: string, alt: string = '') => {
  return {
    'data-src': src,
    alt,
    loading: 'lazy' as const,
    onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      OptimizedLazyLoader.getInstance().observeImage(img);
    }
  };
};

// Component preloader for better UX
export const preloadComponent = async (componentImporter: () => Promise<any>) => {
  try {
    const module = await componentImporter();
    return module.default || module;
  } catch (error) {
    console.error('Failed to preload component:', error);
    return null;
  }
};

// Connection-aware resource loading
export const shouldLoadHighQualityAssets = (): boolean => {
  if (!('connection' in navigator)) return true;
  
  const connection = (navigator as any).connection;
  return !(connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.saveData);
};