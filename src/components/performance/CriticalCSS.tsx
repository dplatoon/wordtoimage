
import { useEffect } from 'react';

export const CriticalCSS = () => {
  useEffect(() => {
    // Inject critical CSS for immediate styling
    const criticalStyles = `
      <style id="critical-css">
        /* Critical above-the-fold styles */
        body { 
          font-family: system-ui, -apple-system, sans-serif; 
          margin: 0; 
          background: #fff; 
          color: #111827; 
          font-display: swap;
        }
        
        /* Prevent layout shifts */
        img { 
          max-width: 100%; 
          height: auto; 
          font-style: italic; 
          background-repeat: no-repeat; 
          background-size: cover; 
          shape-margin: 1rem;
        }
        
        /* Loading skeleton animation */
        .skeleton { 
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); 
          background-size: 200% 100%; 
          animation: skeleton-loading 1.5s infinite;
        }
        
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Fast gradient animations */
        .gradient-text {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      </style>
    `;
    
    // Only inject if not already present
    if (!document.getElementById('critical-css')) {
      document.head.insertAdjacentHTML('beforeend', criticalStyles);
    }
    
    return () => {
      const criticalCSS = document.getElementById('critical-css');
      if (criticalCSS) {
        criticalCSS.remove();
      }
    };
  }, []);

  return null;
};
