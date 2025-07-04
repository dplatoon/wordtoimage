import { useEffect, useRef } from 'react';
import { analytics } from '@/services/advancedAnalytics';

export const BehaviorTracker = () => {
  const startTime = useRef(Date.now());
  const currentPath = useRef(window.location.pathname);

  useEffect(() => {
    // Track initial page view
    analytics.trackPageView(window.location.pathname);

    // Track scroll events
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        analytics.trackEvent({
          event_type: 'scroll_interaction',
          event_data: {
            scroll_depth: getScrollDepth(),
            timestamp: Date.now()
          }
        });
      }, 1000);
    };

    // Track click events
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      analytics.trackEvent({
        event_type: 'click_interaction',
        event_data: {
          element_tag: target.tagName,
          element_class: target.className,
          element_text: target.textContent?.substring(0, 100),
          x: event.clientX,
          y: event.clientY,
          timestamp: Date.now()
        }
      });
    };

    // Track form interactions
    const handleFormSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement;
      analytics.trackEvent({
        event_type: 'form_submission',
        event_data: {
          form_id: form.id,
          form_action: form.action,
          timestamp: Date.now()
        }
      });
    };

    // Track time on page before leaving
    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      analytics.updateTimeOnPage(currentPath.current, timeSpent);
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleFormSubmit);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Clean up and track final time on page
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      analytics.updateTimeOnPage(currentPath.current, timeSpent);

      // Remove event listeners
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleFormSubmit);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Track route changes
  useEffect(() => {
    const handleRouteChange = () => {
      // Update time on previous page
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      analytics.updateTimeOnPage(currentPath.current, timeSpent);

      // Track new page
      const newPath = window.location.pathname;
      currentPath.current = newPath;
      startTime.current = Date.now();
      analytics.trackPageView(newPath);
    };

    // Listen for route changes (for SPA)
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

function getScrollDepth(): number {
  const winHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset;
  const trackLength = docHeight - winHeight;
  const pctScrolled = Math.floor(scrollTop / trackLength * 100);
  return Math.min(pctScrolled, 100);
}