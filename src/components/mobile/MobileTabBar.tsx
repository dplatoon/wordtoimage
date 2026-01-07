import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

interface MobileTabBarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

interface MobileTabBarProps {
  items: MobileTabBarItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

/**
 * Bottom tab bar navigation for mobile
 * Features haptic feedback and smooth animations
 */
export function MobileTabBar({
  items,
  activeId,
  onSelect,
  className,
}: MobileTabBarProps) {
  const haptics = useHapticFeedback();

  const handleSelect = (id: string) => {
    if (id !== activeId) {
      haptics.selection();
    }
    onSelect(id);
  };

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'glass-card border-t border-primary/20',
        'safe-area-inset-bottom',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {items.map((item) => {
          const isActive = item.id === activeId;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'relative flex flex-col items-center justify-center',
                'w-16 h-14 rounded-xl transition-colors duration-200',
                'touch-target focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="tab-active-bg"
                  className="absolute inset-1 rounded-xl bg-primary/10"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Icon container */}
              <motion.div
                className="relative z-10"
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                {item.icon}
                
                {/* Badge */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={cn(
                    'absolute -top-1 -right-1 flex items-center justify-center',
                    'min-w-4 h-4 px-1 rounded-full',
                    'bg-destructive text-destructive-foreground text-xs font-bold'
                  )}>
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </motion.div>

              {/* Label */}
              <motion.span
                className="relative z-10 text-xs font-medium mt-1"
                animate={{ 
                  opacity: isActive ? 1 : 0.7,
                  fontWeight: isActive ? 600 : 400
                }}
              >
                {item.label}
              </motion.span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary shadow-neon"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileTabBar;
