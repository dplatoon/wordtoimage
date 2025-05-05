
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image as LucideImage } from 'lucide-react';

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
      className="flex items-center space-x-2" 
      aria-label="WordToImage - Homepage"
    >
      <div className="flex items-center h-12">
        {logoError ? (
          // Fallback text logo if image fails to load
          <div className="flex items-center">
            <LucideImage className="h-8 w-8 mr-2 text-blue-500" />
            <span className="text-xl font-bold text-[#0D2645]">
              WordtoImage
            </span>
          </div>
        ) : (
          <div className="h-12 w-auto relative min-w-[150px]">
            <img 
              alt="WordToImage Logo" 
              className="h-full w-auto object-contain" 
              src="/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png"
              onError={handleImageError}
              width="auto"
              height="48"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        )}
      </div>
    </Link>
  );
};
