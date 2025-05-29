
/**
 * Color contrast utilities for WCAG compliance
 */

interface ColorContrastResult {
  ratio: number;
  passes: boolean;
  level: 'AAA' | 'AA' | 'Fail';
}

/**
 * Convert hex color to RGB
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

/**
 * Calculate relative luminance of a color
 */
const getLuminance = (color: string): number => {
  const rgb = hexToRgb(color);
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;
  
  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Check color contrast ratio between foreground and background colors
 */
export const checkColorContrast = (foreground: string, background: string): ColorContrastResult => {
  const fgLuminance = getLuminance(foreground);
  const bgLuminance = getLuminance(background);
  
  const ratio = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                (Math.min(fgLuminance, bgLuminance) + 0.05);
  
  return {
    ratio: Math.round(ratio * 100) / 100,
    passes: ratio >= 4.5,
    level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail'
  };
};

/**
 * Validate color combinations for common UI elements
 */
export const validateUIColors = () => {
  const validations = [
    {
      name: 'Primary button text on indigo background',
      foreground: '#ffffff',
      background: '#4f46e5'
    },
    {
      name: 'Body text on white background',
      foreground: '#374151',
      background: '#ffffff'
    },
    {
      name: 'Secondary text on white background',
      foreground: '#6b7280',
      background: '#ffffff'
    }
  ];

  validations.forEach(validation => {
    const result = checkColorContrast(validation.foreground, validation.background);
    console.log(`${validation.name}: ${result.level} (${result.ratio}:1)`);
    
    if (!result.passes) {
      console.warn(`⚠️ Low contrast detected for ${validation.name}`);
    }
  });
};
