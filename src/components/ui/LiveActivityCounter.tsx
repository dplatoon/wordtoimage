import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Users, Zap, Eye } from 'lucide-react';

interface LiveActivityCounterProps {
  variant?: 'compact' | 'detailed';
  showAnimation?: boolean;
}

export const LiveActivityCounter = ({ 
  variant = 'compact', 
  showAnimation = true 
}: LiveActivityCounterProps) => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [generationsToday, setGenerationsToday] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Generate realistic but fake activity numbers
  useEffect(() => {
    const updateActivity = () => {
      // Simulate active users (15-45 concurrent)
      const baseUsers = 25;
      const variance = Math.random() * 20 - 10;
      setActiveUsers(Math.max(1, Math.round(baseUsers + variance)));

      // Simulate daily generations (growing throughout the day)
      const hour = new Date().getHours();
      const baseGenerations = 800 + (hour * 45); // Grows throughout day
      const dailyVariance = Math.random() * 200 - 100;
      setGenerationsToday(Math.max(1, Math.round(baseGenerations + dailyVariance)));
    };

    // Initial update
    updateActivity();

    // Update every 30 seconds to show "live" activity
    const interval = setInterval(updateActivity, 30000);

    // Show with a slight delay for better UX
    setTimeout(() => setIsVisible(true), 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4">
        <Badge 
          variant="secondary" 
          className={`bg-green-50 text-green-700 border-green-200 ${
            showAnimation ? 'animate-pulse' : ''
          }`}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          {activeUsers} creating now
        </Badge>
        
        <Badge variant="outline" className="text-gray-600">
          <Zap className="w-3 h-3 mr-1" />
          {generationsToday.toLocaleString()} today
        </Badge>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-gray-900">Live Activity</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{activeUsers}</span>
          </div>
          <span className="text-xs text-gray-600">Active Users</span>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">
              {generationsToday.toLocaleString()}
            </span>
          </div>
          <span className="text-xs text-gray-600">Images Today</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <Eye className="w-3 h-3" />
          Updates every 30 seconds
        </div>
      </div>
    </div>
  );
};