
import { User, Session, SupabaseClient } from '@supabase/supabase-js';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  loading: boolean; // Alias for isLoading for backward compatibility
  isConfigured: boolean;
  lastError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, username?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface UserMetadata {
  username?: string;
  full_name?: string;
  avatar_url?: string;
}

export interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  lastError: string | null;
}
