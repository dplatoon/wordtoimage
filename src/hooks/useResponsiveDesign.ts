
import { useState, useEffect } from 'react';

interface BreakpointState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  isTouch: boolean;
  prefersReducedMotion: boolean;
}

export const useResponsiveDesign = (): BreakpointState => {
  const [state, setState] = useState<BreakpointState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    width: 0,
    height: 0,
    orientation: 'portrait',
    isTouch: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setState({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1440,
        isLargeDesktop: width >= 1440,
        width,
        height,
        orientation: width > height ? 'landscape' : 'portrait',
        isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
    };

    // Initial update
    updateState();

    // Add event listeners
    window.addEventListener('resize', updateState);
    window.addEventListener('orientationchange', updateState);

    // Debounced resize for performance
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateState, 150);
    };

    window.addEventListener('resize', debouncedUpdate);

    return () => {
      window.removeEventListener('resize', updateState);
      window.removeEventListener('orientationchange', updateState);
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
};

// Utility hook for specific breakpoints
export const useBreakpoint = (breakpoint: 'mobile' | 'tablet' | 'desktop' | 'large') => {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsiveDesign();
  
  switch (breakpoint) {
    case 'mobile':
      return isMobile;
    case 'tablet':
      return isTablet;
    case 'desktop':
      return isDesktop;
    case 'large':
      return isLargeDesktop;
    default:
      return false;
  }
};

// Grid utilities for responsive layouts
export const getResponsiveGridCols = (
  mobile: number = 1, 
  tablet: number = 2, 
  desktop: number = 3, 
  large: number = 4
) => {
  const { isMobile, isTablet, isDesktop } = useResponsiveDesign();
  
  if (isMobile) return mobile;
  if (isTablet) return tablet;
  if (isDesktop) return desktop;
  return large;
};
