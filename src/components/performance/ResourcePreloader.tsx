
import { useEffect } from 'react';

export const ResourcePreloader = () => {
  useEffect(() => {
    // Preload critical fonts with proper font-display
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });

    // Preload critical images with high priority
    const criticalImages = [
      '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png',
      '/lovable-uploads/19295794-7457-41ec-9272-41faed11b055.png',
      '/lovable-uploads/317dfa28-3425-4dac-a167-343034ee797b.png',
      '/lovable-uploads/5780c58f-29ec-4462-a0eb-3ba9829bf938.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // DNS prefetch for external domains
    const domains = [
      '//fonts.googleapis.com',
      '//fonts.gstatic.com',
      '//api.replicate.com',
      '//api.runware.ai'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preconnect to critical third-party origins
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
  }, []);

  return null;
};
