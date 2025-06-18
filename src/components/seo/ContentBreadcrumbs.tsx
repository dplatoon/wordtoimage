
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const ContentBreadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const generateBreadcrumbs = () => {
    const breadcrumbs = [{ name: 'Home', href: '/' }];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Convert path segments to readable names
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        name,
        href: isLast ? undefined : currentPath
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Generate breadcrumb structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      ...(breadcrumb.href && { "item": `https://wordtoimage.com${breadcrumb.href}` })
    }))
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.name} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
              {breadcrumb.href ? (
                <Link 
                  to={breadcrumb.href} 
                  className="hover:text-ai-primary transition-colors"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {breadcrumb.name}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">
                  {breadcrumb.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};
