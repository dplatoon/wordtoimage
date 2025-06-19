
import React, { useState, useEffect } from 'react';
import { Users, Image, Zap } from 'lucide-react';

export const LiveActivityCounter = () => {
  const [imagesGenerated, setImagesGenerated] = useState(1247);
  const [activeUsers, setActiveUsers] = useState(89);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      // Randomly increment images generated
      if (Math.random() > 0.3) {
        setImagesGenerated(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
      
      // Fluctuate active users
      setActiveUsers(prev => {
        const change = Math.floor(Math.random() * 6) - 2; // -2 to +3
        return Math.max(75, Math.min(150, prev + change));
      });
    }, 8000 + Math.random() * 7000); // 8-15 second intervals

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 min-w-[280px]">
        <div className="space-y-3">
          {/* Images Generated Today */}
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Image className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                🔥 {imagesGenerated.toLocaleString()} images generated today!
              </div>
              <div className="text-gray-500 text-xs">Updated live</div>
            </div>
          </div>

          {/* Active Users */}
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center relative">
              <Users className="w-4 h-4 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {activeUsers} users creating now
              </div>
              <div className="text-gray-500 text-xs">Live activity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
