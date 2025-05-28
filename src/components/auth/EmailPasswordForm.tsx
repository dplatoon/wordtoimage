
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Eye, EyeOff, Mail, Lock, User as UserIcon, CheckCircle } from 'lucide-react';
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
    if (isLoading) return;
    await onSubmit(values);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      form.handleSubmit(handleSubmit)();
    }
  };

  // Enhanced error messages with actionable guidance
  const getEnhancedErrorMessage = (error: string) => {
    if (error.includes('Invalid login') || error.includes('Invalid credentials')) {
      return 'Incorrect email or password. Please check your credentials and try again.';
    }
    if (error.includes('User already registered')) {
      return "An account with this email already exists. Try signing in instead, or use 'Forgot password' if you need to reset it.";
    }
    if (error.includes('Email not confirmed')) {
      return 'Please check your inbox and click the verification link we sent you before signing in.';
    }
    if (error.includes('Too many requests')) {
      return 'Too many login attempts. Please wait a moment before trying again.';
    }
    return error;
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)} 
        onKeyDown={handleKeyDown}
        className="space-y-5"
      >
        {/* Helpful signup guidance */}
        {mode === 'signup' && (
          <div className="text-center mb-4">
            <div className="flex items-center justify-center space-x-4 text-sm text-slate-600 mb-2">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Takes less than a minute</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              Join thousands of creators making amazing images with AI
            </p>
          </div>
        )}

        {mode === 'signup' && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-700">
                  Display Name (optional)
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      {...field} 
                      placeholder="How should we call you?"
                      disabled={isLoading}
                      autoComplete="username"
                      className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
                <p className="text-xs text-slate-500 mt-1">
                  This will be shown in your profile and creations
                </p>
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-slate-700">
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    type="email" 
                    {...field} 
                    placeholder="you@example.com"
                    disabled={isLoading}
                    autoComplete="email"
                    inputMode="email"
                    className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-slate-700">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    type={showPassword ? "text" : "password"}
                    {...field} 
                    placeholder={mode === 'signup' ? "Create a secure password (min. 6 characters)" : "Enter your password"}
                    disabled={isLoading}
                    autoComplete={mode === 'signup' ? "new-password" : "current-password"}
                    className="pl-10 pr-11 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9 w-9 p-0 hover:bg-slate-100"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
              {mode === 'signup' && (
                <p className="text-xs text-slate-500 mt-1">
                  Choose a strong password with at least 6 characters
                </p>
              )}
            </FormItem>
          )}
        />
        
        {authError && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-800 font-medium">
              {getEnhancedErrorMessage(authError)}
            </p>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {mode === 'signin' ? 'Signing you in...' : 'Creating your account...'}
            </>
          ) : (
            <>{mode === 'signin' ? 'Sign In to WordToImage' : 'Create My Free Account'}</>
          )}
        </Button>

        {mode === 'signin' && (
          <div className="text-center pt-2">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors font-medium"
              disabled={isLoading}
            >
              Forgot your password? Get help here
            </button>
          </div>
        )}

        {/* Terms agreement for signup */}
        {mode === 'signup' && (
          <div className="text-center pt-2">
            <p className="text-xs text-slate-500 leading-relaxed">
              By creating an account, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium">
                Privacy Policy
              </a>
            </p>
          </div>
        )}
      </form>
    </Form>
  );
}
