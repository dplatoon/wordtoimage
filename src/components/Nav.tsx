
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/navigation/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [betaBannerVisible, setBetaBannerVisible] = useState(true);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
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
        setIsMobileMenuOpen(false);
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
    <header className={`bg-white shadow sticky z-50 ${betaBannerVisible ? 'top-[44px]' : 'top-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-auto md:h-16 py-4 md:py-0">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo variant="default" />
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 font-medium text-gray-700">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <Link to="/features" className="hover:text-indigo-600">Features</Link>
            <Link to="/pricing" className="hover:text-indigo-600">Pricing</Link>
            <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
          </div>
          
          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 font-medium">Welcome, {user.email}</span>
                <Button
                  variant="outline"
                  onClick={signOut}
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth" className="text-gray-700 hover:text-indigo-600 font-medium">Sign In</Link>
                <Link to="/text-to-image">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition">
                    <Wand2 className="h-5 w-5 mr-2" /> Try AI Generator
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
        
        {/* Mobile Menu (overlay) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleMobileMenu}
            />
          )}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-lg z-50"
            >
              <div ref={mobileMenuRef} className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="text-lg font-bold text-gray-900">Menu</span>
                  <button onClick={toggleMobileMenu} className="p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 px-4 py-6 space-y-3">
                  <Link to="/" onClick={toggleMobileMenu} className="block p-3 rounded-md text-gray-700 hover:bg-gray-100">Home</Link>
                  <Link to="/features" onClick={toggleMobileMenu} className="block p-3 rounded-md text-gray-700 hover:bg-gray-100">Features</Link>
                  <Link to="/pricing" onClick={toggleMobileMenu} className="block p-3 rounded-md text-gray-700 hover:bg-gray-100">Pricing</Link>
                  <Link to="/contact" onClick={toggleMobileMenu} className="block p-3 rounded-md text-gray-700 hover:bg-gray-100">Contact</Link>
                </div>
                <div className="px-4 py-6 border-t bg-gray-50 space-y-2">
                  {user ? (
                    <div className="space-y-3">
                      <div className="px-4 py-2 text-sm text-gray-700 font-medium">
                        Welcome, {user.email}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          signOut();
                          toggleMobileMenu();
                        }}
                        className="w-full"
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Link to="/auth" onClick={toggleMobileMenu}>
                        <Button variant="outline" className="w-full">Sign In</Button>
                      </Link>
                      <Link to="/text-to-image" onClick={toggleMobileMenu}>
                        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                          <Wand2 className="h-5 w-5 mr-2" /> Try AI Generator
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
