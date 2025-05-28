
import { useState, useEffect } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';
import { Button } from '@/components/ui/button';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const { session, isConfigured, user, isLoading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the tab from URL parameters (if any)
  const params = new URLSearchParams(location.search);
  const tabParam = params.get('tab');
  const defaultTab = tabParam === 'signup' ? 'signup' : 'signin';
  
  // Get the redirect URL if any
  const redirectTo = params.get('redirectTo') || '/dashboard';

  // Check for auth hash in URL (from OAuth redirects)
  useEffect(() => {
    const handleAuthCallback = async () => {
      if (window.location.hash.includes('access_token') || 
          window.location.search.includes('code=')) {
        setIsLoading(true);
        console.log("Auth callback detected in URL", { 
          hash: window.location.hash,
          search: window.location.search
        });
        
        try {
          // This will handle the OAuth callback
          const { data, error } = await supabase.auth.getSession();
          
          console.log("Auth callback result:", { data, error });
          
          if (data.session && !error) {
            toast.success('Successfully authenticated');
            trackEvent('auth_success', { method: 'oauth' });
            navigate(redirectTo, { replace: true });
          } else if (error) {
            console.error("Auth callback error:", error);
            trackEvent('auth_error', { 
              error: error.message,
              method: 'oauth'
            });
            toast.error("Authentication error", {
              description: error.message
            });
          }
        } catch (err) {
          console.error("Error processing auth callback:", err);
          const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
          trackEvent('auth_error', { 
            error: errorMessage,
            method: 'oauth'
          });
          toast.error("Authentication error", {
            description: errorMessage
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    handleAuthCallback();
  }, [navigate, redirectTo]);

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-8">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect if already logged in
  if (session) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!isConfigured) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-8">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Supabase configuration is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container flex items-center justify-center min-h-screen py-8">
        <div className="w-full max-w-md">
          {/* Back to home button */}
          <div className="mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Button>
            </Link>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-center text-slate-900">
                {defaultTab === 'signup' ? 'Create your account' : 'Welcome back'}
              </CardTitle>
              <p className="text-center text-slate-600">
                {defaultTab === 'signup' 
                  ? 'Start creating amazing images with AI' 
                  : 'Sign in to your account to continue'
                }
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin" disabled={isLoading}>
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" disabled={isLoading}>
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="signin" className="space-y-4">
                  <AuthForm mode="signin" isLoading={isLoading} setIsLoading={setIsLoading} />
                </TabsContent>
                <TabsContent value="signup" className="space-y-4">
                  <AuthForm mode="signup" isLoading={isLoading} setIsLoading={setIsLoading} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Terms and Privacy notice */}
          <p className="mt-6 text-xs text-center text-slate-500">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-slate-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline hover:text-slate-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
