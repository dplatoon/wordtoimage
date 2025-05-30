
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Book, Lightbulb, Play, HelpCircle, Code, Briefcase, Users, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ResourcesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const resourceItems = [
    { 
      label: 'Blog', 
      href: '/blog', 
      icon: Book,
      description: 'Latest AI art insights'
    },
    { 
      label: 'Tutorials', 
      href: '/tutorials', 
      icon: Play,
      description: 'Step-by-step guides'
    },
    { 
      label: 'Design Tips', 
      href: '/design-tips', 
      icon: Lightbulb,
      description: 'Professional design advice'
    },
    { 
      label: 'Help Center', 
      href: '/help', 
      icon: HelpCircle,
      description: 'Get support & answers'
    },
    { 
      label: 'API Docs', 
      href: '/api', 
      icon: Code,
      description: 'Developer resources'
    },
    { 
      label: 'Updates', 
      href: '/updates', 
      icon: Rocket,
      description: 'Latest features & releases'
    },
    { 
      label: 'Community', 
      href: '/community', 
      icon: Users,
      description: 'Connect with creators'
    },
    { 
      label: 'Careers', 
      href: '/careers', 
      icon: Briefcase,
      description: 'Join our team'
    }
  ];

  const isActiveResource = resourceItems.some(item => pathname === item.href);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500",
          isActiveResource ? "text-indigo-600 bg-indigo-50" : "text-gray-700"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Resources</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="p-2">
              {resourceItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-start space-x-3 p-3 rounded-lg transition-colors",
                      "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500",
                      isActive && "bg-indigo-50 text-indigo-700"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 mt-0.5", isActive ? "text-indigo-600" : "text-gray-400")} />
                    <div>
                      <div className={cn("font-medium text-sm", isActive ? "text-indigo-700" : "text-gray-900")}>
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
