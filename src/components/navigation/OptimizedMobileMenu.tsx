
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, Home, Palette, CreditCard, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface OptimizedMobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const OptimizedMobileMenu = ({ isOpen, onToggle, onClose }: OptimizedMobileMenuProps) => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home, description: 'AI Image Generator' },
    { name: 'Features', path: '/features', icon: Palette, description: 'Explore AI capabilities' },
    { name: 'Pricing', path: '/pricing', icon: CreditCard, description: 'Plans and pricing' },
    { name: 'Contact', path: '/contact', icon: Mail, description: 'Get in touch' }
  ];

  // Close menu on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Toggle Button - Enhanced for accessibility and touch */}
      <button
        onClick={onToggle}
        className="md:hidden w-12 h-12 rounded-xl flex items-center justify-center text-gray-600 hover:text-ai-primary hover:bg-ai-accent/10 transition-all duration-300 z-50 touch-manipulation focus-ring"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        type="button"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={onClose}
              aria-hidden="true"
            />
            
            {/* Menu Panel */}
            <motion.div
              id="mobile-navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full bg-white shadow-2xl z-50 w-full max-w-sm md:hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 id="mobile-menu-title" className="text-lg font-semibold text-gray-900">
                    Navigation
                  </h2>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus-ring"
                    aria-label="Close navigation menu"
                    type="button"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-4" role="navigation">
                  <ul className="space-y-2" role="list">
                    {navItems.map((item) => (
                      <li key={item.path} role="listitem">
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={`group flex items-center w-full px-4 py-4 text-left rounded-xl transition-all duration-300 min-h-[56px] focus-ring ${
                            isCurrentPage(item.path)
                              ? 'text-ai-primary bg-ai-accent/10 border-l-4 border-ai-accent'
                              : 'text-gray-700 hover:text-ai-primary hover:bg-gray-50'
                          }`}
                          aria-current={isCurrentPage(item.path) ? 'page' : undefined}
                        >
                          <item.icon 
                            className={`h-5 w-5 mr-3 transition-colors ${
                              isCurrentPage(item.path) ? 'text-ai-accent' : 'text-gray-400 group-hover:text-ai-accent'
                            }`}
                            aria-hidden="true"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-base">{item.name}</div>
                            <div className="text-sm text-gray-500 mt-0.5">{item.description}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                {/* CTA Section */}
                <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full min-h-[48px] text-base focus-ring"
                      asChild
                    >
                      <Link to="/auth" onClick={onClose}>
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      className="btn-ai-primary w-full min-h-[48px] text-base focus-ring"
                      asChild
                    >
                      <Link to="/text-to-image" onClick={onClose}>
                        Try AI Generator
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
