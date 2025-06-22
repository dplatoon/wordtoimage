
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { EnhancedAlert } from '@/components/common/EnhancedAlert';
import { PrimaryButton } from '@/components/ui/primary-button';
import { SecondaryButton } from '@/components/ui/secondary-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

export const EnhancedAuthFlow = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertState, setAlertState] = useState<{
    show: boolean;
    status: 'success' | 'error' | 'info';
    message: string;
  }>({ show: false, status: 'info', message: '' });

  const { signIn, signUp, signInWithGoogle } = useAuth();

  const showAlert = (status: 'success' | 'error' | 'info', message: string) => {
    setAlertState({ show: true, status, message });
    setTimeout(() => setAlertState(prev => ({ ...prev, show: false })), 5000);
  };

  const validateForm = (isSignUp: boolean) => {
    if (!email || !password) {
      showAlert('error', 'Please fill in all required fields');
      return false;
    }
    
    if (isSignUp && password !== confirmPassword) {
      showAlert('error', 'Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      showAlert('error', 'Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(false)) return;

    setIsLoading(true);
    try {
      await signIn?.(email, password);
      showAlert('success', 'Successfully signed in! Welcome back.');
    } catch (error) {
      showAlert('error', error instanceof Error ? error.message : 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(true)) return;

    setIsLoading(true);
    try {
      await signUp?.(email, password);
      showAlert('success', 'Account created! Please check your email for confirmation.');
    } catch (error) {
      showAlert('error', error instanceof Error ? error.message : 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle?.();
      showAlert('info', 'Redirecting to Google for authentication...');
    } catch (error) {
      showAlert('error', error instanceof Error ? error.message : 'Google sign in failed');
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Welcome to WordToImage
        </CardTitle>
        <CardDescription className="text-center">
          Create stunning AI images from text prompts
        </CardDescription>
      </CardHeader>

      <CardContent>
        {alertState.show && (
          <div className="mb-4">
            <EnhancedAlert
              status={alertState.status}
              dismissible
              onDismiss={() => setAlertState(prev => ({ ...prev, show: false }))}
            >
              {alertState.message}
            </EnhancedAlert>
          </div>
        )}

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
              <PrimaryButton
                type="submit"
                className="w-full"
                disabled={isLoading}
                isLoading={isLoading}
                loadingText="Signing in..."
              >
                Sign In
              </PrimaryButton>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                />
              </div>
              <PrimaryButton
                type="submit"
                className="w-full"
                disabled={isLoading}
                isLoading={isLoading}
                loadingText="Creating account..."
              >
                Sign Up
              </PrimaryButton>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <SecondaryButton
          onClick={handleGoogleSignIn}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Sign in with Google
        </SecondaryButton>
      </CardContent>
    </Card>
  );
};
