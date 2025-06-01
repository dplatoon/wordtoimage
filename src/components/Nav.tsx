
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';

export const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (path: string) => location.pathname === path;

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

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/text-to-image', label: 'Create Images' },
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav 
      className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-xl border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center focus:outline-none focus:ring-4 focus:ring-blue-400/50 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-white/10"
              aria-label="WordToImage - Home"
            >
              <img
                className="h-8 w-auto brightness-110"
                src="/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png"
                alt="WordToImage Logo"
                loading="eager"
                fetchPriority="high"
              />
              <span className="ml-2 text-xl font-bold text-white hidden sm:block tracking-tight">
                WordToImage
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white shadow-lg border border-blue-500'
                      : 'text-slate-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-slate-600'
                  }`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-200 font-medium">Welcome, {user.email}</span>
                <Button
                  variant="outline"
                  onClick={signOut}
                  className="min-h-[44px] focus:ring-4 focus:ring-slate-400/50 bg-transparent border-slate-400 text-slate-200 hover:bg-white/10 hover:text-white hover:border-white transition-all duration-200"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <Button 
                    variant="outline" 
                    className="min-h-[44px] focus:ring-4 focus:ring-slate-400/50 bg-transparent border-slate-400 text-slate-200 hover:bg-white/10 hover:text-white hover:border-white transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="min-h-[44px] focus:ring-4 focus:ring-blue-400/50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all duration-200 min-h-[44px] min-w-[44px]"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden bg-gradient-to-b from-slate-900 to-blue-900 border-t border-slate-700/50 shadow-2xl backdrop-blur-sm"
          id="mobile-menu"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="mobile-menu-button"
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {/* Mobile Navigation Links */}
            <div className="space-y-2" role="none">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 min-h-[48px] flex items-center focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white shadow-lg border border-blue-500'
                      : 'text-slate-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-slate-600'
                  }`}
                  role="menuitem"
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Section */}
            <div className="border-t border-slate-700/50 pt-4 mt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="px-4 py-2 text-sm text-slate-300 font-medium">
                    Welcome, {user.email}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      signOut();
                      closeMobileMenu();
                    }}
                    className="w-full min-h-[48px] text-base focus:ring-4 focus:ring-slate-400/50 bg-transparent border-slate-400 text-slate-200 hover:bg-white/10 hover:text-white hover:border-white transition-all duration-200"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link to="/auth" onClick={closeMobileMenu}>
                    <Button 
                      variant="outline" 
                      className="w-full min-h-[48px] text-base focus:ring-4 focus:ring-slate-400/50 bg-transparent border-slate-400 text-slate-200 hover:bg-white/10 hover:text-white hover:border-white transition-all duration-200"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={closeMobileMenu}>
                    <Button className="w-full min-h-[48px] text-base focus:ring-4 focus:ring-blue-400/50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
