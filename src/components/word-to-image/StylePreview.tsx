
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Palette, Camera, Brush, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StyleOption {
  id: string;
  name: string;
  description: string;
  category: 'realistic' | 'artistic' | 'anime' | 'digital';
  preview: string;
  popular: boolean;
}

interface StylePreviewProps {
  selectedStyles: string[];
  onStyleToggle: (styleId: string) => void;
  onStyleCombine: (styles: string[]) => void;
  className?: string;
}

export function StylePreview({ 
  selectedStyles, 
  onStyleToggle, 
  onStyleCombine,
  className 
}: StylePreviewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('realistic');

  const styleOptions: StyleOption[] = [
    {
      id: 'photorealistic',
      name: 'Photorealistic',
      description: 'Ultra-realistic photographs',
      category: 'realistic',
      preview: '/lovable-uploads/53e8165c-d2db-4f0c-9509-f0e76e5c179f.png',
      popular: true
    },
    {
      id: 'cinematic',
      name: 'Cinematic',
      description: 'Movie-like dramatic scenes',
      category: 'realistic',
      preview: '/lovable-uploads/60da266c-4810-4f41-9449-ae54c2026373.png',
      popular: true
    },
    {
      id: 'digital-art',
      name: 'Digital Art',
      description: 'Modern digital illustrations',
      category: 'digital',
      preview: '/lovable-uploads/7f38eaf1-216c-4148-b05c-9a2f87de6ffc.png',
      popular: true
    },
    {
      id: 'anime',
      name: 'Anime Style',
      description: 'Japanese anime/manga style',
      category: 'anime',
      preview: '/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png',
      popular: true
    },
    {
      id: 'watercolor',
      name: 'Watercolor',
      description: 'Soft watercolor paintings',
      category: 'artistic',
      preview: '/lovable-uploads/9baa5403-54fd-4d41-9dff-b6762b238e3e.png',
      popular: false
    },
    {
      id: 'oil-painting',
      name: 'Oil Painting',
      description: 'Classical oil painting style',
      category: 'artistic',
      preview: '/lovable-uploads/c0cd939b-5fe6-4732-af93-ee61f070b689.png',
      popular: false
    }
  ];

  const categories = [
    { id: 'realistic', name: 'Realistic', icon: Camera },
    { id: 'artistic', name: 'Artistic', icon: Brush },
    { id: 'digital', name: 'Digital', icon: Zap },
    { id: 'anime', name: 'Anime', icon: Sparkles }
  ];

  const filteredStyles = styleOptions.filter(style => style.category === activeCategory);
  const popularStyles = styleOptions.filter(style => style.popular);

  const handleCombineSelected = () => {
    if (selectedStyles.length > 1) {
      onStyleCombine(selectedStyles);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Popular Styles Quick Access */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Palette className="h-5 w-5 mr-2 text-violet-600" />
            Popular Styles
          </h3>
          {selectedStyles.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCombineSelected}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Combine Selected ({selectedStyles.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {popularStyles.map((style) => (
            <Card
              key={style.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md",
                selectedStyles.includes(style.id) 
                  ? "ring-2 ring-violet-500 bg-violet-50" 
                  : "hover:border-violet-300"
              )}
              onClick={() => onStyleToggle(style.id)}
            >
              <CardContent className="p-3">
                <AspectRatio ratio={1} className="mb-2">
                  <img
                    src={style.preview}
                    alt={style.name}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                  />
                </AspectRatio>
                <div className="text-center">
                  <h4 className="font-medium text-sm text-gray-800">{style.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Styles by Category */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Browse All Styles</h3>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStyles.map((style) => (
                  <Card
                    key={style.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md",
                      selectedStyles.includes(style.id) 
                        ? "ring-2 ring-violet-500 bg-violet-50" 
                        : "hover:border-violet-300"
                    )}
                    onClick={() => onStyleToggle(style.id)}
                  >
                    <CardContent className="p-4">
                      <AspectRatio ratio={4/3} className="mb-3">
                        <img
                          src={style.preview}
                          alt={style.name}
                          className="w-full h-full object-cover rounded"
                          loading="lazy"
                        />
                      </AspectRatio>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">{style.name}</h4>
                          <p className="text-sm text-gray-500">{style.description}</p>
                        </div>
                        {style.popular && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Selected Styles Summary */}
      {selectedStyles.length > 0 && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-800 mb-2">Selected Styles ({selectedStyles.length})</h4>
            <div className="flex flex-wrap gap-2">
              {selectedStyles.map((styleId) => {
                const style = styleOptions.find(s => s.id === styleId);
                return style ? (
                  <Badge
                    key={styleId}
                    variant="secondary"
                    className="bg-violet-100 text-violet-800"
                  >
                    {style.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
