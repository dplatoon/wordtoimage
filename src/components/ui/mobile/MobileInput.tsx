
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
