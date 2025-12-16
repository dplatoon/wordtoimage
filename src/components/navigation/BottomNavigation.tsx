
import { Home, Palette, CreditCard, Mail } from 'lucide-react';
import { BottomNavItem } from './BottomNavItem';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

export const BottomNavigation = () => {
  const { isMobile } = useResponsiveDesign();

  // Only show on mobile devices
  if (!isMobile) return null;

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Features', path: '/features', icon: Palette },
    { name: 'Pricing', path: '/pricing', icon: CreditCard },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-primary/20"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <BottomNavItem key={item.path} {...item} />
        ))}
      </div>
    </nav>
  );
};
