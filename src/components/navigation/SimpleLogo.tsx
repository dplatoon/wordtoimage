
import { Link } from 'react-router-dom';

export const SimpleLogo = () => {
  return (
    <Link 
      to="/" 
      aria-label="WordToImage - Homepage" 
      className="flex items-center h-12"
    >
      <div className="h-10 w-auto">
        <img 
          alt="WordToImage Logo" 
          src="/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png"
          className="h-full w-auto object-contain"
          width="120"
          height="40"
          loading="eager"
          decoding="sync"
        />
      </div>
    </Link>
  );
};
