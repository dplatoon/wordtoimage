
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Copy, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/sonner';

interface ExamplePrompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  preview?: string;
}

const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    id: '1',
    title: 'Cozy Coffee Shop',
    prompt: 'A cozy coffee shop interior with warm lighting, wooden furniture, hanging plants, and steam rising from a cup of coffee on a rustic table',
    category: 'Interior',
    difficulty: 'beginner',
    preview: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Futuristic Cityscape',
    prompt: 'A futuristic cityscape at night with neon lights, flying cars, holographic advertisements, and towering skyscrapers with glass facades',
    category: 'Sci-Fi',
    difficulty: 'intermediate',
    preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Watercolor Landscape',
    prompt: 'A serene mountain landscape painted in watercolor style, with misty peaks, a crystal clear lake, and wildflowers in the foreground, soft brushstrokes',
    category: 'Nature',
    difficulty: 'beginner',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Vintage Portrait',
    prompt: 'A vintage-style portrait of a person wearing 1920s fashion, art deco background, sepia tones, dramatic lighting, film grain texture',
    category: 'Portrait',
    difficulty: 'intermediate',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Fantasy Dragon',
    prompt: 'A majestic dragon perched on a crystal formation in an enchanted cave, iridescent scales, magical glowing gems, ethereal mist, fantasy art style',
    category: 'Fantasy',
    difficulty: 'advanced',
    preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    title: 'Modern Logo Design',
    prompt: 'A minimalist logo design for a tech startup, geometric shapes, clean lines, modern typography, gradient colors, professional and sleek',
    category: 'Design',
    difficulty: 'intermediate',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop'
  },
  {
    id: '7',
    title: 'Food Photography',
    prompt: 'A beautifully plated gourmet meal with vibrant colors, perfect lighting, shallow depth of field, garnishes, restaurant-quality presentation',
    category: 'Food',
    difficulty: 'beginner',
    preview: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
  },
  {
    id: '8',
    title: 'Abstract Art',
    prompt: 'An abstract composition with flowing organic shapes, vibrant color gradients, dynamic movement, digital art style, contemporary aesthetic',
    category: 'Abstract',
    difficulty: 'advanced',
    preview: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop'
  }
];

const DIFFICULTY_COLORS = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
  onGenerateExample: (prompt: string) => void;
}

export function ExamplePrompts({ onSelectPrompt, onGenerateExample }: ExamplePromptsProps) {
  const copyToClipboard = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copied to clipboard!');
  };

  const categories = [...new Set(EXAMPLE_PROMPTS.map(p => p.category))];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Example Prompts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAMPLE_PROMPTS.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={example.preview}
                  alt={example.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h4 className="text-white font-medium text-sm mb-1">{example.title}</h4>
                  <div className="flex items-center gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {example.category}
                    </Badge>
                    <Badge className={`text-xs ${DIFFICULTY_COLORS[example.difficulty]}`}>
                      {example.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="p-3 space-y-3">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {example.prompt}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectPrompt(example.prompt)}
                    className="flex-1 text-xs"
                  >
                    Use Prompt
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(example.prompt)}
                    className="px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onGenerateExample(example.prompt)}
                    className="px-2"
                  >
                    <Wand2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 Prompt Writing Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be specific about style, lighting, and composition</li>
            <li>• Include details about colors, mood, and atmosphere</li>
            <li>• Mention camera angles or artistic techniques</li>
            <li>• Use descriptive adjectives for better results</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
