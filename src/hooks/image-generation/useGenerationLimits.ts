
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { GenerationLimitsService } from '@/services/generationLimitsService';
import { toast } from 'sonner';

export const useGenerationLimits = () => {
  const [generationCount, setGenerationCount] = useState(0);
  const [isFirstDay, setIsFirstDay] = useState(true);
  const [dailyGenerationsLeft, setDailyGenerationsLeft] = useState(GenerationLimitsService.FIRST_DAY_MAX_FREE_GENERATIONS);
  const { user } = useAuth();

  const fetchUserGenerationCount = async () => {
    if (!user) return;
    
    try {
      const limits = await GenerationLimitsService.fetchUserGenerationLimits(user.id);
      
      setIsFirstDay(limits.isFirstDay);
      setDailyGenerationsLeft(limits.dailyGenerationsLeft);
      
      if (limits.dailyGenerationsLeft === 0) {
        toast.info(limits.isFirstDay 
          ? `You've used all ${GenerationLimitsService.FIRST_DAY_MAX_FREE_GENERATIONS} generations for your first day` 
          : "You've used your daily free generation", { 
          description: "Upgrade to generate more images or wait until tomorrow.",
          duration: 8000
        });
      } else if (limits.dailyGenerationsLeft === 1) {
        toast.info(`You have 1 free generation left ${limits.isFirstDay ? "today" : "for today"}`, {
          duration: 4000
        });
      }
    } catch (error) {
      console.error("Error in fetchUserGenerationCount:", error);
    }
  };

  const incrementAnonymousCount = () => {
    const newCount = GenerationLimitsService.incrementAnonymousGenerationCount();
    setGenerationCount(newCount);
    
    if (newCount === GenerationLimitsService.MAX_FREE_ANONYMOUS_GENERATIONS) {
      toast.info("Free limit reached", { 
        description: `You've used your free generation. Sign up to continue creating!`,
        duration: 8000
      });
    }
    
    return newCount;
  };

  const canGenerateAnonymous = generationCount < GenerationLimitsService.MAX_FREE_ANONYMOUS_GENERATIONS;
  const canGenerateAuthenticated = user ? dailyGenerationsLeft > 0 : false;

  useEffect(() => {
    if (!user) {
      const savedCount = GenerationLimitsService.getAnonymousGenerationCount();
      setGenerationCount(savedCount);
    } else {
      fetchUserGenerationCount();
    }
  }, [user]);

  return {
    generationCount,
    isFirstDay,
    dailyGenerationsLeft,
    canGenerateAnonymous,
    canGenerateAuthenticated,
    incrementAnonymousCount,
    fetchUserGenerationCount
  };
};
