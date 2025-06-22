// Enhanced image utilities for better performance and SEO

export const defaultFallbackImage = '/images/placeholder.jpg';

// Local gallery images for showcase - Updated with working AI-themed images
export const localGalleryImages = [
  {
    src: "/lovable-uploads/ac5f5c36-57ec-4d3a-bc16-9417429df2f5.png",
    alt: "Futuristic cyberpunk city street with neon signs and holographic displays",
    style: "Cyberpunk"
  },
  {
    src: "/lovable-uploads/de5bb020-5171-43d5-ad88-09fdcbfeb83c.png", 
    alt: "Mystical fantasy forest with ancient trees and magical moonlight",
    style: "Fantasy Art"
  },
  {
    src: "/lovable-uploads/f2c75793-3403-43ad-8f94-917cc71fde95.png",
    alt: "Abstract geometric composition with vibrant overlapping shapes",
    style: "Abstract Digital"
  },
  {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=75",
    alt: "Realistic portrait with dramatic lighting and detailed features",
    style: "Photorealistic"
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=75",
    alt: "Minimalist design with clean lines and subtle gradients",
    style: "Minimalist"
  },
  {
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=75",
    alt: "Vintage-style artwork with warm tones and classic composition",
    style: "Vintage"
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=75",
    alt: "Surreal artistic composition with dreamlike elements",
    style: "Surreal"
  },
  {
    src: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&w=800&q=75",
    alt: "Anime-style character illustration with vibrant colors",
    style: "Anime"
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
