import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export const LiveCounter = () => {
  const [userCount, setUserCount] = useState(137);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate realistic user count fluctuations
    const interval = setInterval(() => {
      setUserCount(prev => {
        const change = Math.floor(Math.random() * 6) - 2; // -2 to +3
        const newCount = Math.max(85, Math.min(250, prev + change));
        return newCount;
      });
    }, 3000 + Math.random() * 5000); // Random interval between 3-8 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Hide/show animation every few minutes
    const visibilityInterval = setInterval(() => {
      setIsVisible(prev => !prev);
      setTimeout(() => setIsVisible(true), 5000); // Show again after 5 seconds
    }, 120000); // Every 2 minutes

    return () => clearInterval(visibilityInterval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-fade-in">
      <div className="bg-card/80 backdrop-blur-xl border border-primary/20 rounded-full px-4 py-2 shadow-glass">
        <div className="flex items-center gap-2 text-sm">
          <div className="relative">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
          </div>
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">
            {userCount} users generating now
          </span>
        </div>
      </div>
    </div>
  );
};
