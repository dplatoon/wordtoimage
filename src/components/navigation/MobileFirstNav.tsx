
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wand2, Home, Palette, CreditCard, Mail, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/navigation/Logo';
import { useIsMobile } from '@/hooks/use-mobile';

export const MobileFirstNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { name: 'Home', path: '/', description: 'AI Image Generator', icon: Home },
    { name: 'Features', path: '/features', description: 'Explore capabilities', icon: Palette },
    { name: 'Pricing', path: '/pricing', description: 'Plans and pricing', icon: CreditCard },
    { name: 'Contact', path: '/contact', description: 'Get in touch', icon: Mail }
  ];

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg px-3 py-2 ${
                  isCurrentPage(item.path)
                    ? 'text-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/auth"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg px-3 py-2"
            >
              Sign In
            </Link>
            <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
              <Link to="/text-to-image">
                <Wand2 className="h-4 w-4 mr-2" />
                Try AI Generator
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="text-lg font-semibold text-gray-900">Menu</div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-4 py-6 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center p-4 rounded-xl transition-all duration-200 ${
                        isCurrentPage(item.path)
                          ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  ))}
                </div>

                {/* Mobile CTA Section */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      asChild
                    >
                      <Link to="/auth">
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      className="w-full justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                      asChild
                    >
                      <Link to="/text-to-image">
                        <Wand2 className="h-4 w-4 mr-2" />
                        Try AI Generator
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Trust indicators */}
                  <div className="mt-4 text-center">
                    <div className="text-xs text-gray-500">
                      Free to try • No credit card required
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
