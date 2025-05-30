
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
    description: 'Neon-lit futuristic cityscape',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop',
    prompt: 'cyberpunk city with neon lights, futuristic architecture, rain-soaked streets',
    style: 'cyberpunk, neon, futuristic'
  },
  {
    id: 'watercolor',
    name: 'Watercolor Portrait',
    description: 'Soft, artistic watercolor style',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop',
    prompt: 'watercolor painting of a portrait, soft brushstrokes, artistic',
    style: 'watercolor, artistic, soft'
  },
  {
    id: 'digital-art',
    name: 'Digital Art',
    description: 'Modern digital illustration',
    imageUrl: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=300&h=300&fit=crop',
    prompt: 'digital art illustration, vibrant colors, modern style',
    style: 'digital art, illustration, vibrant'
  },
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Ultra-realistic photography style',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    prompt: 'photorealistic, ultra detailed, professional photography',
    style: 'photorealistic, detailed, professional'
  },
  {
    id: 'anime',
    name: 'Anime Style',
    description: 'Japanese anime and manga art',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    prompt: 'anime style illustration, manga art, Japanese animation',
    style: 'anime, manga, japanese'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Design',
    description: 'Clean, simple compositions',
    imageUrl: 'https://images.unsplash.com/photo-1497436072909-f5e4fd1d03a9?w=300&h=300&fit=crop',
    prompt: 'minimalist design, clean composition, simple shapes',
    style: 'minimalist, clean, simple'
  }
];

export const StylePresetsGallery = ({ onStyleSelect }: StylePresetsGalleryProps) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-sm font-medium mb-4">
            <Palette className="w-4 h-4 mr-2" />
            AI Style Presets
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Creative Style</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select from our curated collection of AI art styles. Each preset applies professional 
            styling to transform your text prompts into stunning visuals.
          </p>
        </motion.div>

        {/* Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stylePresets.map((preset, index) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-white border border-gray-200 rounded-2xl p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer h-full" onClick={() => onStyleSelect?.(preset)}>
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img 
                      src={preset.imageUrl} 
                      alt={preset.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700">
                          <Download className="h-4 w-4 mr-1" />
                          Use Style
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
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
                          className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full border border-indigo-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
            Explore All 50+ Styles
            <Palette className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
          </Button>
          
          <p className="mt-4 text-sm text-gray-500">
            Mix and match styles to create unique AI-generated artwork
          </p>
        </motion.div>
      </div>
    </section>
  );
};
