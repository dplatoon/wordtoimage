
import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, User, Home, Image, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const MobileOptimizedNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Show sticky navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/text-to-image', label: 'Generate', icon: Sparkles },
    { path: '/style-gallery', label: 'Styles', icon: Palette },
    { path: '/dashboard', label: 'Gallery', icon: Image },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-violet-600" />
            <span className="font-bold text-xl text-gray-900">WordToImage</span>
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {/* Quick Actions */}
              <div className="py-2">
                <Button 
                  asChild 
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white h-12 text-base font-medium"
                >
                  <Link to="/text-to-image" onClick={() => setIsMenuOpen(false)}>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Create AI Image
                  </Link>
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {[
                  { path: '/style-gallery', label: 'Style Gallery' },
                  { path: '/pricing', label: 'Pricing' },
                  { path: '/tutorials', label: 'Tutorials' },
                  { path: '/help', label: 'Help' },
                  { path: '/about', label: 'About' },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Auth Section */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="mr-3 h-5 w-5" />
                    Dashboard
                  </Link>
                ) : (
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full h-12 text-base"
                  >
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Navigation for Mobile */}
      <div className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 transition-transform duration-300",
        showStickyNav ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActiveRoute(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors min-h-[48px]",
                  active 
                    ? "bg-violet-100 text-violet-600" 
                    : "text-gray-600 hover:text-violet-600 hover:bg-gray-50"
                )}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main CTA Floating Button - Always Visible */}
      <div className="md:hidden fixed bottom-20 right-4 z-30">
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg rounded-full h-14 w-14 p-0"
          aria-label="Create AI Image"
        >
          <Link to="/text-to-image">
            <Sparkles className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </>
  );
};
