
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

export const MobileMenu = ({ isOpen, onClose, menuRef }: MobileMenuProps) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/text-to-image', label: 'Create Images' },
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
  ];

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="md:hidden bg-gradient-to-b from-slate-900 to-slate-800 border-t border-slate-700/50 shadow-2xl backdrop-blur-sm"
      id="mobile-menu"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="mobile-menu-button"
    >
      <div className="px-4 pt-4 pb-6 space-y-2">
        {/* Mobile Navigation Links */}
        <div className="space-y-2" role="none">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 min-h-[48px] flex items-center focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border border-blue-500'
                  : 'text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 border border-transparent hover:border-slate-500'
              }`}
              role="menuitem"
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Auth Section */}
        <div className="border-t border-slate-700/50 pt-4 mt-4">
          {user ? (
            <div className="space-y-3">
              <div className="px-4 py-2 text-sm text-slate-300 font-medium">
                Welcome, {user.email}
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="w-full min-h-[48px] text-base focus:ring-4 focus:ring-slate-400/50 bg-transparent border-slate-400 text-slate-200 hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 hover:text-white hover:border-white transition-all duration-200"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link to="/auth" onClick={onClose}>
                <Button 
                  variant="outline" 
                  className="w-full min-h-[48px] text-base focus:ring-4 focus:ring-slate-400/50 bg-transparent border-slate-400 text-slate-200 hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 hover:text-white hover:border-white transition-all duration-200"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/auth" onClick={onClose}>
                <Button className="w-full min-h-[48px] text-base focus:ring-4 focus:ring-blue-400/50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
