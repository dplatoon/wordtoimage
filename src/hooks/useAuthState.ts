
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function useAuthState() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        // Clear any previous errors when auth state successfully changes
        if (currentSession) setLastError(null);
      }
    );

    // Then get the initial session
    supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
      if (error) {
        console.error("Error fetching initial session:", error);
        setLastError(error.message);
        toast.error("Authentication error", {
          description: "There was a problem with your authentication. Please try logging in again."
        });
      }
      
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setIsLoading(false);
    });

    // Set up a refresh interval for the session
    const refreshInterval = setInterval(() => {
      if (session) {
        supabase.auth.refreshSession().catch(err => {
          console.warn("Failed to refresh session:", err);
        });
      }
    }, 10 * 60 * 1000); // Refresh every 10 minutes

    return () => {
      subscription.unsubscribe();
      clearInterval(refreshInterval);
    };
  }, []);

  return {
    session,
    user,
    isLoading,
    isConfigured,
    lastError
  };
}
