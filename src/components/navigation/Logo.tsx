
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image as LucideImage } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export const Logo = () => {
  const [logoError, setLogoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload the logo image
  useEffect(() => {
    const img = new window.Image();
    img.src = '/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png';
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
      console.error('Failed to preload logo image');
      setLogoError(true);
    };
  }, []);
  
  const handleImageError = () => {
    console.error('Failed to load logo image');
    setLogoError(true);
  };
  
  return (
    <Link 
      to="/" 
      aria-label="WordToImage - Homepage" 
      className="flex items-center h-full"
    >
      {!isLoaded && !logoError ? (
        <Skeleton className="h-10 w-32 rounded-md" />
      ) : logoError ? (
        <div className="flex items-center">
          <LucideImage className="h-8 w-8 mr-2 text-indigo-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            WordtoImage
          </span>
        </div>
      ) : (
        <div className="h-10 sm:h-12 relative">
          <img 
            alt="WordToImage Logo" 
            src="/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png"
            onError={handleImageError}
            className="h-full w-auto object-contain"
            loading="eager"
            decoding="async"
          />
        </div>
      )}
    </Link>
  );
};
