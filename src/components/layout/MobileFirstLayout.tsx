
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileFirstLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileFirstLayout: React.FC<MobileFirstLayoutProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn("min-h-screen mobile-content", className)}>
      {children}
    </div>
  );
};

interface MobileFirstSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const MobileFirstSection: React.FC<MobileFirstSectionProps> = ({
  children,
  className,
  id
}) => {
  return (
    <section id={id} className={cn("mobile-section", className)}>
      <div className="mobile-first-container">
        {children}
      </div>
    </section>
  );
};

interface MobileFirstGridProps {
  children: React.ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  className?: string;
}

export const MobileFirstGrid: React.FC<MobileFirstGridProps> = ({
  children,
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  className
}) => {
  const gridClasses = cn(
    "mobile-grid",
    cols.sm && `mobile-grid-sm-${cols.sm}`,
    cols.md && `mobile-grid-md-${cols.md}`,
    cols.lg && `mobile-grid-lg-${cols.lg}`,
    className
  );

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

interface MobileFirstCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export const MobileFirstCard: React.FC<MobileFirstCardProps> = ({
  children,
  className,
  interactive = false
}) => {
  return (
    <div
      className={cn(
        "mobile-card",
        interactive && "hover:shadow-md cursor-pointer transform transition-transform hover:scale-[1.02]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileFirstHeading: React.FC<{
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}> = ({ level, children, className }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const headingClasses = {
    1: "mobile-text-4xl font-bold text-gray-900",
    2: "mobile-text-3xl font-bold text-gray-900",
    3: "mobile-text-2xl font-semibold text-gray-900",
    4: "mobile-text-xl font-semibold text-gray-900"
  };

  return (
    <Tag className={cn(headingClasses[level], className)}>
      {children}
    </Tag>
  );
};
