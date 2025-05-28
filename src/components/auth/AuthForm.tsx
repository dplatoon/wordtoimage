
import { useState } from 'react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { trackEvent, events } from '@/utils/analytics';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { EmailPasswordForm } from './EmailPasswordForm';
import { SocialLoginButton } from './SocialLoginButton';
import { ConfigErrorAlert } from './ConfigErrorAlert';
import { AuthFormValues } from './schema/authFormSchema';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function AuthForm({ mode, isLoading, setIsLoading }: AuthFormProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isConfigured] = useState(true);
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect URL from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  async function onSubmit(values: AuthFormValues) {
    setIsLoading(true);
    setAuthError(null);

    try {
      if (mode === 'signup') {
        await signUp(values.email, values.password, values.username);
        toast.success('Account created successfully! Please check your email to verify your account.');
        // Don't auto-redirect for signup, let user see the verification message
      } else {
        await signIn(values.email, values.password);
        toast.success('Welcome back!');
        // Redirect after successful login
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Auth error:", error);
      let errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      // Provide user-friendly error messages
      if (errorMessage.includes('User already registered')) {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (errorMessage.includes('Invalid login') || errorMessage.includes('Invalid credentials')) {
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
      } else if (errorMessage.includes('Email not confirmed')) {
        errorMessage = 'Please check your email and click the verification link before signing in.';
      } else if (errorMessage.includes('Too many requests')) {
        errorMessage = 'Too many login attempts. Please wait a moment before trying again.';
      }
      
      setAuthError(errorMessage);
      toast.error('Authentication failed', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      setAuthError(null);
      await signInWithGoogle();
      
      if (mode === 'signup') {
        trackEvent(events.SIGN_UP, { provider: 'google' });
        toast.success('Account created successfully!');
      } else {
        toast.success('Welcome back!');
      }
      
      // Redirect will be handled by auth state change
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google auth error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Google authentication failed';
      setAuthError(errorMessage);
      toast.error('Authentication failed', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!isConfigured) {
    return <ConfigErrorAlert />;
  }

  return (
    <div className="space-y-6">
      <EmailPasswordForm 
        mode={mode}
        isLoading={isLoading}
        onSubmit={onSubmit}
        authError={authError}
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <SocialLoginButton 
        provider="google"
        onClick={handleSignInWithGoogle}
        isLoading={isLoading}
      />
    </div>
  );
}
