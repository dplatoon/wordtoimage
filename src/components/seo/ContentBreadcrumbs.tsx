
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const ContentBreadcrumbs = () => {
  const location = useLocation();
  
  const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];
    
    const pathMap: Record<string, string> = {
      'blog': 'Blog',
      'design-tips': 'Design Tips',
      'tutorials': 'Tutorials',
      'help': 'Help Center',
      'api': 'API Documentation',
      'features': 'Features',
      'pricing': 'Pricing',
      'about': 'About',
      'contact': 'Contact',
      'community': 'Community',
      'templates': 'Templates',
      'text-to-image': 'AI Generator'
    };
    
    let currentPath = '';
    paths.forEach(path => {
      currentPath += `/${path}`;
      if (pathMap[path]) {
        breadcrumbs.push({
          label: pathMap[path],
          path: currentPath
        });
      }
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = getBreadcrumbs(location.pathname);
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            )}
            {index === 0 && <Home className="h-4 w-4 mr-1" />}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-gray-900" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className={cn(
                  "hover:text-ai-primary transition-colors duration-200",
                  index === 0 && "flex items-center"
                )}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
