
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    generations: number;
    resolution: string;
    styles: number;
    apiCalls?: number;
  };
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: ['50 generations/month', 'Standard resolution', 'Basic styles'],
    limits: {
      generations: 50,
      resolution: '1024x1024',
      styles: 10
    }
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    interval: 'month',
    features: ['150 generations/month', 'HD resolution', 'All styles', 'No watermarks'],
    limits: {
      generations: 150,
      resolution: '1792x1024',
      styles: 30
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 14.99,
    interval: 'month',
    features: ['500 generations/month', 'Ultra HD resolution', 'Custom styles', 'API access'],
    limits: {
      generations: 500,
      resolution: '2048x2048',
      styles: 50,
      apiCalls: 1000
    }
  },
  {
    id: 'business',
    name: 'Business',
    price: 29.99,
    interval: 'month',
    features: ['Unlimited generations', '4K resolution', 'Team features', 'Priority support'],
    limits: {
      generations: -1, // unlimited
      resolution: '4096x4096',
      styles: 100,
      apiCalls: 10000
    }
  }
];

export const useSubscription = () => {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>(SUBSCRIPTION_PLANS[0]);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'active' | 'inactive' | 'cancelled' | 'past_due'>('inactive');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const checkSubscription = async () => {
    if (!user) {
      setCurrentPlan(SUBSCRIPTION_PLANS[0]);
      setSubscriptionStatus('inactive');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
        setCurrentPlan(SUBSCRIPTION_PLANS[0]);
        setSubscriptionStatus('inactive');
      } else {
        const planId = data?.plan_name?.toLowerCase() || 'free';
        const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId) || SUBSCRIPTION_PLANS[0];
        setCurrentPlan(plan);
        setSubscriptionStatus(data?.subscribed ? 'active' : 'inactive');
      }
    } catch (error) {
      console.error('Subscription check failed:', error);
      setCurrentPlan(SUBSCRIPTION_PLANS[0]);
      setSubscriptionStatus('inactive');
    } finally {
      setLoading(false);
    }
  };

  const upgradeToPlane = async (planId: string) => {
    if (!user) {
      toast.error('Please log in to upgrade');
      return;
    }

    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan || plan.id === 'free') {
      toast.error('Invalid plan selected');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId: plan.id }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
        toast.success('Redirecting to checkout...');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout process');
    }
  };

  const openCustomerPortal = async () => {
    if (!user) {
      toast.error('Please log in to manage subscription');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        throw error;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Customer portal error:', error);
      toast.error('Failed to open customer portal');
    }
  };

  const canUseFeature = (feature: keyof SubscriptionPlan['limits']) => {
    return currentPlan.limits[feature];
  };

  const hasReachedLimit = (usage: number, feature: keyof SubscriptionPlan['limits']) => {
    const limit = currentPlan.limits[feature];
    if (typeof limit !== 'number') return false;
    if (limit === -1) return false; // unlimited
    return usage >= limit;
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  return {
    currentPlan,
    subscriptionStatus,
    loading,
    checkSubscription,
    upgradeToPlane,
    openCustomerPortal,
    canUseFeature,
    hasReachedLimit,
    isSubscribed: subscriptionStatus === 'active',
    isPremium: currentPlan.id !== 'free'
  };
};
