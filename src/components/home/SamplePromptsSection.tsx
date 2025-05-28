
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Copy, Wand2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

interface SamplePrompt {
  id: string;
  category: string;
  title: string;
  prompt: string;
  tags: string[];
}

interface SamplePromptsSectionProps {
  onPromptSelect?: (prompt: string) => void;
}

const samplePrompts: SamplePrompt[] = [
  {
    id: 'nature-1',
    category: 'Nature & Landscapes',
    title: 'Mystical Forest',
    prompt: 'A mystical forest with glowing mushrooms, ethereal mist, and ancient trees bathed in moonlight',
    tags: ['fantasy', 'atmospheric', 'mystical']
  },
  {
    id: 'portrait-1',
    category: 'Characters & Portraits',
    title: 'Cyberpunk Warrior',
    prompt: 'A cyberpunk warrior with neon armor, glowing visor, standing in a rain-soaked neon city',
    tags: ['cyberpunk', 'character', 'futuristic']
  },
  {
    id: 'architecture-1',
    category: 'Architecture & Cities',
    title: 'Floating City',
    prompt: 'A floating city in the clouds with crystalline towers, sky bridges, and flying vehicles',
    tags: ['architecture', 'fantasy', 'aerial']
  },
  {
    id: 'art-1',
    category: 'Abstract & Artistic',
    title: 'Color Symphony',
    prompt: 'An abstract explosion of colors representing music, with flowing paint and dynamic brushstrokes',
    tags: ['abstract', 'colorful', 'artistic']
  },
  {
    id: 'animals-1',
    category: 'Animals & Creatures',
    title: 'Dragon Guardian',
    prompt: 'A majestic dragon with iridescent scales guarding a crystal cave filled with treasures',
    tags: ['fantasy', 'dragon', 'magical']
  },
  {
    id: 'space-1',
    category: 'Space & Sci-Fi',
    title: 'Alien Landscape',
    prompt: 'An alien planet with purple skies, floating crystals, and bioluminescent plants under twin moons',
    tags: ['sci-fi', 'alien', 'otherworldly']
  }
];

export const SamplePromptsSection = ({ onPromptSelect }: SamplePromptsSectionProps) => {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const handleCopyPrompt = async (prompt: string, id: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(id);
      toast.success('Prompt copied to clipboard!');
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (error) {
      toast.error('Failed to copy prompt');
    }
  };

  const handleUsePrompt = (prompt: string) => {
    onPromptSelect?.(prompt);
    toast.success('Prompt loaded! Ready to generate your image.');
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="content-container">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-ai-purple/10 border border-ai-purple/20 text-ai-purple text-sm font-medium mb-4">
            <Lightbulb className="w-4 h-4 mr-2" />
            Prompt Inspiration
          </div>
          
          <h2 className="section-title text-gray-900 mb-6">
            Get <span className="text-gradient-ai">Creative Inspiration</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Not sure where to start? Explore our collection of carefully crafted prompts 
            designed to create stunning AI-generated images across various styles and themes.
          </p>
        </motion.div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {samplePrompts.map((sample, index) => (
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="ai-card-modern h-full">
                <CardContent className="p-6">
                  {/* Category */}
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-ai-accent/10 text-ai-accent text-xs font-medium rounded-full border border-ai-accent/20">
                      {sample.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {sample.title}
                  </h3>
                  
                  {/* Prompt */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-ai-primary">
                    <p className="text-gray-700 leading-relaxed font-mono text-sm">
                      "{sample.prompt}"
                    </p>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {sample.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 group border-ai-accent/30 text-ai-accent hover:bg-ai-accent hover:text-white touch-target"
                      onClick={() => handleCopyPrompt(sample.prompt, sample.id)}
                    >
                      {copiedPrompt === sample.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                          Copy
                        </>
                      )}
                    </Button>
                    
                    <Button
                      className="flex-1 btn-ai-primary touch-target"
                      size="sm"
                      onClick={() => handleUsePrompt(sample.prompt)}
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      Use Prompt
                    </Button>
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
          <Button className="btn-ai-secondary group">
            Browse 100+ More Prompts
            <Lightbulb className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
          </Button>
          
          <p className="mt-4 text-sm text-gray-500">
            Join our community to share and discover new creative prompts
          </p>
        </motion.div>
      </div>
    </section>
  );
};
