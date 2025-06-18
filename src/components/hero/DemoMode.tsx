
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Sparkles, Clock, Wand2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface DemoModeProps {
  onDemoGenerate: (prompt: string, style: string) => void;
  isGenerating: boolean;
}

const demoExamples = [
  {
    id: 'modern-living',
    title: 'Modern Living Room',
    prompt: 'A minimalist modern living room with clean lines, neutral colors, floor-to-ceiling windows, and contemporary furniture',
    style: 'modern',
    thumbnail: '/lovable-uploads/c0cd939b-5fe6-4732-af93-ee61f070b689.png',
    tags: ['Popular', 'Quick']
  },
  {
    id: 'cozy-bedroom',
    title: 'Cozy Bedroom',
    prompt: 'A warm and cozy bedroom with soft textures, warm lighting, wooden accents, and comfortable bedding',
    style: 'cozy',
    thumbnail: '/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png',
    tags: ['Trending', '30s']
  },
  {
    id: 'kitchen-design',
    title: 'Modern Kitchen',
    prompt: 'A sleek modern kitchen with marble countertops, stainless steel appliances, and pendant lighting',
    style: 'contemporary',
    thumbnail: '/lovable-uploads/b8bd59bc-46c8-4f5f-9ad8-8eacbf6c7c20.png',
    tags: ['Featured', 'Fast']
  }
];

export const DemoMode = ({ onDemoGenerate, isGenerating }: DemoModeProps) => {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const handleDemoClick = (example: typeof demoExamples[0]) => {
    setSelectedDemo(example.id);
    onDemoGenerate(example.prompt, example.style);
    
    toast.success("Demo generation started!", {
      description: `Creating ${example.title} in seconds...`,
      duration: 3000
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 mb-6">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Play className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Try AI Generation Instantly</h3>
        </div>
        <p className="text-sm text-gray-600">
          Skip the setup - click any example below for instant AI image generation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {demoExamples.map((example) => (
          <Card 
            key={example.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              selectedDemo === example.id ? 'ring-2 ring-blue-500' : ''
            } ${isGenerating ? 'opacity-75 cursor-wait' : ''}`}
            onClick={() => !isGenerating && handleDemoClick(example)}
          >
            <CardContent className="p-4">
              <div className="relative mb-3">
                <img 
                  src={example.thumbnail} 
                  alt={example.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  {example.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-white/90">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Wand2 className="h-4 w-4 mr-1" />
                    Generate
                  </Button>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-800 mb-1">{example.title}</h4>
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {example.prompt.substring(0, 60)}...
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  ~5 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  HD Quality
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          ✨ No signup required • Instant results • Try unlimited examples
        </p>
      </div>
    </div>
  );
};
