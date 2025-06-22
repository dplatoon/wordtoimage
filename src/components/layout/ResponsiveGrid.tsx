
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gallery' | 'template' | 'blog' | 'custom';
  gap?: 'sm' | 'md' | 'lg';
}

export const ResponsiveGrid = ({ 
  children, 
  className, 
  variant = 'gallery',
  gap = 'md'
}: ResponsiveGridProps) => {
  const variantClasses = {
    gallery: 'gallery-grid',
    template: 'template-grid', 
    blog: 'blog-grid',
    custom: ''
  };

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  };

  return (
    <div 
      className={cn(
        variantClasses[variant],
        variant === 'custom' && gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
};
