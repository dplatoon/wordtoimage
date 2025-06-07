
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Palette, CreditCard, Mail, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ResponsiveMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Home', path: '/', icon: Home, description: 'AI Image Generator' },
  { name: 'Features', path: '/features', icon: Palette, description: 'Explore all features' },
  { name: 'Pricing', path: '/pricing', icon: CreditCard, description: 'Choose your plan' },
  { name: 'Contact', path: '/contact', icon: Mail, description: 'Get support' }
];

export const ResponsiveMobileMenu = ({ isOpen, onClose }: ResponsiveMobileMenuProps) => {
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-6 py-6">
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center p-4 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <item.icon className="h-6 w-6 mr-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-base">{item.name}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{item.description}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                </Link>
              ))}
            </div>

            <Separator className="my-8" />

            {/* Account Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4 mb-4">
                Account
              </h3>
              <Link
                to="/auth"
                className="flex items-center p-4 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
              >
                <User className="h-6 w-6 mr-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <div className="flex-1">
                  <div className="font-semibold">Sign In</div>
                  <div className="text-sm text-gray-500 mt-0.5">Access your account</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
              </Link>
            </div>
          </nav>

          {/* CTA Section */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-100">
            <Button asChild size="lg" className="w-full mb-4">
              <Link to="/text-to-image">
                Start Creating Images
              </Link>
            </Button>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                🎨 Create stunning AI images for free
              </p>
              <p className="text-xs text-gray-500">
                No credit card required to get started
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
