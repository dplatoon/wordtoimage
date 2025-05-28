
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
      // Find close button or trigger custom close event
      const closeButton = container.querySelector('[aria-label*="close"], [data-close], .close-button') as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
    }
  };
  
  container.addEventListener('keydown', handleTabKey);
  container.addEventListener('keydown', handleEscapeKey);
  
  // Focus the first element or container itself
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
 * Add skip links for keyboard navigation
 */
export const addSkipLinks = () => {
  // Check if skip links already exist
  if (document.querySelector('.skip-links')) return;
  
  const skipLinksContainer = document.createElement('div');
  skipLinksContainer.className = 'skip-links';
  
  const skipLinks = [
    { href: '#main-content', text: 'Skip to main content' },
    { href: '#navigation', text: 'Skip to navigation' },
    { href: '#footer', text: 'Skip to footer' }
  ];
  
  skipLinks.forEach(link => {
    const skipLink = document.createElement('a');
    skipLink.href = link.href;
    skipLink.textContent = link.text;
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-white';
    skipLinksContainer.appendChild(skipLink);
  });
  
  document.body.insertBefore(skipLinksContainer, document.body.firstChild);
};

/**
 * Enhanced form accessibility validation
 */
export const validateFormAccessibility = (form: HTMLFormElement): string[] => {
  const issues: string[] = [];
  
  // Check for labels and ARIA attributes
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach((input, index) => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    const ariaDescribedBy = input.getAttribute('aria-describedby');
    
    if (!id || (!ariaLabel && !ariaLabelledBy && !form.querySelector(`label[for="${id}"]`))) {
      issues.push(`Input ${index + 1} missing proper label association`);
    }
  });
  
  // Check for required field indicators
  const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  requiredInputs.forEach((input, index) => {
    const ariaRequired = input.getAttribute('aria-required');
    if (!ariaRequired) {
      issues.push(`Required field ${index + 1} missing aria-required attribute`);
    }
  });
  
  // Check for error message associations
  const errorMessages = form.querySelectorAll('[role="alert"], .error-message, [aria-live="polite"]');
  if (errorMessages.length === 0) {
    issues.push('Form lacks error message containers with proper ARIA attributes');
  }
  
  // Check fieldsets for grouped inputs
  const radioGroups = form.querySelectorAll('input[type="radio"]');
  const checkboxGroups = form.querySelectorAll('input[type="checkbox"]');
  
  if (radioGroups.length > 1 || checkboxGroups.length > 1) {
    const fieldsets = form.querySelectorAll('fieldset');
    if (fieldsets.length === 0) {
      issues.push('Related form controls should be grouped in fieldsets with legends');
    }
  }
  
  return issues;
};

/**
 * Keyboard navigation helper
 */
export const enhanceKeyboardNavigation = () => {
  // Add visible focus indicators for keyboard users
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
  
  // Add Enter key support for clickable elements
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target) {
      const target = e.target as HTMLElement;
      if (target.getAttribute('role') === 'button' || target.classList.contains('clickable')) {
        target.click();
      }
    }
  });
};

/**
 * Initialize all accessibility features
 */
export const initAccessibility = () => {
  addSkipLinks();
  enhanceKeyboardNavigation();
  
  // Add high contrast mode detection
  if (window.matchMedia('(prefers-contrast: high)').matches) {
    document.body.classList.add('high-contrast');
  }
  
  // Add reduced motion detection
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
  }
  
  console.log('✅ Accessibility features initialized');
};
