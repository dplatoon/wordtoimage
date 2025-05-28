
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ResponsiveFormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  rows?: number;
  className?: string;
  helpText?: string;
}

export const ResponsiveFormField: React.FC<ResponsiveFormFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  autoComplete,
  maxLength,
  rows = 4,
  className,
  helpText
}) => {
  const { isMobile, isTouch } = useResponsiveDesign();
  const fieldId = React.useId();
  const errorId = `${fieldId}-error`;
  const helpId = `${fieldId}-help`;

  const baseInputClasses = cn(
    "w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    isMobile && "text-base", // Prevent zoom on iOS
    isTouch && "min-h-[48px]", // Better touch targets
    error && "border-red-500 focus:ring-red-500",
    disabled && "opacity-50 cursor-not-allowed"
  );

  const labelClasses = cn(
    "block font-medium mb-2 transition-colors",
    isMobile ? "text-sm" : "text-sm",
    error ? "text-red-700" : "text-gray-700"
  );

  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={fieldId}
        className={labelClasses}
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </Label>
      
      {type === 'textarea' ? (
        <Textarea
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={isMobile ? Math.max(3, rows - 1) : rows}
          className={cn(baseInputClasses, "resize-y")}
          aria-describedby={cn(
            error && errorId,
            helpText && helpId
          )}
          aria-invalid={!!error}
          autoComplete={autoComplete}
        />
      ) : (
        <Input
          id={fieldId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={baseInputClasses}
          aria-describedby={cn(
            error && errorId,
            helpText && helpId
          )}
          aria-invalid={!!error}
          autoComplete={autoComplete}
        />
      )}
      
      {/* Character counter for inputs with maxLength */}
      {maxLength && value.length > 0 && (
        <div className="flex justify-end">
          <span className={cn(
            "text-xs tabular-nums",
            value.length > maxLength * 0.9 ? "text-orange-600" : "text-gray-500",
            value.length >= maxLength && "text-red-600"
          )}>
            {value.length}/{maxLength}
          </span>
        </div>
      )}
      
      {/* Help text */}
      {helpText && (
        <p id={helpId} className={cn(
          "text-gray-600",
          isMobile ? "text-xs" : "text-sm"
        )}>
          {helpText}
        </p>
      )}
      
      {/* Error message */}
      {error && (
        <p 
          id={errorId}
          className={cn(
            "text-red-600 flex items-center gap-1",
            isMobile ? "text-xs" : "text-sm"
          )}
          role="alert"
          aria-live="polite"
        >
          <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
};
