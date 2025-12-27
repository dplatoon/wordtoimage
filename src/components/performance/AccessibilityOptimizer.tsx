import { useEffect } from 'react';
import DOMPurify from 'dompurify';

export const AccessibilityOptimizer = () => {
  useEffect(() => {
    // Fix missing form labels and ARIA attributes
    const fixFormAccessibility = () => {
      // Fix file inputs without labels
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input, index) => {
        if (!input.getAttribute('aria-labelledby') && !input.getAttribute('aria-label')) {
          const labelId = `file-label-${index}`;
          const label = document.createElement('label');
          label.id = labelId;
          label.className = 'sr-only';
          label.textContent = 'Upload file';
          input.parentNode?.insertBefore(label, input);
          input.setAttribute('aria-labelledby', labelId);
        }
      });

      // Fix buttons without accessible names
      const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      buttons.forEach((button) => {
        if (!button.textContent?.trim()) {
          const buttonText = button.querySelector('svg') ? 'Action button' : 'Click here';
          button.setAttribute('aria-label', buttonText);
        }
      });

      // Fix images without alt text
      const images = document.querySelectorAll('img:not([alt])');
      images.forEach((img) => {
        img.setAttribute('alt', 'Image');
      });
    };

    // Enhance color contrast programmatically
    const enhanceContrast = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Enhanced contrast for better accessibility */
        .text-slate-500, .text-gray-500 {
          color: #4a5568 !important; /* Improved from #6B7280 */
        }
        
        .text-slate-600, .text-gray-600 {
          color: #2d3748 !important; /* Enhanced contrast */
        }
        
        .bg-slate-100 {
          background-color: #f7fafc !important;
          color: #1a202c !important;
        }
        
        /* Ensure minimum 4.5:1 contrast for small text */
        .btn-secondary {
          background: #2d3748 !important;
          color: #ffffff !important;
          border: 2px solid #2d3748 !important;
        }
        
        .btn-secondary:hover {
          background: #1a202c !important;
          border-color: #1a202c !important;
        }
        
        /* Enhanced focus indicators */
        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible,
        a:focus-visible {
          outline: 3px solid #3182ce !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 2px #ffffff, 0 0 0 5px #3182ce !important;
        }
      `;
      style.id = 'accessibility-contrast';
      document.head.appendChild(style);
    };

    // Add skip links for keyboard navigation
    const addSkipLinks = () => {
      if (!document.querySelector('.skip-links')) {
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        
        // Use DOMPurify to sanitize static HTML for skip links
        const skipLinksHTML = `
          <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-4 py-2 rounded z-50">
            Skip to main content
          </a>
          <a href="#navigation" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-32 bg-blue-600 text-white px-4 py-2 rounded z-50">
            Skip to navigation
          </a>
        `;
        
        // Sanitize HTML before injection to prevent XSS
        skipLinks.innerHTML = DOMPurify.sanitize(skipLinksHTML, {
          ALLOWED_TAGS: ['a'],
          ALLOWED_ATTR: ['href', 'class']
        });
        
        document.body.insertBefore(skipLinks, document.body.firstChild);
      }
    };

    // Run accessibility fixes
    fixFormAccessibility();
    enhanceContrast();
    addSkipLinks();

    // Monitor accessibility violations in development
    if (process.env.NODE_ENV === 'development') {
      const logAccessibilityIssues = () => {
        const issues = [];
        
        // Check for missing alt text
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        if (imagesWithoutAlt.length > 0) {
          issues.push(`${imagesWithoutAlt.length} images without alt text`);
        }
        
        // Check for low contrast (simplified check)
        const lowContrastElements = document.querySelectorAll('.text-gray-400, .text-slate-400');
        if (lowContrastElements.length > 0) {
          issues.push(`${lowContrastElements.length} elements with potentially low contrast`);
        }
        
        if (issues.length > 0) {
          console.warn('♿ Accessibility issues detected:', issues);
        } else {
          console.log('♿ No accessibility issues detected');
        }
      };
      
      setTimeout(logAccessibilityIssues, 1000);
    }

    return () => {
      const contrastStyle = document.getElementById('accessibility-contrast');
      if (contrastStyle?.parentNode) {
        contrastStyle.parentNode.removeChild(contrastStyle);
      }
    };
  }, []);

  return null;
};
