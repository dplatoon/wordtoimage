
import { useEffect } from 'react';

export const CriticalCSS = () => {
  useEffect(() => {
    // Inject critical CSS for above-the-fold content
    const criticalStyles = `
      .hero-gradient {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transition: transform 0.2s ease;
      }
      
      .btn-primary:hover {
        transform: translateY(-1px);
      }
      
      .loading-skeleton {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .5; }
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = criticalStyles;
    document.head.appendChild(styleElement);

    return () => {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  return null;
};
