
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
      <div className="flex items-center h-10">
        {logoError ? (
          // Fallback text logo if image fails to load
          <div className="flex items-center">
            <LucideImage className="h-6 w-6 mr-2 text-blue-500" />
            <span className="text-xl font-bold text-[#0D2645]">
              WordtoImage
            </span>
          </div>
        ) : (
          <img 
            alt="WordToImage Logo" 
            className="h-8 md:h-10 object-contain" 
            src="/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png"
            onError={handleImageError}
            width="200"
            height="40"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        )}
      </div>
    </Link>
  );
};
