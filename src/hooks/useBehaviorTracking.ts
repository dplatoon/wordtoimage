
import { useRef, useCallback } from 'react';
import { trackEvent } from '@/utils/analytics';

interface UserBehavior {
  timeOnPage: number;
  scrollDepth: number;
  clickCount: number;
  generationAttempts: number;
  featureInteractions: string[];
  engagementScore: number;
}

interface ConversionTrigger {
  type: 'time_threshold' | 'scroll_depth' | 'engagement_score' | 'exit_intent' | 'feature_interest';
  data: any;
  timestamp: number;
}

export const useBehaviorTracking = (pageId: string, onConversionTrigger?: (trigger: ConversionTrigger) => void) => {
  const behaviorRef = useRef<UserBehavior>({
    timeOnPage: 0,
    scrollDepth: 0,
    clickCount: 0,
    generationAttempts: 0,
    featureInteractions: [],
    engagementScore: 0
  });
  
  const startTimeRef = useRef<number>(Date.now());

  // Calculate engagement score
  const calculateEngagementScore = useCallback(() => {
    const behavior = behaviorRef.current;
    let score = 0;
    
    // Time on page (max 40 points)
    score += Math.min(behavior.timeOnPage / 1000 / 60 * 10, 40); // 10 points per minute, max 4 minutes
    
    // Scroll depth (max 20 points)
    score += behavior.scrollDepth * 0.2;
    
    // Click interactions (max 20 points)
    score += Math.min(behavior.clickCount * 2, 20);
    
    // Generation attempts (max 20 points)
    score += Math.min(behavior.generationAttempts * 10, 20);
    
    return Math.round(score);
  }, []);

  const updateBehavior = useCallback((updates: Partial<UserBehavior>) => {
    Object.assign(behaviorRef.current, updates);
  }, []);

  const trackBehaviorEvent = useCallback((action: string, category: string, label?: string, customParams?: Record<string, any>) => {
    trackEvent({
      action,
      category,
      label,
      custom_parameters: { 
        page_id: pageId,
        ...customParams 
      }
    });
  }, [pageId]);

  return {
    behaviorRef,
    startTimeRef,
    calculateEngagementScore,
    updateBehavior,
    trackBehaviorEvent,
    onConversionTrigger
  };
};
