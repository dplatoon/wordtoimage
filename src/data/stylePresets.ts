
export interface StylePreset {
  id: string;
  name: string;
  description: string;
  category: 'realistic' | 'artistic' | 'digital' | 'anime';
  preview: string;
  popular: boolean;
  trending?: boolean;
}

export const STYLE_PRESETS: StylePreset[] = [
  // Realistic Styles
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Ultra-realistic photography style',
    category: 'realistic',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format',
    popular: true,
    trending: true
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Movie-like dramatic scenes',
    category: 'realistic',
    preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format',
    popular: true
  },
  {
    id: 'portrait',
    name: 'Portrait',
    description: 'Professional portrait photography',
    category: 'realistic',
    preview: 'https://images.unsplash.com/photo-1494790108755-2616b612b0e0?w=400&h=300&fit=crop&auto=format',
    popular: false
  },
  
  // Artistic Styles
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft watercolor painting style',
    category: 'artistic',
    preview: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format',
    popular: true
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classical oil painting technique',
    category: 'artistic',
    preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format',
    popular: false
  },
  {
    id: 'impressionist',
    name: 'Impressionist',
    description: 'Monet-style impressionist art',
    category: 'artistic',
    preview: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&auto=format',
    popular: false
  },
  
  // Digital Styles
  {
    id: 'digital-art',
    name: 'Digital Art',
    description: 'Modern digital illustration',
    category: 'digital',
    preview: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=400&h=300&fit=crop&auto=format',
    popular: true
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon-lit futuristic aesthetic',
    category: 'digital',
    preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format',
    popular: true
  },
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    description: '8-bit retro pixel style',
    category: 'digital',
    preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop&auto=format',
    popular: false
  },
  
  // Anime Styles
  {
    id: 'japanese-anime',
    name: 'Japanese Anime',
    description: 'Traditional anime/manga style',
    category: 'anime',
    preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format',
    popular: true
  },
  {
    id: '3d-anime',
    name: '3D Anime',
    description: 'Modern 3D anime rendering',
    category: 'anime',
    preview: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop&auto=format',
    popular: false
  },
  {
    id: 'chibi',
    name: 'Chibi Style',
    description: 'Cute chibi character art',
    category: 'anime',
    preview: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&auto=format',
    popular: false
  }
];

export const STYLE_CATEGORIES = [
  { id: 'realistic', name: 'Realistic', description: 'Photo-realistic and cinematic styles' },
  { id: 'artistic', name: 'Artistic', description: 'Traditional art and painting styles' },
  { id: 'digital', name: 'Digital', description: 'Modern digital art and illustrations' },
  { id: 'anime', name: 'Anime', description: 'Japanese anime and manga styles' }
] as const;
