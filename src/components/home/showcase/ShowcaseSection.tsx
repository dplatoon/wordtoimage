
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShowcaseHeader } from './ShowcaseHeader';
import { ShowcaseGrid } from './ShowcaseGrid';
import { ShowcaseMobileCarousel } from './ShowcaseMobileCarousel';
import { localGalleryImages } from '@/utils/imageUtils';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';

export const ShowcaseSection = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Generate showcase items from our updated local gallery images
  const showcaseItems = localGalleryImages.slice(0, 6).map((image, index) => ({
    id: index + 1,
    imageUrl: image.src,
    prompt: image.alt,
    style: image.style,
    author: ["Alex M.", "Sophia R.", "Noah T.", "Emma K.", "Michael J.", "Lila P."][index % 6],
    likes: Math.floor(Math.random() * 300) + 100
  }));

  return (
    <section id="showcase" className="relative py-20 md:py-28 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden" data-onboarding="showcase-section">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-violet-300 text-sm font-medium">Community Creations</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Inspiring{' '}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                AI Art Gallery
              </span>
            </h2>
            
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore stunning creations from our community of artists and creators
            </p>
          </div>
        </ScrollReveal>
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <ShowcaseMobileCarousel 
              items={showcaseItems}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          </ScrollReveal>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:block">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {showcaseItems.map((item, index) => (
              <StaggerItem key={item.id} animation="scale">
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-violet-500/30"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.prompt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white font-medium mb-2 line-clamp-2">{item.prompt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-violet-300 text-sm">{item.style}</span>
                        <span className="text-gray-400 text-sm">by {item.author}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
        
        {/* Explore more button */}
        <ScrollReveal animation="fadeUp" delay={0.4}>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="group border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-violet-500/30 rounded-2xl px-8 py-6"
              onClick={() => navigate('/gallery')}
            >
              Explore More Creations
              <ImagePlus className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
            
            <p className="mt-4 text-sm text-gray-500">
              Submit your own creations to be featured
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
