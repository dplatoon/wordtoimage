import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

interface FloatingActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
  className?: string;
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'neon' | 'glass';
  badge?: number | string;
  disabled?: boolean;
}

const positionStyles = {
  'bottom-right': 'right-4 bottom-20',
  'bottom-center': 'left-1/2 -translate-x-1/2 bottom-20',
  'bottom-left': 'left-4 bottom-20',
};

const sizeStyles = {
  sm: 'w-12 h-12',
  md: 'w-14 h-14',
  lg: 'w-16 h-16',
};

const iconSizes = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
};

const variantStyles = {
  primary: 'bg-primary text-primary-foreground shadow-neon hover:shadow-neon-lg',
  neon: 'bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground shadow-neon-lg',
  glass: 'glass-card border-2 border-primary/40 text-primary',
};

/**
 * Floating Action Button for mobile with haptic feedback
 * Positioned fixed on screen with smooth animations
 */
export function FloatingActionButton({
  onClick,
  icon,
  label,
  className,
  position = 'bottom-right',
  size = 'md',
  variant = 'primary',
  badge,
  disabled = false,
}: FloatingActionButtonProps) {
  const haptics = useHapticFeedback();

  const handleClick = () => {
    if (disabled) return;
    haptics.medium();
    onClick();
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'fixed z-50 flex items-center justify-center rounded-full',
        'transition-all duration-300 touch-target',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        positionStyles[position],
        sizeStyles[size],
        variantStyles[variant],
        'safe-area-inset-bottom',
        className
      )}
    >
      {/* Icon */}
      <span className={cn('flex items-center justify-center', iconSizes[size])}>
        {icon}
      </span>

      {/* Badge */}
      {badge !== undefined && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            'absolute -top-1 -right-1 flex items-center justify-center',
            'min-w-5 h-5 px-1.5 rounded-full',
            'bg-destructive text-destructive-foreground text-xs font-bold',
            'shadow-lg'
          )}
        >
          {badge}
        </motion.span>
      )}

      {/* Ripple effect background */}
      <motion.span
        className="absolute inset-0 rounded-full bg-white/20"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
}

export default FloatingActionButton;
