
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Sparkles, Camera, Brush, Zap, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STYLE_PRESETS, STYLE_CATEGORIES, StylePreset } from '@/data/stylePresets';
import { StyleCard } from './StyleCard';

interface EnhancedStyleBrowserProps {
  selectedStyles: string[];
  onStyleToggle: (styleId: string) => void;
  onGenerateWithStyles?: (styles: string[]) => void;
  maxSelections?: number;
  className?: string;
}

const categoryIcons = {
  realistic: Camera,
  artistic: Brush,
  digital: Zap,
  anime: Sparkles
};

export function EnhancedStyleBrowser({ 
  selectedStyles, 
  onStyleToggle, 
  onGenerateWithStyles,
  maxSelections = 3,
  className 
}: EnhancedStyleBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<string>('realistic');

  const popularStyles = STYLE_PRESETS.filter(style => style.popular);
  const trendingStyles = STYLE_PRESETS.filter(style => style.trending);
  const filteredStyles = STYLE_PRESETS.filter(style => style.category === activeCategory);

  const canSelectMore = selectedStyles.length < maxSelections;

  const handleStyleClick = (styleId: string) => {
    const isSelected = selectedStyles.includes(styleId);
    
    if (isSelected) {
      onStyleToggle(styleId);
    } else if (canSelectMore) {
      onStyleToggle(styleId);
    }
  };

  const handleCombineSelected = () => {
    if (selectedStyles.length > 0 && onGenerateWithStyles) {
      onGenerateWithStyles(selectedStyles);
    }
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
              <Palette className="h-5 w-5 text-violet-600" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Style</h2>
              <p className="text-gray-600">Select up to {maxSelections} styles to create unique variations</p>
            </div>
          </div>
          {selectedStyles.length > 0 && (
            <div className="ml-auto">
              <Badge variant="outline" className="text-violet-600 border-violet-200">
                {selectedStyles.length}/{maxSelections} selected
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Trending Styles */}
      {trendingStyles.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-800">Trending Now</h3>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingStyles.map((style) => (
              <StyleCard
                key={style.id}
                style={style}
                isSelected={selectedStyles.includes(style.id)}
                onSelect={handleStyleClick}
                size="small"
                showCategory={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Popular Styles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Popular Styles</h3>
          </div>
          {selectedStyles.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCombineSelected}
              className="flex items-center gap-2 bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100"
            >
              <Wand2 className="h-4 w-4" />
              Generate with Selected ({selectedStyles.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularStyles.map((style) => (
            <StyleCard
              key={style.id}
              style={style}
              isSelected={selectedStyles.includes(style.id)}
              onSelect={handleStyleClick}
              size="medium"
            />
          ))}
        </div>
      </div>

      {/* Browse All Styles by Category */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Browse All Styles</h3>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {STYLE_CATEGORIES.map((category) => {
              const IconComponent = categoryIcons[category.id];
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {STYLE_CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">{category.name} Styles</h4>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStyles.map((style) => (
                  <StyleCard
                    key={style.id}
                    style={style}
                    isSelected={selectedStyles.includes(style.id)}
                    onSelect={handleStyleClick}
                    size="large"
                    showCategory={false}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Selection Summary */}
      {selectedStyles.length > 0 && (
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-violet-900 mb-2">
                Selected Styles ({selectedStyles.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedStyles.map((styleId) => {
                  const style = STYLE_PRESETS.find(s => s.id === styleId);
                  return style ? (
                    <Badge
                      key={styleId}
                      variant="secondary"
                      className="bg-violet-100 text-violet-800 border-violet-300"
                    >
                      {style.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
            {onGenerateWithStyles && (
              <Button 
                onClick={handleCombineSelected}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Images
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          💡 <strong>Pro tip:</strong> Combine different styles to create unique artistic variations of your images
        </p>
      </div>
    </div>
  );
}
