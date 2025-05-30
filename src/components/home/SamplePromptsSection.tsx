
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Copy, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SamplePromptsSection = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const samplePrompts = [
    {
      category: "Art & Creativity",
      title: "Digital Art Masterpiece",
      prompt: "A majestic dragon soaring through a stormy sky, digital art, highly detailed, vibrant colors",
      tags: ["Fantasy", "Digital Art", "Dramatic"]
    },
    {
      category: "Photography",
      title: "Professional Portrait",
      prompt: "Professional headshot of a confident businesswoman, studio lighting, sharp focus, corporate style",
      tags: ["Portrait", "Professional", "Studio"]
    },
    {
      category: "Nature",
      title: "Scenic Landscape",
      prompt: "Peaceful mountain lake at sunrise, misty atmosphere, golden hour lighting, photorealistic",
      tags: ["Landscape", "Nature", "Serene"]
    },
    {
      category: "Architecture",
      title: "Modern Building",
      prompt: "Futuristic skyscraper with glass facade, urban cityscape, blue hour, architectural photography",
      tags: ["Architecture", "Modern", "Urban"]
    },
    {
      category: "Food",
      title: "Gourmet Cuisine",
      prompt: "Elegant plated gourmet dish, fine dining presentation, warm lighting, food photography",
      tags: ["Food", "Gourmet", "Elegant"]
    },
    {
      category: "Abstract",
      title: "Geometric Design",
      prompt: "Abstract geometric patterns, vibrant gradients, modern minimalist design, clean composition",
      tags: ["Abstract", "Geometric", "Modern"]
    }
  ];

  const handleCopyPrompt = async (prompt: string, index: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  const handleUsePrompt = (prompt: string) => {
    // Store the prompt in sessionStorage and navigate to text-to-image page
    sessionStorage.setItem('selectedPrompt', prompt);
    navigate('/text-to-image');
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get Inspired with Sample Prompts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore these creative prompts to see what's possible with AI image generation. 
            Copy any prompt or use it directly to create your own stunning visuals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePrompts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <button
                  onClick={() => handleCopyPrompt(item.prompt, index)}
                  className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                  title="Copy prompt"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {item.prompt}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyPrompt(item.prompt, index)}
                  className="flex-1 text-xs"
                >
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleUsePrompt(item.prompt)}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs"
                >
                  <Wand2 className="h-3 w-3 mr-1" />
                  Use Prompt
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4"
            onClick={() => navigate('/text-to-image')}
          >
            <Wand2 className="h-5 w-5 mr-2" />
            Start Creating Your Own
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
