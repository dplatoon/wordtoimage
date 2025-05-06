
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export async function setupUserProfile(userId: string, email: string | undefined) {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!profile) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ user_id: userId, username: email }]);

      if (profileError) {
        console.error("Error creating profile:", profileError);
        toast.error("Profile creation failed", {
          description: "There was a problem setting up your profile."
        });
      }
    }
  } catch (error) {
    console.error("Error in profile setup:", error);
    // Don't show toast here as this is a background operation
  }
}

export async function signIn(email: string, password: string): Promise<void> {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      throw error;
    } else {
      toast.success("Signed in successfully");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    toast.error("Sign in failed", {
      description: error instanceof Error ? error.message : "Please check your credentials and try again"
    });
    throw error;
  }
}

export async function signInWithGoogle(): Promise<void> {
  try {
    // Use the exact redirect URL that's configured in Google Cloud Console
    // This should match what you've set in your Supabase redirect URLs
    const redirectTo = `${window.location.origin}/auth/callback`;
    
    console.log("Redirect URL for Google auth:", redirectTo);
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });
    
    if (error) throw error;
    
    console.log("Google auth initiated successfully", data);
  } catch (error) {
    console.error('Google auth error:', error);
    toast.error('Authentication failed', {
      description: error instanceof Error ? error.message : 'Failed to sign in with Google'
    });
    throw error;
  }
}

export async function signUp(email: string, password: string, username?: string): Promise<void> {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      },
    });
    
    if (error) throw error;
    toast.success("Account created! Please check your email for confirmation.");
  } catch (error) {
    console.error("Error signing up:", error);
    toast.error("Sign up failed", {
      description: error instanceof Error ? error.message : "Please try again"
    });
    throw error;
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    toast.success("Signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    toast.error("Sign out failed", {
      description: error instanceof Error ? error.message : "Please try again"
    });
    throw error;
  }
}
