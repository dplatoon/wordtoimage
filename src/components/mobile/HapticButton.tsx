import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

interface HapticButtonProps {
  hapticType?: 'light' | 'medium' | 'heavy' | 'success' | 'selection';
  variant?: 'default' | 'primary' | 'glass' | 'neon' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles = {
  default: 'bg-card border border-border text-foreground hover:bg-muted',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-neon',
  glass: 'glass-card border-primary/20 hover:border-primary/40 text-foreground',
  neon: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-neon hover:shadow-neon-lg',
  ghost: 'bg-transparent hover:bg-white/10 text-foreground',
};

const sizeStyles = {
  sm: 'h-9 px-3 text-sm rounded-lg',
  md: 'h-11 px-4 text-base rounded-xl',
  lg: 'h-14 px-6 text-lg rounded-xl',
  xl: 'h-16 px-8 text-xl rounded-2xl',
};

/**
 * Button component with haptic feedback for mobile
 * Features smooth press animations and vibration feedback
 */
export const HapticButton: React.FC<HapticButtonProps> = ({ 
  hapticType = 'light', 
  variant = 'default',
  size = 'md',
  loading = false,
  className, 
  onClick, 
  disabled,
  children,
  type = 'button',
}) => {
  const haptics = useHapticFeedback();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    haptics.trigger(hapticType);
    onClick?.(e);
  };

  const handleTouchStart = () => {
    if (!disabled && !loading) {
      haptics.selection();
    }
  };

  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      transition={{ duration: 0.15 }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      disabled={disabled || loading}
      className={cn(
        'relative inline-flex items-center justify-center font-medium',
        'touch-target transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
        />
      ) : (
        children
      )}
    </motion.button>
  );
};

export default HapticButton;
