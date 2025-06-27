
import { useEffect } from 'react';

export const CriticalCSS = () => {
  useEffect(() => {
    // Inject critical CSS for above-the-fold content
    const criticalStyles = `
      /* Critical hero section styles */
      .hero-gradient {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      /* Critical button styles */
      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transition: transform 0.2s ease;
      }
      
      .btn-primary:hover {
        transform: translateY(-1px);
      }
      
      /* Critical loading states */
      .loading-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: pulse 2s ease-in-out infinite;
      }
      
      @keyframes pulse {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      /* Critical layout styles */
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      /* Critical grid styles */
      .grid-responsive {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }
      
      /* Critical text styles */
      .text-gradient {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      /* Critical image optimization */
      .optimized-image {
        object-fit: cover;
        width: 100%;
        height: auto;
        loading: lazy;
      }
      
      /* Critical mobile optimizations */
      @media (max-width: 768px) {
        .container {
          padding: 0 0.75rem;
        }
        
        .grid-responsive {
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .text-large {
          font-size: 1.5rem;
        }
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = criticalStyles;
    styleElement.id = 'critical-css';
    document.head.appendChild(styleElement);

    return () => {
      const existingStyle = document.getElementById('critical-css');
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, []);

  return null;
};
