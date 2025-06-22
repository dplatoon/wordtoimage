
// Enhanced image utilities for better performance and SEO

export const defaultFallbackImage = '/images/placeholder.jpg';

// Local gallery images for showcase - Updated with working AI-themed images
export const localGalleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop&crop=center',
    alt: 'Futuristic cyberpunk cityscape with neon lights and digital interfaces',
    style: 'Cyberpunk'
  },
  {
    src: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop&crop=center',
    alt: 'Mystical fantasy landscape with ethereal lighting and magical elements',
    style: 'Fantasy Art'
  },
  {
    src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop&crop=center',
    alt: 'Abstract geometric patterns with vibrant colors and digital art elements',
    style: 'Abstract Digital'
  },
  {
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop&crop=center',
    alt: 'Stunning landscape with dramatic lighting and cinematic composition',
    style: 'Cinematic Landscape'
  },
  {
    src: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400&h=400&fit=crop&crop=center',
    alt: 'Renaissance-style portrait with classical artistic techniques',
    style: 'Classical Portrait'
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop&crop=center&auto=format',
    alt: 'Modern architectural design with sleek lines and futuristic elements',
    style: 'Futuristic Architecture'
  },
  {
    src: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop&crop=center&auto=format',
    alt: 'Vintage poster design with retro aesthetic and bold typography',
    style: 'Retro Vintage'
  },
  {
    src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop&crop=center&auto=format',
    alt: 'Digital art masterpiece with innovative AI-generated techniques',
    style: 'AI Digital Art'
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
