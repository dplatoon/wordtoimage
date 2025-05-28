
import { useState, useEffect } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, Palette, Sparkles, Zap, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/navigation/Logo';

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
            toast.success('Successfully authenticated! Welcome to WordToImage.');
            trackEvent('auth_success', { method: 'oauth' });
            navigate(redirectTo, { replace: true });
          } else if (error) {
            console.error("Auth callback error:", error);
            trackEvent('auth_error', { 
              error: error.message,
              method: 'oauth'
            });
            toast.error("Authentication error", {
              description: "There was an issue completing your sign-in. Please try again."
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
            description: "Something went wrong during sign-in. Please try again."
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Getting things ready...</p>
        </div>
      </div>
    );
  }

  // Redirect if already logged in
  if (session) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Service configuration issue. Please contact support if this problem persists.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-100 to-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full opacity-30 blur-3xl"></div>
        <Sparkles className="absolute top-20 right-20 h-6 w-6 text-violet-300 opacity-40" />
        <Palette className="absolute bottom-32 left-20 h-8 w-8 text-blue-300 opacity-30" />
      </div>

      <div className="relative z-10 container flex items-center justify-center min-h-screen py-8 px-4">
        <div className="w-full max-w-md">
          {/* Header with logo and back button */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Button>
            </Link>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-2 pb-6 text-center">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                {defaultTab === 'signup' ? 'Create Your Free Account' : 'Welcome Back to WordToImage'}
              </CardTitle>
              <p className="text-slate-600 text-base leading-relaxed">
                {defaultTab === 'signup' 
                  ? 'Start creating amazing AI-generated images in seconds' 
                  : 'Sign in to continue your creative journey'
                }
              </p>
              
              {/* Benefits for signup */}
              {defaultTab === 'signup' && (
                <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <span>Instant access</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-green-500" />
                    <span>Join 50,000+ creators</span>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-slate-100">
                  <TabsTrigger 
                    value="signin" 
                    disabled={isLoading}
                    className="h-10 font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    disabled={isLoading}
                    className="h-10 font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                  >
                    Create Account
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="signin" className="space-y-6 mt-0">
                  <AuthForm mode="signin" isLoading={isLoading} setIsLoading={setIsLoading} />
                </TabsContent>
                <TabsContent value="signup" className="space-y-6 mt-0">
                  <AuthForm mode="signup" isLoading={isLoading} setIsLoading={setIsLoading} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Trust indicators */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400 flex items-center justify-center space-x-2">
              <Sparkles className="h-3 w-3" />
              <span>Trusted by creators worldwide</span>
              <Sparkles className="h-3 w-3" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
