
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface InternalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  rel?: string;
  title?: string;
  'aria-label'?: string;
}

export const InternalLink = ({ 
  to, 
  children, 
  className,
  rel = "noopener",
  title,
  'aria-label': ariaLabel,
  ...props 
}: InternalLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-ai-primary hover:text-ai-accent transition-colors duration-200 underline-offset-4 hover:underline",
        className
      )}
      rel={rel}
      title={title}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Link>
  );
};
