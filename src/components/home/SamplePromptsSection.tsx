
import { useState } from 'react';
import { Copy, Wand2, Heart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';

interface SamplePrompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  imageUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const samplePrompts: SamplePrompt[] = [
  {
    id: '1',
    title: 'Cozy Coffee Shop',
    prompt: 'A cozy coffee shop interior with warm lighting, wooden furniture, hanging plants, and steam rising from a cup of coffee',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=300&fit=crop',
    difficulty: 'Beginner'
  },
  {
    id: '2',
    title: 'Cyberpunk Cityscape',
    prompt: 'A futuristic cyberpunk cityscape at night with neon lights, holographic advertisements, and flying cars between towering skyscrapers',
    category: 'Sci-Fi',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    difficulty: 'Intermediate'
  },
  {
    id: '3',
    title: 'Watercolor Landscape',
    prompt: 'A serene mountain landscape painted in watercolor style, with misty peaks, a crystal clear lake, and wildflowers in the foreground',
    category: 'Nature',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    difficulty: 'Beginner'
  },
  {
    id: '4',
    title: 'Fantasy Dragon',
    prompt: 'A majestic dragon with iridescent scales perched on a crystal formation in an enchanted cave, surrounded by magical glowing gems',
    category: 'Fantasy',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    difficulty: 'Advanced'
  },
  {
    id: '5',
    title: 'Minimalist Logo',
    prompt: 'A minimalist logo design for a tech startup, featuring geometric shapes, clean lines, and a modern gradient color scheme',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
    difficulty: 'Intermediate'
  },
  {
    id: '6',
    title: 'Food Photography',
    prompt: 'A beautifully plated gourmet meal with vibrant colors, perfect lighting, and artistic garnishes on a rustic wooden table',
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    difficulty: 'Beginner'
  }
];

export const SamplePromptsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = ['All', ...new Set(samplePrompts.map(p => p.category))];
  
  const filteredPrompts = selectedCategory === 'All' 
    ? samplePrompts 
    : samplePrompts.filter(p => p.category === selectedCategory);

  const copyToClipboard = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copied to clipboard!');
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const generateWithPrompt = (prompt: string) => {
    window.location.href = `/text-to-image?prompt=${encodeURIComponent(prompt)}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sample Prompts & Inspiration
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with these curated prompts designed to showcase the power of AI image generation
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
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

        {/* Prompts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt, index) => (
            <Card 
              key={prompt.id} 
              className="group hover:shadow-lg transition-shadow duration-200 animate-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={prompt.imageUrl}
                    alt={prompt.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => generateWithPrompt(prompt.prompt)}
                        className="bg-white/90 text-gray-900"
                      >
                        <Wand2 className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => copyToClipboard(prompt.prompt)}
                        className="bg-white/90 text-gray-900"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      {prompt.title}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(prompt.id)}
                      className="p-1"
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(prompt.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </Button>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {prompt.prompt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {prompt.category}
                      </Badge>
                      <Badge className={`text-xs ${getDifficultyColor(prompt.difficulty)}`}>
                        {prompt.difficulty}
                      </Badge>
                    </div>

                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(prompt.prompt)}
                        className="p-2"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => generateWithPrompt(prompt.prompt)}
                        className="text-xs px-3"
                      >
                        Try Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-600 mb-4">
            Ready to create your own unique images?
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Wand2 className="h-5 w-5 mr-2" />
            Start Creating
          </Button>
        </div>
      </div>
    </section>
  );
};
