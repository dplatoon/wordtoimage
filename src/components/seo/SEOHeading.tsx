
import React from 'react';

interface SEOHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  seoOptimized?: boolean;
}

export const SEOHeading: React.FC<SEOHeadingProps> = ({
  level,
  children,
  className = '',
  id,
  seoOptimized = true
}) => {
  // Generate ID from heading text if not provided
  const headingId = id || (typeof children === 'string' 
    ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    : undefined
  );

  // Add SEO-optimized classes based on heading level
  const seoClasses = seoOptimized ? {
    1: 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight',
    2: 'text-2xl md:text-3xl font-semibold text-gray-800 mb-4 mt-8',
    3: 'text-xl md:text-2xl font-semibold text-gray-700 mb-3 mt-6',
    4: 'text-lg md:text-xl font-medium text-gray-700 mb-2 mt-4',
    5: 'text-base md:text-lg font-medium text-gray-600 mb-2 mt-3',
    6: 'text-sm md:text-base font-medium text-gray-600 mb-1 mt-2'
  }[level] : '';

  const finalClassName = `${seoClasses} ${className}`.trim();

  const props = {
    className: finalClassName,
    id: headingId,
    ...(seoOptimized && {
      'data-seo-heading': level,
      'data-seo-text': typeof children === 'string' ? children : ''
    })
  };

  if (level === 1) return <h1 {...props}>{children}</h1>;
  if (level === 2) return <h2 {...props}>{children}</h2>;
  if (level === 3) return <h3 {...props}>{children}</h3>;
  if (level === 4) return <h4 {...props}>{children}</h4>;
  if (level === 5) return <h5 {...props}>{children}</h5>;
  return <h6 {...props}>{children}</h6>;
};

// Pre-configured heading components for common use cases
export const SEOTitle = ({ children, className = '', ...props }: Omit<SEOHeadingProps, 'level'>) => (
  <SEOHeading level={1} className={className} {...props}>
    {children}
  </SEOHeading>
);

export const SEOSection = ({ children, className = '', ...props }: Omit<SEOHeadingProps, 'level'>) => (
  <SEOHeading level={2} className={className} {...props}>
    {children}
  </SEOHeading>
);

export const SEOSubsection = ({ children, className = '', ...props }: Omit<SEOHeadingProps, 'level'>) => (
  <SEOHeading level={3} className={className} {...props}>
    {children}
  </SEOHeading>
);
