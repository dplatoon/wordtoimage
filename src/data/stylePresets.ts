
export interface StylePreset {
  id: string;
  name: string;
  description: string;
  category: 'realistic' | 'artistic' | 'digital' | 'anime';
  preview: string;
  popular: boolean;
  trending?: boolean;
  keywords?: string[];
  examplePrompt?: string;
}

export const STYLE_PRESETS: StylePreset[] = [
  // Realistic Styles
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Ultra-realistic photography with perfect lighting and detail',
    category: 'realistic',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format',
    popular: true,
    trending: true,
    keywords: ['photorealistic', 'detailed', 'professional', 'photography', 'realistic', 'photo', 'portrait', 'real'],
    examplePrompt: 'professional portrait photo of a person, photorealistic, detailed, studio lighting'
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Movie-like dramatic scenes with cinematic lighting and composition',
    category: 'realistic',
    preview: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop&auto=format',
    popular: true,
    keywords: ['cinematic', 'dramatic', 'movie', 'film', 'scene', 'professional', 'lighting', 'epic'],
    examplePrompt: 'cinematic scene, dramatic lighting, movie style, wide shot'
  },
  {
    id: 'portrait',
    name: 'Portrait',
    description: 'Professional portrait photography with natural expressions',
    category: 'realistic',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format',
    popular: false,
    keywords: ['portrait', 'headshot', 'natural', 'professional', 'face', 'person', 'human'],
    examplePrompt: 'professional portrait, natural lighting, clean background'
  },
  
  // Artistic Styles
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft watercolor painting with flowing colors and artistic brushstrokes',
    category: 'artistic',
    preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format',
    popular: true,
    keywords: ['watercolor', 'painting', 'soft', 'artistic', 'flowing', 'brushstrokes', 'traditional', 'art'],
    examplePrompt: 'watercolor painting style, soft brushstrokes, flowing colors'
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classical oil painting with visible brushstrokes and rich textures',
    category: 'artistic',
    preview: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format',
    popular: false,
    keywords: ['oil', 'painting', 'classical', 'brushstrokes', 'textured', 'traditional', 'canvas', 'fine art'],
    examplePrompt: 'oil painting style, classical art, visible brushstrokes, rich colors'
  },
  {
    id: 'impressionist',
    name: 'Impressionist',
    description: 'Monet-style impressionist art with light and color emphasis',
    category: 'artistic',
    preview: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&auto=format',
    popular: false,
    keywords: ['impressionist', 'monet', 'style', 'light', 'color', 'brush', 'texture', 'french'],
    examplePrompt: 'impressionist painting, monet style, soft light, colorful'
  },
  
  // Digital Styles
  {
    id: 'digital-art',
    name: 'Digital Art',
    description: 'Modern digital illustration with vibrant colors and clean lines',
    category: 'digital',
    preview: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=300&fit=crop&auto=format',
    popular: true,
    keywords: ['digital', 'art', 'illustration', 'vibrant', 'modern', 'colorful', 'vector', 'graphic'],
    examplePrompt: 'digital art illustration, vibrant colors, modern style, clean lines'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon-lit futuristic aesthetic with dark atmosphere and bright colors',
    category: 'digital',
    preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format',
    popular: true,
    trending: true,
    keywords: ['cyberpunk', 'neon', 'futuristic', 'dark', 'glowing', 'sci-fi', 'technology', 'urban', 'cyber'],
    examplePrompt: 'cyberpunk style, neon lights, futuristic city, dark atmosphere'
  },
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    description: '8-bit retro pixel style with nostalgic video game aesthetics',
    category: 'digital',
    preview: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop&auto=format',
    popular: false,
    keywords: ['pixel', 'art', '8-bit', 'retro', 'video', 'game', 'nostalgic', 'arcade'],
    examplePrompt: 'pixel art style, 8-bit, retro video game aesthetic'
  },
  
  // Anime Styles
  {
    id: 'japanese-anime',
    name: 'Japanese Anime',
    description: 'Traditional anime/manga style with expressive characters',
    category: 'anime',
    preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format',
    popular: true,
    keywords: ['anime', 'manga', 'japanese', 'expressive', 'character', 'cartoon', 'animation'],
    examplePrompt: 'anime style character, manga art, japanese animation style'
  },
  {
    id: '3d-anime',
    name: '3D Anime',
    description: 'Modern 3D anime rendering with smooth surfaces and cel-shading',
    category: 'anime',
    preview: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=300&fit=crop&auto=format',
    popular: false,
    keywords: ['3d', 'anime', 'cel', 'shading', 'modern', 'smooth', 'rendering'],
    examplePrompt: '3d anime style, cel shaded, modern anime rendering'
  },
  {
    id: 'chibi',
    name: 'Chibi Style',
    description: 'Cute chibi character art with oversized heads and kawaii aesthetics',
    category: 'anime',
    preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format',
    popular: false,
    keywords: ['chibi', 'cute', 'kawaii', 'small', 'character', 'oversized', 'head'],
    examplePrompt: 'chibi style character, cute, kawaii, oversized head'
  },

  // Additional Popular Styles
  {
    id: 'fantasy-art',
    name: 'Fantasy Art',
    description: 'Epic fantasy artwork with magical elements and mythical creatures',
    category: 'artistic',
    preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format',
    popular: true,
    trending: true,
    keywords: ['fantasy', 'magical', 'epic', 'mythical', 'dragon', 'wizard', 'magic', 'medieval'],
    examplePrompt: 'fantasy art, magical scene, epic composition, mythical elements'
  },
  {
    id: 'sci-fi',
    name: 'Sci-Fi',
    description: 'Science fiction scenes with advanced technology and space themes',
    category: 'digital',
    preview: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop&auto=format',
    popular: true,
    keywords: ['sci-fi', 'futuristic', 'space', 'technology', 'robot', 'alien', 'spaceship', 'advanced'],
    examplePrompt: 'sci-fi scene, futuristic technology, space setting, advanced'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple compositions with focus on essential elements',
    category: 'artistic',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop&auto=format',
    popular: false,
    keywords: ['minimalist', 'clean', 'simple', 'essential', 'minimal', 'white', 'space'],
    examplePrompt: 'minimalist design, clean composition, simple shapes, essential elements'
  }
];

export const STYLE_CATEGORIES = [
  { id: 'realistic', name: 'Realistic', description: 'Photo-realistic and cinematic styles for lifelike images' },
  { id: 'artistic', name: 'Artistic', description: 'Traditional art and painting styles with artistic flair' },
  { id: 'digital', name: 'Digital', description: 'Modern digital art and futuristic illustrations' },
  { id: 'anime', name: 'Anime', description: 'Japanese anime and manga character styles' }
] as const;
