
import { Heart, Image, Menu, Users, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from './ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <Image className="h-6 w-6 text-blue-600" />
            <span className="font-poppins font-semibold text-xl text-gray-800">
              WordToImage
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 font-poppins">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Product</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#templates" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Templates</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#features" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Features</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#pricing" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Pricing</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/updates" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Updates</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/beta" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Beta Program</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/blog" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Blog</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/design-tips" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Design Tips</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/tutorials" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Tutorials</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/help" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Help Center</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/api" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">API</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/about" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">About</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/careers" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Careers</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/contact" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Contact</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/community" className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                  <Users className="mr-1 h-4 w-4" />
                  Community
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
            <div className="py-2">
              <p className="px-3 text-sm font-semibold text-gray-500">Product</p>
              <a href="#templates" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Templates</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Pricing</a>
              <Link to="/updates" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Updates</Link>
              <Link to="/beta" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Beta Program</Link>
            </div>
            
            <div className="py-2">
              <p className="px-3 text-sm font-semibold text-gray-500">Resources</p>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Blog</Link>
              <Link to="/design-tips" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Design Tips</Link>
              <Link to="/tutorials" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Tutorials</Link>
              <Link to="/help" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Help Center</Link>
              <Link to="/api" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">API</Link>
            </div>
            
            <div className="py-2">
              <p className="px-3 text-sm font-semibold text-gray-500">Company</p>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">About</Link>
              <Link to="/careers" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Careers</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Contact</Link>
            </div>

            <div className="py-2">
              <Link to="/community" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Community
              </Link>
            </div>

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
