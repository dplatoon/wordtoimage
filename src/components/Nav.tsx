
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResourcesDropdown } from './navigation/ResourcesDropdown';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

export const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBetaBanner, setShowBetaBanner] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isMobile } = useResponsiveDesign();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isDismissed = localStorage.getItem('betaBannerDismissed') === 'true';
    if (isDismissed) {
      setShowBetaBanner(false);
    }
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          showBetaBanner ? 'top-10' : 'top-0'
        } ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
        id="navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg p-2 min-h-[44px] min-w-[44px]"
              aria-label="WordToImage Home - Transform text into images with AI"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <Sparkles className="text-white drop-shadow-sm h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 text-xl hidden sm:block">
                WordToImage
              </span>
            </Link>

            {!isMobile && (
              <div className="hidden md:flex items-center space-x-8">
                <ResourcesDropdown />
              </div>
            )}

            <div className="flex items-center space-x-3 md:space-x-4">
              {!isMobile && (
                <>
                  <Link
                    to="/auth"
                    className="text-gray-600 hover:text-indigo-600 transition-all duration-300 font-medium px-4 md:px-6 py-3 rounded-lg hover:bg-gray-50 relative group min-h-[44px] min-w-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    aria-label="Sign in to your account"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/text-to-image"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-4 md:px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[44px] min-w-[44px] flex items-center relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95"
                    aria-label="Try WordToImage for free - no registration required"
                  >
                    <span className="relative z-10">Try Free</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </>
              )}

              {isMobile && (
                <>
                  <Link
                    to="/text-to-image"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[44px] min-w-[44px] flex items-center relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm active:scale-95"
                    aria-label="Try WordToImage for free"
                  >
                    <span className="relative z-10">Try Free</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                  
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
                    aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMobileMenuOpen}
                  >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        )}
      </motion.nav>

      {isMobile && isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 ${showBetaBanner ? 'top-[106px]' : 'top-16'}`}>
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative bg-white border-t border-gray-200 px-4 py-6 max-h-screen overflow-y-auto">
            <div className="space-y-2">
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-sm font-medium text-gray-900 mb-3 px-3">Resources</div>
                <div className="space-y-1">
                  <Link to="/blog" className="block py-3 px-3 text-base text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center">Blog</Link>
                  <Link to="/tutorials" className="block py-3 px-3 text-base text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center">Tutorials</Link>
                  <Link to="/design-tips" className="block py-3 px-3 text-base text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center">Design Tips</Link>
                  <Link to="/help" className="block py-3 px-3 text-base text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center">Help Center</Link>
                  <Link to="/api" className="block py-3 px-3 text-base text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center">API Docs</Link>
                  <Link to="/updates" className="block py-3 px-3 text-base text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center">Updates</Link>
                  <Link to="/community" className="block py-3 px-3 text-base text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center">Community</Link>
                  <Link to="/careers" className="block py-3 px-3 text-base text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center">Careers</Link>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <Link
                  to="/auth"
                  className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors min-h-[44px] flex items-center justify-center active:scale-95"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
