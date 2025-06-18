
import React from 'react';
import { cn } from '@/lib/utils';

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
