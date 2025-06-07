
import React, { useEffect, Suspense } from 'react';
import { useMobilePerformance } from '@/hooks/useMobilePerformance';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizedAppProps {
  children: React.ReactNode;
}

// Optimized loading component for mobile
const MobileLoadingScreen = () => (
  <div className="loading-screen">
    <div className="flex flex-col items-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 text-sm">Loading...</p>
    </div>
  </div>
);

// Error boundary for mobile
class MobileErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Mobile app error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Please refresh the page to try again.</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-mobile bg-blue-500 text-white"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const MobileOptimizedApp: React.FC<MobileOptimizedAppProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { cleanup } = useMobilePerformance({
    enableImageLazyLoading: true,
    enableTouchOptimizations: true,
    enableBatteryOptimizations: true,
    enableNetworkOptimizations: true
  });

  useEffect(() => {
    // Set viewport meta tag for proper mobile rendering
    const setViewportMeta = () => {
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      
      viewport.setAttribute(
        'content', 
        'width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, viewport-fit=cover'
      );
    };

    setViewportMeta();

    // Mobile-specific optimizations
    if (isMobile) {
      // Prevent iOS safari bounce
      document.body.style.overscrollBehavior = 'none';
      
      // Optimize for mobile Safari
      document.documentElement.style.webkitTextSizeAdjust = '100%';
      
      // Add mobile class for CSS targeting
      document.documentElement.classList.add('mobile-device');
      
      // Critical resource hints for mobile
      const preloadCriticalResources = () => {
        const criticalFonts = [
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        ];
        
        criticalFonts.forEach(href => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'style';
          link.href = href;
          document.head.appendChild(link);
        });
      };
      
      // Defer non-critical resource loading
      requestIdleCallback ? requestIdleCallback(preloadCriticalResources) : setTimeout(preloadCriticalResources, 100);
    }

    // Cleanup on unmount
    return () => {
      cleanup();
      if (isMobile) {
        document.documentElement.classList.remove('mobile-device');
      }
    };
  }, [isMobile, cleanup]);

  return (
    <MobileErrorBoundary>
      <div className={`min-h-screen ${isMobile ? 'mobile-optimized' : ''}`}>
        <Suspense fallback={<MobileLoadingScreen />}>
          {children}
        </Suspense>
      </div>
    </MobileErrorBoundary>
  );
};
