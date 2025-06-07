
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu } from 'lucide-react';
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

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-white/90 backdrop-blur-sm border-b border-gray-100'
        }`}
      >
        <div className="mobile-first-container">
          <div className={`flex items-center justify-between ${
            isMobile ? 'h-16' : isTablet ? 'h-18' : 'h-20'
          }`}>
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group z-50 touch-target"
              aria-label="WordToImage Home"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={`bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg ${
                isMobile ? 'w-8 h-8' : 'w-9 h-9'
              }`}>
                <Sparkles className={`text-white drop-shadow-sm ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              </div>
              <span className={`font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 ${
                isMobile ? 'text-lg' : 'text-xl sm:text-2xl'
              }`}>
                WordToImage
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group rounded-lg touch-target ${
                    isCurrentPage(item.path)
                      ? 'text-violet-600 bg-violet-50 shadow-sm'
                      : 'text-gray-700 hover:text-violet-600 hover:bg-violet-50'
                  }`}
                >
                  {item.name}
                  {isCurrentPage(item.path) && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full" />
                  )}
                  {!isCurrentPage(item.path) && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/auth"
                className="text-gray-600 hover:text-violet-600 transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-violet-50 touch-target"
              >
                Sign In
              </Link>
              <Link
                to="/text-to-image"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:from-violet-700 hover:to-indigo-700 touch-target"
              >
                Try Free
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden touch-target rounded-lg text-gray-700 hover:text-violet-600 hover:bg-violet-50 transition-all duration-300 z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <ResponsiveMobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
      
      {/* Add spacing for fixed navigation */}
      <div className={`${isMobile ? 'h-16' : isTablet ? 'h-18' : 'h-20'}`} />
    </>
  );
};
