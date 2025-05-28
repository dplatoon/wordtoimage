
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface EnhancedMobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const EnhancedMobileMenu = ({ isOpen, onToggle, onClose }: EnhancedMobileMenuProps) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { name: 'Home', path: '/', description: 'Main landing page' },
    { name: 'Features', path: '/features', description: 'Explore AI capabilities' },
    { name: 'Pricing', path: '/pricing', description: 'Plans and pricing' },
    { name: 'Templates', path: '/templates', description: 'Ready-to-use templates' },
    { name: 'Contact', path: '/contact', description: 'Get in touch' }
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      }
    }
  };

  return (
    <>
      {/* Enhanced Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="md:hidden w-12 h-12 rounded-xl flex items-center justify-center text-brand-slate-600 hover:text-brand-navy hover:bg-brand-slate-100 transition-all duration-200 z-50 touch-manipulation relative overflow-hidden"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.div>
        
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 bg-brand-teal/20 rounded-xl"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </button>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-brand-slate-900/60 backdrop-blur-md z-40 md:hidden"
              onClick={onClose}
            />
            
            {/* Enhanced Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-brand-slate-100">
                  <div className="text-lg font-semibold text-brand-slate-900">Menu</div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-brand-slate-400 hover:text-brand-slate-600 hover:bg-brand-slate-50 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Links with enhanced design */}
                <div className="flex-1 px-6 py-4">
                  <nav className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div key={item.path} variants={itemVariants}>
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={`group flex items-center justify-between w-full px-4 py-4 text-left rounded-xl transition-all duration-200 touch-manipulation ${
                            isCurrentPage(item.path)
                              ? 'text-brand-navy bg-gradient-to-r from-brand-teal/10 to-brand-purple/5 border-l-4 border-brand-teal shadow-sm'
                              : 'text-brand-slate-700 hover:text-brand-navy hover:bg-brand-slate-50'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="font-medium text-base">{item.name}</div>
                            <div className="text-sm text-brand-slate-500 mt-0.5">{item.description}</div>
                          </div>
                          <ChevronRight className={`h-4 w-4 transition-transform ${
                            isCurrentPage(item.path) ? 'text-brand-teal' : 'text-brand-slate-400 group-hover:translate-x-1'
                          }`} />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
                
                {/* Enhanced CTA Section */}
                <motion.div 
                  variants={itemVariants}
                  className="px-6 py-6 border-t border-brand-slate-100 bg-gradient-to-r from-brand-slate-50/50 to-white"
                >
                  <div className="space-y-3">
                    <Link
                      to="/auth"
                      onClick={onClose}
                      className="block w-full px-4 py-3 text-center text-brand-slate-700 hover:text-brand-navy font-medium transition-colors duration-200 rounded-lg hover:bg-white border border-brand-slate-200 touch-manipulation"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/text-to-image"
                      onClick={onClose}
                      className="btn-primary w-full text-center touch-manipulation"
                    >
                      Try Free
                    </Link>
                  </div>
                  
                  {/* Trust indicators */}
                  <div className="mt-4 pt-4 border-t border-brand-slate-100">
                    <div className="flex items-center justify-center gap-4 text-xs text-brand-slate-500">
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-brand-teal rounded-full"></div>
                        Free to try
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-brand-teal rounded-full"></div>
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
