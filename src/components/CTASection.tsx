
import { ArrowRight, PenTool, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 py-16 px-6 sm:py-24 sm:px-12">
          {/* Decorative elements */}
          <div className="absolute top-1/3 left-0 opacity-10">
            <PenTool className="h-64 w-64 text-white" />
          </div>
          <div className="absolute bottom-0 right-10 opacity-10">
            <Sparkles className="h-48 w-48 text-white" />
          </div>
          
          <div className="relative flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white font-poppins">
              Ready to Transform Your Social Media?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl leading-8 text-white/90">
              Join thousands of creators and businesses using WordToImage to create stunning social media graphics in seconds.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg">
                View Templates
              </Button>
            </div>
            <p className="mt-6 text-white/80 text-sm">No credit card required. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
