
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { OptimizedMobileMenu } from './navigation/OptimizedMobileMenu';
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

  const navItems = [
    { name: 'Home', path: '/' },
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
            ? 'bg-white/90 backdrop-blur-md shadow-xl border-b border-ai-accent/20' 
            : 'bg-transparent'
        }`}
        style={isScrolled ? {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)'
        } : {}}
        role="navigation"
        aria-label="Main navigation"
        id="navigation"
      >
        <div className="content-container">
          <div className={`flex items-center justify-between ${
            isMobile ? 'h-16' : isTablet ? 'h-18' : 'h-20'
          }`}>
            {/* Enhanced Logo with proper accessibility */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group z-50 focus-ring rounded-lg"
              aria-label="WordToImage AI Image Generator - Go to homepage"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={`bg-ai-neon-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-ai-neon/50 ${
                isMobile ? 'w-8 h-8' : 'w-9 h-9'
              }`}>
                <Sparkles className={`text-white drop-shadow-sm ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} aria-hidden="true" />
              </div>
              <span className={`font-bold text-gradient-ai group-hover:scale-105 transition-transform duration-300 ${
                isMobile ? 'text-lg' : 'text-xl sm:text-2xl'
              }`}>
                WordToImage
              </span>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8" role="menubar">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  role="menuitem"
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group rounded-lg focus-ring ${
                    isCurrentPage(item.path)
                      ? 'text-ai-primary bg-ai-accent/10 shadow-sm'
                      : 'text-gray-700 hover:text-ai-primary hover:bg-ai-accent/5'
                  }`}
                  aria-current={isCurrentPage(item.path) ? 'page' : undefined}
                >
                  {item.name}
                  {isCurrentPage(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-ai-neon-gradient rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      aria-hidden="true"
                    />
                  )}
                  {!isCurrentPage(item.path) && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-ai-neon-gradient rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
                  )}
                </Link>
              ))}
            </div>

            {/* Enhanced Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/auth"
                className="text-gray-600 hover:text-ai-primary transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-ai-accent/5 relative group focus-ring"
              >
                Sign In
              </Link>
              <Link
                to="/text-to-image"
                className="btn-ai-primary relative overflow-hidden group focus-ring"
              >
                <span className="relative z-10">Try Free</span>
                <div className="absolute inset-0 bg-ai-purple-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Optimized Mobile Menu */}
            <OptimizedMobileMenu 
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen(!isMenuOpen)}
              onClose={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
        
        {/* Subtle bottom glow when scrolled */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ai-accent/30 to-transparent" aria-hidden="true" />
        )}
      </motion.nav>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
      
      {/* Add bottom padding to main content when bottom nav is visible */}
      {isMobile && (
        <div className="h-20" aria-hidden="true" />
      )}
    </>
  );
};
