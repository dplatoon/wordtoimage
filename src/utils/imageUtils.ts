
// Enhanced image utilities for better performance and SEO

export const defaultFallbackImage = '/images/placeholder.jpg';

export const isExternalUrl = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
};

export const generateImageSrcSet = (baseSrc: string, sizes: number[]): string => {
  if (isExternalUrl(baseSrc)) {
    // For external URLs, try to add responsive parameters
    return sizes.map(size => {
      try {
        const url = new URL(baseSrc);
        url.searchParams.set('w', size.toString());
        return `${url.toString()} ${size}w`;
      } catch {
        return `${baseSrc} ${size}w`;
      }
    }).join(', ');
  }
  
  // For local images, generate different sizes
  const extension = baseSrc.split('.').pop();
  const basePath = baseSrc.replace(`.${extension}`, '');
  
  return sizes.map(size => 
    `${basePath}-${size}w.${extension} ${size}w`
  ).join(', ');
};

export const getOptimalImageFormat = (userAgent: string): 'avif' | 'webp' | 'jpg' => {
  if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) {
    return 'avif';
  }
  if (userAgent.includes('Chrome') || userAgent.includes('Firefox') || userAgent.includes('Safari')) {
    return 'webp';
  }
  return 'jpg';
};

export const preloadCriticalImages = (images: string[]): void => {
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

export const calculateImageDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight?: number
): { width: number; height: number } => {
  const ratio = originalWidth / originalHeight;
  
  if (!maxHeight) {
    return {
      width: Math.min(originalWidth, maxWidth),
      height: Math.min(originalWidth, maxWidth) / ratio,
    };
  }
  
  const widthRatio = maxWidth / originalWidth;
  const heightRatio = maxHeight / originalHeight;
  const scale = Math.min(widthRatio, heightRatio);
  
  return {
    width: Math.round(originalWidth * scale),
    height: Math.round(originalHeight * scale),
  };
};

export const generateImageAlt = (context: string, description?: string): string => {
  if (description) return description;
  
  // Generate basic alt text based on context
  const contextMap: Record<string, string> = {
    hero: 'AI-generated image showcasing WordToImage capabilities',
    gallery: 'Example of AI-generated artwork',
    tutorial: 'Tutorial step illustration',
    blog: 'Blog post featured image',
    profile: 'User profile image',
  };
  
  return contextMap[context] || 'Generated image';
};
