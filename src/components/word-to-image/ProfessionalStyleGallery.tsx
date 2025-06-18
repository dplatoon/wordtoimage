
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Sparkles, Palette, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { STYLE_PRESETS, STYLE_CATEGORIES } from '@/data/stylePresets';
import { ProfessionalStyleCard } from './ProfessionalStyleCard';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfessionalStyleGalleryProps {
  selectedStyles: string[];
  onStyleToggle: (styleId: string) => void;
  onGenerateWithStyles: (styles: string[]) => void;
}

export function ProfessionalStyleGallery({
  selectedStyles,
  onStyleToggle,
  onGenerateWithStyles
}: ProfessionalStyleGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const isMobile = useIsMobile();

  const filteredStyles = STYLE_PRESETS.filter(style => {
    const matchesSearch = style.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         style.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         style.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || style.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const popularStyles = filteredStyles.filter(style => style.popular);
  const trendingStyles = filteredStyles.filter(style => style.trending);

  return (
    <div className="space-y-6">
      {/* Professional header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mr-4">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Professional Art Styles</h2>
            <p className="text-gray-600">Choose from 50+ curated artistic styles</p>
          </div>
        </div>

        {/* Selection summary */}
        {selectedStyles.length > 0 && (
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-violet-600 mr-2" />
                <span className="font-semibold text-violet-900">
                  {selectedStyles.length} style{selectedStyles.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <Button 
                onClick={() => onGenerateWithStyles(selectedStyles)}
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate with Styles
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Professional search and filters */}
      <div className="space-y-4">
        <div className={cn(
          "flex gap-4",
          isMobile ? "flex-col" : "flex-row items-center"
        )}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search styles, descriptions, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200 focus:border-violet-300 focus:ring-violet-200"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-violet-600 hover:bg-violet-700' : ''}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-violet-600 hover:bg-violet-700' : ''}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className={cn(
              "transition-all duration-200",
              selectedCategory === 'all' 
                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg' 
                : 'hover:bg-violet-50 hover:border-violet-300'
            )}
          >
            All Styles
          </Button>
          {STYLE_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "transition-all duration-200 capitalize",
                selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg' 
                  : 'hover:bg-violet-50 hover:border-violet-300'
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Professional tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="all" className="data-[state=active]:bg-white">All Styles</TabsTrigger>
          <TabsTrigger value="popular" className="data-[state=active]:bg-white">Popular</TabsTrigger>
          <TabsTrigger value="trending" className="data-[state=active]:bg-white">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' 
              ? isMobile 
                ? "grid-cols-1 sm:grid-cols-2" 
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          )}>
            {filteredStyles.map((style) => (
              <ProfessionalStyleCard
                key={style.id}
                style={style}
                isSelected={selectedStyles.includes(style.id)}
                onSelect={onStyleToggle}
                size={viewMode === 'list' ? 'large' : 'medium'}
                showCategory={true}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' 
              ? isMobile 
                ? "grid-cols-1 sm:grid-cols-2" 
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          )}>
            {popularStyles.map((style) => (
              <ProfessionalStyleCard
                key={style.id}
                style={style}
                isSelected={selectedStyles.includes(style.id)}
                onSelect={onStyleToggle}
                size={viewMode === 'list' ? 'large' : 'medium'}
                showCategory={true}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' 
              ? isMobile 
                ? "grid-cols-1 sm:grid-cols-2" 
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          )}>
            {trendingStyles.map((style) => (
              <ProfessionalStyleCard
                key={style.id}
                style={style}
                isSelected={selectedStyles.includes(style.id)}
                onSelect={onStyleToggle}
                size={viewMode === 'list' ? 'large' : 'medium'}
                showCategory={true}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Results summary */}
      <div className="text-center text-gray-500">
        <p>Showing {filteredStyles.length} of {STYLE_PRESETS.length} professional art styles</p>
      </div>
    </div>
  );
}
