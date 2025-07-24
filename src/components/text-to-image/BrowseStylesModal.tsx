import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Palette, Star, TrendingUp, Clock, Grid3X3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BrowseStylesModalProps {
  onStyleSelect: (style: string) => void;
  children: React.ReactNode;
}

interface StyleTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  popularity: number;
  imageUrl: string;
  isNew?: boolean;
  isPro?: boolean;
}

const styleTemplates: StyleTemplate[] = [
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Ultra-realistic photography style',
    category: 'photography',
    popularity: 95,
    imageUrl: '/api/placeholder/200/150',
    isNew: false
  },
  {
    id: 'digital-art',
    name: 'Digital Art',
    description: 'Modern digital illustration',
    category: 'digital',
    popularity: 88,
    imageUrl: '/api/placeholder/200/150',
    isNew: false
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classical oil painting technique',
    category: 'traditional',
    popularity: 76,
    imageUrl: '/api/placeholder/200/150',
    isNew: false
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft watercolor painting style',
    category: 'traditional',
    popularity: 82,
    imageUrl: '/api/placeholder/200/150',
    isNew: false
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futuristic neon-lit aesthetic',
    category: 'futuristic',
    popularity: 71,
    imageUrl: '/api/placeholder/200/150',
    isNew: true
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese animation style',
    category: 'animation',
    popularity: 92,
    imageUrl: '/api/placeholder/200/150',
    isNew: false
  },
  {
    id: 'vintage-poster',
    name: 'Vintage Poster',
    description: 'Retro advertising poster style',
    category: 'vintage',
    popularity: 68,
    imageUrl: '/api/placeholder/200/150',
    isPro: true
  },
  {
    id: 'comic-book',
    name: 'Comic Book',
    description: 'Classic comic book illustration',
    category: 'illustration',
    popularity: 74,
    imageUrl: '/api/placeholder/200/150',
    isNew: false
  }
];

const categories = [
  { id: 'all', label: 'All Styles', icon: Grid3X3 },
  { id: 'photography', label: 'Photography', icon: Star },
  { id: 'digital', label: 'Digital Art', icon: Palette },
  { id: 'traditional', label: 'Traditional', icon: Clock },
  { id: 'animation', label: 'Animation', icon: TrendingUp },
];

export function BrowseStylesModal({ onStyleSelect, children }: BrowseStylesModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const filteredStyles = styleTemplates.filter(style => {
    const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         style.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || style.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStyleSelect = (styleId: string) => {
    onStyleSelect(styleId);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Browse 50+ Art Styles
            <Badge variant="secondary" className="ml-2">
              {filteredStyles.length} styles
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-5 w-full">
              {categories.map((category) => (
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

            <TabsContent value={selectedCategory} className="flex-1 overflow-auto mt-4">
              <motion.div 
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                <AnimatePresence>
                  {filteredStyles.map((style) => (
                    <motion.div
                      key={style.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      className="group cursor-pointer"
                      onClick={() => handleStyleSelect(style.id)}
                    >
                      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white hover:border-primary/50 hover:shadow-lg transition-all duration-200">
                        {/* Image placeholder */}
                        <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <Palette className="h-8 w-8 text-gray-400" />
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex gap-1">
                          {style.isNew && (
                            <Badge className="bg-green-500 text-white text-xs">New</Badge>
                          )}
                          {style.isPro && (
                            <Badge className="bg-amber-500 text-white text-xs">Pro</Badge>
                          )}
                        </div>

                        {/* Popularity indicator */}
                        <div className="absolute top-2 right-2">
                          <div className="flex items-center bg-black/50 rounded-full px-2 py-1">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-white text-xs">{style.popularity}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-3">
                          <h4 className="font-semibold text-sm text-gray-900 mb-1">
                            {style.name}
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {style.description}
                          </p>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Button size="sm" className="opacity-90">
                            Select Style
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredStyles.length === 0 && (
                <div className="text-center py-12">
                  <Palette className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No styles match your search</p>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSearchQuery('')}
                    className="mt-2"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}