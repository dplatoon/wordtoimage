// Simplified hook for generation limits using credits system
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCredits } from '@/services/api/credits';

export function useGenerationLimits() {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number>(0);
  const [subscriptionTier, setSubscriptionTier] = useState<string>('free');

  useEffect(() => {
    if (user) {
      fetchUserCredits();
    }
  }, [user]);

  const fetchUserCredits = async () => {
    const data = await getCredits();
    if (data) {
      setCredits(data.credits);
      setSubscriptionTier(data.subscription_tier);
    }
  };

  const canGenerate = subscriptionTier === 'premium' || credits > 0;
  const canGenerateAnonymous = false; // No anonymous generation with new system
  const canGenerateAuthenticated = canGenerate;

  return {
    canGenerate,
    remainingGenerations: subscriptionTier === 'premium' ? Infinity : credits,
    generationCount: 0,
    isFirstDay: false,
    dailyGenerationsLeft: credits,
    canGenerateAnonymous,
    canGenerateAuthenticated,
    incrementAnonymousCount: () => {},
    fetchUserGenerationCount: fetchUserCredits,
  };
}
