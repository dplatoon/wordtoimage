
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gallery, ImagePlus, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
            <Gallery className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>Inspiration Gallery</span>
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
            See What You Can Create
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through a collection of AI-generated images from simple text prompts
          </p>
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {showcaseItems.map((item) => (
                <CarouselItem key={item.id} className="pl-1">
                  <div className="relative overflow-hidden rounded-xl aspect-square">
                    <img
                      src={item.imageUrl}
                      alt={item.prompt}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                      <p className="font-medium text-sm">{item.prompt}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs bg-purple-500 bg-opacity-50 rounded-full px-2 py-0.5 inline-block">
                          {item.style}
                        </span>
                        <span className="text-xs">by {item.author}</span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative overflow-hidden rounded-xl aspect-square cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.img
                src={item.imageUrl}
                alt={item.prompt}
                className="w-full h-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-medium">{item.prompt}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm bg-purple-500 bg-opacity-40 rounded-full px-3 py-1 w-fit">
                    {item.style}
                  </span>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-red-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="text-xs">{item.likes}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm opacity-80">by {item.author}</div>
                
                {hoveredIndex === index && (
                  <motion.div 
                    className="absolute bottom-6 right-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    <Button 
                      size="sm" 
                      className="bg-white/30 backdrop-blur-sm text-white hover:bg-white/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Open full image view
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
        
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
