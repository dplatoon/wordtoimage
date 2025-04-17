
import { Heart } from 'lucide-react';
import { Button } from './ui/button';

export const Nav = () => {
  return (
    <nav className="flex justify-between items-center max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-2">
        <Heart className="h-6 w-6 text-lovable-rose animate-heart-beat" fill="#FF719A" />
        <span className="font-poppins font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-lovable-rose to-lovable-pink">
          Lovable
        </span>
      </div>
      <div className="hidden md:flex items-center space-x-6 font-poppins">
        <a href="#features" className="text-gray-700 hover:text-lovable-rose transition-colors duration-300">Features</a>
        <a href="#testimonials" className="text-gray-700 hover:text-lovable-rose transition-colors duration-300">Testimonials</a>
        <a href="#pricing" className="text-gray-700 hover:text-lovable-rose transition-colors duration-300">Pricing</a>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" className="rounded-full hover:bg-lovable-softgray">Sign In</Button>
        <Button className="rounded-full bg-gradient-to-r from-lovable-rose to-lovable-pink hover:shadow-lg hover:shadow-lovable-pink/30">
          Get Started
        </Button>
      </div>
    </nav>
  );
};
