
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, ImageIcon } from 'lucide-react';

export const FeaturesHeroSection = () => {
  return (
    <section id="hero" className="py-12 md:py-20 relative">
      <div className="content-container">
        <div className="text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-gradient-to-r from-ai-primary to-ai-secondary text-white border-none px-6 py-2 text-lg">
              <Sparkles className="h-5 w-5 mr-2" />
              ✨ Powerful AI Features
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient-neon">Transform Ideas into</span>
              <br />
              <span className="text-white">Stunning Visuals</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the power of advanced AI technology that converts your imagination into 
              high-quality images in seconds. From concept to creation with 50+ artistic styles, 
              4K resolution output, and lightning-fast generation.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="btn-ai-neon text-lg px-8 py-4">
                Start Creating Now
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <Button className="btn-ai-outline text-lg px-8 py-4">
                Watch Demo
                <ImageIcon className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
