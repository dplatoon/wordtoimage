
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SimpleLogo } from './SimpleLogo';

export const StaticNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <SimpleLogo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-gray-900 font-medium">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
              Pricing
            </Link>
            <Link to="/templates" className="text-gray-600 hover:text-gray-900 font-medium">
              Templates
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium">
              About
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/text-to-image">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/features" className="text-gray-600 hover:text-gray-900 font-medium">
                Features
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
                Pricing
              </Link>
              <Link to="/templates" className="text-gray-600 hover:text-gray-900 font-medium">
                Templates
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium">
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="w-full">
                  <Link to="/text-to-image">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
