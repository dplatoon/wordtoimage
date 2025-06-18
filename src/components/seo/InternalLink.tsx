
import { Link, LinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface InternalLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  priority?: 'high' | 'medium' | 'low';
}

export const InternalLink = ({ 
  children, 
  className, 
  priority = 'medium',
  ...props 
}: InternalLinkProps) => {
  const priorityClasses = {
    high: 'text-ai-primary font-semibold hover:text-ai-primary/80',
    medium: 'text-ai-primary hover:text-ai-primary/80 hover:underline',
    low: 'text-gray-600 hover:text-ai-primary'
  };

  return (
    <Link
      {...props}
      className={cn(
        'transition-colors duration-200',
        priorityClasses[priority],
        className
      )}
    >
      {children}
    </Link>
  );
};
