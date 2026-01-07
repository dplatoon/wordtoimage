import { useCallback, useMemo } from 'react';

type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

interface HapticOptions {
  enabled?: boolean;
}

const HAPTIC_PATTERNS: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 30],
  warning: [30, 30, 30],
  error: [50, 100, 50],
  selection: 5,
};

/**
 * Hook for mobile haptic/vibration feedback
 * Uses the Web Vibration API for physical feedback on supported devices
 */
export function useHapticFeedback(options: HapticOptions = {}) {
  const { enabled = true } = options;

  const isSupported = useMemo(() => {
    return typeof navigator !== 'undefined' && 'vibrate' in navigator;
  }, []);

  const vibrate = useCallback((pattern: number | number[]) => {
    if (!enabled || !isSupported) return false;
    
    try {
      return navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
      return false;
    }
  }, [enabled, isSupported]);

  const trigger = useCallback((type: HapticPattern = 'medium') => {
    const pattern = HAPTIC_PATTERNS[type];
    return vibrate(pattern);
  }, [vibrate]);

  const light = useCallback(() => trigger('light'), [trigger]);
  const medium = useCallback(() => trigger('medium'), [trigger]);
  const heavy = useCallback(() => trigger('heavy'), [trigger]);
  const success = useCallback(() => trigger('success'), [trigger]);
  const warning = useCallback(() => trigger('warning'), [trigger]);
  const error = useCallback(() => trigger('error'), [trigger]);
  const selection = useCallback(() => trigger('selection'), [trigger]);

  const stop = useCallback(() => {
    if (isSupported) {
      navigator.vibrate(0);
    }
  }, [isSupported]);

  return {
    isSupported,
    trigger,
    light,
    medium,
    heavy,
    success,
    warning,
    error,
    selection,
    stop,
    vibrate,
  };
}

export default useHapticFeedback;
