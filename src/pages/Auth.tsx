
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';
import { announceToScreenReader, manageFocus } from '@/utils/accessibility';
import { AuthLoadingState } from '@/components/auth/AuthLoadingState';
import { AuthConfigError } from '@/components/auth/AuthConfigError';
import { AuthBackground } from '@/components/auth/AuthBackground';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthCard } from '@/components/auth/AuthCard';
import { SessionTimeoutWarning } from '@/components/auth/SessionTimeoutWarning';

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

  // Performance optimization - preload critical resources
  useEffect(() => {
    // Preload dashboard route for faster navigation after auth
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = '/dashboard';
        document.head.appendChild(link);
      });
    }
  }, []);

  // Accessibility - announce page purpose to screen readers
  useEffect(() => {
    const pageTitle = defaultTab === 'signup' ? 'Create Account' : 'Sign In';
    document.title = `${pageTitle} - WordToImage`;
    
    // Announce page change to screen readers
    announceToScreenReader(
      `${pageTitle} page loaded. ${defaultTab === 'signup' ? 'Complete the form to create your free account.' : 'Enter your credentials to sign in.'}`
    );
  }, [defaultTab]);

  // Focus management on route change
  useEffect(() => {
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
      manageFocus(mainHeading as HTMLElement, { preventScroll: true });
    }
  }, []);

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
            announceToScreenReader('Authentication successful. Redirecting to dashboard.', 'assertive');
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
            announceToScreenReader('Authentication failed. Please try again.', 'assertive');
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
          announceToScreenReader('Authentication error occurred. Please try again.', 'assertive');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    handleAuthCallback();
  }, [navigate, redirectTo]);

  const handleSessionExtension = () => {
    // Refresh the session to extend timeout
    supabase.auth.refreshSession();
    announceToScreenReader('Session extended successfully.', 'polite');
  };

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

      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:font-medium"
      >
        Skip to main content
      </a>

      <div className="relative z-10 container flex items-center justify-center min-h-screen py-12 px-4">
        <main id="main-content" className="w-full flex flex-col items-center space-y-2">
          <AuthHeader />
          <AuthCard 
            defaultTab={defaultTab}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </main>
      </div>

      {/* Session timeout warning for authenticated users */}
      {session && (
        <SessionTimeoutWarning 
          onExtendSession={handleSessionExtension}
          timeoutMinutes={30}
          warningMinutes={5}
        />
      )}
    </div>
  );
}
