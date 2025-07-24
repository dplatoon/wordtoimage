import React, { useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  successMessage?: string;
  loadingText?: string;
  successDuration?: number;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, onClick, className, successMessage, loadingText, successDuration = 2000, disabled, ...props }, ref) => {
    const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (state !== 'idle' || disabled) return;

      setState('loading');

      try {
        if (onClick) {
          await onClick(e);
        }
        
        setState('success');
        
        setTimeout(() => {
          setState('idle');
        }, successDuration);
      } catch (error) {
        setState('idle');
      }
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        disabled={disabled || state === 'loading'}
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          state === 'loading' && 'scale-95',
          state === 'success' && 'bg-green-500 hover:bg-green-600 scale-105',
          className
        )}
        {...props}
      >
        <span className={cn(
          'flex items-center transition-opacity duration-200',
          state !== 'idle' && 'opacity-0'
        )}>
          {children}
        </span>
        
        {state === 'loading' && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            {loadingText || 'Loading...'}
          </span>
        )}
        
        {state === 'success' && (
          <span className="absolute inset-0 flex items-center justify-center animate-scale-in">
            <Check className="h-4 w-4 mr-2" />
            {successMessage || 'Success!'}
          </span>
        )}
      </Button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';