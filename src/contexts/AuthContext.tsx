
import { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent, events } from '@/utils/analytics';
import { toast } from '@/components/ui/sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error);
          toast.error("Authentication error", {
            description: "There was a problem with your authentication. Please try logging in again."
          });
        }
        setSession(session);
        setUser(session?.user || null);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user || null);
        
        if (event === 'SIGNED_IN') {
          const user = session?.user;
          if (user) {
            // Check if profile exists
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', user.id)
              .single();

            if (!profile) {
              // Create profile if it doesn't exist
              const { error: profileError } = await supabase
                .from('profiles')
                .insert([{ user_id: user.id, username: user.email }]);

              if (profileError) {
                console.error("Error creating profile:", profileError);
                toast.error("Profile creation failed", {
                  description: "There was a problem setting up your profile."
                });
              }
            }

            // Track signup event for new users
            if (new Date(user.created_at).getTime() > Date.now() - (5 * 60 * 1000)) {
              trackEvent(events.SIGN_UP, {
                method: user.app_metadata?.provider || 'email',
                isNewUser: true
              });
            }
          }
        }
      }
    );

    getInitialSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        console.error("Error signing in:", error);
        toast.error("Sign in failed", {
          description: error.message
        });
        throw error;
      } else {
        toast.success("Check your email", {
          description: "We've sent you a magic link to sign in."
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
        toast.error("Sign out failed", {
          description: error.message
        });
        throw error;
      }
      toast.success("Signed out successfully");
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    session,
    user,
    isLoading,
    isConfigured,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
