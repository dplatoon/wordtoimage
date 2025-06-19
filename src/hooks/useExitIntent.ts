
import { useState, useEffect } from 'react';

export const useExitIntent = (enabled: boolean = true) => {
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves through the top of the window
      if (e.clientY <= 0 && !hasTriggered) {
        // Add small delay to avoid accidental triggers
        setTimeout(() => {
          if (!hasTriggered) {
            setShowExitIntent(true);
            hasTriggered = true;
          }
        }, 500);
      }
    };

    // Only trigger for engaged users (after 30 seconds)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 30000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled]);

  const closeExitIntent = () => {
    setShowExitIntent(false);
  };

  return { showExitIntent, closeExitIntent };
};
