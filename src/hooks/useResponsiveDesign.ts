
import { useState, useEffect, useCallback } from 'react';

interface ResponsiveBreakpoints {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
}

interface ResponsiveDesignHook {
  breakpoints: ResponsiveBreakpoints;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  prefersReducedMotion: boolean;
  prefersDarkMode: boolean;
  screenSize: { width: number; height: number };
}

export const useResponsiveDesign = (): ResponsiveDesignHook => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  const updateScreenSize = useCallback(() => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
  }, []);

  const checkMediaQueries = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setPrefersDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  useEffect(() => {
    updateScreenSize();
    checkMediaQueries();

    window.addEventListener('resize', updateScreenSize);
    window.addEventListener('orientationchange', updateScreenSize);

    // Listen for media query changes
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    reducedMotionQuery.addEventListener('change', checkMediaQueries);
    darkModeQuery.addEventListener('change', checkMediaQueries);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
      window.removeEventListener('orientationchange', updateScreenSize);
      reducedMotionQuery.removeEventListener('change', checkMediaQueries);
      darkModeQuery.removeEventListener('change', checkMediaQueries);
    };
  }, [updateScreenSize, checkMediaQueries]);

  const breakpoints: ResponsiveBreakpoints = {
    xs: screenSize.width < 480,
    sm: screenSize.width >= 480 && screenSize.width < 768,
    md: screenSize.width >= 768 && screenSize.width < 1024,
    lg: screenSize.width >= 1024 && screenSize.width < 1280,
    xl: screenSize.width >= 1280 && screenSize.width < 1536,
    xxl: screenSize.width >= 1536,
  };

  const isMobile = breakpoints.xs || breakpoints.sm;
  const isTablet = breakpoints.md;
  const isDesktop = breakpoints.lg || breakpoints.xl || breakpoints.xxl;

  return {
    breakpoints,
    isMobile,
    isTablet,
    isDesktop,
    orientation,
    prefersReducedMotion,
    prefersDarkMode,
    screenSize,
  };
};
