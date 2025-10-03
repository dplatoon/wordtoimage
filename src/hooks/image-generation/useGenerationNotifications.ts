// Stub hook for generation notifications (database removed)
export function useGenerationNotifications() {
  const showLimitWarning = (...args: any[]) => {};
  const showUpgradePrompt = (...args: any[]) => {};
  const showFreeGenerationLimit = (...args: any[]) => {};
  const showDailyLimit = (...args: any[]) => {};

  return { 
    showLimitWarning, 
    showUpgradePrompt,
    showFreeGenerationLimit,
    showDailyLimit
  };
}
