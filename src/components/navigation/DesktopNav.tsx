
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { productItems, resourceItems, companyItems } from './navigationData';

export const DesktopNav = () => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Product Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[500px] lg:w-[600px] lg:grid-cols-2">
                <div className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-primary to-primary/80 p-6 no-underline outline-none focus:shadow-neon transition-all duration-300 hover:shadow-neon"
                      to="/product"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium text-primary-foreground">
                        AI Image Platform
                      </div>
                      <p className="text-sm leading-tight text-primary-foreground/80">
                        Complete suite of AI-powered image generation tools
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
                {productItems.map((item) => (
                  <NavigationMenuLink key={item.title} asChild>
                    <Link
                      to={item.href}
                      className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary/10 focus:bg-primary/10"
                    >
                      <div className="text-sm font-medium leading-none text-foreground">{item.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Resources Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {resourceItems.map((item) => (
                  <NavigationMenuLink key={item.title} asChild>
                    <Link
                      to={item.href}
                      className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary/10 focus:bg-primary/10"
                    >
                      <div className="text-sm font-medium leading-none text-foreground">{item.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Company Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {companyItems.map((item) => (
                  <NavigationMenuLink key={item.title} asChild>
                    <Link
                      to={item.href}
                      className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary/10 focus:bg-primary/10"
                    >
                      <div className="text-sm font-medium leading-none text-foreground">{item.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Pricing Link */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/pricing"
                className="group inline-flex h-10 w-max items-center justify-center rounded-xl bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 text-foreground/80 hover:text-foreground hover:bg-primary/10 focus:bg-primary/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Pricing
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
