import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Sparkles, Camera, Paintbrush, Building, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StyleTagSuggestionsProps {
  onTagSelect: (tag: string) => void;
  className?: string;
}

const tagCategories = [
  {
    id: 'landscape',
    label: 'Landscape',
    icon: Camera,
    tags: [
      'watercolor landscape',
      'mountain sunset',
      'misty forest',
      'ocean waves',
      'desert dunes',
      'snowy peaks',
      'tropical beach',
      'autumn forest'
    ]
  },
  {
    id: 'portrait',
    label: 'Portrait',
    icon: Sparkles,
    tags: [
      'digital art portrait',
      'oil painting portrait',
      'realistic face',
      'anime character',
      'fantasy warrior',
      'elegant woman',
      'wise old man',
      'cyberpunk character'
    ]
  },
  {
    id: 'architecture',
    label: 'Architecture',
    icon: Building,
    tags: [
      'modern building',
      'gothic cathedral',
      'japanese temple',
      'futuristic city',
      'cozy cottage',
      'glass skyscraper',
      'ancient ruins',
      'space station'
    ]
  },
  {
    id: 'artistic',
    label: 'Artistic Style',
    icon: Palette,
    tags: [
      'impressionist style',
      'pop art',
      'minimalist design',
      'surreal art',
      'abstract painting',
      'street art',
      'renaissance style',
      'art nouveau'
    ]
  }
];

export function StyleTagSuggestions({ onTagSelect, className }: StyleTagSuggestionsProps) {
  const [activeCategory, setActiveCategory] = useState('landscape');

  const handleTagClick = (tag: string) => {
    onTagSelect(tag);
  };

  return (
    <Card className={cn("border-gray-200 bg-white/80 backdrop-blur", className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Paintbrush className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">
            Quick Style Tags
          </h3>
          <Badge variant="secondary" className="text-xs">
            Click to add
          </Badge>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            {tagCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-1 text-xs"
              >
                <category.icon className="h-3 w-3" />
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tagCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {category.tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTagClick(tag)}
                      className="w-full justify-start h-auto p-2 text-left hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-200"
                    >
                      <Plus className="h-3 w-3 mr-1.5 opacity-60" />
                      <span className="text-xs leading-relaxed">{tag}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            💡 These tags will be added to your current prompt to enhance the style
          </p>
        </div>
      </CardContent>
    </Card>
  );
}