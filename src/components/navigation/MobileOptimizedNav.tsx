import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, User, Home, Image, Palette, Wand2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const MobileOptimizedNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useAuth();
  const location = useLocation();

  // Smart scroll detection - show on scroll up, hide on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setShowStickyNav(currentScrollY < lastScrollY || currentScrollY < 200);
      } else {
        setShowStickyNav(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const mainNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/text-to-image', label: 'Create', icon: Sparkles },
    { path: '/style-gallery', label: 'Styles', icon: Palette },
    { path: '/ai-enhance', label: 'Enhance', icon: Wand2 },
    { path: '/dashboard', label: 'Gallery', icon: Image },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Header - Glass morphism */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 glass-card-dark safe-top">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white">WordToImage</span>
          </Link>
          
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Slide in from right */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 transition-all duration-300",
        isMenuOpen ? "visible" : "invisible"
      )}>
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={cn(
          "absolute right-0 top-0 bottom-0 w-[280px] bg-slate-900 shadow-2xl transition-transform duration-300 ease-out safe-top",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col h-full pt-16 pb-safe">
            {/* Quick Action */}
            <div className="px-4 pb-4">
              <Button 
                asChild 
                variant="gradient-primary"
                size="lg"
                className="w-full"
              >
                <Link to="/text-to-image">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create AI Image
                </Link>
              </Button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
              {[
                { path: '/ai-enhance', label: 'AI Enhance', icon: Wand2 },
                { path: '/style-gallery', label: 'Style Gallery', icon: Palette },
                { path: '/pricing', label: 'Pricing', badge: 'Pro' },
                { path: '/tutorials', label: 'Tutorials' },
                { path: '/help', label: 'Help & Support' },
                { path: '/about', label: 'About Us' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all touch-manipulation",
                    isActiveRoute(item.path)
                      ? "bg-violet-600/20 text-violet-400"
                      : "text-gray-300 hover:bg-white/5 active:bg-white/10"
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="px-4 pt-4 border-t border-white/10">
              {user ? (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">My Dashboard</div>
                    <div className="text-sm text-gray-400">View your creations</div>
                  </div>
                </Link>
              ) : (
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button asChild variant="gradient-primary" className="w-full">
                    <Link to="/auth?mode=signup">Get Started Free</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Navigation - Glass morphism */}
      <nav className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-40 mobile-nav-bar transition-transform duration-300",
        showStickyNav || location.pathname === '/' ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="grid grid-cols-5 gap-1 px-2 py-1.5">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActiveRoute(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "mobile-nav-item",
                  active && "active"
                )}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={cn(
                  "h-5 w-5 mb-0.5 transition-transform",
                  active && "scale-110"
                )} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Create Button - Always visible on scroll */}
      <div className={cn(
        "md:hidden fixed z-30 transition-all duration-300",
        showStickyNav ? "bottom-20 right-4" : "bottom-6 right-4"
      )}>
        <Button
          asChild
          variant="gradient-neon"
          size="icon-lg"
          className="rounded-full shadow-2xl"
          aria-label="Create AI Image"
        >
          <Link to="/text-to-image">
            <Sparkles className="h-6 w-6" />
          </Link>
        </Button>
      </div>

      {/* Spacer for content below fixed nav */}
      <div className="md:hidden h-14" />
    </>
  );
};
