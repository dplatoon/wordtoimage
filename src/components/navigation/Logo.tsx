
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image as LucideImage } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export const Logo = ({ variant = 'default' }: { variant?: 'default' | 'footer' }) => {
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
  
  const isFooter = variant === 'footer';
  
  // Define logo container classes based on variant
  const logoContainerClasses = cn(
    "relative transition-transform duration-300",
    isFooter ? "h-16 md:h-18" : "h-12 sm:h-14 md:h-16 hover:scale-105"
  );
  
  // Define logo filter classes based on variant
  const logoImageClasses = cn(
    "h-full w-auto object-contain transition-all",
    isFooter ? "brightness-200 contrast-125 filter" : "drop-shadow-sm"
  );
  
  // Define text logo classes based on variant
  const textLogoClasses = cn(
    "text-xl font-bold bg-clip-text text-transparent",
    isFooter 
      ? "bg-gradient-to-r from-white to-indigo-200"
      : "bg-gradient-to-r from-indigo-600 to-purple-500"
  );
  
  return (
    <Link 
      to="/" 
      aria-label="WordToImage - Homepage" 
      className="flex items-center h-full"
    >
      {!isLoaded && !logoError ? (
        <Skeleton className={cn("rounded-md", isFooter ? "h-12 w-40" : "h-10 w-32")} />
      ) : logoError ? (
        <div className="flex items-center animate-fade-in">
          <LucideImage className={cn("h-8 w-8 mr-2", isFooter ? "text-white" : "text-indigo-500")} />
          <span className={textLogoClasses}>
            WordtoImage
          </span>
        </div>
      ) : (
        <div className={logoContainerClasses}>
          <img 
            alt="WordToImage Logo" 
            src="/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png"
            onError={handleImageError}
            className={logoImageClasses}
            loading="eager"
            decoding="async"
          />
          {isFooter && (
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-20 mix-blend-overlay" />
          )}
        </div>
      )}
    </Link>
  );
};
