
import { useEffect, useState } from 'react';

export const SkipToContent = () => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    // Detect keyboard usage
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    // Ensure target elements have proper IDs
    const ensureTargetExists = (id: string, fallbackSelector?: string) => {
      if (!document.getElementById(id)) {
        const fallback = fallbackSelector ? document.querySelector(fallbackSelector) : null;
        if (fallback && !fallback.id) {
          fallback.id = id;
        }
      }
    };

    // Ensure navigation targets exist
    ensureTargetExists('main-content', 'main, [role="main"], .main-content');
    ensureTargetExists('navigation', 'nav, [role="navigation"], .navigation');
    ensureTargetExists('footer', 'footer, [role="contentinfo"], .footer');

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const handleSkipClick = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.focus({ preventScroll: false });
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Only render when keyboard navigation is detected
  if (!isKeyboardUser) {
    return null;
  }

  return (
    <div className="accessibility-skip-links">
      <a
        href="#main-content"
        className="accessibility-skip-link"
        onClick={(e) => {
          e.preventDefault();
          handleSkipClick('main-content');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSkipClick('main-content');
          }
        }}
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="accessibility-skip-link"
        onClick={(e) => {
          e.preventDefault();
          handleSkipClick('navigation');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSkipClick('navigation');
          }
        }}
      >
        Skip to navigation
      </a>
      <a
        href="#footer"
        className="accessibility-skip-link"
        onClick={(e) => {
          e.preventDefault();
          handleSkipClick('footer');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSkipClick('footer');
          }
        }}
      >
        Skip to footer
      </a>
    </div>
  );
};
