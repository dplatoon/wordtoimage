
import { Sparkles, Palette, Zap } from 'lucide-react';

export const TemplateGalleryHero = () => {
  return (
    <section className="relative mb-12 bg-card/30 backdrop-blur-xl rounded-2xl p-8 md:p-12 overflow-hidden animate-fade-in border border-primary/20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-neon-cyan/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-neon-coral/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-primary/20 rounded-full p-3">
              <Palette className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight animate-fade-in" style={{ animationDelay: '0.3s' }}>
            AI Template Gallery
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Discover professionally designed templates to jumpstart your creative projects. 
            Each template comes with optimized settings and example prompts to get you started instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 shadow-glass">
            <div className="bg-neon-cyan/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-neon-cyan" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Style Templates</h3>
            <p className="text-sm text-muted-foreground">
              Professional artistic styles from watercolor to digital art
            </p>
          </div>

          <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 shadow-glass">
            <div className="bg-green-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Ready to Use</h3>
            <p className="text-sm text-muted-foreground">
              Click any template to instantly load optimized settings
            </p>
          </div>

          <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 shadow-glass">
            <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Fully Customizable</h3>
            <p className="text-sm text-muted-foreground">
              Use as starting points and customize with your own content
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
