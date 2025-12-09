import React from 'react';
import { cn } from '@/lib/utils';

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
    'text-base text-foreground',
    'border border-primary/20 rounded-xl',
    'bg-background/60 backdrop-blur-sm',
    'placeholder:text-muted-foreground/60',
    'focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:shadow-neon focus:outline-none',
    'hover:border-primary/30 hover:bg-background/80',
    'transition-all duration-300',
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
