
import { useEffect, useState } from 'react';

export const SkipToContent = () => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Only render when keyboard navigation is detected
  if (!isKeyboardUser) {
    return null;
  }

  const handleSkipClick = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.focus({ preventScroll: false });
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <style jsx>{`
        .skip-to-content-links {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          z-index: 99999 !important;
          pointer-events: none !important;
        }
        
        .skip-link {
          position: absolute !important;
          top: -200vh !important;
          left: 50% !important;
          transform: translateX(-50%) translateY(-200vh) !important;
          background-color: #1e40af !important;
          color: #ffffff !important;
          padding: 16px 32px !important;
          border-radius: 8px !important;
          text-decoration: none !important;
          font-weight: 600 !important;
          font-size: 16px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
          border: 3px solid #ffffff !important;
          white-space: nowrap !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          display: block !important;
        }
        
        .skip-link:focus,
        .skip-link:focus-visible {
          top: 20px !important;
          transform: translateX(-50%) translateY(0) !important;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          outline: 4px solid #fbbf24 !important;
          outline-offset: 3px !important;
        }
      `}</style>
      
      <div className="skip-to-content-links">
        <a
          href="#main-content"
          className="skip-link"
          onClick={(e) => {
            e.preventDefault();
            handleSkipClick('main-content');
          }}
        >
          Skip to main content
        </a>
        <a
          href="#navigation"
          className="skip-link"
          onClick={(e) => {
            e.preventDefault();
            handleSkipClick('navigation');
          }}
        >
          Skip to navigation
        </a>
        <a
          href="#footer"
          className="skip-link"
          onClick={(e) => {
            e.preventDefault();
            handleSkipClick('footer');
          }}
        >
          Skip to footer
        </a>
      </div>
    </>
  );
};
