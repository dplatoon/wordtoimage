
import React, { useState, useMemo } from 'react';
import { Palette, Download, Eye, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LazyImage } from '@/components/common/LazyImage';
import { Input } from '@/components/ui/input';

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
}

const categories = [
  { id: 'all', label: 'All Styles', icon: Sparkles },
  { id: 'realistic', label: 'Realistic', icon: Eye },
  { id: 'artistic', label: 'Artistic', icon: Palette },
  { id: 'fantasy', label: 'Fantasy', icon: Sparkles },
  { id: 'digital', label: 'Digital', icon: Sparkles },
  { id: 'vintage', label: 'Vintage', icon: Sparkles },
  { id: 'experimental', label: 'Experimental', icon: Sparkles },
] as const;

const stylePresets: StylePreset[] = [
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
    id: 'watercolor',
    name: 'Watercolor Dreams',
    description: 'Soft, flowing artistic watercolor style',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop&auto=format',
    prompt: 'watercolor painting, soft brushstrokes, artistic blend of colors',
    style: 'watercolor, artistic, soft',
    category: 'artistic'
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
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Ultra-realistic photography quality',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format',
    prompt: 'photorealistic, ultra detailed, professional photography',
    style: 'photorealistic, detailed, professional',
    category: 'realistic'
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
    id: 'abstract',
    name: 'Abstract Art',
    description: 'Bold abstract shapes and colors',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop&auto=format',
    prompt: 'abstract art, bold colors, geometric shapes, modern composition',
    style: 'abstract, bold, geometric',
    category: 'experimental'
  },
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
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classical oil painting technique',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=400&fit=crop&auto=format',
    prompt: 'oil painting style, classical technique, rich textures, masterpiece quality',
    style: 'oil painting, classical, textured',
    category: 'artistic'
  },
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
    id: 'fantasy',
    name: 'Fantasy World',
    description: 'Epic fantasy landscapes and creatures',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&auto=format',
    prompt: 'epic fantasy art, magical landscapes, mythical creatures, cinematic',
    style: 'fantasy, magical, epic',
    category: 'fantasy'
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
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, elegant minimal compositions',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop&auto=format',
    prompt: 'minimalist design, clean composition, simple shapes, elegant',
    style: 'minimalist, clean, elegant',
    category: 'experimental'
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
    id: 'impressionism',
    name: 'Impressionist',
    description: 'Light and color like Monet',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=400&fit=crop&auto=format',
    prompt: 'impressionist painting, visible brushstrokes, light and color, Monet style',
    style: 'impressionist, painterly, classic',
    category: 'artistic'
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
    id: 'retro',
    name: 'Retro 80s',
    description: 'Nostalgic 80s synthwave aesthetic',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop&auto=format',
    prompt: 'retro 80s aesthetic, synthwave, neon colors, vintage tech',
    style: 'retro, 80s, synthwave',
    category: 'vintage'
  }
];

export const StylePresetsGallery = ({ onStyleSelect }: StylePresetsGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPresets = useMemo(() => {
    return stylePresets.filter(preset => {
      const matchesCategory = selectedCategory === 'all' || preset.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.style.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white border-gray-200 focus:border-ai-accent focus:ring-ai-accent/20"
            />
          </div>

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
          {filteredPresets.map((preset, index) => (
            <div
              key={preset.id}
              className="animate-fade-in"
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <Card className="ai-card-modern group cursor-pointer h-full" onClick={() => onStyleSelect?.(preset)}>
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
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-col sm:flex-row gap-2 p-2">
                        <Button 
                          size="sm" 
                          className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 focus:ring-2 focus:ring-white/50 min-h-[44px] px-3 text-xs sm:text-sm whitespace-nowrap"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-ai-neon text-ai-dark hover:bg-ai-accent focus:ring-2 focus:ring-ai-neon/50 min-h-[44px] px-3 text-xs sm:text-sm whitespace-nowrap"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Use Style
                        </Button>
                      </div>
                    </div>
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
          ))}
        </div>

        {/* Empty State */}
        {filteredPresets.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No styles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
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
    </section>
  );
};
