import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { productItems, resourceItems, companyItems } from './navigationData';

interface NavDropdownProps {
  label: string;
  items: { title: string; href: string; description: string }[];
  featured?: {
    title: string;
    description: string;
    href: string;
  };
}

const NavDropdown = ({ label, items, featured }: NavDropdownProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="group inline-flex h-10 items-center justify-center gap-1 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 bg-transparent text-white hover:text-primary hover:bg-white/10 focus:bg-white/10 focus:text-primary focus:outline-none [text-shadow:0_0_10px_rgba(255,255,255,0.3)] hover:[text-shadow:0_0_15px_hsl(var(--primary)/0.6)]">
          {label}
          <ChevronDown className="h-3 w-3 transition-transform duration-200 text-white/80 group-hover:text-primary group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        align="start" 
        sideOffset={8}
        className="w-[500px] lg:w-[600px] p-0 border-primary/20 bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/10 rounded-2xl overflow-hidden"
      >
        <div className={`grid gap-3 p-6 ${featured ? 'lg:grid-cols-2' : 'md:grid-cols-2'}`}>
          {featured && (
            <div className="row-span-3">
              <Link
                className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-primary to-primary/80 p-6 no-underline outline-none focus:shadow-neon transition-all duration-300 hover:shadow-neon"
                to={featured.href}
              >
                <div className="mb-2 mt-4 text-lg font-medium text-primary-foreground">
                  {featured.title}
                </div>
                <p className="text-sm leading-tight text-primary-foreground/80">
                  {featured.description}
                </p>
              </Link>
            </div>
          )}
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/10 focus:bg-white/10"
            >
              <div className="text-sm font-medium leading-none text-white">{item.title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-white/60">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const SimpleDesktopNav = () => {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <NavDropdown 
        label="Product" 
        items={productItems}
        featured={{
          title: 'AI Image Platform',
          description: 'Complete suite of AI-powered image generation tools',
          href: '/product'
        }}
      />
      
      <NavDropdown 
        label="Resources" 
        items={resourceItems}
      />
      
      <NavDropdown 
        label="Company" 
        items={companyItems}
      />
      
      <Link
        to="/pricing"
        className="inline-flex h-10 items-center justify-center rounded-xl bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 text-white hover:text-primary hover:bg-white/10 focus:bg-white/10 focus:outline-none [text-shadow:0_0_10px_rgba(255,255,255,0.3)] hover:[text-shadow:0_0_15px_hsl(var(--primary)/0.6)]"
      >
        Pricing
      </Link>
    </div>
  );
};
