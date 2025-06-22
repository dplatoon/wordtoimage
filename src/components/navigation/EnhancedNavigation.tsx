
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Gallery, FileImage, BookOpen, Lightbulb, Users, Wand2 } from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  tooltip: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavItem[] = [
  {
    to: '/text-to-image',
    label: 'Generate',
    tooltip: 'Create AI images from text prompts',
    icon: Wand2
  },
  {
    to: '/style-gallery',
    label: 'Gallery',
    tooltip: 'Browse AI-generated art examples and styles',
    icon: Gallery
  },
  {
    to: '/templates',
    label: 'Templates',
    tooltip: 'Professional templates for social media and marketing',
    icon: FileImage
  },
  {
    to: '/blog',
    label: 'Blog',
    tooltip: 'Latest AI art tips, tutorials, and news',
    icon: BookOpen
  },
  {
    to: '/tutorials',
    label: 'Guide',
    tooltip: 'Step-by-step tutorials and prompting techniques',
    icon: Lightbulb
  },
  {
    to: '/community',
    label: 'Community',
    tooltip: 'Connect with other AI artists and creators',
    icon: Users
  }
];

export const EnhancedNavigation = () => {
  const location = useLocation();

  return (
    <TooltipProvider delayDuration={300}>
      <nav className="flex items-center space-x-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.to;
          const IconComponent = item.icon;
          
          return (
            <Tooltip key={item.to}>
              <TooltipTrigger asChild>
                <Link
                  to={item.to}
                  className={cn(
                    'nav-item-enhanced flex items-center space-x-2',
                    isActive && 'nav-item-active'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <IconComponent className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-gray-900 text-white border-gray-700">
                <p className="text-sm">{item.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </TooltipProvider>
  );
};
