
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image as LucideImage } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export const Logo = ({ variant = 'default' }: { variant?: 'default' | 'footer' }) => {
  const [logoError, setLogoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use the high-quality logo with mobile-specific handling
  const logoSrc = '/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png';

  // Preload the logo image with enhanced mobile support
  useEffect(() => {
    console.log('🔍 Logo: Starting preload process', { logoSrc, isMobile, variant });
    
    const img = new window.Image();
    img.crossOrigin = 'anonymous'; // Handle CORS issues
    img.src = logoSrc;
    
    img.onload = () => {
      console.log('✅ Logo: Image loaded successfully', { logoSrc, isMobile });
      setIsLoaded(true);
      setLogoError(false);
    };
    
    img.onerror = (error) => {
      console.error('❌ Logo: Failed to preload logo image', { logoSrc, error, isMobile });
      setLogoError(true);
      setIsLoaded(false);
    };
    
    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [logoSrc, isMobile]);
  
  const handleImageError = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('❌ Logo: Image element failed to load', { logoSrc, error, isMobile });
    setLogoError(true);
  };
  
  const handleImageLoad = () => {
    console.log('✅ Logo: Image element loaded successfully', { logoSrc, isMobile });
    setIsLoaded(true);
    setLogoError(false);
  };
  
  const isFooter = variant === 'footer';
  
  // Define logo container classes based on variant
  const logoContainerClasses = cn(
    "relative transition-transform duration-300",
    isFooter ? "h-12 md:h-14" : "h-8 sm:h-10 md:h-12 hover:scale-105"
  );
  
  // Define logo image classes with mobile optimizations
  const logoImageClasses = cn(
    "h-full w-auto object-contain transition-all",
    isFooter 
      ? "brightness-110 drop-shadow-sm" 
      : "brightness-110 drop-shadow-sm",
    // Mobile-specific optimizations
    isMobile && "max-w-[120px]"
  );
  
  // Define text logo classes based on variant
  const textLogoClasses = cn(
    "text-lg sm:text-xl font-bold bg-clip-text text-transparent",
    isFooter 
      ? "bg-gradient-to-r from-white to-gray-200"
      : "bg-gradient-to-r from-white to-gray-200"
  );
  
  return (
    <Link 
      to="/" 
      aria-label="WordToImage - Homepage" 
      className="flex items-center h-full focus:outline-none focus:ring-4 focus:ring-blue-400/50 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-white/10"
    >
      {!isLoaded && !logoError ? (
        <Skeleton className={cn("rounded-md", isFooter ? "h-10 w-32" : "h-8 w-28")} />
      ) : logoError ? (
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <LucideImage className={cn("h-6 w-6 mr-2", isFooter ? "text-white" : "text-white")} />
          <span className={textLogoClasses}>
            WordToImage
          </span>
        </motion.div>
      ) : (
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={logoContainerClasses}>
            <img 
              alt="WordToImage Logo" 
              src={logoSrc}
              onError={handleImageError}
              onLoad={handleImageLoad}
              className={logoImageClasses}
              loading="eager"
              decoding="async"
              // Add mobile-specific attributes
              style={{
                filter: 'brightness(1.1) contrast(1.1)',
                background: 'transparent',
                // Force image rendering on mobile
                imageRendering: isMobile ? 'crisp-edges' : 'auto'
              }}
            />
          </div>
          <span className={cn(
            "ml-2 font-bold text-white tracking-tight",
            isFooter ? "text-lg" : "text-lg sm:text-xl hidden sm:block"
          )}>
            WordToImage
          </span>
        </motion.div>
      )}
    </Link>
  );
};
