
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
    preview: '/lovable-uploads/4034377e-d4f1-439d-b479-367253c12770.png',
    popular: true,
    trending: true,
    keywords: ['photorealistic', 'detailed', 'professional photography', 'realistic'],
    examplePrompt: 'professional portrait photo of a person, photorealistic, detailed, studio lighting'
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Movie-like dramatic scenes with cinematic lighting and composition',
    category: 'realistic',
    preview: '/lovable-uploads/99f5c8dc-6b8d-4daf-81a1-ff186d0ee10a.png',
    popular: true,
    keywords: ['cinematic', 'dramatic', 'movie scene', 'professional lighting'],
    examplePrompt: 'cinematic scene, dramatic lighting, movie style, wide shot'
  },
  {
    id: 'portrait',
    name: 'Portrait',
    description: 'Professional portrait photography with natural expressions',
    category: 'realistic',
    preview: '/lovable-uploads/53e8165c-d2db-4f0c-9509-f0e76e5c179f.png',
    popular: false,
    keywords: ['portrait', 'headshot', 'natural', 'professional'],
    examplePrompt: 'professional portrait, natural lighting, clean background'
  },
  
  // Artistic Styles
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft watercolor painting with flowing colors and artistic brushstrokes',
    category: 'artistic',
    preview: '/lovable-uploads/60da266c-4810-4f41-9449-ae54c2026373.png',
    popular: true,
    keywords: ['watercolor', 'painting', 'soft', 'artistic', 'flowing'],
    examplePrompt: 'watercolor painting style, soft brushstrokes, flowing colors'
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classical oil painting with visible brushstrokes and rich textures',
    category: 'artistic',
    preview: '/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png',
    popular: false,
    keywords: ['oil painting', 'classical', 'brushstrokes', 'textured'],
    examplePrompt: 'oil painting style, classical art, visible brushstrokes, rich colors'
  },
  {
    id: 'impressionist',
    name: 'Impressionist',
    description: 'Monet-style impressionist art with light and color emphasis',
    category: 'artistic',
    preview: '/lovable-uploads/7f38eaf1-216c-4148-b05c-9a2f87de6ffc.png',
    popular: false,
    keywords: ['impressionist', 'monet style', 'light', 'color'],
    examplePrompt: 'impressionist painting, monet style, soft light, colorful'
  },
  
  // Digital Styles
  {
    id: 'digital-art',
    name: 'Digital Art',
    description: 'Modern digital illustration with vibrant colors and clean lines',
    category: 'digital',
    preview: '/lovable-uploads/806c4eee-2b54-4f82-8d75-7bd3e7137f5c.png',
    popular: true,
    keywords: ['digital art', 'illustration', 'vibrant', 'modern'],
    examplePrompt: 'digital art illustration, vibrant colors, modern style, clean lines'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon-lit futuristic aesthetic with dark atmosphere and bright colors',
    category: 'digital',
    preview: '/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png',
    popular: true,
    trending: true,
    keywords: ['cyberpunk', 'neon', 'futuristic', 'dark', 'glowing'],
    examplePrompt: 'cyberpunk style, neon lights, futuristic city, dark atmosphere'
  },
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    description: '8-bit retro pixel style with nostalgic video game aesthetics',
    category: 'digital',
    preview: '/lovable-uploads/8916d6c1-4854-473f-b0fb-0c6d9833633e.png',
    popular: false,
    keywords: ['pixel art', '8-bit', 'retro', 'video game'],
    examplePrompt: 'pixel art style, 8-bit, retro video game aesthetic'
  },
  
  // Anime Styles
  {
    id: 'japanese-anime',
    name: 'Japanese Anime',
    description: 'Traditional anime/manga style with expressive characters',
    category: 'anime',
    preview: '/lovable-uploads/9baa5403-54fd-4d41-9dff-b6762b238e3e.png',
    popular: true,
    keywords: ['anime', 'manga', 'japanese', 'expressive'],
    examplePrompt: 'anime style character, manga art, japanese animation style'
  },
  {
    id: '3d-anime',
    name: '3D Anime',
    description: 'Modern 3D anime rendering with smooth surfaces and cel-shading',
    category: 'anime',
    preview: '/lovable-uploads/b8bd59bc-46c8-4f5f-9ad8-8eacbf6c7c20.png',
    popular: false,
    keywords: ['3d anime', 'cel shading', 'modern', 'smooth'],
    examplePrompt: '3d anime style, cel shaded, modern anime rendering'
  },
  {
    id: 'chibi',
    name: 'Chibi Style',
    description: 'Cute chibi character art with oversized heads and kawaii aesthetics',
    category: 'anime',
    preview: '/lovable-uploads/c0cd939b-5fe6-4732-af93-ee61f070b689.png',
    popular: false,
    keywords: ['chibi', 'cute', 'kawaii', 'small'],
    examplePrompt: 'chibi style character, cute, kawaii, oversized head'
  },

  // Additional Popular Styles
  {
    id: 'fantasy-art',
    name: 'Fantasy Art',
    description: 'Epic fantasy artwork with magical elements and mythical creatures',
    category: 'artistic',
    preview: '/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png',
    popular: true,
    trending: true,
    keywords: ['fantasy', 'magical', 'epic', 'mythical'],
    examplePrompt: 'fantasy art, magical scene, epic composition, mythical elements'
  },
  {
    id: 'sci-fi',
    name: 'Sci-Fi',
    description: 'Science fiction scenes with advanced technology and space themes',
    category: 'digital',
    preview: '/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png',
    popular: true,
    keywords: ['sci-fi', 'futuristic', 'space', 'technology'],
    examplePrompt: 'sci-fi scene, futuristic technology, space setting, advanced'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple compositions with focus on essential elements',
    category: 'artistic',
    preview: '/lovable-uploads/db49271b-8575-4763-9439-0e4d86479b29.png',
    popular: false,
    keywords: ['minimalist', 'clean', 'simple', 'essential'],
    examplePrompt: 'minimalist design, clean composition, simple shapes, essential elements'
  }
];

export const STYLE_CATEGORIES = [
  { id: 'realistic', name: 'Realistic', description: 'Photo-realistic and cinematic styles for lifelike images' },
  { id: 'artistic', name: 'Artistic', description: 'Traditional art and painting styles with artistic flair' },
  { id: 'digital', name: 'Digital', description: 'Modern digital art and futuristic illustrations' },
  { id: 'anime', name: 'Anime', description: 'Japanese anime and manga character styles' }
] as const;
