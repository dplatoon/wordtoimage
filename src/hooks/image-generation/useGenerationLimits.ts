// Stub hook for generation limits (database removed)
export function useGenerationLimits() {
  return {
    canGenerate: true,
    remainingGenerations: Infinity,
    checkLimit: async (...args: any[]) => true,
    incrementUsage: async (...args: any[]) => {},
    generationCount: 0,
    isFirstDay: true,
    dailyGenerationsLeft: Infinity,
    canGenerateAnonymous: true,
    canGenerateAuthenticated: true,
    incrementAnonymousCount: async (...args: any[]) => {},
    fetchUserGenerationCount: async (...args: any[]) => 0,
  };
}
