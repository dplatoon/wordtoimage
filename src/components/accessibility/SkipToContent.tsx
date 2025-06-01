
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

  const skipLinkStyle: React.CSSProperties = {
    position: 'fixed',
    top: '-200vh',
    left: '50%',
    transform: 'translateX(-50%) translateY(-200vh)',
    backgroundColor: '#1e40af',
    color: '#ffffff',
    padding: '16px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    border: '3px solid #ffffff',
    whiteSpace: 'nowrap',
    opacity: 0,
    visibility: 'hidden',
    pointerEvents: 'none',
    display: 'block',
    zIndex: 99999,
    transition: 'all 0.2s ease-in-out'
  };

  const skipLinkFocusStyle: React.CSSProperties = {
    ...skipLinkStyle,
    top: '20px',
    transform: 'translateX(-50%) translateY(0)',
    opacity: 1,
    visibility: 'visible',
    pointerEvents: 'auto',
    outline: '4px solid #fbbf24',
    outlineOffset: '3px'
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 99999,
        pointerEvents: 'none'
      }}
    >
      <a
        href="#main-content"
        style={skipLinkStyle}
        onFocus={(e) => {
          Object.assign(e.target.style, skipLinkFocusStyle);
        }}
        onBlur={(e) => {
          Object.assign(e.target.style, skipLinkStyle);
        }}
        onClick={(e) => {
          e.preventDefault();
          handleSkipClick('main-content');
        }}
      >
        Skip to main content
      </a>
    </div>
  );
};
