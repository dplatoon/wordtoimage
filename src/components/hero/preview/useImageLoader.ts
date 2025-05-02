
import { useState, useEffect } from 'react';
import { trackEvent, events } from '@/utils/analytics';

export const useImageLoader = (imageUrl: string, isGenerating: boolean) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading progress with enhanced animation
  useEffect(() => {
    if (isGenerating) {
      setImageLoaded(false);
      setImageError(false);
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          // More dynamic and realistic progress simulation
          const increment = Math.random() * (prev < 50 ? 8 : (prev < 80 ? 5 : 2));
          const nextProgress = prev + increment;
          return nextProgress >= 95 ? 95 : nextProgress;
        });
      }, 200); // Slightly lower frequency for better performance
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  // Complete progress when image is ready
  useEffect(() => {
    if (imageUrl && !isGenerating) {
      setLoadingProgress(100);
    }
  }, [imageUrl, isGenerating]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    setTimeout(() => trackEvent(events.IMAGE_LOADED, {}), 100);
  };

  const handleImageError = () => {
    console.error('Failed to load image:', imageUrl);
    setImageError(true);
    setImageLoaded(false);
  };

  return { 
    imageLoaded, 
    imageError, 
    loadingProgress, 
    handleImageLoad, 
    handleImageError,
    setLoadingProgress
  };
};
