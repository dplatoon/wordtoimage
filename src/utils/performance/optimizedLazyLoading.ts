
// Optimized lazy loading - minimal bundle impact
interface LazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
}

class OptimizedLazyLoader {
  private static instance: OptimizedLazyLoader;
  private observer: IntersectionObserver | null = null;
  private imageCache = new Map<string, HTMLImageElement>();

  private constructor() {
    this.initializeObserver();
  }

  static getInstance(): OptimizedLazyLoader {
    if (!OptimizedLazyLoader.instance) {
      OptimizedLazyLoader.instance = new OptimizedLazyLoader();
    }
    return OptimizedLazyLoader.instance;
  }

  private initializeObserver() {
    if (!('IntersectionObserver' in window)) return;

    const options: IntersectionObserverInit = {
      rootMargin: '100px',
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

  private loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    if (!src) return;

    if (this.imageCache.has(src)) {
      const cachedImg = this.imageCache.get(src)!;
      img.src = cachedImg.src;
      img.classList.add('loaded');
      return;
    }

    const imageLoader = new Image();
    imageLoader.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      this.imageCache.set(src, imageLoader);
    };
    
    imageLoader.onerror = () => {
      img.classList.add('error');
    };
    
    imageLoader.src = src;
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

export { OptimizedLazyLoader };
