
import { useState, useEffect } from 'react';
import { Image as LucideImage } from 'lucide-react';

export const MobileLogo = () => {
  const [logoError, setLogoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const logoSrc = '/lovable-uploads/cd042a6d-b714-4ea7-928f-a2e5b6bbb855.png';

  useEffect(() => {
    console.log('📱 MobileLogo: Initializing mobile logo');
    
    // Force reload on mobile
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = `${logoSrc}?v=${Date.now()}`; // Cache busting for mobile
    
    img.onload = () => {
      console.log('✅ MobileLogo: Mobile logo loaded successfully');
      setIsLoaded(true);
      setLogoError(false);
    };
    
    img.onerror = () => {
      console.error('❌ MobileLogo: Mobile logo failed to load');
      setLogoError(true);
    };
  }, [logoSrc]);

  if (logoError) {
    return (
      <div className="flex items-center">
        <LucideImage className="h-6 w-6 text-white mr-2" />
        <span className="text-lg font-bold text-white">WordToImage</span>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center">
        <div className="h-8 w-8 bg-slate-600 rounded animate-pulse mr-2"></div>
        <span className="text-lg font-bold text-white">WordToImage</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <img 
        alt="WordToImage Logo" 
        src={logoSrc}
        className="h-8 w-auto brightness-110 object-contain"
        loading="eager"
        decoding="async"
        style={{
          filter: 'brightness(1.1) contrast(1.1)',
          imageRendering: 'crisp-edges'
        }}
      />
    </div>
  );
};
