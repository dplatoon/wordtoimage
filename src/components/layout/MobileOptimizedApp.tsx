
import { ReactNode } from 'react';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

interface MobileOptimizedAppProps {
  children: ReactNode;
}

export const MobileOptimizedApp = ({ children }: MobileOptimizedAppProps) => {
  const { isMobile } = useResponsiveDesign();

  return (
    <div className={`min-h-screen w-full ${isMobile ? 'main-content' : ''}`}>
      {children}
    </div>
  );
};
