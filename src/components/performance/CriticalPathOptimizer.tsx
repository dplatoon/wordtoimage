
import { useEffect } from 'react';

export const CriticalPathOptimizer = () => {
  useEffect(() => {
    // Inject critical above-the-fold CSS immediately
    const criticalCSS = `
      /* Critical hero and navigation styles for LCP optimization */
      .hero-section {
        min-height: 100vh;
        background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        contain: layout style paint;
      }
      
      .nav-container {
        height: 64px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid #e5e7eb;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        contain: layout style;
      }
      
      /* Critical button styles with improved contrast */
      .btn-primary {
        background: #1E40AF; /* Improved contrast ratio 6.2:1 */
        color: #ffffff;
        border-radius: 0.75rem;
        padding: 0.875rem 2rem;
        font-weight: 600;
        font-size: 1.125rem;
        min-height: 48px;
        transition: all 0.2s ease;
        border: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        will-change: transform;
      }
      
      .btn-primary:hover {
        background: #1E3A8A;
        transform: translateY(-1px);
      }
      
      .btn-primary:focus-visible {
        outline: 3px solid #3B82F6;
        outline-offset: 2px;
      }
      
      /* Critical text contrast improvements */
      .text-primary {
        color: #1a202c; /* Enhanced contrast */
      }
      
      .text-secondary {
        color: #2d3748; /* Enhanced contrast */
      }
      
      .text-muted {
        color: #4a5568; /* Improved from #6B7280 for better contrast */
      }
      
      /* Critical layout optimization */
      .container-optimized {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        contain: layout;
      }
      
      /* Critical image optimization */
      .optimized-image {
        width: 100%;
        height: auto;
        object-fit: cover;
        font-style: italic;
        background-color: #f3f4f6;
        background-repeat: no-repeat;
        background-size: cover;
        loading: lazy;
        decoding: async;
      }
      
      /* Critical loading states */
      .loading-optimized {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s ease-in-out infinite;
      }
      
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      /* Mobile-first responsive optimization */
      @media (max-width: 768px) {
        .container-optimized {
          padding: 0 0.75rem;
        }
        
        .btn-primary {
          width: 100%;
          font-size: 1rem;
          padding: 0.75rem 1.5rem;
        }
        
        .hero-section {
          min-height: 80vh;
          padding: 1rem;
        }
      }
      
      /* Reduce motion for performance and accessibility */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = criticalCSS;
    styleElement.id = 'critical-path-css';
    document.head.appendChild(styleElement);

    // Preload critical resources for better LCP
    const preloadCriticalResources = () => {
      const criticalResources = [
        { href: '/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png', as: 'image', type: 'image/png' },
        { href: '/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png', as: 'image', type: 'image/png' },
        { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap', as: 'style' }
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        link.crossOrigin = 'anonymous';
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      });
    };

    preloadCriticalResources();

    return () => {
      const existingStyle = document.getElementById('critical-path-css');
      if (existingStyle?.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, []);

  return null;
};
