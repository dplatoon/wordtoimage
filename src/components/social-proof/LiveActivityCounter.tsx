
import React, { useState, useEffect } from 'react';
import { Users, Image, Zap } from 'lucide-react';

export const LiveActivityCounter = () => {
  // Multiple realistic count variations for hourly rotation
  const imageCountVariations = [987, 1367, 1435, 1597, 1985, 2143, 2589, 2756];
  const userCountVariations = [109, 170, 211, 290, 377, 412, 456, 523];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [imagesGenerated, setImagesGenerated] = useState(imageCountVariations[0]);
  const [activeUsers, setActiveUsers] = useState(userCountVariations[0]);

  useEffect(() => {
    // Major rotation every hour (3600000ms) to simulate hourly reports
    const hourlyRotation = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % imageCountVariations.length);
      setCurrentUserIndex(prev => (prev + 1) % userCountVariations.length);
      
      setImagesGenerated(imageCountVariations[(currentImageIndex + 1) % imageCountVariations.length]);
      setActiveUsers(userCountVariations[(currentUserIndex + 1) % userCountVariations.length]);
    }, 3600000); // 1 hour

    // Minor fluctuations every 8-15 seconds for realism
    const minorUpdates = setInterval(() => {
      // Small incremental changes between major rotations
      if (Math.random() > 0.3) {
        setImagesGenerated(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
      
      // Fluctuate active users slightly
      setActiveUsers(prev => {
        const baseCount = userCountVariations[currentUserIndex];
        const fluctuation = Math.floor(Math.random() * 20) - 10; // ±10 users
        return Math.max(baseCount - 30, Math.min(baseCount + 30, prev + fluctuation));
      });
    }, 8000 + Math.random() * 7000); // 8-15 second intervals

    return () => {
      clearInterval(hourlyRotation);
      clearInterval(minorUpdates);
    };
  }, [currentImageIndex, currentUserIndex, imageCountVariations, userCountVariations]);

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
              <div className="text-gray-500 text-xs">Live hourly reports</div>
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
              <div className="text-gray-500 text-xs">Live activity updates</div>
            </div>
          </div>

          {/* Next update indicator */}
          <div className="text-center pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              Next report in {Math.floor(Math.random() * 45) + 15}min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
