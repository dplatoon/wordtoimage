
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  
  // Sample showcase items
  const showcaseItems = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=800&q=80",
      prompt: "Vibrant cityscape at sunset with neon lights and flying cars",
      style: "Futuristic"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80",
      prompt: "Portrait of a woman with flowers growing from her hair",
      style: "Digital Art"
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1633109741715-82b70739edc1?auto=format&fit=crop&w=800&q=80",
      prompt: "Mystical forest with glowing mushrooms and fairy lights",
      style: "Fantasy"
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80",
      prompt: "Abstract shapes in blue and purple flowing like liquid",
      style: "Abstract"
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1650240505146-9f0a0ef28c60?auto=format&fit=crop&w=800&q=80",
      prompt: "Mountain landscape with aurora borealis in the night sky",
      style: "Photorealistic"
    },
    {
      id: 6,
      imageUrl: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=800&q=80",
      prompt: "Cyberpunk character in a rainy neon street",
      style: "Cyberpunk"
    }
  ];

  return (
    <section id="showcase" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
            See What You Can Create
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through a collection of AI-generated images from simple text prompts
          </p>
        </div>

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
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                      <p className="font-medium text-sm">{item.prompt}</p>
                      <span className="text-xs mt-1 bg-blue-500 bg-opacity-50 rounded-full px-2 py-0.5 inline-block">
                        {item.style}
                      </span>
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
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl aspect-square cursor-pointer transform transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={item.imageUrl}
                alt={item.prompt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end text-white transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="font-medium">{item.prompt}</p>
                <span className="text-sm mt-2 bg-blue-500 bg-opacity-40 rounded-full px-3 py-1 w-fit">
                  {item.style}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-blue-400 text-blue-600 hover:bg-blue-50"
            onClick={() => navigate('/gallery')}
          >
            Explore More Creations
            <ImagePlus className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
