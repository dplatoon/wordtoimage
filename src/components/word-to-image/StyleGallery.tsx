
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Palette, Check, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Style {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'Artistic' | 'Photographic' | 'Digital' | 'Abstract';
  premium?: boolean;
}

const STYLE_PRESETS: Style[] = [
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Ultra-realistic photography style',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
    category: 'Photographic'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft, flowing watercolor painting',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop',
    category: 'Artistic'
  },
  {
    id: 'digital-art',
    name: 'Digital Art',
    description: 'Modern digital illustration',
    imageUrl: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=200&h=200&fit=crop',
    category: 'Digital'
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classic oil painting technique',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
    category: 'Artistic',
    premium: true
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon-lit futuristic aesthetic',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop',
    category: 'Digital'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple compositions',
    imageUrl: 'https://images.unsplash.com/photo-1497436072909-f5e4fd1d03a9?w=200&h=200&fit=crop',
    category: 'Abstract'
  }
];

interface StyleGalleryProps {
  selectedStyles: string[];
  onStyleToggle: (styleId: string) => void;
  onGenerateWithStyles: (styles: string[]) => void;
  maxSelections?: number;
}

export function StyleGallery({ 
  selectedStyles, 
  onStyleToggle, 
  onGenerateWithStyles, 
  maxSelections = 3 
}: StyleGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(STYLE_PRESETS.map(s => s.category)))];
  
  const filteredStyles = selectedCategory === 'All' 
    ? STYLE_PRESETS 
    : STYLE_PRESETS.filter(s => s.category === selectedCategory);

  const canSelectMore = selectedStyles.length < maxSelections;

  const handleStyleClick = (styleId: string) => {
    const isSelected = selectedStyles.includes(styleId);
    
    if (isSelected) {
      onStyleToggle(styleId);
    } else if (canSelectMore) {
      onStyleToggle(styleId);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Style Gallery
          <Badge variant="outline" className="ml-auto">
            {selectedStyles.length}/{maxSelections} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredStyles.map((style, index) => {
            const isSelected = selectedStyles.includes(style.id);
            const canSelect = canSelectMore || isSelected;
            
            return (
              <div
                key={style.id}
                className={cn(
                  "relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 animate-fade-in",
                  isSelected 
                    ? "border-blue-500 ring-2 ring-blue-200" 
                    : canSelect 
                    ? "border-gray-200 hover:border-gray-300" 
                    : "border-gray-100 opacity-50 cursor-not-allowed",
                  style.premium && "ring-1 ring-yellow-300"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleStyleClick(style.id)}
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={style.imageUrl}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-200",
                    isSelected 
                      ? "bg-blue-600/20" 
                      : "bg-black/0 group-hover:bg-black/10"
                  )} />
                  
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  {/* Premium badge */}
                  {style.premium && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-yellow-500 text-yellow-900 text-xs">
                        Pro
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 bg-white">
                  <h4 className="font-medium text-sm text-gray-900 mb-1">
                    {style.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {style.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {style.category}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* Generate button */}
        {selectedStyles.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-blue-900">
                {selectedStyles.length} style{selectedStyles.length > 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-blue-700">
                Generate variations with different artistic styles
              </p>
            </div>
            <Button 
              onClick={() => onGenerateWithStyles(selectedStyles)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>
        )}

        {/* Help text */}
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            💡 Select up to {maxSelections} styles to create variations of your image
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
