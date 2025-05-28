
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationItem {
  label: string;
  path: string;
  description?: string;
}

export const ContentNavigation = () => {
  const location = useLocation();
  
  const navigationItems: NavigationItem[] = [
    {
      label: 'Blog',
      path: '/blog',
      description: 'Latest AI art insights and tutorials'
    },
    {
      label: 'Tutorials',
      path: '/tutorials',
      description: 'Step-by-step guides and how-tos'
    },
    {
      label: 'Design Tips',
      path: '/design-tips',
      description: 'Professional design principles'
    },
    {
      label: 'Help Center',
      path: '/help',
      description: 'FAQ and troubleshooting'
    },
    {
      label: 'API Docs',
      path: '/api',
      description: 'Developer documentation'
    }
  ];
  
  return (
    <nav className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "block p-4 rounded-lg border-2 transition-all duration-200 group",
                isActive
                  ? "border-ai-primary bg-ai-primary/5 shadow-sm"
                  : "border-gray-200 hover:border-ai-primary/50 hover:shadow-sm"
              )}
            >
              <h3 className={cn(
                "font-medium mb-1 transition-colors",
                isActive ? "text-ai-primary" : "text-gray-900 group-hover:text-ai-primary"
              )}>
                {item.label}
              </h3>
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
