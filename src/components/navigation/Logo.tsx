
import { Image } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Image className="h-6 w-6 text-blue-600" />
      <span className="font-poppins font-semibold text-xl text-gray-800">
        WordToImage
      </span>
    </Link>
  );
};
