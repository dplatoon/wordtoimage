
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';
import { GenerationLimitsService } from '@/services/generationLimitsService';

export const useGenerationNotifications = () => {
  const showFreeGenerationLimit = () => {
    toast.error("Free generation limit reached", {
      description: "Sign up to continue generating images!",
      duration: 8000
    });
    trackEvent('free_limit_reached');
  };

  const showDailyLimit = (isFirstDay: boolean) => {
    toast.error(isFirstDay 
      ? `You've used all ${GenerationLimitsService.FIRST_DAY_MAX_FREE_GENERATIONS} generations for your first day` 
      : "Daily free generation limit reached", {
      description: "Upgrade to generate more images or wait until tomorrow.",
      duration: 8000
    });
    trackEvent('daily_limit_reached');
  };

  return {
    showFreeGenerationLimit,
    showDailyLimit
  };
};
