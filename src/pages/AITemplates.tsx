
import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Copy, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

const templateCategories = [
  {
    name: 'Portrait Art',
    description: 'Professional portrait templates',
    templates: [
      { name: 'Corporate Headshot', prompt: 'professional corporate headshot, studio lighting, business attire, clean background', popularity: 95 },
      { name: 'Fantasy Portrait', prompt: 'fantasy portrait art, magical lighting, ethereal atmosphere, detailed character design', popularity: 88 },
      { name: 'Anime Character', prompt: 'anime style character portrait, vibrant colors, detailed eyes, manga art style', popularity: 92 }
    ]
  },
  {
    name: 'Landscapes',
    description: 'Stunning natural and fantasy landscapes',
    templates: [
      { name: 'Sunset Mountains', prompt: 'majestic mountain landscape at sunset, golden hour lighting, dramatic clouds, photorealistic', popularity: 90 },
      { name: 'Mystical Forest', prompt: 'enchanted forest scene, magical atmosphere, glowing lights, fantasy landscape art', popularity: 85 },
      { name: 'Ocean Waves', prompt: 'powerful ocean waves crashing, dramatic seascape, stormy weather, high detail photography', popularity: 78 }
    ]
  },
  {
    name: 'Digital Art',
    description: 'Modern digital art styles',
    templates: [
      { name: 'Cyberpunk City', prompt: 'futuristic cyberpunk cityscape, neon lights, rain, dark atmosphere, sci-fi digital art', popularity: 94 },
      { name: 'Abstract Geometric', prompt: 'abstract geometric art, vibrant colors, modern digital design, minimalist composition', popularity: 72 },
      { name: 'Space Exploration', prompt: 'space scene with astronaut, distant planets, cosmic background, sci-fi illustration', popularity: 86 }
    ]
  }
];

export default function AITemplates() {
  const copyToClipboard = (prompt: string, templateName: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success(`"${templateName}" template copied!`, {
      description: 'Paste it in the text-to-image generator'
    });
  };

  const useTemplate = (prompt: string) => {
    const url = `/text-to-image?prompt=${encodeURIComponent(prompt)}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <Nav />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-purple-600 mr-3 h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              AI Prompt Templates
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ready-to-use prompt templates crafted by AI experts. Get professional results instantly with our curated collection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Link to="/text-to-image">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Creating
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/style-gallery">
                Browse Styles
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Template Categories */}
        <div className="space-y-12">
          {templateCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.templates.map((template, templateIndex) => (
                  <Card key={templateIndex} className="hover:shadow-lg transition-shadow border-gray-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{template.popularity}%</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {template.prompt}
                      </p>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(template.prompt, template.name)}
                          className="flex-1"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => useTemplate(template.prompt)}
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                        >
                          <Sparkles className="h-4 w-4 mr-1" />
                          Use
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Create Your Masterpiece?</h3>
          <p className="mb-6 opacity-90">
            Use these templates as starting points and customize them to match your vision
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link to="/text-to-image">
              Start Generating Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
