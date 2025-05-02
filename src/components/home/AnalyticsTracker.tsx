
import { useEffect } from 'react';

export const AnalyticsTracker = () => {
  useEffect(() => {
    // Track page view with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Home - WordToImage',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
    
    // Add page-specific metadata
    document.title = "WordToImage - Transform Text Into Images with AI";
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return null;
};
