
import React, { useEffect, useRef } from 'react';
import { trackEvent } from '@/utils/analytics';

interface UserEngagementTrackerProps {
  contentId?: string;
  contentType?: string;
  children: React.ReactNode;
}

export const UserEngagementTracker: React.FC<UserEngagementTrackerProps> = ({
  contentId,
  contentType = 'content',
  children,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const timeStartRef = useRef<number>(0);
  const hasTrackedViewRef = useRef<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedViewRef.current) {
            // Track content view
            trackEvent({
              action: 'content_view',
              category: 'engagement',
              label: contentType,
              custom_parameters: { content_id: contentId },
            });
            
            timeStartRef.current = Date.now();
            hasTrackedViewRef.current = true;
          } else if (!entry.isIntersecting && timeStartRef.current > 0) {
            // Track time spent
            const timeSpent = Date.now() - timeStartRef.current;
            if (timeSpent > 1000) { // Only track if viewed for more than 1 second
              trackEvent({
                action: 'content_time_spent',
                category: 'engagement',
                label: contentType,
                value: Math.round(timeSpent / 1000),
                custom_parameters: { content_id: contentId },
              });
            }
            timeStartRef.current = 0;
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      
      // Track final time spent on unmount
      if (timeStartRef.current > 0) {
        const timeSpent = Date.now() - timeStartRef.current;
        if (timeSpent > 1000) {
          trackEvent({
            action: 'content_time_spent',
            category: 'engagement',
            label: contentType,
            value: Math.round(timeSpent / 1000),
            custom_parameters: { content_id: contentId },
          });
        }
      }
    };
  }, [contentId, contentType]);

  return (
    <div ref={elementRef} className="w-full">
      {children}
    </div>
  );
};
