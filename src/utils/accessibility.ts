
// Accessibility utilities for better screen reader support and focus management

/**
 * Announces a message to screen readers
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
 * Manages focus after route changes or dynamic content updates
 */
export const manageFocus = (element: HTMLElement | null, options?: {
  preventScroll?: boolean;
  selectText?: boolean;
}) => {
  if (!element) return;
  
  // Small delay to ensure element is ready
  setTimeout(() => {
    element.focus({ preventScroll: options?.preventScroll });
    
    if (options?.selectText && element instanceof HTMLInputElement) {
      element.select();
    }
  }, 100);
};

/**
 * Creates a focus trap for modal dialogs
 */
export const createFocusTrap = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
  
  container.addEventListener('keydown', handleTabKey);
  
  // Focus the first element
  if (firstElement) {
    firstElement.focus();
  }
  
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Checks if an element has sufficient color contrast
 */
export const checkColorContrast = (foreground: string, background: string): boolean => {
  // This is a simplified check - in production you'd want a more robust solution
  const getLuminance = (color: string) => {
    // Convert color to RGB values and calculate luminance
    // This is a placeholder - you'd implement full WCAG contrast calculation
    return 0.5;
  };
  
  const fgLuminance = getLuminance(foreground);
  const bgLuminance = getLuminance(background);
  
  const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                  (Math.min(fgLuminance, bgLuminance) + 0.05);
  
  return contrast >= 4.5; // WCAG AA standard
};

/**
 * Adds skip links for keyboard navigation
 */
export const addSkipLinks = () => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded';
  
  document.body.insertBefore(skipLink, document.body.firstChild);
};

/**
 * Validates form accessibility
 */
export const validateFormAccessibility = (form: HTMLFormElement): string[] => {
  const issues: string[] = [];
  
  // Check for labels
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    
    if (!id || (!ariaLabel && !ariaLabelledBy && !form.querySelector(`label[for="${id}"]`))) {
      issues.push(`Input element missing proper label: ${input.tagName}`);
    }
  });
  
  // Check for required field indicators
  const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  requiredInputs.forEach(input => {
    const ariaRequired = input.getAttribute('aria-required');
    if (!ariaRequired) {
      issues.push(`Required field missing aria-required attribute`);
    }
  });
  
  return issues;
};
