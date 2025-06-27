
// Service Worker registration and management
export class ServiceWorkerManager {
  private static instance: ServiceWorkerManager;
  private registration: ServiceWorkerRegistration | null = null;

  static getInstance(): ServiceWorkerManager {
    if (!ServiceWorkerManager.instance) {
      ServiceWorkerManager.instance = new ServiceWorkerManager();
    }
    return ServiceWorkerManager.instance;
  }

  async register(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered successfully:', this.registration);

      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        const newWorker = this.registration?.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              this.showUpdateNotification();
            }
          });
        }
      });

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  private showUpdateNotification(): void {
    // Show user-friendly update notification
    if (Notification.permission === 'granted') {
      new Notification('App Update Available', {
        body: 'A new version of the app is available. Refresh to update.',
        icon: '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png'
      });
    }
  }

  async unregister(): Promise<void> {
    if (this.registration) {
      await this.registration.unregister();
      console.log('Service Worker unregistered');
    }
  }

  // Background sync for offline functionality
  async scheduleBackgroundSync(tag: string): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        await this.registration?.sync.register(tag);
        console.log('Background sync scheduled:', tag);
      } catch (error) {
        console.error('Background sync registration failed:', error);
      }
    }
  }

  // Check if app is running in offline mode
  isOffline(): boolean {
    return !navigator.onLine;
  }

  // Get cache usage information
  async getCacheUsage(): Promise<{ quota: number; usage: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        quota: estimate.quota || 0,
        usage: estimate.usage || 0
      };
    }
    return { quota: 0, usage: 0 };
  }
}

// Initialize service worker
export const initServiceWorker = async (): Promise<void> => {
  const swManager = ServiceWorkerManager.getInstance();
  await swManager.register();
};

// Preload critical resources
export const preloadCriticalResources = (): void => {
  const criticalResources = [
    '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png',
    '/lovable-uploads/19295794-7457-41ec-9272-41faed11b055.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('.png') ? 'image' : 'style';
    if (resource.includes('fonts')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
};
