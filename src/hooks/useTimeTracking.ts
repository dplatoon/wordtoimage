
import { useRef, useCallback } from 'react';

export const useTimeTracking = (
  pageId: string,
  startTimeRef: React.MutableRefObject<number>,
  onTimeThreshold: (threshold: number, timeSpent: number, engagementScore: number) => void,
  updateTimeOnPage: (time: number) => void
) => {
  const timeThresholdsRef = useRef<Set<number>>(new Set());

  const checkTimeThresholds = useCallback(() => {
    const timeSpent = Date.now() - startTimeRef.current;
    updateTimeOnPage(timeSpent);
    
    const thresholds = [30000, 60000, 120000, 300000]; // 30s, 1m, 2m, 5m
    thresholds.forEach(threshold => {
      if (timeSpent >= threshold && !timeThresholdsRef.current.has(threshold)) {
        timeThresholdsRef.current.add(threshold);
        onTimeThreshold(threshold, timeSpent, 0); // engagement score will be calculated in parent
      }
    });
  }, [onTimeThreshold, updateTimeOnPage, startTimeRef]);

  return { checkTimeThresholds };
};
