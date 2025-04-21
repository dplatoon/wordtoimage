
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useProgressiveSignup = (generateCount: number = 2) => {
  // Track unauthenticated generation count with localStorage persistence
  const [unauthGenCount, setUnauthGenCount] = useState(
    () => Number(localStorage.getItem("unauthGenCount")) || 0
  );
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();

  // Reset count when user logs in
  useEffect(() => {
    if (user) {
      localStorage.removeItem("unauthGenCount");
      setUnauthGenCount(0);
      setAuthModalOpen(false);
    }
  }, [user]);

  const incrementGenCount = () => {
    if (!user) {
      const newUnauthCount = unauthGenCount + 1;
      setUnauthGenCount(newUnauthCount);
      localStorage.setItem("unauthGenCount", String(newUnauthCount));
      
      // Show modal exactly on third attempt
      if (newUnauthCount === generateCount + 1) {
        setAuthModalOpen(true);
      }
      return newUnauthCount;
    }
    return 0;
  };

  const shouldShowAuthModal = !user && unauthGenCount > generateCount;
  
  return {
    unauthGenCount,
    authModalOpen,
    setAuthModalOpen,
    incrementGenCount,
    shouldShowAuthModal,
    isLimitReached: shouldShowAuthModal
  };
};
