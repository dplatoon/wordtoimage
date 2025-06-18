
import { useRef, useCallback } from 'react';

export const useScrollTracking = (
  pageId: string,
  onScrollMilestone: (milestone: number, engagementScore: number) => void,
  updateScrollDepth: (depth: number) => void
) => {
  const scrollThresholdsRef = useRef<Set<number>>(new Set());

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
    
    updateScrollDepth(scrollPercent);
    
    // Track scroll milestones
    const milestones = [25, 50, 75, 90];
    milestones.forEach(milestone => {
      if (scrollPercent >= milestone && !scrollThresholdsRef.current.has(milestone)) {
        scrollThresholdsRef.current.add(milestone);
        onScrollMilestone(milestone, 0); // engagement score will be calculated in parent
      }
    });
  }, [onScrollMilestone, updateScrollDepth]);

  return { handleScroll };
};
