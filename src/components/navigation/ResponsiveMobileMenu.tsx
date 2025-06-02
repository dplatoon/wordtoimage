
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
      {/* Enhanced Mobile Menu Button with AI styling */}
      <button
        onClick={onToggle}
        className={`md:hidden w-12 h-12 rounded-xl flex items-center justify-center text-gray-600 hover:text-ai-primary hover:bg-ai-accent/10 transition-all duration-300 z-50 touch-manipulation relative overflow-hidden group ${
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
        
        {/* Enhanced AI-themed ripple effect */}
        <motion.div
          className="absolute inset-0 bg-ai-neon-gradient opacity-20 rounded-xl"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1.2, opacity: 0.3 }}
          transition={{ duration: 0.15 }}
        />
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-ai-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Enhanced Mobile Menu Overlay with AI theming */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Enhanced Backdrop with AI gradient overlay */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gradient-to-br from-ai-dark/80 via-ai-surface/70 to-ai-muted/60 backdrop-blur-md z-40 md:hidden"
              onClick={onClose}
              style={{ touchAction: 'none' }}
            />
            
            {/* Enhanced Menu Panel with AI surface styling */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`fixed top-0 right-0 h-full bg-white/95 backdrop-blur-xl shadow-2xl z-50 md:hidden overflow-y-auto optimize-scrolling border-l border-ai-accent/20 ${
                isMobile ? 'w-full max-w-sm' : 'w-80'
              }`}
              style={{ 
                maxWidth: isMobile ? '85vw' : '320px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)'
              }}
            >
              <div className="flex flex-col h-full">
                {/* Enhanced Header with AI accent */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-ai-accent/20 min-h-[72px] bg-gradient-to-r from-ai-accent/5 to-transparent">
                  <div className="text-lg font-semibold text-ai-primary">Navigation</div>
                  <button
                    onClick={onClose}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-ai-primary hover:bg-ai-accent/10 transition-all duration-300 touch-manipulation group ${
                      isTouch ? 'min-w-[48px] min-h-[48px]' : ''
                    }`}
                    aria-label="Close menu"
                    type="button"
                  >
                    <X className="h-5 w-5" />
                    <div className="absolute inset-0 rounded-lg bg-ai-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>

                {/* Enhanced Navigation Links with AI theming */}
                <div className="flex-1 px-4 sm:px-6 py-4">
                  <nav className="space-y-2" role="navigation" aria-label="Main navigation">
                    {navItems.map((item, index) => (
                      <motion.div key={item.path} variants={itemVariants}>
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={`group flex items-center justify-between w-full px-4 py-4 text-left rounded-xl transition-all duration-300 touch-manipulation relative overflow-hidden ${
                            isCurrentPage(item.path)
                              ? 'text-ai-primary bg-gradient-to-r from-ai-accent/10 to-ai-purple/5 border-l-4 border-ai-accent shadow-lg shadow-ai-accent/10'
                              : 'text-gray-700 hover:text-ai-primary hover:bg-ai-accent/5'
                          } ${isTouch ? 'min-h-[56px]' : 'min-h-[48px]'}`}
                          role="menuitem"
                          aria-current={isCurrentPage(item.path) ? 'page' : undefined}
                        >
                          <div className="flex items-center flex-1 relative z-10">
                            <item.icon className={`h-5 w-5 mr-3 transition-colors duration-300 ${
                              isCurrentPage(item.path) ? 'text-ai-accent' : 'text-gray-400 group-hover:text-ai-accent'
                            }`} />
                            <div className="flex-1">
                              <div className="font-medium text-base">{item.name}</div>
                              <div className="text-sm text-gray-500 mt-0.5 group-hover:text-gray-600 transition-colors duration-300">{item.description}</div>
                            </div>
                          </div>
                          <ChevronRight className={`h-4 w-4 transition-all duration-300 relative z-10 ${
                            isCurrentPage(item.path) ? 'text-ai-accent' : 'text-gray-400 group-hover:translate-x-1 group-hover:text-ai-accent'
                          }`} />
                          
                          {/* Subtle background glow effect */}
                          <div className="absolute inset-0 rounded-xl bg-ai-neon-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
                
                {/* Enhanced CTA Section with AI gradient styling */}
                <motion.div 
                  variants={itemVariants}
                  className="px-4 sm:px-6 py-6 border-t border-ai-accent/20 bg-gradient-to-r from-ai-accent/5 to-ai-purple/5"
                >
                  <div className="space-y-3">
                    <Link
                      to="/auth"
                      onClick={onClose}
                      className={`block w-full px-4 py-3 text-center text-gray-700 hover:text-ai-primary font-medium transition-all duration-300 rounded-lg hover:bg-white border border-ai-accent/20 hover:border-ai-accent/40 touch-manipulation group relative overflow-hidden ${
                        isTouch ? 'min-h-[48px]' : ''
                      }`}
                    >
                      <span className="relative z-10">Sign In</span>
                      <div className="absolute inset-0 bg-ai-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                    <Link
                      to="/text-to-image"
                      onClick={onClose}
                      className={`btn-ai-primary w-full text-center touch-manipulation relative overflow-hidden group ${
                        isTouch ? 'min-h-[48px] text-base' : ''
                      }`}
                    >
                      <span className="relative z-10">Try AI Generator</span>
                      <div className="absolute inset-0 bg-ai-purple-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </div>
                  
                  {/* Enhanced trust indicators with AI accent */}
                  <div className="mt-4 pt-4 border-t border-ai-accent/20">
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-ai-accent rounded-full animate-pulse-glow"></div>
                        Free to try
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-ai-accent rounded-full animate-pulse-glow"></div>
                        No credit card
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Subtle side accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-ai-neon-gradient opacity-30" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
