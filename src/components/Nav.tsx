
import { Heart, Image, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image className="h-6 w-6 text-blue-600" />
          <span className="font-poppins font-semibold text-xl text-gray-800">
            WordToImage
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 font-poppins">
          <a href="#templates" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Templates</a>
          <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Features</a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Pricing</a>
          <a href="#blog" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Blog</a>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="rounded-md hover:bg-gray-100">Sign In</Button>
          <Button className="rounded-md bg-blue-600 hover:bg-blue-700 hover:shadow-md">
            Get Started
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-3">
          <div className="flex flex-col space-y-3 px-2">
            <a href="#templates" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">Templates</a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">Pricing</a>
            <a href="#blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">Blog</a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="rounded-md w-full">Sign In</Button>
              <Button className="rounded-md bg-blue-600 w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
