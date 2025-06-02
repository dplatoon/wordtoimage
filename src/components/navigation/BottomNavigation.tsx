
import { Home, Palette, CreditCard, Mail } from 'lucide-react';
import { BottomNavItem } from './BottomNavItem';
import { FloatingActionButton } from './FloatingActionButton';
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
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-ai-accent/20 safe-area-bottom"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      role="navigation"
      aria-label="Bottom navigation"
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ai-accent/30 to-transparent" />
      
      <div className="flex items-center justify-around px-4 py-2 relative">
        {/* Navigation Items */}
        {navItems.map((item, index) => (
          <div key={item.path} className="flex-1 flex justify-center">
            {/* Add spacing for FAB when it's in the middle */}
            {index === 2 && (
              <>
                <BottomNavItem {...item} />
                <div className="flex-1 flex justify-center">
                  <FloatingActionButton 
                    to="/text-to-image" 
                    label="Generate AI Image"
                    className="absolute -top-6"
                  />
                </div>
              </>
            )}
            {index !== 2 && <BottomNavItem {...item} />}
          </div>
        ))}
      </div>
      
      {/* Enhanced shadow for depth */}
      <div className="absolute inset-x-0 -top-4 h-4 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
    </nav>
  );
};
