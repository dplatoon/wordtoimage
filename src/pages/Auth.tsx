import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';
import { AuthLoadingState } from '@/components/auth/AuthLoadingState';
import { AuthConfigError } from '@/components/auth/AuthConfigError';
import { AuthBackground } from '@/components/auth/AuthBackground';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthCard } from '@/components/auth/AuthCard';

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
    return <AuthLoadingState />;
  }

  // Redirect if already logged in
  if (session) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!isConfigured) {
    return <AuthConfigError />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      <AuthBackground />

      <div className="relative z-10 container flex items-center justify-center min-h-screen py-12 px-4">
        <div className="w-full flex flex-col items-center space-y-2">
          <AuthHeader />
          <AuthCard 
            defaultTab={defaultTab}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
}
