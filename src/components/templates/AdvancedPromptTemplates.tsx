import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Star, 
  Copy, 
  Heart,
  BookOpen,
  Sparkles,
  Palette,
  Camera,
  Zap,
  TrendingUp,
  Filter,
  Plus,
  Edit,
  Save
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';

interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  template: string;
  category: 'photography' | 'artistic' | 'character' | 'landscape' | 'abstract' | 'business';
  style?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
  isFavorite?: boolean;
  author?: string;
  variables?: { name: string; description: string; example: string }[];
  examples?: string[];
}

const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: '1',
    title: 'Professional Portrait Photography',
    description: 'Create stunning professional portraits with perfect lighting and composition',
    template: 'Professional portrait of a {subject}, {lighting} lighting, {background} background, shot with {camera}, {style} style, high quality, detailed',
    category: 'photography',
    style: 'photorealistic',
    tags: ['portrait', 'professional', 'photography', 'lighting'],
    difficulty: 'beginner',
    popularity: 95,
    author: 'AI Photo Master',
    variables: [
      { name: 'subject', description: 'Person or character to photograph', example: 'businesswoman in her 30s' },
      { name: 'lighting', description: 'Type of lighting setup', example: 'studio' },
      { name: 'background', description: 'Background setting', example: 'neutral gray' },
      { name: 'camera', description: 'Camera specification', example: 'Canon 5D Mark IV' },
      { name: 'style', description: 'Photography style', example: 'corporate' }
    ],
    examples: [
      'Professional portrait of a confident CEO, studio lighting, neutral gray background, shot with Canon 5D Mark IV, corporate style, high quality, detailed',
      'Professional portrait of a young artist, natural lighting, brick wall background, shot with Sony A7R, creative style, high quality, detailed'
    ]
  },
  {
    id: '2',
    title: 'Fantasy Character Design',
    description: 'Design unique fantasy characters with magical elements and detailed features',
    template: 'Fantasy {character_type} character, {appearance} appearance, wearing {outfit}, {magical_elements}, {art_style} art style, detailed character design',
    category: 'character',
    style: 'fantasy-art',
    tags: ['fantasy', 'character', 'magic', 'design'],
    difficulty: 'intermediate',
    popularity: 88,
    author: 'Fantasy Designer',
    variables: [
      { name: 'character_type', description: 'Type of fantasy character', example: 'elven warrior' },
      { name: 'appearance', description: 'Physical characteristics', example: 'tall and elegant with silver hair' },
      { name: 'outfit', description: 'Clothing and armor', example: 'mystical robes with golden trim' },
      { name: 'magical_elements', description: 'Magical features or effects', example: 'glowing blue eyes and floating orbs' },
      { name: 'art_style', description: 'Artistic style', example: 'digital painting' }
    ],
    examples: [
      'Fantasy elven mage character, tall and elegant with silver hair appearance, wearing mystical robes with golden trim, glowing blue eyes and floating orbs, digital painting art style, detailed character design',
      'Fantasy dragon knight character, imposing and scarred appearance, wearing dragon scale armor, fire aura and enchanted sword, epic fantasy art style, detailed character design'
    ]
  },
  {
    id: '3',
    title: 'Cinematic Landscape Scene',
    description: 'Create epic landscape scenes with cinematic composition and dramatic lighting',
    template: '{landscape_type} landscape at {time_of_day}, {weather_condition}, {cinematic_angle} shot, {color_palette} color palette, {atmospheric_effect}, cinematic composition, {quality} quality',
    category: 'landscape',
    style: 'cinematic',
    tags: ['landscape', 'cinematic', 'nature', 'dramatic'],
    difficulty: 'intermediate',
    popularity: 82,
    author: 'Nature Cinematographer',
    variables: [
      { name: 'landscape_type', description: 'Type of landscape', example: 'mountain range' },
      { name: 'time_of_day', description: 'Time setting', example: 'golden hour' },
      { name: 'weather_condition', description: 'Weather elements', example: 'misty fog rolling through valleys' },
      { name: 'cinematic_angle', description: 'Camera angle', example: 'wide aerial' },
      { name: 'color_palette', description: 'Color scheme', example: 'warm orange and purple' },
      { name: 'atmospheric_effect', description: 'Atmospheric elements', example: 'dramatic god rays' },
      { name: 'quality', description: 'Image quality', example: '8K ultra-detailed' }
    ]
  },
  {
    id: '4',
    title: 'Modern Business Illustration',
    description: 'Create professional business and tech illustrations for presentations and marketing',
    template: '{business_concept} illustration, {style_type} style, {color_scheme} colors, {composition} composition, professional business design, {detail_level}',
    category: 'business',
    style: 'digital-art',
    tags: ['business', 'professional', 'illustration', 'corporate'],
    difficulty: 'beginner',
    popularity: 76,
    author: 'Business Visual Designer',
    variables: [
      { name: 'business_concept', description: 'Business concept to illustrate', example: 'team collaboration' },
      { name: 'style_type', description: 'Illustration style', example: 'minimalist vector' },
      { name: 'color_scheme', description: 'Color palette', example: 'blue and white corporate' },
      { name: 'composition', description: 'Layout arrangement', example: 'clean centered' },
      { name: 'detail_level', description: 'Level of detail', example: 'simple and clear' }
    ]
  },
  {
    id: '5',
    title: 'Abstract Art Composition',
    description: 'Generate unique abstract art with flowing forms and vibrant colors',
    template: 'Abstract {art_movement} composition, {shape_elements} shapes, {color_description} colors, {texture_type} texture, {mood} mood, {technique} technique, artistic masterpiece',
    category: 'abstract',
    style: 'abstract',
    tags: ['abstract', 'artistic', 'composition', 'creative'],
    difficulty: 'advanced',
    popularity: 69,
    author: 'Abstract Artist',
    variables: [
      { name: 'art_movement', description: 'Art movement inspiration', example: 'cubist-inspired' },
      { name: 'shape_elements', description: 'Geometric or organic shapes', example: 'flowing organic' },
      { name: 'color_description', description: 'Color characteristics', example: 'vibrant gradient' },
      { name: 'texture_type', description: 'Surface texture', example: 'smooth digital' },
      { name: 'mood', description: 'Emotional tone', example: 'energetic and dynamic' },
      { name: 'technique', description: 'Artistic technique', example: 'layered digital painting' }
    ]
  }
];

export const AdvancedPromptTemplates = () => {
  const [templates, setTemplates] = useState<PromptTemplate[]>(PROMPT_TEMPLATES);
  const [filteredTemplates, setFilteredTemplates] = useState<PromptTemplate[]>(PROMPT_TEMPLATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [customizedPrompt, setCustomizedPrompt] = useState('');
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filter templates based on search and filters
  useEffect(() => {
    let filtered = templates;

    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(template => template.difficulty === selectedDifficulty);
    }

    // Sort by popularity
    filtered.sort((a, b) => b.popularity - a.popularity);

    setFilteredTemplates(filtered);
  }, [templates, searchQuery, selectedCategory, selectedDifficulty]);

  const generateCustomPrompt = (template: PromptTemplate) => {
    let prompt = template.template;
    
    if (template.variables) {
      template.variables.forEach(variable => {
        const value = variableValues[variable.name] || `{${variable.name}}`;
        prompt = prompt.replace(new RegExp(`{${variable.name}}`, 'g'), value);
      });
    }
    
    return prompt;
  };

  const copyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success('Prompt copied to clipboard!');
      
      trackEvent({
        action: 'prompt_template_copied',
        category: 'templates',
        label: 'copy_prompt'
      });
    } catch (error) {
      toast.error('Failed to copy prompt');
    }
  };

  const toggleFavorite = (templateId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(templateId)) {
      newFavorites.delete(templateId);
    } else {
      newFavorites.add(templateId);
    }
    setFavorites(newFavorites);

    trackEvent({
      action: 'template_favorited',
      category: 'templates',
      label: newFavorites.has(templateId) ? 'add_favorite' : 'remove_favorite'
    });
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return <Zap className="h-4 w-4 text-green-500" />;
      case 'intermediate': return <TrendingUp className="h-4 w-4 text-amber-500" />;
      case 'advanced': return <Sparkles className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'photography': return <Camera className="h-4 w-4" />;
      case 'artistic': return <Palette className="h-4 w-4" />;
      case 'character': return <BookOpen className="h-4 w-4" />;
      case 'landscape': return <Camera className="h-4 w-4" />;
      case 'abstract': return <Sparkles className="h-4 w-4" />;
      case 'business': return <TrendingUp className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Prompt Templates</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Professional prompt templates with customizable variables to create stunning AI art. 
          Perfect for beginners and experts alike.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates, tags, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="photography">Photography</option>
            <option value="artistic">Artistic</option>
            <option value="character">Character</option>
            <option value="landscape">Landscape</option>
            <option value="abstract">Abstract</option>
            <option value="business">Business</option>
          </select>
          
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(template.category)}
                  <Badge variant="outline" className="capitalize">
                    {template.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  {getDifficultyIcon(template.difficulty)}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(template.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        favorites.has(template.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`} 
                    />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{template.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {template.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{template.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Popularity: {template.popularity}%</span>
                {template.author && <span>by {template.author}</span>}
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setVariableValues({});
                        setCustomizedPrompt(template.template);
                      }}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Customize
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{template.title}</DialogTitle>
                    </DialogHeader>
                    
                    {selectedTemplate?.id === template.id && (
                      <div className="space-y-6">
                        <Tabs defaultValue="customize" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="customize">Customize</TabsTrigger>
                            <TabsTrigger value="examples">Examples</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="customize" className="space-y-4">
                            {template.variables && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {template.variables.map((variable) => (
                                  <div key={variable.name}>
                                    <Label htmlFor={variable.name} className="capitalize">
                                      {variable.name.replace('_', ' ')}
                                    </Label>
                                    <Input
                                      id={variable.name}
                                      placeholder={variable.example}
                                      value={variableValues[variable.name] || ''}
                                      onChange={(e) => {
                                        const newValues = { ...variableValues, [variable.name]: e.target.value };
                                        setVariableValues(newValues);
                                        setCustomizedPrompt(generateCustomPrompt(template));
                                      }}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{variable.description}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div>
                              <Label htmlFor="result">Generated Prompt</Label>
                              <Textarea
                                id="result"
                                value={generateCustomPrompt(template)}
                                onChange={(e) => setCustomizedPrompt(e.target.value)}
                                rows={4}
                                className="mt-1"
                              />
                            </div>
                            
                            <Button 
                              onClick={() => copyPrompt(generateCustomPrompt(template))}
                              className="w-full"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Customized Prompt
                            </Button>
                          </TabsContent>
                          
                          <TabsContent value="examples" className="space-y-4">
                            {template.examples?.map((example, index) => (
                              <Card key={index}>
                                <CardContent className="p-4">
                                  <p className="text-sm mb-3">{example}</p>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => copyPrompt(example)}
                                  >
                                    <Copy className="h-3 w-3 mr-1" />
                                    Copy
                                  </Button>
                                </CardContent>
                              </Card>
                            )) || (
                              <p className="text-gray-500 text-center">No examples available for this template.</p>
                            )}
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyPrompt(template.template)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};