
// Enhanced image utilities for better performance and SEO

export const defaultFallbackImage = '/images/placeholder.jpg';

// Local gallery images for showcase
export const localGalleryImages = [
  {
    src: '/lovable-uploads/9baa5403-54fd-4d41-9dff-b6762b238e3e.png',
    alt: 'Futuristic cityscape with neon lights',
    style: 'Cyberpunk'
  },
  {
    src: '/lovable-uploads/c0cd939b-5fe6-4732-af93-ee61f070b689.png',
    alt: 'Fantasy dragon in magical forest',
    style: 'Fantasy Art'
  },
  {
    src: '/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png',
    alt: 'Abstract geometric pattern',
    style: 'Abstract'
  },
  {
    src: '/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png',
    alt: 'Beautiful landscape painting',
    style: 'Landscape'
  },
  {
    src: '/lovable-uploads/f0dea1ce-ca91-4c0b-9849-6b3649a98249.png',
    alt: 'Portrait in renaissance style',
    style: 'Renaissance'
  },
  {
    src: '/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png',
    alt: 'Modern architectural design',
    style: 'Architecture'
  },
  {
    src: '/lovable-uploads/806c4eee-2b54-4f82-8d75-7bd3e7137f5c.png',
    alt: 'Vintage poster design',
    style: 'Vintage'
  },
  {
    src: '/lovable-uploads/5cc3bb2f-158e-4a9d-8ff5-0efe1c96ab93.png',
    alt: 'Digital art masterpiece',
    style: 'Digital Art'
  }
];

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
