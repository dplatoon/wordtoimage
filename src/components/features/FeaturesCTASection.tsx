
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export const FeaturesCTASection = () => {
  return (
    <section className="py-16 md:py-24 relative border-t border-ai-primary/20">
      <div className="content-container text-center">
        <div className="animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient-neon">Transform Your Ideas</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join over 100,000 creators who are already using WordToImage to bring their ideas to life. 
            Start creating professional-quality images in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button className="btn-ai-neon text-lg px-10 py-4">
              Start Your Free Trial
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            <Button className="btn-ai-outline text-lg px-10 py-4">
              View Pricing Plans
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-ai-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-ai-neon" />
              </div>
              <h3 className="font-semibold text-white mb-2">Instant Results</h3>
              <p className="text-gray-400 text-sm">Generate images in under 10 seconds</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-ai-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-ai-neon" />
              </div>
              <h3 className="font-semibold text-white mb-2">No Credit Card</h3>
              <p className="text-gray-400 text-sm">Start with free generations today</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-ai-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="h-6 w-6 text-ai-neon" />
              </div>
              <h3 className="font-semibold text-white mb-2">Commercial Rights</h3>
              <p className="text-gray-400 text-sm">Use images for any project</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
