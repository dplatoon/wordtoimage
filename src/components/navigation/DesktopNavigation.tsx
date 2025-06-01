
import { Link, useLocation } from 'react-router-dom';

export const DesktopNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/text-to-image', label: 'Create Images' },
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
  ];

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-2">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border border-blue-500'
                : 'text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 border border-transparent hover:border-slate-500'
            }`}
            aria-current={isActive(item.path) ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
