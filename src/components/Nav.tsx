
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/navigation/Logo';
import { DesktopNav } from '@/components/navigation/DesktopNav';
import { MobileNav } from '@/components/navigation/MobileNav';
import { NavAuthButtons } from '@/components/navigation/NavAuthButtons';
import { useAuthState } from '@/hooks/useAuthState';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { session } = useAuthState();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Theme Toggle and Auth Buttons */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NavAuthButtons session={session} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
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
