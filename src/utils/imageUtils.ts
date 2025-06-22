
// Enhanced image utilities for better performance and SEO

export const defaultFallbackImage = '/images/placeholder.jpg';

// Local gallery images for showcase - Updated with user-uploaded images
export const localGalleryImages = [
  {
    src: '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png',
    alt: 'Futuristic cyberpunk cityscape with neon lights and digital interfaces in a rainy street scene',
    style: 'Cyberpunk'
  },
  {
    src: '/lovable-uploads/19295794-7457-41ec-9272-41faed11b055.png',
    alt: 'Mystical fantasy landscape with ethereal blue lighting, ancient trees and magical atmosphere',
    style: 'Fantasy Art'
  },
  {
    src: '/lovable-uploads/317dfa28-3425-4dac-a167-343034ee797b.png',
    alt: 'Abstract geometric patterns with vibrant colors, overlapping shapes and digital art elements',
    style: 'Abstract Digital'
  },
  {
    src: '/lovable-uploads/5780c58f-29ec-4462-a0eb-3ba9829bf938.png',
    alt: 'Dramatic mountain landscape with cinematic lighting and atmospheric mood',
    style: 'Cinematic Landscape'
  },
  {
    src: '/lovable-uploads/2eae8e86-b21c-42da-a038-310ef938fe38.png',
    alt: 'Renaissance-style portrait with classical artistic techniques and traditional composition',
    style: 'Classical Portrait'
  },
  {
    src: '/lovable-uploads/269b93d2-3c01-438b-b2bb-e7b1fbc3b233.png',
    alt: 'Modern futuristic architectural design with sleek curved lines and glass surfaces',
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
