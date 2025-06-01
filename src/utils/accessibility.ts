
// Enhanced accessibility utilities for WCAG AA compliance

/**
 * Announces a message to screen readers with priority levels
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
};

/**
 * Enhanced focus management with better UX
 */
export const manageFocus = (element: HTMLElement | null, options?: {
  preventScroll?: boolean;
  selectText?: boolean;
  announceChange?: string;
}) => {
  if (!element) return;
  
  // Small delay to ensure element is ready
  setTimeout(() => {
    element.focus({ preventScroll: options?.preventScroll });
    
    if (options?.selectText && element instanceof HTMLInputElement) {
      element.select();
    }
    
    if (options?.announceChange) {
      announceToScreenReader(options.announceChange);
    }
  }, 100);
};

/**
 * Enhanced focus trap for modals and dialogs
 */
export const createFocusTrap = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details, summary'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      const closeButton = container.querySelector('[aria-label*="close"], [data-close], .close-button') as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
    }
  };
  
  container.addEventListener('keydown', handleTabKey);
  container.addEventListener('keydown', handleEscapeKey);
  
  if (firstElement) {
    firstElement.focus();
  } else if (container.tabIndex >= 0) {
    container.focus();
  }
  
  return () => {
    container.removeEventListener('keydown', handleTabKey);
    container.removeEventListener('keydown', handleEscapeKey);
  };
};

/**
 * WCAG AA color contrast checker
 */
export const checkColorContrast = (foreground: string, background: string): { ratio: number; passes: boolean; level: string } => {
  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };
  
  // Calculate relative luminance
  const getLuminance = (color: string) => {
    const rgb = hexToRgb(color);
    const rsRGB = rgb.r / 255;
    const gsRGB = rgb.g / 255;
    const bsRGB = rgb.b / 255;
    
    const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const fgLuminance = getLuminance(foreground);
  const bgLuminance = getLuminance(background);
  
  const ratio = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                (Math.min(fgLuminance, bgLuminance) + 0.05);
  
  return {
    ratio: Math.round(ratio * 100) / 100,
    passes: ratio >= 4.5,
    level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail'
  };
};

/**
 * Enhanced keyboard navigation helper
 */
export const enhanceKeyboardNavigation = () => {
  let isUsingKeyboard = false;
  
  // Track keyboard usage
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ' || e.key.startsWith('Arrow')) {
      isUsingKeyboard = true;
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    isUsingKeyboard = false;
    document.body.classList.remove('keyboard-navigation');
  });
  
  // Enhanced Enter key support for interactive elements
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target) {
      const target = e.target as HTMLElement;
      if (target.getAttribute('role') === 'button' || target.classList.contains('clickable')) {
        e.preventDefault();
        target.click();
      }
    }
  });

  // Arrow key navigation for radio groups
  document.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement && e.target.type === 'radio') {
      const radioGroup = document.querySelectorAll(`input[name="${e.target.name}"]`);
      const currentIndex = Array.from(radioGroup).indexOf(e.target);
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % radioGroup.length;
        (radioGroup[nextIndex] as HTMLInputElement).focus();
        (radioGroup[nextIndex] as HTMLInputElement).checked = true;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? radioGroup.length - 1 : currentIndex - 1;
        (radioGroup[prevIndex] as HTMLInputElement).focus();
        (radioGroup[prevIndex] as HTMLInputElement).checked = true;
      }
    }
  });
};

/**
 * Create landmark regions for better screen reader navigation
 */
export const createLandmarkRegions = () => {
  // Ensure main content has proper landmark
  const mainContent = document.getElementById('main-content');
  if (mainContent && !mainContent.getAttribute('role')) {
    mainContent.setAttribute('role', 'main');
  }

  // Ensure navigation has proper landmark
  const navigation = document.querySelector('nav');
  if (navigation && !navigation.getAttribute('role')) {
    navigation.setAttribute('role', 'navigation');
    if (!navigation.getAttribute('aria-label')) {
      navigation.setAttribute('aria-label', 'Main navigation');
    }
  }

  // Ensure footer has proper landmark
  const footer = document.querySelector('footer');
  if (footer && !footer.getAttribute('role')) {
    footer.setAttribute('role', 'contentinfo');
  }
};

/**
 * Enhanced form accessibility validation with auto-fixes
 */
export const enhanceFormAccessibility = (form: HTMLFormElement): void => {
  // Auto-add required indicators
  const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  requiredInputs.forEach((input) => {
    input.setAttribute('aria-required', 'true');
    
    // Add visual required indicator if not present
    const label = form.querySelector(`label[for="${input.id}"]`);
    if (label && !label.textContent?.includes('*')) {
      label.innerHTML += ' <span class="text-red-500" aria-hidden="true">*</span>';
    }
  });

  // Auto-associate error messages
  const errorMessages = form.querySelectorAll('[role="alert"], .error-message');
  errorMessages.forEach((error, index) => {
    if (!error.id) {
      error.id = `error-message-${index}`;
    }
  });

  // Add live region for form submission feedback
  if (!form.querySelector('[aria-live]')) {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = `${form.id || 'form'}-status`;
    form.appendChild(liveRegion);
  }
};

/**
 * Initialize all accessibility features
 */
export const initAccessibility = () => {
  enhanceKeyboardNavigation();
  createLandmarkRegions();
  
  // Add high contrast mode detection
  if (window.matchMedia('(prefers-contrast: high)').matches) {
    document.body.classList.add('high-contrast');
  }
  
  // Add reduced motion detection
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
  }

  // Enhanced forms on page
  document.querySelectorAll('form').forEach(form => {
    enhanceFormAccessibility(form as HTMLFormElement);
  });
  
  console.log('✅ Enhanced accessibility features initialized');
};
