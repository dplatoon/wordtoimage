
import React, { useState, useMemo, useEffect } from 'react';
import { Palette, Download, Eye, Search, Sparkles, X, Check, Layers, Copy, Wand2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LazyImage } from '@/components/common/LazyImage';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const FAVORITES_STORAGE_KEY = 'style-favorites';

interface StylePreset {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  prompt: string;
  style: string;
  category: 'realistic' | 'artistic' | 'fantasy' | 'digital' | 'vintage' | 'experimental';
}

interface StylePresetsGalleryProps {
  onStyleSelect?: (preset: StylePreset) => void;
  onCombinedStylesSelect?: (presets: StylePreset[], combinedPrompt: string) => void;
}

const categories = [
  { id: 'all', label: 'All Styles', icon: Sparkles },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'realistic', label: 'Realistic', icon: Eye },
  { id: 'artistic', label: 'Artistic', icon: Palette },
  { id: 'fantasy', label: 'Fantasy', icon: Sparkles },
  { id: 'digital', label: 'Digital', icon: Sparkles },
  { id: 'vintage', label: 'Vintage', icon: Sparkles },
  { id: 'experimental', label: 'Experimental', icon: Sparkles },
] as const;

const stylePresets: StylePreset[] = [
  // REALISTIC CATEGORY
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Ultra-realistic photography quality',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format',
    prompt: 'photorealistic, ultra detailed, professional photography',
    style: 'photorealistic, detailed, professional',
    category: 'realistic'
  },
  {
    id: 'portrait',
    name: 'Portrait Photography',
    description: 'Professional studio portrait quality',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&auto=format',
    prompt: 'professional portrait photography, studio lighting, high detail',
    style: 'portrait, professional, studio',
    category: 'realistic'
  },
  {
    id: 'cinematic',
    name: 'Cinematic Shot',
    description: 'Movie-quality cinematic photography',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=400&fit=crop&auto=format',
    prompt: 'cinematic photography, movie still, dramatic lighting, 35mm film',
    style: 'cinematic, dramatic, film',
    category: 'realistic'
  },
  {
    id: 'nature',
    name: 'Nature Photography',
    description: 'Stunning natural landscape shots',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop&auto=format',
    prompt: 'nature photography, landscape, golden hour, National Geographic style',
    style: 'nature, landscape, golden hour',
    category: 'realistic'
  },
  {
    id: 'macro',
    name: 'Macro Photography',
    description: 'Extreme close-up detail shots',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format',
    prompt: 'macro photography, extreme detail, close-up, shallow depth of field',
    style: 'macro, detailed, close-up',
    category: 'realistic'
  },
  {
    id: 'architecture',
    name: 'Architectural',
    description: 'Professional architecture photography',
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop&auto=format',
    prompt: 'architectural photography, modern buildings, symmetry, clean lines',
    style: 'architecture, modern, symmetrical',
    category: 'realistic'
  },

  // ARTISTIC CATEGORY
  {
    id: 'watercolor',
    name: 'Watercolor Dreams',
    description: 'Soft, flowing artistic watercolor style',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop&auto=format',
    prompt: 'watercolor painting, soft brushstrokes, artistic blend of colors',
    style: 'watercolor, artistic, soft',
    category: 'artistic'
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classical oil painting technique',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=400&fit=crop&auto=format',
    prompt: 'oil painting style, classical technique, rich textures, masterpiece quality',
    style: 'oil painting, classical, textured',
    category: 'artistic'
  },
  {
    id: 'impressionism',
    name: 'Impressionist',
    description: 'Light and color like Monet',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=400&fit=crop&auto=format',
    prompt: 'impressionist painting, visible brushstrokes, light and color, Monet style',
    style: 'impressionist, painterly, classic',
    category: 'artistic'
  },
  {
    id: 'pencil-sketch',
    name: 'Pencil Sketch',
    description: 'Detailed graphite pencil drawings',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop&auto=format',
    prompt: 'pencil sketch, graphite drawing, detailed shading, fine art',
    style: 'pencil, sketch, graphite',
    category: 'artistic'
  },
  {
    id: 'charcoal',
    name: 'Charcoal Drawing',
    description: 'Expressive charcoal art style',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop&auto=format',
    prompt: 'charcoal drawing, expressive strokes, dramatic contrast, fine art',
    style: 'charcoal, expressive, dramatic',
    category: 'artistic'
  },
  {
    id: 'pastel',
    name: 'Soft Pastel',
    description: 'Dreamy soft pastel artwork',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&auto=format',
    prompt: 'soft pastel art, dreamy colors, gentle textures, artistic',
    style: 'pastel, soft, dreamy',
    category: 'artistic'
  },

  // FANTASY CATEGORY
  {
    id: 'surrealism',
    name: 'Surrealism',
    description: 'Dreamlike surrealist imagery',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f5a?w=400&h=400&fit=crop&auto=format',
    prompt: 'surrealist art, dreamlike, impossible scenes, Salvador Dali inspired',
    style: 'surreal, dreamlike, fantasy',
    category: 'fantasy'
  },
  {
    id: 'fantasy-world',
    name: 'Fantasy World',
    description: 'Epic fantasy landscapes and creatures',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&auto=format',
    prompt: 'epic fantasy art, magical landscapes, mythical creatures, cinematic',
    style: 'fantasy, magical, epic',
    category: 'fantasy'
  },
  {
    id: 'sci-fi',
    name: 'Sci-Fi Concept',
    description: 'Futuristic science fiction worlds',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=400&fit=crop&auto=format',
    prompt: 'sci-fi concept art, futuristic technology, space exploration, cinematic',
    style: 'sci-fi, futuristic, concept',
    category: 'fantasy'
  },
  {
    id: 'dark-fantasy',
    name: 'Dark Fantasy',
    description: 'Gothic and dark magical worlds',
    imageUrl: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=400&fit=crop&auto=format',
    prompt: 'dark fantasy art, gothic, mysterious, magical darkness, dramatic',
    style: 'dark, gothic, mysterious',
    category: 'fantasy'
  },
  {
    id: 'fairy-tale',
    name: 'Fairy Tale',
    description: 'Whimsical storybook illustration',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=400&fit=crop&auto=format',
    prompt: 'fairy tale illustration, whimsical, enchanted, storybook style',
    style: 'fairy tale, whimsical, enchanted',
    category: 'fantasy'
  },
  {
    id: 'steampunk',
    name: 'Steampunk',
    description: 'Victorian-era mechanical aesthetics',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop&auto=format',
    prompt: 'steampunk art, Victorian era, brass machinery, gears, industrial',
    style: 'steampunk, Victorian, mechanical',
    category: 'fantasy'
  },

  // DIGITAL CATEGORY
  {
    id: 'cyberpunk',
    name: 'Cyberpunk City',
    description: 'Neon-lit futuristic cityscape with electric atmosphere',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=400&fit=crop&auto=format',
    prompt: 'cyberpunk city with neon lights, futuristic architecture, rain-soaked streets',
    style: 'cyberpunk, neon, futuristic',
    category: 'digital'
  },
  {
    id: 'digital-art',
    name: 'Digital Art',
    description: 'Vibrant modern digital illustration',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3a3e?w=400&h=400&fit=crop&auto=format',
    prompt: 'digital art illustration, vibrant colors, modern style',
    style: 'digital art, illustration, vibrant',
    category: 'digital'
  },
  {
    id: 'anime',
    name: 'Anime Style',
    description: 'Japanese anime and manga aesthetics',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop&auto=format',
    prompt: 'anime style illustration, manga art, Japanese animation',
    style: 'anime, manga, japanese',
    category: 'digital'
  },
  {
    id: '3d-render',
    name: '3D Render',
    description: 'Clean 3D rendered graphics',
    imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop&auto=format',
    prompt: '3D render, CGI, octane render, high quality, studio lighting',
    style: '3D, render, CGI',
    category: 'digital'
  },
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    description: 'Retro pixel-based game art',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop&auto=format',
    prompt: 'pixel art, 16-bit style, retro gaming, nostalgic',
    style: 'pixel, retro, gaming',
    category: 'digital'
  },
  {
    id: 'vector',
    name: 'Vector Graphics',
    description: 'Clean flat vector illustrations',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop&auto=format',
    prompt: 'vector illustration, flat design, clean lines, modern graphic',
    style: 'vector, flat, clean',
    category: 'digital'
  },

  // VINTAGE CATEGORY
  {
    id: 'pop-art',
    name: 'Pop Art',
    description: 'Bold pop art style like Warhol',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=400&fit=crop&auto=format',
    prompt: 'pop art style, bold colors, Andy Warhol inspired, comic book aesthetic',
    style: 'pop art, bold, retro',
    category: 'vintage'
  },
  {
    id: 'noir',
    name: 'Film Noir',
    description: 'Dramatic black and white cinema style',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=400&fit=crop&auto=format',
    prompt: 'film noir style, dramatic shadows, black and white, cinematic lighting',
    style: 'noir, dramatic, cinematic',
    category: 'vintage'
  },
  {
    id: 'retro-80s',
    name: 'Retro 80s',
    description: 'Nostalgic 80s synthwave aesthetic',
    imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop&auto=format',
    prompt: 'retro 80s aesthetic, synthwave, neon colors, vintage tech',
    style: 'retro, 80s, synthwave',
    category: 'vintage'
  },
  {
    id: 'vintage-photo',
    name: 'Vintage Photography',
    description: 'Aged film photography look',
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&h=400&fit=crop&auto=format',
    prompt: 'vintage photography, aged film, sepia tones, nostalgic',
    style: 'vintage, film, nostalgic',
    category: 'vintage'
  },
  {
    id: 'art-deco',
    name: 'Art Deco',
    description: '1920s glamorous geometric style',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=400&fit=crop&auto=format',
    prompt: 'art deco style, 1920s glamour, geometric patterns, gold accents',
    style: 'art deco, geometric, glamour',
    category: 'vintage'
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    description: 'Instant camera aesthetic',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&auto=format',
    prompt: 'polaroid photo style, instant camera, warm tones, casual snapshot',
    style: 'polaroid, instant, warm',
    category: 'vintage'
  },

  // EXPERIMENTAL CATEGORY
  {
    id: 'abstract',
    name: 'Abstract Art',
    description: 'Bold abstract shapes and colors',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop&auto=format',
    prompt: 'abstract art, bold colors, geometric shapes, modern composition',
    style: 'abstract, bold, geometric',
    category: 'experimental'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, elegant minimal compositions',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop&auto=format',
    prompt: 'minimalist design, clean composition, simple shapes, elegant',
    style: 'minimalist, clean, elegant',
    category: 'experimental'
  },
  {
    id: 'glitch',
    name: 'Glitch Art',
    description: 'Digital distortion aesthetic',
    imageUrl: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&h=400&fit=crop&auto=format',
    prompt: 'glitch art, digital distortion, RGB split, corrupted data aesthetic',
    style: 'glitch, digital, distorted',
    category: 'experimental'
  },
  {
    id: 'double-exposure',
    name: 'Double Exposure',
    description: 'Layered photographic effect',
    imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&h=400&fit=crop&auto=format',
    prompt: 'double exposure photography, layered images, artistic blend, surreal',
    style: 'double exposure, layered, artistic',
    category: 'experimental'
  },
  {
    id: 'low-poly',
    name: 'Low Poly',
    description: 'Geometric polygon art style',
    imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop&auto=format',
    prompt: 'low poly art, geometric polygons, faceted style, modern',
    style: 'low poly, geometric, faceted',
    category: 'experimental'
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    description: 'Vibrant neon light effects',
    imageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=400&fit=crop&auto=format',
    prompt: 'neon glow art, vibrant lights, electric colors, glowing effect',
    style: 'neon, glow, vibrant',
    category: 'experimental'
  }
];

export const StylePresetsGallery = ({ onStyleSelect, onCombinedStylesSelect }: StylePresetsGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewStyle, setPreviewStyle] = useState<StylePreset | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<StylePreset[]>([]);
  const [isMixMode, setIsMixMode] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (stored) {
      try {
        setFavoriteIds(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
      }
    }
  }, []);

  // Save favorites to localStorage when they change
  const saveFavorites = (ids: string[]) => {
    setFavoriteIds(ids);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  };

  const toggleFavorite = (presetId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isFav = favoriteIds.includes(presetId);
    const newFavorites = isFav 
      ? favoriteIds.filter(id => id !== presetId)
      : [...favoriteIds, presetId];
    saveFavorites(newFavorites);
    toast({
      title: isFav ? "Removed from favorites" : "Added to favorites",
      description: isFav ? "Style removed from your favorites" : "Style saved to your favorites for quick access"
    });
  };

  const filteredPresets = useMemo(() => {
    return stylePresets.filter(preset => {
      const matchesFavorites = selectedCategory === 'favorites' ? favoriteIds.includes(preset.id) : true;
      const matchesCategory = selectedCategory === 'all' || selectedCategory === 'favorites' || preset.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.style.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFavorites && matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, favoriteIds]);

  const combinedPrompt = useMemo(() => {
    if (selectedStyles.length === 0) return '';
    const prompts = selectedStyles.map(s => s.prompt);
    return prompts.join(', ');
  }, [selectedStyles]);

  const toggleStyleSelection = (preset: StylePreset) => {
    setSelectedStyles(prev => {
      const isSelected = prev.some(s => s.id === preset.id);
      if (isSelected) {
        return prev.filter(s => s.id !== preset.id);
      }
      if (prev.length >= 3) {
        toast({
          title: "Maximum styles reached",
          description: "You can combine up to 3 styles at a time",
          variant: "destructive"
        });
        return prev;
      }
      return [...prev, preset];
    });
  };

  const handleCardClick = (preset: StylePreset, e: React.MouseEvent) => {
    if (isMixMode) {
      e.stopPropagation();
      toggleStyleSelection(preset);
    } else {
      setPreviewStyle(preset);
    }
  };

  const handleUseStyle = (preset: StylePreset) => {
    onStyleSelect?.(preset);
    setPreviewStyle(null);
  };

  const handleUseCombinedStyles = () => {
    if (selectedStyles.length > 0) {
      onCombinedStylesSelect?.(selectedStyles, combinedPrompt);
      toast({
        title: "Styles combined!",
        description: `Created a hybrid style from ${selectedStyles.length} styles`
      });
    }
  };

  const copyPromptToClipboard = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Copied!",
      description: "Style prompt copied to clipboard"
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-ai-accent/10 border border-ai-accent/20 text-ai-accent text-sm font-medium mb-4">
            <Palette className="w-4 h-4 mr-2" />
            AI Style Presets
          </div>
          
          <h2 className="section-title text-gray-900 mb-6">
            Choose Your <span className="text-gradient-ai">Creative Style</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select from our curated collection of AI art styles. Each preset applies professional 
            styling to transform your text prompts into stunning visuals.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search and Mix Mode Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white border-gray-200 focus:border-ai-accent focus:ring-ai-accent/20"
              />
            </div>
            <Button
              onClick={() => {
                setIsMixMode(!isMixMode);
                if (isMixMode) setSelectedStyles([]);
              }}
              className={`h-12 px-6 ${
                isMixMode 
                  ? 'bg-ai-accent text-white hover:bg-ai-accent/90' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Layers className="h-4 w-4 mr-2" />
              {isMixMode ? 'Exit Mix Mode' : 'Mix Styles'}
            </Button>
          </div>

          {/* Mix Mode Instructions */}
          {isMixMode && (
            <div className="max-w-2xl mx-auto bg-ai-accent/10 border border-ai-accent/20 rounded-xl p-4 animate-fade-in">
              <div className="flex items-start gap-3">
                <Wand2 className="h-5 w-5 text-ai-accent mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Style Mixing Mode Active</p>
                  <p className="text-sm text-gray-600">Select up to 3 styles to combine them into a unique hybrid style</p>
                </div>
              </div>
            </div>
          )}

          {/* Selected Styles Display */}
          {selectedStyles.length > 0 && (
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-4 shadow-sm animate-fade-in">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-sm font-medium text-gray-700">Selected ({selectedStyles.length}/3):</span>
                {selectedStyles.map(style => (
                  <div 
                    key={style.id}
                    className="flex items-center gap-2 bg-ai-accent/10 px-3 py-1.5 rounded-full"
                  >
                    <span className="text-sm font-medium text-ai-accent">{style.name}</span>
                    <button 
                      onClick={() => toggleStyleSelection(style)}
                      className="text-ai-accent hover:text-ai-accent/70"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Combined Prompt:</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{combinedPrompt}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyPromptToClipboard(combinedPrompt)}
                    className="h-10"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleUseCombinedStyles}
                    className="h-10 bg-ai-accent text-white hover:bg-ai-accent/90"
                  >
                    <Wand2 className="h-4 w-4 mr-1" />
                    Use Combined
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-ai-accent text-white shadow-lg shadow-ai-accent/25'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-center text-sm text-gray-500">
            Showing {filteredPresets.length} of {stylePresets.length} styles
          </p>
        </div>

        {/* Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredPresets.map((preset, index) => {
            const isSelected = selectedStyles.some(s => s.id === preset.id);
            return (
              <div
                key={preset.id}
                className="animate-fade-in"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <Card 
                  className={`ai-card-modern group cursor-pointer h-full transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-ai-accent ring-offset-2' : ''
                  } ${isMixMode ? 'hover:ring-2 hover:ring-ai-accent/50' : ''}`} 
                  onClick={(e) => handleCardClick(preset, e)}
                >
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <LazyImage 
                        src={preset.imageUrl} 
                        alt={`${preset.name} AI art style example`}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        aspectRatio={1}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
                          {preset.category}
                        </span>
                      </div>

                      {/* Favorite Button */}
                      {!isMixMode && (
                        <button
                          onClick={(e) => toggleFavorite(preset.id, e)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            favoriteIds.includes(preset.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                          }`}
                          aria-label={favoriteIds.includes(preset.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart className={`h-4 w-4 ${favoriteIds.includes(preset.id) ? 'fill-current' : ''}`} />
                        </button>
                      )}

                      {/* Selection Indicator */}
                      {isMixMode && (
                        <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'bg-ai-accent text-white' 
                            : 'bg-white/80 border-2 border-gray-300'
                        }`}>
                          {isSelected && <Check className="h-4 w-4" />}
                        </div>
                      )}
                      
                      {/* Overlay Actions */}
                      {!isMixMode && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex flex-col sm:flex-row gap-2 p-2">
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewStyle(preset);
                              }}
                              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 focus:ring-2 focus:ring-white/50 min-h-[44px] px-3 text-xs sm:text-sm whitespace-nowrap"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Preview
                            </Button>
                            <Button 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUseStyle(preset);
                              }}
                              className="bg-ai-neon text-ai-dark hover:bg-ai-accent focus:ring-2 focus:ring-ai-neon/50 min-h-[44px] px-3 text-xs sm:text-sm whitespace-nowrap"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Use Style
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-ai-primary transition-colors">
                        {preset.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
                        {preset.description}
                      </p>
                      
                      {/* Style Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {preset.style.split(', ').slice(0, 3).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-0.5 bg-ai-accent/10 text-ai-accent text-xs font-medium rounded-full border border-ai-accent/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPresets.length === 0 && (
          <div className="text-center py-12">
            {selectedCategory === 'favorites' ? (
              <>
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No favorites yet</h3>
                <p className="text-gray-500">Click the heart icon on any style to save it here for quick access</p>
              </>
            ) : (
              <>
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No styles found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button className="btn-ai-primary group">
            Explore All 50+ Styles
            <Palette className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
          </Button>
          
          <p className="mt-4 text-sm text-gray-500">
            Mix and match styles to create unique AI-generated artwork
          </p>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={!!previewStyle} onOpenChange={() => setPreviewStyle(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {previewStyle && (
            <>
              {/* Large Image */}
              <div className="relative aspect-video">
                <img 
                  src={previewStyle.imageUrl.replace('w=400&h=400', 'w=800&h=600')} 
                  alt={previewStyle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize mb-2 inline-block">
                    {previewStyle.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{previewStyle.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{previewStyle.description}</p>
                
                {/* Example Prompt */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Example Prompt</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyPromptToClipboard(previewStyle.prompt)}
                      className="h-8 px-2"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 italic">"{previewStyle.prompt}"</p>
                </div>

                {/* Style Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {previewStyle.style.split(', ').map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 bg-ai-accent/10 text-ai-accent text-sm font-medium rounded-full border border-ai-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => toggleFavorite(previewStyle.id)}
                    className={favoriteIds.includes(previewStyle.id) ? 'text-red-500 border-red-500 hover:bg-red-50' : ''}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${favoriteIds.includes(previewStyle.id) ? 'fill-current' : ''}`} />
                    {favoriteIds.includes(previewStyle.id) ? 'Favorited' : 'Favorite'}
                  </Button>
                  <Button
                    className="flex-1 bg-ai-accent text-white hover:bg-ai-accent/90"
                    onClick={() => handleUseStyle(previewStyle)}
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Use This Style
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
