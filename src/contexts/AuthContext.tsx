
import React, { createContext, useContext, useEffect } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import * as authService from '@/services/authService';
import { AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, user, isLoading, isConfigured, lastError } = useAuthState();

  // Handle profile creation and updates
  useEffect(() => {
    if (user) {
      authService.setupUserProfile(user.id, user.email);
    }
  }, [user]);

  const value: AuthContextType = {
    session,
    user,
    loading: isLoading, // Added this property for backward compatibility
    isLoading,
    isConfigured,
    lastError,
    signIn: async (email: string, password: string) => {
      await authService.signIn(email, password);
    },
    signInWithGoogle: async () => {
      await authService.signInWithGoogle();
    },
    signUp: async (email: string, password: string, username?: string) => {
      await authService.signUp(email, password, username);
    },
    signOut: async () => {
      await authService.signOut();
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
