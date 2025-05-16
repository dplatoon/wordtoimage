
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export const DesktopNavigation = () => {
  const { pathname } = useLocation();
  
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Examples', href: '/text-to-image' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <NavigationMenu className="px-0">
      <NavigationMenuList>
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          
          return (
            <NavigationMenuItem key={index}>
              <Link
                to={item.href}
                className={cn(
                  "py-2 px-4 transition-colors duration-300",
                  "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5",
                  "after:scale-x-0 after:bg-indigo-600 after:origin-bottom-right",
                  "after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
                  isActive 
                    ? "text-indigo-600 after:scale-x-100" 
                    : "text-gray-700 hover:text-indigo-600"
                )}
              >
                {item.label}
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
