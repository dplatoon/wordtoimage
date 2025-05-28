
// Enhanced analytics utilities for tracking user interactions

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

class AnalyticsManager {
  private static instance: AnalyticsManager;
  private isInitialized = false;
  private debugMode = process.env.NODE_ENV === 'development';

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  // Initialize Google Analytics 4
  init(measurementId: string): void {
    if (typeof window === 'undefined' || this.isInitialized) return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    this.isInitialized = true;

    if (this.debugMode) {
      console.log('Analytics initialized with ID:', measurementId);
    }
  }

  // Track page views
  trackPageView(path: string, title?: string): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: title || document.title,
    });

    if (this.debugMode) {
      console.log('Page view tracked:', { path, title });
    }
  }

  // Track custom events
  trackEvent({ action, category, label, value, custom_parameters }: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters,
    });

    if (this.debugMode) {
      console.log('Event tracked:', { action, category, label, value, custom_parameters });
    }
  }

  // Track user interactions
  trackInteraction(element: string, action: string, details?: Record<string, any>): void {
    this.trackEvent({
      action: 'interaction',
      category: 'ui',
      label: `${element}_${action}`,
      custom_parameters: details,
    });
  }

  // Track performance metrics
  trackPerformance(metric: string, value: number, unit = 'ms'): void {
    this.trackEvent({
      action: 'performance',
      category: 'site_speed',
      label: metric,
      value: Math.round(value),
      custom_parameters: { unit },
    });
  }

  // Track AI image generation
  trackImageGeneration(details: {
    prompt_length: number;
    style: string;
    success: boolean;
    generation_time?: number;
  }): void {
    this.trackEvent({
      action: 'ai_image_generated',
      category: 'ai_features',
      label: details.success ? 'success' : 'failure',
      custom_parameters: details,
    });
  }

  // Track content engagement
  trackContentEngagement(contentType: string, action: string, contentId?: string): void {
    this.trackEvent({
      action: `content_${action}`,
      category: 'engagement',
      label: contentType,
      custom_parameters: { content_id: contentId },
    });
  }
}

export const analytics = AnalyticsManager.getInstance();

// Convenience functions
export const trackEvent = (event: AnalyticsEvent) => analytics.trackEvent(event);
export const trackPageView = (path: string, title?: string) => analytics.trackPageView(path, title);
export const trackInteraction = (element: string, action: string, details?: Record<string, any>) => 
  analytics.trackInteraction(element, action, details);

// Initialize analytics
export const initAnalytics = (measurementId: string) => analytics.init(measurementId);

// Declare global gtag types
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
