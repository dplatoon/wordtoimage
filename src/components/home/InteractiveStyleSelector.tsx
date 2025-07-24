import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Paintbrush2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LazyImage } from '@/components/common/LazyImage';

interface Style {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'realistic' | 'artistic' | 'digital' | 'fantasy';
  popular: boolean;
}

const popularStyles: Style[] = [
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Lifelike, camera-quality images',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    category: 'realistic',
    popular: true
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese animation style',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    category: 'artistic',
    popular: true
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futuristic neon aesthetics',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop',
    category: 'digital',
    popular: true
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft, flowing paint effects',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop',
    category: 'artistic',
    popular: true
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classic artistic technique',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=300&fit=crop',
    category: 'artistic',
    popular: false
  },
  {
    id: 'fantasy',
    name: 'Fantasy Art',
    description: 'Magical and mythical themes',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop',
    category: 'fantasy',
    popular: true
  }
];

export const InteractiveStyleSelector = () => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStyleClick = (style: Style) => {
    setSelectedStyle(style.id);
    
    // Navigate to text-to-image generator with style pre-selected
    navigate(`/text-to-image?style=${style.id}&fromSelector=true`);
  };

  const handleViewAllStyles = () => {
    navigate('/style-gallery');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Paintbrush2 className="h-6 w-6 text-purple-600" />
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              Interactive Demo
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Click a Style to Try It
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our most popular art styles. Click any style below to start generating 
            with that artistic approach instantly.
          </p>
        </div>

        {/* Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {popularStyles.map((style) => (
            <Card
              key={style.id}
              className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                selectedStyle === style.id 
                  ? 'border-purple-500 ring-2 ring-purple-200' 
                  : 'border-gray-200 hover:border-purple-300'
              } ${hoveredStyle === style.id ? 'z-10' : ''}`}
              onClick={() => handleStyleClick(style)}
              onMouseEnter={() => setHoveredStyle(style.id)}
              onMouseLeave={() => setHoveredStyle(null)}
            >
              <CardContent className="p-0 relative overflow-hidden">
                {/* Popular Badge */}
                {style.popular && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-yellow-500 text-white text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                {/* Style Image */}
                <div className="aspect-square overflow-hidden">
                  <LazyImage
                    src={style.image}
                    alt={`${style.name} art style example`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Style Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {style.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {style.description}
                  </p>
                </div>

                {/* Hover Overlay */}
                {hoveredStyle === style.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/90 via-purple-600/50 to-transparent flex items-end justify-center p-3">
                    <Button 
                      size="sm" 
                      className="bg-white text-purple-600 hover:bg-gray-100 font-medium"
                    >
                      Try This Style
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleViewAllStyles}
            className="group"
          >
            Explore All 50+ Styles
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Selected Style Feedback */}
        {selectedStyle && (
          <div className="mt-8 text-center">
            <div className="bg-purple-100 border border-purple-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-purple-800">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">
                  {popularStyles.find(s => s.id === selectedStyle)?.name} style selected!
                </span>
              </div>
              <p className="text-purple-600 text-sm mt-1">
                You'll be redirected to the generator with this style applied.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};