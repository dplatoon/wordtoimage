
import { useState } from 'react';
import { X, Home, Palette, CreditCard, Mail, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface EnhancedMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Home', path: '/', icon: Home, description: 'AI Image Generator' },
  { name: 'Features', path: '/features', icon: Palette, description: 'Explore capabilities' },
  { name: 'Pricing', path: '/pricing', icon: CreditCard, description: 'Plans and pricing' },
  { name: 'Contact', path: '/contact', icon: Mail, description: 'Get in touch' }
];

export const EnhancedMobileMenu = ({ isOpen, onClose }: EnhancedMobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 animate-slide-in-right overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center p-4 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <item.icon className="h-5 w-5 mr-4 text-gray-400 group-hover:text-blue-500" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Account section */}
            <div className="space-y-2">
              <Link
                to="/auth"
                onClick={onClose}
                className="flex items-center p-4 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <User className="h-5 w-5 mr-4 text-gray-400" />
                <div>
                  <div className="font-medium">Sign In</div>
                  <div className="text-sm text-gray-500">Access your account</div>
                </div>
              </Link>

              <Link
                to="/settings"
                onClick={onClose}
                className="flex items-center p-4 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <Settings className="h-5 w-5 mr-4 text-gray-400" />
                <div>
                  <div className="font-medium">Settings</div>
                  <div className="text-sm text-gray-500">Preferences</div>
                </div>
              </Link>
            </div>
          </nav>

          {/* CTA Section */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <Button asChild className="w-full mb-3">
              <Link to="/text-to-image" onClick={onClose}>
                Try AI Generator
              </Link>
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Free to try • No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
