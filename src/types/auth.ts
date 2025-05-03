
import { User, Session } from '@supabase/supabase-js';

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean; // Added this property
  isLoading: boolean;
  isConfigured: boolean;
  lastError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, username?: string) => Promise<void>;
  signOut: () => Promise<void>;
};
