
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
