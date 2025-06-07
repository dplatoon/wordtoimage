
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'footer';
  className?: string;
}

export const Logo = ({ variant = 'default', className = '' }: LogoProps) => {
  const isFooter = variant === 'footer';
  
  return (
    <Link 
      to="/" 
      className={`flex items-center space-x-2 group touch-target ${className}`}
      aria-label="WordToImage Home"
    >
      <div className={`bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg ${
        isFooter ? 'w-10 h-10' : 'w-8 h-8'
      }`}>
        <Sparkles className={`text-white drop-shadow-sm ${isFooter ? 'h-5 w-5' : 'h-4 w-4'}`} />
      </div>
      <span className={`font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 ${
        isFooter ? 'text-2xl' : 'text-xl'
      }`}>
        WordToImage
      </span>
    </Link>
  );
};
