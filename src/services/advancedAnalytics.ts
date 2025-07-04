import { supabase } from '@/integrations/supabase/client';

// Generate session ID for tracking
export const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// User analytics event tracking
export interface AnalyticsEvent {
  event_type: string;
  event_data?: Record<string, any>;
  page_url?: string;
}

export class AdvancedAnalytics {
  private sessionId: string;
  private userId: string | null = null;

  constructor() {
    this.sessionId = getSessionId();
    this.initializeUser();
  }

  private async initializeUser() {
    const { data: { user } } = await supabase.auth.getUser();
    this.userId = user?.id || null;
  }

  // Track custom events
  async trackEvent(event: AnalyticsEvent) {
    try {
      await supabase.from('user_analytics').insert({
        user_id: this.userId,
        session_id: this.sessionId,
        event_type: event.event_type,
        event_data: event.event_data || {},
        page_url: event.page_url || window.location.href,
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  // Track conversion funnel steps
  async trackConversion(funnelStep: string, stage: number, data?: Record<string, any>) {
    try {
      await supabase.from('conversion_events').insert({
        user_id: this.userId,
        session_id: this.sessionId,
        funnel_step: funnelStep,
        funnel_stage: stage,
        event_data: data || {}
      });
    } catch (error) {
      console.error('Failed to track conversion:', error);
    }
  }

  // Track user behavior (page views, time on page, etc.)
  async trackPageView(pagePath: string, interactions: any[] = []) {
    try {
      await supabase.from('user_behavior').insert({
        user_id: this.userId,
        session_id: this.sessionId,
        page_path: pagePath,
        interactions,
        scroll_depth: this.getScrollDepth()
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  // Update behavior with time on page
  async updateTimeOnPage(pagePath: string, timeSpent: number) {
    try {
      // Find the most recent page view for this session and page
      const { data: existingViews } = await supabase
        .from('user_behavior')
        .select('id')
        .eq('session_id', this.sessionId)
        .eq('page_path', pagePath)
        .order('created_at', { ascending: false })
        .limit(1);

      if (existingViews && existingViews.length > 0) {
        await supabase
          .from('user_behavior')
          .update({ 
            time_on_page: timeSpent,
            scroll_depth: this.getScrollDepth()
          })
          .eq('id', existingViews[0].id);
      }
    } catch (error) {
      console.error('Failed to update time on page:', error);
    }
  }

  // Track specific image generation patterns
  async trackImageGeneration(data: {
    prompt: string;
    style?: string;
    success: boolean;
    timeToGenerate?: number;
    userPlan?: string;
  }) {
    await this.trackEvent({
      event_type: 'image_generation',
      event_data: data
    });

    // Also track as conversion event if successful
    if (data.success) {
      await this.trackConversion('image_generated', 3, data);
    }
  }

  // Track subscription events
  async trackSubscriptionEvent(eventType: 'view_pricing' | 'start_checkout' | 'complete_purchase' | 'cancel_subscription', data?: Record<string, any>) {
    const stageMap = {
      'view_pricing': 1,
      'start_checkout': 2, 
      'complete_purchase': 3,
      'cancel_subscription': 4
    };

    await this.trackEvent({
      event_type: `subscription_${eventType}`,
      event_data: data
    });

    await this.trackConversion(eventType, stageMap[eventType], data);
  }

  // Get scroll depth percentage
  private getScrollDepth(): number {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const trackLength = docHeight - winHeight;
    const pctScrolled = Math.floor(scrollTop / trackLength * 100);
    return Math.min(pctScrolled, 100);
  }

  // Update session with user ID when user logs in
  updateUserId(userId: string) {
    this.userId = userId;
  }
}

// Singleton instance
export const analytics = new AdvancedAnalytics();