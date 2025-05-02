
import { useState } from 'react';
import { DesktopNavigation } from '@/components/navigation/DesktopNavigation';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { Logo } from '@/components/navigation/Logo';
import { AuthButtons } from '@/components/navigation/AuthButtons';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>
            <DesktopNavigation />
          </div>

          <div className="flex items-center">
            <LanguageSwitcher />
            <AuthButtons />
            <div className="flex md:hidden ml-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative z-50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
    </nav>
  );
};
