import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { analytics } from '@/services/advancedAnalytics';
import { abTesting, useABTest } from '@/services/abTesting';

export function useConversionTracking() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      analytics.updateUserId(user.id);
    }
  }, [user]);

  const trackPricingView = (plan?: string) => {
    analytics.trackSubscriptionEvent('view_pricing', { plan });
  };

  const trackCheckoutStart = (plan: string, price?: number) => {
    analytics.trackSubscriptionEvent('start_checkout', { plan, price });
  };

  const trackPurchaseComplete = (plan: string, price: number, subscriptionId?: string) => {
    analytics.trackSubscriptionEvent('complete_purchase', { 
      plan, 
      price, 
      subscription_id: subscriptionId 
    });
  };

  const trackImageGeneration = (data: {
    prompt: string;
    style?: string;
    success: boolean;
    timeToGenerate?: number;
  }) => {
    analytics.trackImageGeneration({
      ...data,
      userPlan: user ? 'pro' : 'free' // You can enhance this with actual subscription status
    });
  };

  const trackFeatureUsage = (feature: string, data?: Record<string, any>) => {
    analytics.trackEvent({
      event_type: 'feature_usage',
      event_data: {
        feature,
        user_type: user ? 'authenticated' : 'anonymous',
        ...data
      }
    });
  };

  return {
    trackPricingView,
    trackCheckoutStart,
    trackPurchaseComplete,
    trackImageGeneration,
    trackFeatureUsage
  };
}

// A/B Testing hook for components
export function useOptimizedComponent(testName: string) {
  const { variant, loading, trackConversion } = useABTest(testName);
  
  return {
    variant,
    loading,
    trackConversion,
    isVariant: (variantName: string) => variant === variantName
  };
}