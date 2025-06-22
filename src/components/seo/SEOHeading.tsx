
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
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
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

  return React.createElement(
    HeadingTag,
    {
      className: finalClassName,
      id: headingId,
      ...(seoOptimized && {
        'data-seo-heading': level,
        'data-seo-text': typeof children === 'string' ? children : ''
      })
    },
    children
  );
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
