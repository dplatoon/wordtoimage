
// Enhanced accessibility utilities for WCAG AA compliance

export const AccessibilityUtils = {
  // Skip link management
  createSkipLink: (targetId: string, text: string) => {
    const skipLink = document.createElement('a');
    skipLink.href = `#${targetId}`;
    skipLink.textContent = text;
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-white';
    return skipLink;
  },

  // Focus management
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },

  // ARIA live regions
  announceToScreenReader: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Color contrast validation
  checkColorContrast: (foreground: string, background: string): boolean => {
    // This is a simplified version - in production, use a proper color contrast library
    const getLuminance = (color: string) => {
      // Convert hex to RGB and calculate relative luminance
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      const gamma = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      
      return 0.2126 * gamma(r) + 0.7152 * gamma(g) + 0.0722 * gamma(b);
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    
    return ratio >= 4.5; // WCAG AA standard
  },

  // Keyboard navigation helpers
  handleKeyboardNavigation: (e: KeyboardEvent, items: HTMLElement[], currentIndex: number) => {
    let newIndex = currentIndex;
    
    switch (e.key) {
      case 'ArrowUp':
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        e.preventDefault();
        break;
      case 'ArrowDown':
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        e.preventDefault();
        break;
      case 'Home':
        newIndex = 0;
        e.preventDefault();
        break;
      case 'End':
        newIndex = items.length - 1;
        e.preventDefault();
        break;
    }
    
    if (newIndex !== currentIndex) {
      items[newIndex]?.focus();
    }
    
    return newIndex;
  },

  // Form validation helpers
  validateForm: (form: HTMLFormElement): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach((field) => {
      const input = field as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!input.value.trim()) {
        errors.push(`${input.name || input.id} is required`);
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.removeAttribute('aria-invalid');
      }
    });

    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach((field) => {
      const input = field as HTMLInputElement;
      if (input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        errors.push('Please enter a valid email address');
        input.setAttribute('aria-invalid', 'true');
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Media queries for accessibility preferences
  respectsReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  respectsHighContrast: (): boolean => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Touch target size validation
  validateTouchTargets: (container: HTMLElement): HTMLElement[] => {
    const MIN_TOUCH_SIZE = 44; // pixels
    const interactiveElements = container.querySelectorAll('button, a, input, select, textarea');
    const invalidTargets: HTMLElement[] = [];

    interactiveElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.width < MIN_TOUCH_SIZE || rect.height < MIN_TOUCH_SIZE) {
        invalidTargets.push(element as HTMLElement);
      }
    });

    return invalidTargets;
  }
};

// Export individual functions for convenience
export const {
  createSkipLink,
  trapFocus,
  announceToScreenReader,
  checkColorContrast,
  handleKeyboardNavigation,
  validateForm,
  respectsReducedMotion,
  respectsHighContrast,
  validateTouchTargets
} = AccessibilityUtils;
