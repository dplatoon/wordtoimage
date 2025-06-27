
import { useEffect } from 'react';

interface FontConfig {
  family: string;
  weights: number[];
  display: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  preload?: boolean;
}

export const OptimizedFontLoader = () => {
  useEffect(() => {
    const fonts: FontConfig[] = [
      {
        family: 'Inter',
        weights: [400, 500, 600, 700],
        display: 'swap',
        preload: true
      }
    ];

    fonts.forEach(font => {
      // Create optimized font loading with font-display: swap
      const fontUrl = `https://fonts.googleapis.com/css2?family=${font.family}:wght@${font.weights.join(';')}&display=${font.display}`;
      
      if (font.preload) {
        // Preload critical fonts
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = fontUrl;
        preloadLink.as = 'style';
        preloadLink.crossOrigin = 'anonymous';
        document.head.appendChild(preloadLink);

        // Load font with high priority
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = fontUrl;
        fontLink.media = 'print';
        fontLink.onload = () => {
          fontLink.media = 'all';
        };
        document.head.appendChild(fontLink);

        // Fallback for older browsers
        const noscriptFallback = document.createElement('noscript');
        noscriptFallback.innerHTML = `<link rel="stylesheet" href="${fontUrl}">`;
        document.head.appendChild(noscriptFallback);
      }

      // Use Font Loading API for better control
      if ('fonts' in document) {
        font.weights.forEach(weight => {
          const fontFace = new FontFace(font.family, `url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2)`, {
            weight: weight.toString(),
            display: font.display,
            unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
          });

          fontFace.load().then(() => {
            document.fonts.add(fontFace);
          }).catch(error => {
            console.warn('Font loading failed:', error);
          });
        });
      }
    });

    // Critical font loading optimization
    const criticalFontCSS = `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      /* Fallback fonts to prevent layout shift */
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      }
      
      /* Optimize font rendering */
      * {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = criticalFontCSS;
    styleElement.id = 'critical-fonts';
    document.head.appendChild(styleElement);

    // Cleanup
    return () => {
      const existingStyle = document.getElementById('critical-fonts');
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, []);

  return null;
};

// Font performance utilities
export const fontPerformanceUtils = {
  // Check if font is loaded
  isFontLoaded: (fontFamily: string, weight: number = 400): boolean => {
    if (!('fonts' in document)) return false;
    
    return document.fonts.check(`${weight} 16px ${fontFamily}`);
  },

  // Load font with priority
  loadFontWithPriority: async (fontFamily: string, weight: number = 400): Promise<FontFace> => {
    const fontFace = new FontFace(fontFamily, `url(${getFontUrl(fontFamily, weight)})`, {
      weight: weight.toString(),
      display: 'swap'
    });
    
    await fontFace.load();
    document.fonts.add(fontFace);
    return fontFace;
  },

  // Preload fonts for better performance
  preloadFonts: (fonts: { family: string; weight: number }[]): void => {
    fonts.forEach(({ family, weight }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = getFontUrl(family, weight);
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
};

// Helper function to get font URL
const getFontUrl = (family: string, weight: number): string => {
  const baseUrl = 'https://fonts.gstatic.com/s/inter/v12/';
  const weightMap: { [key: number]: string } = {
    400: 'UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
    500: 'UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfAZ9hiA.woff2',
    600: 'UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2',
    700: 'UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2'
  };
  
  return baseUrl + (weightMap[weight] || weightMap[400]);
};
