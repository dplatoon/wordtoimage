
import { useEffect } from 'react';

export const ResourcePreloader = () => {
  useEffect(() => {
    // Defer font loading to not block FCP - use requestIdleCallback
    const loadFonts = () => {
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      fontLink.media = 'print';
      fontLink.onload = () => {
        fontLink.media = 'all';
      };
      document.head.appendChild(fontLink);
    };

    // Use requestIdleCallback to defer non-critical work
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadFonts);
    } else {
      setTimeout(loadFonts, 100);
    }

    // DNS prefetch for external domains (low priority, doesn't block)
    const domains = [
      '//fonts.googleapis.com',
      '//fonts.gstatic.com'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preconnect to font origins (helps but doesn't block)
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
