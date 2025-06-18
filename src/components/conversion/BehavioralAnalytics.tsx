
import React, { useEffect, useRef, useCallback } from 'react';
import { trackEvent } from '@/utils/analytics';

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

interface UserBehavior {
  timeOnPage: number;
  scrollDepth: number;
  clickCount: number;
  generationAttempts: number;
  featureInteractions: string[];
  engagementScore: number;
}

export const BehavioralAnalytics = ({ 
  children, 
  pageId, 
  onConversionTrigger 
}: BehavioralAnalyticsProps) => {
  const behaviorRef = useRef<UserBehavior>({
    timeOnPage: 0,
    scrollDepth: 0,
    clickCount: 0,
    generationAttempts: 0,
    featureInteractions: [],
    engagementScore: 0
  });
  
  const startTimeRef = useRef<number>(Date.now());
  const scrollThresholdsRef = useRef<Set<number>>(new Set());
  const timeThresholdsRef = useRef<Set<number>>(new Set());

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

  // Track scroll depth
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
    
    behaviorRef.current.scrollDepth = Math.max(behaviorRef.current.scrollDepth, scrollPercent);
    
    // Track scroll milestones
    const milestones = [25, 50, 75, 90];
    milestones.forEach(milestone => {
      if (scrollPercent >= milestone && !scrollThresholdsRef.current.has(milestone)) {
        scrollThresholdsRef.current.add(milestone);
        
        trackEvent({
          action: 'scroll_milestone',
          category: 'engagement',
          label: `${milestone}%`,
          custom_parameters: { page_id: pageId }
        });

        // Trigger conversion opportunity at high scroll depth
        if (milestone >= 75 && onConversionTrigger) {
          onConversionTrigger({
            type: 'scroll_depth',
            data: { depth: milestone, engagement_score: calculateEngagementScore() },
            timestamp: Date.now()
          });
        }
      }
    });
  }, [pageId, onConversionTrigger, calculateEngagementScore]);

  // Track time thresholds
  const checkTimeThresholds = useCallback(() => {
    const timeSpent = Date.now() - startTimeRef.current;
    behaviorRef.current.timeOnPage = timeSpent;
    
    const thresholds = [30000, 60000, 120000, 300000]; // 30s, 1m, 2m, 5m
    thresholds.forEach(threshold => {
      if (timeSpent >= threshold && !timeThresholdsRef.current.has(threshold)) {
        timeThresholdsRef.current.add(threshold);
        
        const minutes = threshold / 60000;
        trackEvent({
          action: 'time_threshold',
          category: 'engagement',
          label: `${minutes}m`,
          custom_parameters: { 
            page_id: pageId,
            engagement_score: calculateEngagementScore()
          }
        });

        // Trigger conversion opportunities based on time spent
        if (onConversionTrigger) {
          if (threshold === 60000) { // 1 minute
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
        }
      }
    });
  }, [pageId, onConversionTrigger, calculateEngagementScore]);

  // Track clicks and interactions
  const handleClick = useCallback((event: MouseEvent) => {
    behaviorRef.current.clickCount++;
    
    const target = event.target as HTMLElement;
    const elementType = target.tagName.toLowerCase();
    const elementClass = target.className;
    const elementText = target.textContent?.slice(0, 50) || '';
    
    // Track feature interactions
    const featureElements = ['button', 'input', 'select', 'textarea'];
    if (featureElements.includes(elementType)) {
      const featureId = `${elementType}_${elementClass}_${elementText}`.slice(0, 100);
      if (!behaviorRef.current.featureInteractions.includes(featureId)) {
        behaviorRef.current.featureInteractions.push(featureId);
        
        trackEvent({
          action: 'feature_interaction',
          category: 'engagement',
          label: featureId,
          custom_parameters: { page_id: pageId }
        });

        // Trigger conversion on high-value feature interactions
        if (elementText.toLowerCase().includes('generate') || 
            elementText.toLowerCase().includes('create') ||
            elementClass.includes('generate')) {
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
    }
  }, [pageId, onConversionTrigger, calculateEngagementScore]);

  // Track exit intent
  const handleMouseLeave = useCallback((event: MouseEvent) => {
    if (event.clientY <= 0 && onConversionTrigger) {
      const engagementScore = calculateEngagementScore();
      
      // Only trigger exit intent for engaged users
      if (engagementScore >= 30) {
        trackEvent({
          action: 'exit_intent',
          category: 'engagement',
          custom_parameters: { 
            page_id: pageId,
            engagement_score: engagementScore,
            time_on_page: behaviorRef.current.timeOnPage
          }
        });

        onConversionTrigger({
          type: 'exit_intent',
          data: { 
            engagement_score: engagementScore,
            behavior: behaviorRef.current 
          },
          timestamp: Date.now()
        });
      }
    }
  }, [pageId, onConversionTrigger, calculateEngagementScore]);

  useEffect(() => {
    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Set up timer for time threshold checks
    const timeInterval = setInterval(checkTimeThresholds, 10000); // Check every 10 seconds
    
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
