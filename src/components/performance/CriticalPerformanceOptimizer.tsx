import { useEffect } from 'react';

export const CriticalPerformanceOptimizer = () => {
  useEffect(() => {
    // Immediate critical performance fixes
    const optimizeImmediately = () => {
      // 1. Disable unnecessary animations during initial load
      document.documentElement.style.setProperty('--animation-duration', '0s');
      
      // 2. Optimize font loading - prevent FOIT (Flash of Invisible Text)
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          // Re-enable animations after fonts load
          document.documentElement.style.setProperty('--animation-duration', '');
        });
      }
      
      // 3. Preconnect to critical domains
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];
      
      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
      
      // 4. Remove blocking resources that aren't critical
      const nonCriticalScripts = document.querySelectorAll('script[defer]:not([data-critical])');
      nonCriticalScripts.forEach(script => {
        if (script.textContent?.includes('analytics') || 
            script.textContent?.includes('tracking')) {
          // Delay analytics to improve core metrics
          setTimeout(() => {
            script.removeAttribute('defer');
          }, 3000);
        }
      });
      
      // 5. Optimize CSS delivery
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      stylesheets.forEach((link: Element) => {
        const linkElement = link as HTMLLinkElement;
        if (!linkElement.href.includes('critical')) {
          linkElement.media = 'print';
          linkElement.onload = () => {
            linkElement.media = 'all';
          };
        }
      });
    };
    
    // Run optimizations immediately
    optimizeImmediately();
    
    // Additional optimizations after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        // Optimize images after initial render
        requestIdleCallback(() => {
          const images = document.querySelectorAll('img:not([loading="eager"])');
          images.forEach((img: Element) => {
            const imgElement = img as HTMLImageElement;
            if (imgElement.getBoundingClientRect().top > window.innerHeight * 2) {
              imgElement.loading = 'lazy';
            }
          });
        });
      });
    }
    
  }, []);

  return null;
};