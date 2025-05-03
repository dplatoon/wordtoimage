
import { useState } from 'react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { trackEvent, events } from '@/utils/analytics';
import { useAuth } from '@/contexts/AuthContext';
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

  async function onSubmit(values: AuthFormValues) {
    setIsLoading(true);
    setAuthError(null);

    try {
      if (mode === 'signup') {
        await signUp(values.email, values.password, values.username);
        // Don't navigate, let user see the success message
      } else {
        await signIn(values.email, values.password);
        // AuthContext will handle the navigation after successful login
      }
    } catch (error) {
      console.error("Auth error:", error);
      let errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      if (errorMessage.includes('User already registered')) {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (errorMessage.includes('Invalid login')) {
        errorMessage = 'Invalid email or password. Please try again.';
      }
      
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignInWithGoogle() {
    try {
      setAuthError(null);
      await signInWithGoogle();
      
      if (mode === 'signup') {
        trackEvent(events.SIGN_UP, { provider: 'google' });
      }
    } catch (error) {
      // Error is already handled in the AuthContext
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
