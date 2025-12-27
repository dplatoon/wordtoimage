
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Palette, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LazyImage } from '@/components/common/LazyImage';
import animeStyleImage from '@/assets/styles/anime-style.jpg';

interface Style {
  id: string;
  name: string;
  imageUrl: string;
  prompt: string;
  color: string;
}

const STYLES: Style[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    imageUrl: '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png',
    prompt: 'cyberpunk city with neon lights, futuristic architecture',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'anime',
    name: 'Anime',
    imageUrl: animeStyleImage,
    prompt: 'anime style character portrait, vibrant colors',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    imageUrl: '/lovable-uploads/53e8165c-d2db-4f0c-9509-f0e76e5c179f.png',
    prompt: 'photorealistic portrait, ultra detailed',
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 'digital_art',
    name: 'Digital Art',
    imageUrl: '/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png',
    prompt: 'digital art illustration, vibrant colors',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    imageUrl: '/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png',
    prompt: 'cinematic movie scene, dramatic lighting',
    color: 'from-emerald-500 to-green-600'
  },
  {
    id: 'comic',
    name: 'Comic Book',
    imageUrl: '/lovable-uploads/7f38eaf1-216c-4148-b05c-9a2f87de6ffc.png',
    prompt: 'comic book style illustration, bold colors',
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    imageUrl: '/lovable-uploads/db49271b-8575-4763-9439-0e4d86479b29.png',
    prompt: 'fantasy artwork, magical creatures',
    color: 'from-indigo-500 to-violet-600'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    imageUrl: '/lovable-uploads/f0dea1ce-ca91-4c0b-9849-6b3649a98249.png',
    prompt: 'watercolor painting, soft brushstrokes',
    color: 'from-teal-500 to-cyan-600'
  }
];

export const AdvancedStyleGallery = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleStyleClick = (style: Style) => {
    navigate(`/text-to-image?style=${style.id}&prompt=${encodeURIComponent(style.prompt)}`);
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Palette className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">Explore Styles</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Art Style
            </span>
          </h2>
          
          <p className="text-gray-400 max-w-xl mx-auto">
            Tap any style to instantly start creating with that artistic approach
          </p>
        </motion.div>

        {/* Gallery */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {STYLES.map((style, index) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div
                  onClick={() => handleStyleClick(style)}
                  className="group relative cursor-pointer"
                >
                  {/* Card */}
                  <div className="relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500">
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <LazyImage
                        src={style.imageUrl}
                        alt={`${style.name} AI art style`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        aspectRatio={4/5}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity`} />
                      
                      {/* Hover CTA */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${style.color} text-white font-semibold flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform`}>
                          Try {style.name}
                          <Sparkles className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${style.color} text-white text-xs font-medium mb-3`}>
                        {style.name}
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        "{style.prompt}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Hint - Mobile */}
          <div className="flex justify-center gap-1 mt-6 md:hidden">
            <div className="w-8 h-1 rounded-full bg-violet-500" />
            <div className="w-2 h-1 rounded-full bg-white/20" />
            <div className="w-2 h-1 rounded-full bg-white/20" />
          </div>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="group border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 rounded-2xl px-8 py-6"
            onClick={() => navigate('/gallery')}
          >
            Explore All 50+ Styles
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
