import { useEffect } from 'react';

export const CriticalPathOptimizer = () => {
  useEffect(() => {
    console.log('🎯 Critical Path Optimizer: Optimizing render-blocking resources...');
    
    // Inline critical CSS immediately for faster FCP
    const criticalCSS = `
      /* LIGHTHOUSE MOBILE OPTIMIZATION - Critical above-the-fold styles */
      html { 
        scroll-behavior: auto !important; 
        font-size: 16px;
      }
      
      body { 
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.5;
        margin: 0;
        padding: 0;
        color: #1a202c;
      }
      
      /* Critical layout to prevent CLS */
      .container { 
        max-width: 1200px; 
        margin: 0 auto; 
        padding: 0 1rem; 
        contain: layout;
      }
      
      /* Hero section optimized for mobile LCP */
      .hero-section {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        contain: layout style paint;
      }
      
      /* Button critical styles - mobile optimized */
      .btn-primary {
        background: #1E40AF;
        color: #ffffff;
        padding: 12px 24px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        min-height: 44px;
        transition: transform 0.15s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Mobile-specific optimizations */
      @media (max-width: 768px) {
        .container { 
          padding: 0 0.75rem; 
        }
        
        .hero-section { 
          min-height: 50vh; 
          padding: 2rem 0; 
        }
        
        .btn-primary { 
          width: 100%; 
          padding: 14px 20px; 
        }
        
        /* Reduce expensive effects on mobile */
        .backdrop-blur {
          backdrop-filter: none !important;
          background: rgba(255, 255, 255, 0.95) !important;
        }
      }
      
      /* Reduce motion for better performance */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;

    const style = document.createElement('style');
    style.id = 'critical-path-css';
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    // Preload critical hero image
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=400&q=75';
    (link as any).fetchPriority = 'high';
    document.head.appendChild(link);

    console.log('✅ Critical path optimized for mobile performance');

    return () => {
      const existingStyle = document.getElementById('critical-path-css');
      if (existingStyle?.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, []);

  return null;
};