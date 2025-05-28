
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { authFormSchema, AuthFormValues } from './schema/authFormSchema';

interface EmailPasswordFormProps {
  mode: 'signin' | 'signup';
  isLoading: boolean;
  onSubmit: (values: AuthFormValues) => Promise<void>;
  authError: string | null;
}

export function EmailPasswordForm({ 
  mode, 
  isLoading, 
  onSubmit,
  authError 
}: EmailPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const handleSubmit = async (values: AuthFormValues) => {
    if (isLoading) return; // Prevent duplicate submissions
    await onSubmit(values);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      form.handleSubmit(handleSubmit)();
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)} 
        onKeyDown={handleKeyDown}
        className="space-y-4"
      >
        {mode === 'signup' && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username (optional)</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Enter your username"
                    disabled={isLoading}
                    autoComplete="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  {...field} 
                  placeholder="Enter your email address"
                  disabled={isLoading}
                  autoComplete="email"
                  inputMode="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    {...field} 
                    placeholder={mode === 'signup' ? "Create a password (8+ characters)" : "Enter your password"}
                    disabled={isLoading}
                    autoComplete={mode === 'signup' ? "new-password" : "current-password"}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
              {mode === 'signup' && (
                <p className="text-xs text-muted-foreground">
                  Password should be at least 8 characters long
                </p>
              )}
            </FormItem>
          )}
        />
        
        {authError && (
          <div className="rounded-md bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-red-800">{authError}</p>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
            </>
          ) : (
            <>{mode === 'signin' ? 'Sign In' : 'Create Account'}</>
          )}
        </Button>

        {mode === 'signin' && (
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500 underline"
              disabled={isLoading}
            >
              Forgot your password?
            </button>
          </div>
        )}
      </form>
    </Form>
  );
}
