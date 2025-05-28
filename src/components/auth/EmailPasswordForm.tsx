
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Eye, EyeOff, Mail, Lock, User as UserIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
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
  const errorRef = useRef<HTMLDivElement>(null);
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const passwordFieldRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  // Focus management for errors
  useEffect(() => {
    if (authError && errorRef.current) {
      errorRef.current.focus();
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [authError]);

  const handleSubmit = async (values: AuthFormValues) => {
    if (isLoading) return;
    
    try {
      await onSubmit(values);
    } catch (error) {
      // Focus management after error - focus the first field with an error
      const firstErrorField = form.formState.errors.email ? emailFieldRef.current : 
                             form.formState.errors.password ? passwordFieldRef.current : null;
      
      if (firstErrorField) {
        setTimeout(() => {
          firstErrorField.focus();
        }, 100);
      }
    }
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
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)} 
        onKeyDown={handleKeyDown}
        className="space-y-5"
        noValidate
        aria-label={mode === 'signin' ? 'Sign in form' : 'Create account form'}
      >
        {/* Screen reader announcement for form purpose */}
        <div className="sr-only" aria-live="polite">
          {mode === 'signup' ? 'Complete the form below to create your free WordToImage account' : 'Enter your credentials to sign in to WordToImage'}
        </div>

        {/* Helpful signup guidance */}
        {mode === 'signup' && (
          <div className="text-center mb-4" role="region" aria-label="Account benefits">
            <div className="flex items-center justify-center space-x-4 text-sm text-slate-600 mb-2">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
                <span>Takes less than a minute</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
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
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                  <Input 
                    type="email" 
                    {...field} 
                    ref={emailFieldRef}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    autoComplete="email"
                    inputMode="email"
                    className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    aria-invalid={!!form.formState.errors.email}
                    aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                  />
                </div>
              </FormControl>
              <FormMessage id="email-error" className="text-xs" role="alert" />
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
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                  <Input 
                    type={showPassword ? "text" : "password"}
                    {...field} 
                    ref={passwordFieldRef}
                    placeholder={mode === 'signup' ? "Create a secure password (min. 6 characters)" : "Enter your password"}
                    disabled={isLoading}
                    autoComplete={mode === 'signup' ? "new-password" : "current-password"}
                    className="pl-10 pr-11 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    aria-invalid={!!form.formState.errors.password}
                    aria-describedby={form.formState.errors.password ? "password-error" : mode === 'signup' ? "password-description" : undefined}
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
        
        {authError && (
          <div 
            ref={errorRef}
            className="rounded-lg bg-red-50 border border-red-200 p-4"
            role="alert"
            aria-live="assertive"
            tabIndex={-1}
          >
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-red-800 font-medium">
                {getEnhancedErrorMessage(authError)}
              </p>
            </div>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2" 
          disabled={isLoading}
          aria-describedby={isLoading ? "loading-status" : undefined}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
              <span id="loading-status" aria-live="polite">
                {mode === 'signin' ? 'Signing you in...' : 'Creating your account...'}
              </span>
            </>
          ) : (
            <>{mode === 'signin' ? 'Sign In to WordToImage' : 'Create My Free Account'}</>
          )}
        </Button>

        {mode === 'signin' && (
          <div className="text-center pt-2">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              disabled={isLoading}
              aria-label="Get help with forgotten password"
            >
              Forgot your password? Get help here
            </button>
          </div>
        )}

        {/* Terms agreement for signup */}
        {mode === 'signup' && (
          <div className="text-center pt-2" role="region" aria-label="Terms and conditions">
            <p className="text-xs text-slate-500 leading-relaxed">
              By creating an account, you agree to our{' '}
              <a 
                href="/terms" 
                className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a 
                href="/privacy" 
                className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        )}
      </form>
    </Form>
  );
}
