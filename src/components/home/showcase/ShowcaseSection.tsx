
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShowcaseHeader } from './ShowcaseHeader';
import { ShowcaseGrid } from './ShowcaseGrid';
import { ShowcaseMobileCarousel } from './ShowcaseMobileCarousel';

export const ShowcaseSection = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Sample showcase items with extended information
  const showcaseItems = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=800&q=80",
      prompt: "Vibrant cityscape at sunset with neon lights and flying cars",
      style: "Futuristic",
      author: "Alex M.",
      likes: 342
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80",
      prompt: "Portrait of a woman with flowers growing from her hair",
      style: "Digital Art",
      author: "Sophia R.",
      likes: 287
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1633109741715-82b70739edc1?auto=format&fit=crop&w=800&q=80",
      prompt: "Mystical forest with glowing mushrooms and fairy lights",
      style: "Fantasy",
      author: "Noah T.",
      likes: 156
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80",
      prompt: "Abstract shapes in blue and purple flowing like liquid",
      style: "Abstract",
      author: "Emma K.",
      likes: 221
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1650240505146-9f0a0ef28c60?auto=format&fit=crop&w=800&q=80",
      prompt: "Mountain landscape with aurora borealis in the night sky",
      style: "Photorealistic",
      author: "Michael J.",
      likes: 198
    },
    {
      id: 6,
      imageUrl: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=800&q=80",
      prompt: "Cyberpunk character in a rainy neon street",
      style: "Cyberpunk",
      author: "Lila P.",
      likes: 312
    }
  ];

  return (
    <section id="showcase" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ShowcaseHeader />
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <ShowcaseMobileCarousel items={showcaseItems} />
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:block mt-8">
          <ShowcaseGrid 
            items={showcaseItems}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </div>
        
        {/* Explore more button */}
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button
              variant="outline"
              className="border-purple-400 text-purple-600 hover:bg-purple-50 transform hover:scale-105 transition-transform duration-300"
              onClick={() => navigate('/gallery')}
            >
              Explore More Creations
              <ImagePlus className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="mt-4 text-sm text-gray-500">
              Submit your own creations to be featured in our gallery
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
