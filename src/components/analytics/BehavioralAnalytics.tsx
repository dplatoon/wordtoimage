
import React, { useEffect } from 'react';
import { trackEvent } from '@/utils/analytics';
import { useBehaviorTracking } from '@/hooks/useBehaviorTracking';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import { useClickTracking } from '@/hooks/useClickTracking';
import { useExitIntentTracking } from '@/hooks/useExitIntentTracking';

interface BehavioralAnalyticsProps {
  children: React.ReactNode;
  pageId: string;
  onConversionTrigger?: (trigger: ConversionTrigger) => void;
}

interface ConversionTrigger {
  type: 'time_threshold' | 'scroll_depth' | 'engagement_score' | 'exit_intent' | 'feature_interest';
  data: any;
  timestamp: number;
}

export const BehavioralAnalytics = ({ 
  children, 
  pageId, 
  onConversionTrigger 
}: BehavioralAnalyticsProps) => {
  const {
    behaviorRef,
    startTimeRef,
    calculateEngagementScore,
    updateBehavior,
    trackBehaviorEvent
  } = useBehaviorTracking(pageId, onConversionTrigger);

  // Scroll tracking
  const handleScrollMilestone = (milestone: number, _: number) => {
    trackBehaviorEvent('scroll_milestone', 'engagement', `${milestone}%`);

    if (milestone >= 75 && onConversionTrigger) {
      onConversionTrigger({
        type: 'scroll_depth',
        data: { depth: milestone, engagement_score: calculateEngagementScore() },
        timestamp: Date.now()
      });
    }
  };

  const updateScrollDepth = (depth: number) => {
    behaviorRef.current.scrollDepth = Math.max(behaviorRef.current.scrollDepth, depth);
  };

  const { handleScroll } = useScrollTracking(pageId, handleScrollMilestone, updateScrollDepth);

  // Time tracking
  const handleTimeThreshold = (threshold: number, timeSpent: number, _: number) => {
    const minutes = threshold / 60000;
    trackBehaviorEvent('time_threshold', 'engagement', `${minutes}m`, {
      engagement_score: calculateEngagementScore()
    });

    if (onConversionTrigger && threshold === 60000) {
      onConversionTrigger({
        type: 'time_threshold',
        data: { 
          minutes, 
          engagement_score: calculateEngagementScore(),
          behavior: behaviorRef.current 
        },
        timestamp: Date.now()
      });
    }
  };

  const updateTimeOnPage = (time: number) => {
    behaviorRef.current.timeOnPage = time;
  };

  const { checkTimeThresholds } = useTimeTracking(pageId, startTimeRef, handleTimeThreshold, updateTimeOnPage);

  // Click tracking
  const handleFeatureInteraction = (featureId: string, isGeneration: boolean) => {
    if (!behaviorRef.current.featureInteractions.includes(featureId)) {
      behaviorRef.current.featureInteractions.push(featureId);
      
      trackBehaviorEvent('feature_interaction', 'engagement', featureId);

      if (isGeneration) {
        behaviorRef.current.generationAttempts++;
        
        if (onConversionTrigger) {
          onConversionTrigger({
            type: 'feature_interest',
            data: { 
              feature: featureId,
              attempts: behaviorRef.current.generationAttempts,
              engagement_score: calculateEngagementScore()
            },
            timestamp: Date.now()
          });
        }
      }
    }
  };

  const incrementClickCount = () => {
    behaviorRef.current.clickCount++;
  };

  const { handleClick } = useClickTracking(pageId, handleFeatureInteraction, incrementClickCount);

  // Exit intent tracking
  const handleExitIntent = (engagementScore: number, behavior: any) => {
    const score = calculateEngagementScore();
    
    if (score >= 30 && onConversionTrigger) {
      trackBehaviorEvent('exit_intent', 'engagement', undefined, {
        engagement_score: score,
        time_on_page: behaviorRef.current.timeOnPage
      });

      onConversionTrigger({
        type: 'exit_intent',
        data: { 
          engagement_score: score,
          behavior: behaviorRef.current 
        },
        timestamp: Date.now()
      });
    }
  };

  const { handleMouseLeave } = useExitIntentTracking(pageId, handleExitIntent);

  useEffect(() => {
    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Set up timer for time threshold checks
    const timeInterval = setInterval(checkTimeThresholds, 10000);
    
    // Track page load
    trackEvent({
      action: 'page_loaded',
      category: 'engagement',
      label: pageId,
      custom_parameters: { timestamp: Date.now() }
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(timeInterval);
      
      // Track final engagement metrics
      const finalEngagementScore = calculateEngagementScore();
      trackEvent({
        action: 'page_unload',
        category: 'engagement',
        label: pageId,
        custom_parameters: {
          final_engagement_score: finalEngagementScore,
          time_on_page: Date.now() - startTimeRef.current,
          final_behavior: behaviorRef.current
        }
      });
    };
  }, [pageId, handleScroll, handleClick, handleMouseLeave, checkTimeThresholds, calculateEngagementScore]);

  return <>{children}</>;
};
