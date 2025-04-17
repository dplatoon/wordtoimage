
import { Heart, Star, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export const CTASection = () => {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden lovable-gradient rounded-3xl py-16 sm:py-24 px-6 sm:px-12 lg:px-16">
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2">
            <Heart className="text-white/10 h-64 w-64" fill="white" fillOpacity="0.05" />
          </div>
          <div className="absolute top-1/4 right-10">
            <Star className="text-white/10 h-16 w-16 animate-slow-spin" fill="white" fillOpacity="0.1" />
          </div>
          <div className="absolute bottom-10 left-1/4">
            <Sparkles className="text-white/10 h-12 w-12 animate-float" fill="white" fillOpacity="0.1" />
          </div>
          
          <div className="relative flex flex-col items-center">
            <h2 className="text-center text-3xl font-bold tracking-tight text-white font-poppins sm:text-4xl">
              Ready to Start Your Lovable Journey?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-white/90">
              Join thousands of users creating meaningful connections and sharing positivity every day.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="bg-white text-lovable-rose hover:bg-white/90 rounded-full text-lg">
                Get Started For Free
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
