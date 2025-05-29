
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveMobileMenu } from './navigation/ResponsiveMobileMenu';
import { BottomNavigation } from './navigation/BottomNavigation';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isMobile, isTablet } = useResponsiveDesign();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Consistent navigation order across all pages
  const navItems = [
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between ${
            isMobile ? 'h-16' : isTablet ? 'h-18' : 'h-20'
          }`}>
            {/* Enhanced Logo with proper accessibility */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group z-50 logo-container"
              aria-label="WordToImage Home - Transform text into images with AI"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={`bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl ${
                isMobile ? 'w-10 h-10' : 'w-12 h-12'
              }`}>
                <Sparkles className={`text-white drop-shadow-sm ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} aria-hidden="true" />
              </div>
              <span className={`font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 ${
                isMobile ? 'text-xl' : 'text-2xl'
              }`}>
                WordToImage
              </span>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-6 py-3 text-base font-medium transition-all duration-300 group rounded-lg min-h-[44px] flex items-center ${
                    isCurrentPage(item.path)
                      ? 'text-indigo-600 bg-indigo-50 shadow-sm'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                  aria-current={isCurrentPage(item.path) ? 'page' : undefined}
                >
                  {item.name}
                  {isCurrentPage(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {!isCurrentPage(item.path) && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </Link>
              ))}
            </div>

            {/* Enhanced Desktop CTA Buttons with high contrast */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/auth"
                className="text-gray-600 hover:text-indigo-600 transition-all duration-300 font-medium px-6 py-3 rounded-lg hover:bg-gray-50 relative group min-h-[44px] flex items-center"
                aria-label="Sign in to your account"
              >
                Sign In
              </Link>
              <Link
                to="/text-to-image"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[44px] flex items-center relative overflow-hidden group"
                aria-label="Try WordToImage for free - no registration required"
              >
                <span className="relative z-10">Try Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Enhanced Mobile menu button with proper accessibility */}
            <button
              className="md:hidden mobile-menu-button relative z-50 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        
        {/* Subtle bottom border when scrolled */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        )}
      </motion.nav>

      {/* Mobile Menu */}
      <ResponsiveMobileMenu 
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
      
      {/* Add bottom padding to main content when bottom nav is visible */}
      {isMobile && (
        <div className="h-20" />
      )}
    </>
  );
};
