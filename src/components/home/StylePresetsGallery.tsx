
import React from 'react';
import { Palette, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LazyImage } from '@/components/common/LazyImage';

interface StylePreset {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  prompt: string;
  style: string;
}

interface StylePresetsGalleryProps {
  onStyleSelect?: (preset: StylePreset) => void;
}

const stylePresets: StylePreset[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk City',
    description: 'Neon-lit futuristic cityscape with electric atmosphere',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=400&fit=crop&auto=format',
    prompt: 'cyberpunk city with neon lights, futuristic architecture, rain-soaked streets',
    style: 'cyberpunk, neon, futuristic'
  },
  {
    id: 'watercolor',
    name: 'Watercolor Dreams',
    description: 'Soft, flowing artistic watercolor style',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop&auto=format',
    prompt: 'watercolor painting, soft brushstrokes, artistic blend of colors',
    style: 'watercolor, artistic, soft'
  },
  {
    id: 'digital-art',
    name: 'Digital Art',
    description: 'Vibrant modern digital illustration',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3a3e?w=400&h=400&fit=crop&auto=format',
    prompt: 'digital art illustration, vibrant colors, modern style',
    style: 'digital art, illustration, vibrant'
  },
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Ultra-realistic photography quality',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format',
    prompt: 'photorealistic, ultra detailed, professional photography',
    style: 'photorealistic, detailed, professional'
  },
  {
    id: 'anime',
    name: 'Anime Style',
    description: 'Japanese anime and manga aesthetics',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop&auto=format',
    prompt: 'anime style illustration, manga art, Japanese animation',
    style: 'anime, manga, japanese'
  },
  {
    id: 'abstract',
    name: 'Abstract Art',
    description: 'Bold abstract shapes and colors',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop&auto=format',
    prompt: 'abstract art, bold colors, geometric shapes, modern composition',
    style: 'abstract, bold, geometric'
  },
  {
    id: 'surrealism',
    name: 'Surrealism',
    description: 'Dreamlike surrealist imagery',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f5a?w=400&h=400&fit=crop&auto=format',
    prompt: 'surrealist art, dreamlike, impossible scenes, Salvador Dali inspired',
    style: 'surreal, dreamlike, fantasy'
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classical oil painting technique',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=400&fit=crop&auto=format',
    prompt: 'oil painting style, classical technique, rich textures, masterpiece quality',
    style: 'oil painting, classical, textured'
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    description: 'Bold pop art style like Warhol',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=400&fit=crop&auto=format',
    prompt: 'pop art style, bold colors, Andy Warhol inspired, comic book aesthetic',
    style: 'pop art, bold, retro'
  },
  {
    id: 'fantasy',
    name: 'Fantasy World',
    description: 'Epic fantasy landscapes and creatures',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&auto=format',
    prompt: 'epic fantasy art, magical landscapes, mythical creatures, cinematic',
    style: 'fantasy, magical, epic'
  },
  {
    id: 'noir',
    name: 'Film Noir',
    description: 'Dramatic black and white cinema style',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=400&fit=crop&auto=format',
    prompt: 'film noir style, dramatic shadows, black and white, cinematic lighting',
    style: 'noir, dramatic, cinematic'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, elegant minimal compositions',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop&auto=format',
    prompt: 'minimalist design, clean composition, simple shapes, elegant',
    style: 'minimalist, clean, elegant'
  }
];

export const StylePresetsGallery = ({ onStyleSelect }: StylePresetsGalleryProps) => {
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

        {/* Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stylePresets.map((preset, index) => (
            <div
              key={preset.id}
              className="animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
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
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ai-primary transition-colors">
                      {preset.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {preset.description}
                    </p>
                    
                    {/* Style Tags */}
                    <div className="flex flex-wrap gap-2">
                      {preset.style.split(', ').map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-3 py-1 bg-ai-accent/10 text-ai-accent text-xs font-medium rounded-full border border-ai-accent/20"
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
