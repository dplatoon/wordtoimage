
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/navigation/Logo';
import { SimpleDesktopNav } from '@/components/navigation/SimpleDesktopNav';
import { MobileNav } from '@/components/navigation/MobileNav';
import { NavAuthButtons } from '@/components/navigation/NavAuthButtons';
import { useAuthState } from '@/hooks/useAuthState';

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { session } = useAuthState();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/5' 
          : 'bg-background/70 backdrop-blur-md'
      }`}
    >
      {/* Neon top border when scrolled */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo />
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-primary">AI</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <SimpleDesktopNav />

          {/* Auth Buttons & Mobile Menu */}
          <div className="flex items-center gap-3">
            <NavAuthButtons session={session} />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="glass"
                size="icon-sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative"
              >
                <span className="sr-only">Toggle menu</span>
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
        
        {/* Mobile Auth Buttons */}
        {mobileMenuOpen && (
          <NavAuthButtons session={session} isMobile onClose={closeMobileMenu} />
        )}
      </div>
    </nav>
  );
};
