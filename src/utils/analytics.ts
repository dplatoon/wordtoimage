
// Enhanced analytics utilities for tracking user interactions

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Predefined events for consistent tracking
export const events = {
  // User interactions
  BUTTON_CLICKED: 'button_clicked',
  LINK_CLICKED: 'link_clicked',
  
  // Image generation
  IMAGE_GENERATED: 'image_generated',
  IMAGE_LOADED: 'image_loaded',
  IMAGE_ERROR: 'image_error',
  RETRY_GENERATION: 'retry_generation',
  
  // Gallery interactions
  VIEW_GALLERY: 'view_gallery',
  DOWNLOAD_IMAGE: 'download_image',
  SHARE_IMAGE: 'share_image',
  
  // Authentication
  SIGN_UP: 'sign_up',
  SIGN_IN: 'sign_in',
  SIGN_OUT: 'sign_out',
  
  // Navigation
  PAGE_VIEW: 'page_view',
  
  // Performance
  PERFORMANCE_METRIC: 'performance_metric'
};

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

  // Track custom events - support both old and new signatures
  trackEvent(eventOrAction: AnalyticsEvent | string, legacyParams?: Record<string, any>): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    let eventData: AnalyticsEvent;

    // Handle legacy string-based calls
    if (typeof eventOrAction === 'string') {
      eventData = {
        action: eventOrAction,
        category: 'interaction',
        custom_parameters: legacyParams || {}
      };
    } else {
      eventData = eventOrAction;
    }

    window.gtag('event', eventData.action, {
      event_category: eventData.category,
      event_label: eventData.label,
      value: eventData.value,
      ...eventData.custom_parameters,
    });

    if (this.debugMode) {
      console.log('Event tracked:', eventData);
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
export const trackEvent = (event: AnalyticsEvent | string, params?: Record<string, any>) => 
  analytics.trackEvent(event, params);
export const trackPageView = (path: string, title?: string) => analytics.trackPageView(path, title);
export const trackInteraction = (element: string, action: string, details?: Record<string, any>) => 
  analytics.trackInteraction(element, action, details);

// Initialize analytics
export const initAnalytics = (measurementId: string) => analytics.init(measurementId);
