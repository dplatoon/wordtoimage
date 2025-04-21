
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useProgressiveSignup = (generateCount: number = 2) => {
  // Track unauthenticated generation count
  const [unauthGenCount, setUnauthGenCount] = useState(
    () => Number(localStorage.getItem("unauthGenCount")) || 0
  );
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();

  // Handle when a non-auth user generates images: hard gate after generateCount images
  useEffect(() => {
    if (!user && unauthGenCount >= generateCount) {
      setAuthModalOpen(true);
    }
  }, [unauthGenCount, user, generateCount]);

  const incrementGenCount = () => {
    if (!user) {
      const newUnauthCount = unauthGenCount + 1;
      setUnauthGenCount(newUnauthCount);
      localStorage.setItem("unauthGenCount", String(newUnauthCount));
      return newUnauthCount;
    }
    return 0;
  };

  const shouldShowAuthModal = !user && unauthGenCount >= generateCount;
  
  return {
    unauthGenCount,
    authModalOpen,
    setAuthModalOpen,
    incrementGenCount,
    shouldShowAuthModal
  };
};
