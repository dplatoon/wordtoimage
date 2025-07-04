import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const MobileLighthouseOptimizer = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    console.log('📱 Mobile Lighthouse Optimizer: Applying mobile-specific optimizations...');

    // 1. Reduce image quality for mobile to improve loading
    optimizeImagesForMobile();
    
    // 2. Defer non-critical resources
    deferNonCriticalResources();
    
    // 3. Optimize touch interactions
    optimizeTouchInteractions();
    
    // 4. Apply mobile-specific CSS optimizations
    applyMobileCSSOptimizations();
    
    // 5. Optimize viewport and meta tags
    optimizeViewport();

    console.log('✅ Mobile optimizations applied');
  }, [isMobile]);

  const optimizeImagesForMobile = () => {
    // Reduce image quality for mobile
    const images = document.querySelectorAll('img[src*="unsplash"], img[src*="cloudinary"]');
    
    images.forEach((img: HTMLImageElement) => {
      const originalSrc = img.src;
      
      // For Unsplash images, reduce quality and size for mobile
      if (originalSrc.includes('unsplash')) {
        const mobileOptimizedSrc = originalSrc
          .replace(/w=\d+/, 'w=400')  // Reduce width to 400px
          .replace(/q=\d+/, 'q=60')   // Reduce quality to 60%
          .replace(/&auto=format/, '&auto=format&fm=webp'); // Force WebP

        // Create intersection observer for mobile lazy loading
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                img.src = mobileOptimizedSrc;
                observer.unobserve(img);
              }
            });
          },
          { 
            threshold: 0.1, 
            rootMargin: '20px' // Smaller rootMargin for mobile
          }
        );
        
        observer.observe(img);
      }
    });

    // Add mobile-specific image loading attributes
    const allImages = document.querySelectorAll('img');
    allImages.forEach((img: HTMLImageElement) => {
      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }
      if (!img.hasAttribute('decoding')) {
        img.decoding = 'async';
      }
    });
  };

  const deferNonCriticalResources = () => {
    // Defer non-critical scripts for mobile
    const nonCriticalScripts = document.querySelectorAll(
      'script[src*="analytics"], script[src*="chat"], script[src*="social"], script[src*="ads"]'
    );
    
    nonCriticalScripts.forEach((script: HTMLScriptElement) => {
      script.defer = true;
    });

    // Remove or defer heavy CSS animations for mobile
    const heavyAnimations = document.querySelectorAll('[class*="animate-"], [class*="transition-"]');
    heavyAnimations.forEach((element: HTMLElement) => {
      // Reduce animation duration for mobile
      element.style.animationDuration = '0.2s';
      element.style.transitionDuration = '0.2s';
    });

    // Reduce the number of background animations
    const backgroundAnimations = document.querySelectorAll('.bg-gradient-to-r, .bg-gradient-to-br');
    backgroundAnimations.forEach((element: HTMLElement) => {
      // Replace with solid colors for mobile to improve performance
      if (window.innerWidth < 768) {
        element.style.background = 'hsl(var(--primary))';
      }
    });
  };

  const optimizeTouchInteractions = () => {
    // Add touch-action CSS for better scroll performance
    document.body.style.touchAction = 'pan-y pinch-zoom';
    
    // Optimize button touch targets
    const buttons = document.querySelectorAll('button, [role="button"], a');
    buttons.forEach((button: HTMLElement) => {
      // Ensure minimum touch target size (44px)
      const rect = button.getBoundingClientRect();
      if (rect.height < 44 || rect.width < 44) {
        button.style.minHeight = '44px';
        button.style.minWidth = '44px';
        button.style.padding = '8px 12px';
      }
    });

    // Reduce hover effects on mobile (they don't work well)
    const hoverElements = document.querySelectorAll('[class*="hover:"]');
    hoverElements.forEach((element: HTMLElement) => {
      element.addEventListener('touchstart', (e) => {
        e.preventDefault();
      }, { passive: false });
    });
  };

  const applyMobileCSSOptimizations = () => {
    const mobileCSS = `
      /* Mobile-specific performance optimizations */
      @media (max-width: 768px) {
        * {
          /* Use GPU acceleration sparingly on mobile */
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        /* Reduce blur effects which are expensive on mobile */
        .backdrop-blur {
          backdrop-filter: none !important;
          background: rgba(255, 255, 255, 0.9) !important;
        }
        
        /* Optimize gradients for mobile */
        .bg-gradient-to-r,
        .bg-gradient-to-br,
        .bg-gradient-to-tr {
          background: hsl(var(--primary)) !important;
        }
        
        /* Reduce shadows for better performance */
        .shadow-lg,
        .shadow-xl,
        .shadow-2xl {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Optimize transitions */
        .transition-all {
          transition: transform 0.15s ease !important;
        }
        
        /* Reduce unnecessary transforms */
        .transform {
          transform: none !important;
        }
        
        /* Optimize images */
        img {
          image-rendering: optimizeSpeed;
          image-rendering: -webkit-optimize-contrast;
        }
        
        /* Improve scrolling performance */
        .overflow-scroll,
        .overflow-y-scroll {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: auto; /* Disable smooth scrolling on mobile */
        }
        
        /* Reduce motion for better performance */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      }
    `;

    const style = document.createElement('style');
    style.id = 'mobile-lighthouse-optimizations';
    style.textContent = mobileCSS;
    document.head.appendChild(style);
  };

  const optimizeViewport = () => {
    // Ensure optimal viewport settings
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    
    viewport.setAttribute(
      'content', 
      'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover'
    );

    // Add mobile-specific meta tags
    const mobileOptimized = document.createElement('meta');
    mobileOptimized.setAttribute('name', 'mobile-web-app-capable');
    mobileOptimized.setAttribute('content', 'yes');
    document.head.appendChild(mobileOptimized);

    const appleMobile = document.createElement('meta');
    appleMobile.setAttribute('name', 'apple-mobile-web-app-capable');
    appleMobile.setAttribute('content', 'yes');
    document.head.appendChild(appleMobile);

    const appleStatusBar = document.createElement('meta');
    appleStatusBar.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
    appleStatusBar.setAttribute('content', 'default');
    document.head.appendChild(appleStatusBar);
  };

  return null;
};