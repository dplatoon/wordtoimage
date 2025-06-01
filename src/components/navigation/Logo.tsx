
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image as LucideImage } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export const Logo = ({ variant = 'default' }: { variant?: 'default' | 'footer' }) => {
  const [logoError, setLogoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use the same high-quality logo for both variants
  const logoSrc = '/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png';

  // Preload the logo image
  useEffect(() => {
    const img = new window.Image();
    img.src = logoSrc;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
      console.error('Failed to preload logo image');
      setLogoError(true);
    };
  }, [logoSrc]);
  
  const handleImageError = () => {
    console.error('Failed to load logo image');
    setLogoError(true);
  };
  
  const isFooter = variant === 'footer';
  
  // Define logo container classes based on variant
  const logoContainerClasses = cn(
    "relative transition-transform duration-300",
    isFooter ? "h-12 md:h-14" : "h-12 sm:h-14 md:h-16 hover:scale-105"
  );
  
  // Define logo filter classes based on variant - removed heavy filters for footer
  const logoImageClasses = cn(
    "h-full w-auto object-contain transition-all",
    isFooter 
      ? "brightness-110 drop-shadow-sm" 
      : "drop-shadow-sm"
  );
  
  // Define text logo classes based on variant
  const textLogoClasses = cn(
    "text-xl font-bold bg-clip-text text-transparent",
    isFooter 
      ? "bg-gradient-to-r from-white to-gray-200"
      : "bg-gradient-to-r from-indigo-600 to-purple-500"
  );
  
  return (
    <Link 
      to="/" 
      aria-label="WordToImage - Homepage" 
      className="flex items-center h-full"
    >
      {!isLoaded && !logoError ? (
        <Skeleton className={cn("rounded-md", isFooter ? "h-10 w-32" : "h-10 w-32")} />
      ) : logoError ? (
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <LucideImage className={cn("h-8 w-8 mr-2", isFooter ? "text-white" : "text-indigo-500")} />
          <span className={textLogoClasses}>
            WordToImage
          </span>
        </motion.div>
      ) : (
        <motion.div 
          className={logoContainerClasses}
          whileHover={!isFooter ? { scale: 1.05 } : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            alt="WordToImage Logo" 
            src={logoSrc}
            onError={handleImageError}
            className={logoImageClasses}
            loading="eager"
            decoding="async"
            style={isFooter ? {
              filter: 'brightness(1.1) contrast(1.1)',
              background: 'transparent'
            } : undefined}
          />
        </motion.div>
      )}
    </Link>
  );
};
