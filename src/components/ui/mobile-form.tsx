
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export const MobileForm: React.FC<MobileFormProps> = ({
  children,
  onSubmit,
  className
}) => {
  const isMobile = useIsMobile();

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "mobile-content",
        isMobile ? "space-y-4" : "space-y-6",
        className
      )}
    >
      {children}
    </form>
  );
};

interface MobileFormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export const MobileFormField: React.FC<MobileFormFieldProps> = ({
  label,
  required = false,
  error,
  children,
  className
}) => {
  const fieldId = React.useId();

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={fieldId}
        className="block mobile-text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {React.isValidElement(children) 
        ? React.cloneElement(children as React.ReactElement<any>, {
            id: fieldId,
            'aria-invalid': !!error,
            'aria-describedby': error ? `${fieldId}-error` : undefined
          })
        : children
      }
      
      {error && (
        <p
          id={`${fieldId}-error`}
          className="mobile-text-sm text-red-600 flex items-center gap-2"
          role="alert"
        >
          <span className="w-1 h-1 bg-red-600 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
};

export const MobileInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn("mobile-input", className)}
      {...props}
    />
  );
});

MobileInput.displayName = 'MobileInput';

export const MobileTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn("mobile-textarea", className)}
      {...props}
    />
  );
});

MobileTextarea.displayName = 'MobileTextarea';

export const MobileButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
    size?: 'default' | 'comfortable';
  }
>(({ className, variant = 'primary', size = 'default', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        variant === 'primary' ? 'mobile-button-primary' : 'mobile-button-secondary',
        size === 'comfortable' && 'touch-target-comfortable',
        className
      )}
      {...props}
    />
  );
});

MobileButton.displayName = 'MobileButton';
