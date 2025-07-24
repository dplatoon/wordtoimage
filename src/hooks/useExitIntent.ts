import { useState, useEffect, useCallback } from 'react';
import { trackEvent } from '@/utils/analytics';

interface ExitIntentOptions {
  enabled?: boolean;
  sensitivity?: number;
  delay?: number;
  cookieExpiry?: number;
}

export const useExitIntent = (options: ExitIntentOptions = {}) => {
  const {
    enabled = true,
    sensitivity = 50,
    delay = 3000,
    cookieExpiry = 24 * 60 * 60 * 1000
  } = options;

  const [showModal, setShowModal] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const checkCooldown = useCallback(() => {
    const lastShown = localStorage.getItem('exitIntentLastShown');
    if (lastShown) {
      const timeSinceLastShown = Date.now() - parseInt(lastShown);
      return timeSinceLastShown < cookieExpiry;
    }
    return false;
  }, [cookieExpiry]);

  const triggerExitIntent = useCallback(() => {
    if (!enabled || hasTriggered || checkCooldown()) return;

    setShowModal(true);
    setHasTriggered(true);
    localStorage.setItem('exitIntentLastShown', Date.now().toString());
    
    trackEvent({
      action: 'exit_intent_triggered',
      category: 'conversion',
      label: 'mouse_leave'
    });
  }, [enabled, hasTriggered, checkCooldown]);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= sensitivity) {
      triggerExitIntent();
    }
  }, [sensitivity, triggerExitIntent]);

  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, delay);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, delay, handleMouseLeave]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return {
    showModal,
    closeModal,
    hasTriggered
  };
};