
import { useEffect } from 'react';

export const ResourcePreloader = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Critical fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
      document.head.appendChild(fontLink);
      
      // Preconnect to critical domains
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://images.unsplash.com'
      ];
      
      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
      
      // DNS prefetch for other domains
      const dnsPrefetchDomains = [
        '//api.openai.com',
        '//cdn.jsdelivr.net'
      ];
      
      dnsPrefetchDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });
    };
    
    // Run immediately for critical resources
    preloadResources();
    
    // Preload next likely user actions
    const preloadUserActions = () => {
      // Preload the text-to-image page
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = '/text-to-image';
      document.head.appendChild(link);
    };
    
    // Preload user actions after a short delay
    setTimeout(preloadUserActions, 2000);
    
  }, []);

  return null;
};
