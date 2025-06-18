
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface TouchTargetButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
}

export const TouchTargetButton = ({ 
  children, 
  className, 
  size = 'md',
  variant = 'default',
  onClick,
  disabled,
  icon: Icon,
  ...props 
}: TouchTargetButtonProps) => {
  const sizeClasses = {
    sm: 'min-h-[44px] px-4 py-3 text-sm',
    md: 'min-h-[48px] px-6 py-4 text-base',
    lg: 'min-h-[56px] px-8 py-5 text-lg'
  };

  return (
    <Button
      {...props}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'touch-target',
        'transition-all duration-200',
        'active:scale-[0.98]',
        'focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        className
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {Icon && <Icon className="h-5 w-5" />}
        {children}
      </div>
    </Button>
  );
};

interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  onTap?: () => void;
  interactive?: boolean;
}

export const MobileCard = ({ 
  children, 
  className, 
  onTap, 
  interactive = false 
}: MobileCardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200',
        'transition-all duration-200',
        interactive && [
          'cursor-pointer',
          'hover:shadow-md hover:border-gray-300',
          'active:scale-[0.99] active:shadow-sm',
          'touch-target'
        ],
        className
      )}
      onClick={onTap}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTap?.();
        }
      } : undefined}
    >
      {children}
    </div>
  );
};

interface MobileInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  multiline?: boolean;
  rows?: number;
}

export const MobileInput = ({ 
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  className,
  multiline = false,
  rows = 3
}: MobileInputProps) => {
  const baseClasses = cn(
    'w-full',
    'min-h-[48px]',
    'px-4 py-3',
    'text-base', // Prevents zoom on iOS
    'border border-gray-300 rounded-lg',
    'focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none',
    'transition-all duration-200',
    'touch-target',
    className
  );

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        className={cn(baseClasses, 'resize-none')}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      className={baseClasses}
    />
  );
};

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

export const SwipeableCard = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  className 
}: SwipeableCardProps) => {
  const [startX, setStartX] = React.useState<number | null>(null);
  const [currentX, setCurrentX] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || startX === null) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || startX === null || currentX === null) {
      setIsDragging(false);
      setStartX(null);
      setCurrentX(null);
      return;
    }

    const deltaX = currentX - startX;
    const threshold = 100;

    if (deltaX > threshold && onSwipeRight) {
      onSwipeRight();
    } else if (deltaX < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }

    setIsDragging(false);
    setStartX(null);
    setCurrentX(null);
  };

  const translateX = isDragging && startX !== null && currentX !== null 
    ? Math.max(-150, Math.min(150, currentX - startX))
    : 0;

  return (
    <div
      className={cn('touch-target select-none', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateX(${translateX}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {children}
    </div>
  );
};

// Mobile-optimized spacing utilities
export const MobileSpacing = {
  section: 'py-8 px-4 md:py-12 md:px-6',
  container: 'mx-auto max-w-sm md:max-w-2xl lg:max-w-4xl',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
  stack: 'space-y-4 md:space-y-6',
  inline: 'flex flex-wrap gap-2 md:gap-3'
};

// Haptic feedback utility (for supported devices)
export const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30]
    };
    navigator.vibrate(patterns[type]);
  }
};
