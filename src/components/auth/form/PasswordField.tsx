
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useState, forwardRef } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { AuthFormValues } from '../schema/authFormSchema';

interface PasswordFieldProps {
  control: Control<AuthFormValues>;
  mode: 'signin' | 'signup';
  isLoading: boolean;
  errors: FieldErrors<AuthFormValues>;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ control, mode, isLoading, errors }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
      // Announce to screen readers
      const message = showPassword ? 'Password hidden' : 'Password visible';
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      document.body.appendChild(announcement);
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    };

    return (
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold text-slate-700">
              Password
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                <Input 
                  type={showPassword ? "text" : "password"}
                  {...field} 
                  ref={ref}
                  placeholder={mode === 'signup' ? "Create a secure password (min. 6 characters)" : "Enter your password"}
                  disabled={isLoading}
                  autoComplete={mode === 'signup' ? "new-password" : "current-password"}
                  className="pl-10 pr-11 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : mode === 'signup' ? "password-description" : undefined}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9 w-9 p-0 hover:bg-slate-100"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  tabIndex={0}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </FormControl>
            <FormMessage id="password-error" className="text-xs" role="alert" />
            {mode === 'signup' && (
              <p id="password-description" className="text-xs text-slate-500 mt-1">
                Choose a strong password with at least 6 characters
              </p>
            )}
          </FormItem>
        )}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";
