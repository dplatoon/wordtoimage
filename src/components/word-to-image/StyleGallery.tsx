
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Palette, Camera, Sun, Brush } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Style {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  prompt: string;
}

const STYLE_CATEGORIES = {
  artistic: { label: 'Artistic', icon: Brush },
  photography: { label: 'Photography', icon: Camera },
  lighting: { label: 'Lighting', icon: Sun },
  color: { label: 'Color Tone', icon: Palette }
};

const STYLES: Style[] = [
  // Artistic styles
  {
    id: 'watercolor',
    name: 'Watercolor',
    category: 'artistic',
    description: 'Soft, flowing watercolor painting style',
    preview: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop',
    prompt: 'watercolor painting style, soft brushstrokes, flowing colors'
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    category: 'artistic',
    description: 'Classic oil painting with rich textures',
    preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    prompt: 'oil painting style, thick paint strokes, classical art'
  },
  {
    id: 'digital-art',
    name: 'Digital Art',
    category: 'artistic',
    description: 'Modern digital illustration style',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop',
    prompt: 'digital art style, clean lines, vibrant colors'
  },
  {
    id: 'anime',
    name: 'Anime',
    category: 'artistic',
    description: 'Japanese anime/manga style',
    preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    prompt: 'anime style, manga art, Japanese animation'
  },
  // Photography styles
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    category: 'photography',
    description: 'Ultra-realistic photography style',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    prompt: 'photorealistic, high detail, professional photography'
  },
  {
    id: 'portrait',
    name: 'Portrait',
    category: 'photography',
    description: 'Professional portrait photography',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    prompt: 'portrait photography, professional lighting, shallow depth of field'
  },
  {
    id: 'landscape',
    name: 'Landscape',
    category: 'photography',
    description: 'Scenic landscape photography',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    prompt: 'landscape photography, wide angle, natural lighting'
  },
  // Lighting styles
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    category: 'lighting',
    description: 'Warm, golden sunset lighting',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    prompt: 'golden hour lighting, warm tones, soft shadows'
  },
  {
    id: 'dramatic',
    name: 'Dramatic',
    category: 'lighting',
    description: 'High contrast dramatic lighting',
    preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
    prompt: 'dramatic lighting, high contrast, moody atmosphere'
  },
  // Color styles
  {
    id: 'vibrant',
    name: 'Vibrant',
    category: 'color',
    description: 'Bright, saturated colors',
    preview: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop',
    prompt: 'vibrant colors, high saturation, bright palette'
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    category: 'color',
    description: 'Black and white or single color',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&auto=format&cs=monochrome',
    prompt: 'monochrome, black and white, single color tone'
  }
];

interface StyleGalleryProps {
  selectedStyles: string[];
  onStyleToggle: (styleId: string) => void;
  onApplyStyle: (prompt: string) => void;
}

export function StyleGallery({ selectedStyles, onStyleToggle, onApplyStyle }: StyleGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('artistic');

  const filteredStyles = STYLES.filter(style => style.category === activeCategory);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Style Gallery</h3>
          <Badge variant="secondary" className="text-xs">
            {selectedStyles.length} selected
          </Badge>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            {Object.entries(STYLE_CATEGORIES).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={key} value={key} className="flex items-center gap-1">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.keys(STYLE_CATEGORIES).map(category => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredStyles.map((style, index) => (
                  <motion.div
                    key={style.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                      selectedStyles.includes(style.id)
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => onStyleToggle(style.id)}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={style.preview}
                        alt={style.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            onApplyStyle(style.prompt);
                          }}
                          className="bg-white/90 hover:bg-white text-gray-900"
                        >
                          Apply Style
                        </Button>
                      </div>
                      {selectedStyles.includes(style.id) && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <h4 className="font-medium text-sm text-gray-800">{style.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {selectedStyles.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedStyles.length} style{selectedStyles.length !== 1 ? 's' : ''} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => selectedStyles.forEach(id => onStyleToggle(id))}
              >
                Clear All
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
