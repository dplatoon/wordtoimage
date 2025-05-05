
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';

export const Logo = () => {
  const [logoError, setLogoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Preload the logo image
  useEffect(() => {
    const img = new Image();
    img.src = '/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png';
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
            <Image className="h-6 w-6 mr-2 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WordToImage
            </span>
          </div>
        ) : (
          <img 
            alt="WordToImage Logo" 
            className="h-8 md:h-10 object-cover" 
            src="/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png"
            onError={handleImageError}
            width="160"
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
