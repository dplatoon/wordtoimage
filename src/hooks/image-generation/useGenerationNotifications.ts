import { toast } from 'sonner';

// Simplified notification hook for generation events
export function useGenerationNotifications() {
  const showLimitWarning = () => {
    toast.warning("Low Credits", {
      description: "You're running low on credits. Generate wisely or upgrade for unlimited generations."
    });
  };

  const showUpgradePrompt = () => {
    toast.info("Upgrade Available", {
      description: "Upgrade to Premium for unlimited generations and exclusive features."
    });
  };

  const showFreeGenerationLimit = () => {
    toast.error("Credits Required", {
      description: "Please sign up to get free credits and start generating images!"
    });
  };

  const showDailyLimit = (isFirstDay: boolean) => {
    toast.error("Out of Credits", {
      description: isFirstDay 
        ? "You've used all your credits today. They'll refresh tomorrow!"
        : "Out of credits. Upgrade to Premium for unlimited generations."
    });
  };

  return {
    showLimitWarning,
    showUpgradePrompt,
    showFreeGenerationLimit,
    showDailyLimit,
  };
}
