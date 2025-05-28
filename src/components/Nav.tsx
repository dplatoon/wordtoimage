
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { EnhancedMobileMenu } from './navigation/EnhancedMobileMenu';

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-modern border-b border-brand-slate-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="content-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group z-50"
            aria-label="WordToImage Home"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-brand-teal to-brand-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gradient-brand">WordToImage</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group ${
                  isCurrentPage(item.path)
                    ? 'text-brand-navy'
                    : 'text-brand-slate-600 hover:text-brand-navy'
                }`}
              >
                {item.name}
                {isCurrentPage(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-teal rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {!isCurrentPage(item.path) && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-teal rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
              </Link>
            ))}
          </div>

          {/* Enhanced Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/auth"
              className="text-brand-slate-600 hover:text-brand-navy transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-brand-slate-50"
            >
              Sign In
            </Link>
            <Link
              to="/text-to-image"
              className="btn-primary shadow-sm hover:shadow-md"
            >
              Try Free
            </Link>
          </div>

          {/* Enhanced Mobile Menu */}
          <EnhancedMobileMenu 
            isOpen={isMenuOpen}
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      </div>
    </motion.nav>
  );
};
