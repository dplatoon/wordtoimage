
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image as LucideImage } from 'lucide-react';

export const Logo = () => {
  const [logoError, setLogoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Preload the logo image
  useEffect(() => {
    const img = new window.Image(); // Use window.Image to access the browser's built-in Image constructor
    img.src = '/lovable-uploads/5cc3bb2f-158e-4a9d-8ff5-0efe1c96ab93.png';
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
            <LucideImage className="h-6 w-6 mr-2 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WordToImage
            </span>
          </div>
        ) : (
          <img 
            alt="WordToImage Logo" 
            className="h-8 md:h-10 object-contain" 
            src="/lovable-uploads/5cc3bb2f-158e-4a9d-8ff5-0efe1c96ab93.png"
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
