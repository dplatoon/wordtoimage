import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/navigation/Logo';
import { DesktopNavigation } from '@/components/navigation/DesktopNavigation';
import { MobileMenuButton } from '@/components/navigation/MobileMenuButton';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { AuthSection } from '@/components/navigation/AuthSection';

export const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [betaBannerVisible, setBetaBannerVisible] = useState(true);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Check beta banner visibility
  useEffect(() => {
    const isDismissed = localStorage.getItem('betaBannerDismissed') === 'true';
    setBetaBannerVisible(!isDismissed);

    // Listen for beta banner dismissal
    const handleBetaBannerDismissed = () => {
      setBetaBannerVisible(false);
    };

    window.addEventListener('betaBannerDismissed', handleBetaBannerDismissed);
    return () => {
      window.removeEventListener('betaBannerDismissed', handleBetaBannerDismissed);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
        menuButtonRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav 
      className={`bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl border-b border-slate-700/50 backdrop-blur-sm sticky z-50 ${
        betaBannerVisible ? 'top-[44px]' : 'top-0'
      }`}
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Using Logo component for consistency */}
          <div className="flex-shrink-0">
            <Logo variant="default" />
          </div>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Desktop Auth Section */}
          <AuthSection />

          {/* Mobile menu button */}
          <MobileMenuButton 
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            buttonRef={menuButtonRef}
          />
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        menuRef={mobileMenuRef}
      />
    </nav>
  );
};
