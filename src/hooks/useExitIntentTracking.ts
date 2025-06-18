
import { useCallback } from 'react';

export const useExitIntentTracking = (
  pageId: string,
  onExitIntent: (engagementScore: number, behavior: any) => void
) => {
  const handleMouseLeave = useCallback((event: MouseEvent) => {
    if (event.clientY <= 0) {
      onExitIntent(0, {}); // engagement score and behavior will be passed from parent
    }
  }, [onExitIntent]);

  return { handleMouseLeave };
};
