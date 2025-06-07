
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionContextType {
  planName: string | null;
  loading: boolean;
  error: string | null;
  openCustomerPortal: () => Promise<void>;
  // Additional properties needed by components
  subscribed: boolean;
  currentPeriodEnd: string | null;
  isLoading: boolean;
  checkSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider = ({ children }: SubscriptionProviderProps) => {
  const [planName, setPlanName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string | null>(null);
  const { session } = useAuthState();

  const checkSubscription = async () => {
    if (!session?.user?.id) {
      setPlanName('Free');
      setSubscribed(false);
      setCurrentPeriodEnd(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error checking subscription:', error);
        setPlanName('Free');
        setSubscribed(false);
        setCurrentPeriodEnd(null);
        setError('Failed to check subscription status');
      } else {
        setPlanName(data?.plan_name || 'Free');
        setSubscribed(data?.subscribed || false);
        setCurrentPeriodEnd(data?.subscription_end || null);
        setError(null);
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
      setPlanName('Free');
      setSubscribed(false);
      setCurrentPeriodEnd(null);
      setError('Failed to check subscription status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [session]);

  const openCustomerPortal = async () => {
    if (!session?.user?.id) {
      console.error('User not logged in');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error opening customer portal:', error);
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      console.error('Error opening customer portal:', err);
    }
  };

  const value: SubscriptionContextType = {
    planName,
    loading,
    error,
    openCustomerPortal,
    subscribed,
    currentPeriodEnd,
    isLoading: loading,
    checkSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    // Instead of throwing an error, return default values
    console.warn('useSubscription used outside of SubscriptionProvider, returning default values');
    return {
      planName: 'Free',
      loading: false,
      error: null,
      subscribed: false,
      currentPeriodEnd: null,
      isLoading: false,
      openCustomerPortal: async () => {
        console.warn('openCustomerPortal called outside of SubscriptionProvider');
      },
      checkSubscription: async () => {
        console.warn('checkSubscription called outside of SubscriptionProvider');
      }
    };
  }
  return context;
};
