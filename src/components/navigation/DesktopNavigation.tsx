
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu';

export const DesktopNavigation = () => {
  return (
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
  );
};
