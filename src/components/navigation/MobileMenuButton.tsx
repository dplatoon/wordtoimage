
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export const MobileMenuButton = ({ isOpen, onClick, buttonRef }: MobileMenuButtonProps) => {
  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex items-center justify-center p-3 rounded-lg text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all duration-200 min-h-[44px] min-w-[44px]"
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
        onClick={onClick}
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
