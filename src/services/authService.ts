
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export async function setupUserProfile(userId: string, email: string | undefined) {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!profile) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: userId, email, username: email }]);

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
    // Get the current origin for proper redirect handling
    const origin = window.location.origin;
    // Use the auth page instead of a non-existent callback route
    const redirectTo = `${origin}/auth`;
    
    console.log("Redirect URL for Google auth:", redirectTo);
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        // Skip URL validation to allow any domain during development/production
        skipBrowserRedirect: false,
      }
    });
    
    if (error) {
      // Provide more specific error messages based on common issues
      let errorMessage = error.message;
      if (error.message.includes('invalid_request')) {
        errorMessage = 'Google authentication setup issue. Please contact support if this persists.';
      } else if (error.message.includes('access_denied')) {
        errorMessage = 'Google sign-in was cancelled. Please try again to continue.';
      }
      throw new Error(errorMessage);
    }
    
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
        // Use the same /auth route for email confirmations
        emailRedirectTo: `${window.location.origin}/auth`
      },
    });
    
    if (error) {
      // Provide more helpful error messages for common signup issues
      let errorMessage = error.message;
      if (error.message.includes('User already registered')) {
        errorMessage = 'This email is already registered. Try signing in instead, or use the password reset option if you forgot your password.';
      } else if (error.message.includes('Password should be at least')) {
        errorMessage = 'Password must be at least 6 characters long and contain a mix of letters and numbers.';
      } else if (error.message.includes('Invalid email')) {
        errorMessage = 'Please enter a valid email address.';
      }
      throw new Error(errorMessage);
    }
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

export async function resetPassword(email: string): Promise<void> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?tab=reset-password`
    });
    
    if (error) {
      throw error;
    }
    
    toast.success("Password reset email sent", {
      description: "Please check your email for password reset instructions."
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    toast.error("Password reset failed", {
      description: error instanceof Error ? error.message : "Please try again"
    });
    throw error;
  }
}
