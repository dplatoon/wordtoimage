
import { Heart, Image, Menu, X } from 'lucide-react';
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
                        <a href="/updates" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Updates</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="/beta" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Beta Program</div>
                        </a>
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
                        <a href="/blog" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Blog</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="/design-tips" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Design Tips</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="/tutorials" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Tutorials</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="/help" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Help Center</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="/api" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">API</div>
                        </a>
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
                        <a href="/about" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">About</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="/careers" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Careers</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="/contact" className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100">
                          <div className="font-medium">Contact</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
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
              <a href="/updates" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Updates</a>
              <a href="/beta" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Beta Program</a>
            </div>
            
            <div className="py-2">
              <p className="px-3 text-sm font-semibold text-gray-500">Resources</p>
              <a href="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Blog</a>
              <a href="/design-tips" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Design Tips</a>
              <a href="/tutorials" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Tutorials</a>
              <a href="/help" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Help Center</a>
              <a href="/api" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">API</a>
            </div>
            
            <div className="py-2">
              <p className="px-3 text-sm font-semibold text-gray-500">Company</p>
              <a href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">About</a>
              <a href="/careers" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Careers</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Contact</a>
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
