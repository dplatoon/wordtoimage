
import { Link } from 'react-router-dom';
import { X, Home, Palette, CreditCard, Mail, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResponsiveMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResponsiveMobileMenu = ({ isOpen, onClose }: ResponsiveMobileMenuProps) => {
  const navItems = [
    { name: 'Home', path: '/', icon: Home, description: 'AI Image Generator' },
    { name: 'Features', path: '/features', icon: Palette, description: 'Explore capabilities' },
    { name: 'Pricing', path: '/pricing', icon: CreditCard, description: 'Plans and pricing' },
    { name: 'Contact', path: '/contact', icon: Mail, description: 'Get in touch' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-card/95 backdrop-blur-xl shadow-glass z-50 md:hidden border-l border-primary/20">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-primary/20">
            <div className="text-lg font-semibold text-foreground">Menu</div>
            <button
              onClick={onClose}
              className="touch-target rounded-lg text-muted-foreground hover:text-foreground hover:bg-card/50 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="flex items-center p-4 rounded-xl text-muted-foreground hover:text-primary hover:bg-card/50 transition-all duration-200 touch-target"
              >
                <item.icon className="h-5 w-5 mr-3" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.name}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile CTA Section */}
          <div className="p-4 border-t border-primary/20 bg-card/50">
            <div className="space-y-3">
              <Link to="/auth" onClick={onClose}>
                <Button variant="glass" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/text-to-image" onClick={onClose}>
                <Button variant="neon" className="w-full">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Try AI Generator
                </Button>
              </Link>
            </div>
            
            <div className="mt-4 text-center">
              <div className="text-xs text-muted-foreground">
                Free to try • No credit card required
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
