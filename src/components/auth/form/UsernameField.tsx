
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User as UserIcon } from 'lucide-react';
import { Control } from 'react-hook-form';
import { AuthFormValues } from '../schema/authFormSchema';

interface UsernameFieldProps {
  control: Control<AuthFormValues>;
  isLoading: boolean;
}

export function UsernameField({ control, isLoading }: UsernameFieldProps) {
  return (
    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-semibold text-slate-700">
            Display Name (optional)
          </FormLabel>
          <FormControl>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
              <Input 
                {...field} 
                placeholder="How should we call you?"
                disabled={isLoading}
                autoComplete="username"
                className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                aria-describedby="username-description"
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs" role="alert" />
          <p id="username-description" className="text-xs text-slate-500 mt-1">
            This will be shown in your profile and creations
          </p>
        </FormItem>
      )}
    />
  );
}
