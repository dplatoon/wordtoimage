
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, ChevronRight, Home, Palette, CreditCard, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

interface ResponsiveMobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const ResponsiveMobileMenu = ({ isOpen, onToggle, onClose }: ResponsiveMobileMenuProps) => {
  const location = useLocation();
  const { isMobile, isTouch } = useResponsiveDesign();
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { name: 'Home', path: '/', description: 'AI Image Generator', icon: Home },
    { name: 'Features', path: '/features', description: 'Explore AI capabilities', icon: Palette },
    { name: 'Pricing', path: '/pricing', description: 'Plans and pricing', icon: CreditCard },
    { name: 'Contact', path: '/contact', description: 'Get in touch', icon: Mail }
  ];

  // Enhanced close behavior
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

  const menuVariants = {
    closed: {
      x: '100%',
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.05,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    closed: {
      x: 30,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      }
    }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <>
      {/* Enhanced Mobile Menu Button with better touch target */}
      <button
        onClick={onToggle}
        className={`md:hidden w-12 h-12 rounded-xl flex items-center justify-center text-brand-slate-600 hover:text-brand-navy hover:bg-brand-slate-100 transition-all duration-200 z-50 touch-manipulation relative overflow-hidden ${
          isTouch ? 'min-w-[48px] min-h-[48px]' : ''
        }`}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        type="button"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.div>
        
        {/* Enhanced ripple effect for touch feedback */}
        <motion.div
          className="absolute inset-0 bg-brand-teal/20 rounded-xl"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.15 }}
        />
      </button>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Enhanced Backdrop with better blur and touch handling */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-brand-slate-900/70 backdrop-blur-md z-40 md:hidden"
              onClick={onClose}
              style={{ touchAction: 'none' }}
            />
            
            {/* Enhanced Menu Panel with better mobile optimization */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 md:hidden overflow-y-auto optimize-scrolling ${
                isMobile ? 'w-full max-w-sm' : 'w-80'
              }`}
              style={{ maxWidth: isMobile ? '85vw' : '320px' }}
            >
              <div className="flex flex-col h-full">
                {/* Enhanced Header with better spacing */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-brand-slate-100 min-h-[72px]">
                  <div className="text-lg font-semibold text-brand-slate-900">Navigation</div>
                  <button
                    onClick={onClose}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-brand-slate-400 hover:text-brand-slate-600 hover:bg-brand-slate-50 transition-colors touch-manipulation ${
                      isTouch ? 'min-w-[48px] min-h-[48px]' : ''
                    }`}
                    aria-label="Close menu"
                    type="button"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Enhanced Navigation Links with better mobile design */}
                <div className="flex-1 px-4 sm:px-6 py-4">
                  <nav className="space-y-2" role="navigation" aria-label="Main navigation">
                    {navItems.map((item, index) => (
                      <motion.div key={item.path} variants={itemVariants}>
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={`group flex items-center justify-between w-full px-4 py-4 text-left rounded-xl transition-all duration-200 touch-manipulation ${
                            isCurrentPage(item.path)
                              ? 'text-brand-navy bg-gradient-to-r from-brand-teal/10 to-brand-purple/5 border-l-4 border-brand-teal shadow-sm'
                              : 'text-brand-slate-700 hover:text-brand-navy hover:bg-brand-slate-50'
                          } ${isTouch ? 'min-h-[56px]' : 'min-h-[48px]'}`}
                          role="menuitem"
                          aria-current={isCurrentPage(item.path) ? 'page' : undefined}
                        >
                          <div className="flex items-center flex-1">
                            <item.icon className={`h-5 w-5 mr-3 ${
                              isCurrentPage(item.path) ? 'text-brand-teal' : 'text-brand-slate-400'
                            }`} />
                            <div className="flex-1">
                              <div className="font-medium text-base">{item.name}</div>
                              <div className="text-sm text-brand-slate-500 mt-0.5">{item.description}</div>
                            </div>
                          </div>
                          <ChevronRight className={`h-4 w-4 transition-transform ${
                            isCurrentPage(item.path) ? 'text-brand-teal' : 'text-brand-slate-400 group-hover:translate-x-1'
                          }`} />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
                
                {/* Enhanced CTA Section with better mobile optimization */}
                <motion.div 
                  variants={itemVariants}
                  className="px-4 sm:px-6 py-6 border-t border-brand-slate-100 bg-gradient-to-r from-brand-slate-50/50 to-white"
                >
                  <div className="space-y-3">
                    <Link
                      to="/auth"
                      onClick={onClose}
                      className={`block w-full px-4 py-3 text-center text-brand-slate-700 hover:text-brand-navy font-medium transition-colors duration-200 rounded-lg hover:bg-white border border-brand-slate-200 touch-manipulation ${
                        isTouch ? 'min-h-[48px]' : ''
                      }`}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/text-to-image"
                      onClick={onClose}
                      className={`btn-primary w-full text-center touch-manipulation ${
                        isTouch ? 'min-h-[48px] text-base' : ''
                      }`}
                    >
                      Try AI Generator
                    </Link>
                  </div>
                  
                  {/* Enhanced trust indicators */}
                  <div className="mt-4 pt-4 border-t border-brand-slate-100">
                    <div className="flex items-center justify-center gap-4 text-xs text-brand-slate-500">
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse"></div>
                        Free to try
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse"></div>
                        No credit card
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
