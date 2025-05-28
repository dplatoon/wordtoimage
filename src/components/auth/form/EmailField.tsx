
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { forwardRef } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { AuthFormValues } from '../schema/authFormSchema';

interface EmailFieldProps {
  control: Control<AuthFormValues>;
  isLoading: boolean;
  errors: FieldErrors<AuthFormValues>;
}

export const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  ({ control, isLoading, errors }, ref) => {
    return (
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold text-slate-700">
              Email Address
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                <Input 
                  type="email" 
                  {...field} 
                  ref={ref}
                  placeholder="you@example.com"
                  disabled={isLoading}
                  autoComplete="email"
                  inputMode="email"
                  className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
            </FormControl>
            <FormMessage id="email-error" className="text-xs" role="alert" />
          </FormItem>
        )}
      />
    );
  }
);

EmailField.displayName = "EmailField";
