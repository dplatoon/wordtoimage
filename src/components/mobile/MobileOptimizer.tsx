import { useEffect } from 'react';

/**
 * Mobile performance and UX optimizer
 * Handles mobile-specific optimizations across the app
 */
export function MobileOptimizer() {
  useEffect(() => {
    // Prevent pull-to-refresh on mobile browsers
    let lastTouchY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const touchYDelta = touchY - lastTouchY;
      lastTouchY = touchY;

      if (window.scrollY === 0 && touchYDelta > 0) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Optimize viewport for mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover'
      );
    }

    // Add mobile-specific class to body
    if (window.innerWidth < 768) {
      document.body.classList.add('mobile-device');
    }

    // Detect and handle notch/safe areas
    if (CSS.supports('padding-top: env(safe-area-inset-top)')) {
      document.documentElement.classList.add('has-notch');
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
}
