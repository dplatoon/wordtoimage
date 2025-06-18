
import { useEffect } from 'react';

export const CriticalCSSOptimizer = () => {
  useEffect(() => {
    // Inject critical CSS for above-the-fold content
    const criticalCSS = `
      /* Critical styles for immediate rendering */
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
        margin: 0;
        background: #fff;
        color: #111827;
        line-height: 1.6;
      }
      
      /* Hero section critical styles */
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      /* Critical image styles */
      img {
        max-width: 100%;
        height: auto;
        font-style: italic;
        background-repeat: no-repeat;
        background-size: cover;
        shape-margin: 1rem;
      }
      
      /* Loading animation */
      .loading-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      /* Mobile-first critical styles */
      @media (max-width: 768px) {
        .hero-section {
          min-height: 80vh;
          padding: 1rem;
        }
        
        /* Touch targets minimum 48px */
        button, a[role="button"], .touch-target {
          min-height: 48px;
          min-width: 48px;
        }
      }
      
      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* High contrast support */
      @media (prefers-contrast: high) {
        .btn-primary {
          border: 2px solid;
        }
      }
      
      /* Print styles */
      @media print {
        nav, footer, .no-print {
          display: none !important;
        }
      }
    `;

    // Create and inject critical CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = criticalCSS;
    styleElement.setAttribute('data-critical', 'true');
    document.head.insertBefore(styleElement, document.head.firstChild);

    // Preload critical fonts
    const preloadFont = (href: string, type: string = 'font/woff2') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = type;
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Preload Inter font (system font fallback already in CSS)
    preloadFont('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2');

    // Optimize font loading
    const optimizeFontLoading = () => {
      const fontDisplay = document.createElement('style');
      fontDisplay.textContent = `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `;
      document.head.appendChild(fontDisplay);
    };

    // Defer non-critical font loading
    requestIdleCallback(optimizeFontLoading);

    // Image optimization hints
    const addImageOptimizationHints = () => {
      // Add loading hints for critical images
      const criticalImages = document.querySelectorAll('img[data-critical]');
      criticalImages.forEach((img) => {
        (img as HTMLImageElement).loading = 'eager';
        (img as HTMLImageElement).fetchPriority = 'high';
      });

      // Add lazy loading for non-critical images
      const nonCriticalImages = document.querySelectorAll('img:not([data-critical]):not([loading])');
      nonCriticalImages.forEach((img) => {
        (img as HTMLImageElement).loading = 'lazy';
        (img as HTMLImageElement).decoding = 'async';
      });
    };

    // Apply image optimizations after DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addImageOptimizationHints);
    } else {
      addImageOptimizationHints();
    }

    // Cleanup function
    return () => {
      const criticalStyle = document.querySelector('style[data-critical]');
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };
  }, []);

  return null;
};
