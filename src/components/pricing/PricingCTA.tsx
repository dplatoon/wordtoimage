
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';

export const PricingCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary via-primary/90 to-accent text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Ideas into Images?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
            Join thousands of creators, marketers, and businesses already using our AI to bring their visions to life. 
            Start with our free plan and upgrade when you're ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-card text-primary hover:bg-muted font-semibold px-8 py-4">
              Start Creating Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4">
              View Examples
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-card/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary-foreground/80" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Results</h3>
              <p className="text-primary-foreground/80 text-sm">Generate professional images in seconds, not hours</p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-card/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary-foreground/80" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Risk-Free Trial</h3>
              <p className="text-primary-foreground/80 text-sm">14-day money-back guarantee on all paid plans</p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="w-12 h-12 bg-card/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-primary-foreground/80 fill-current" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Trusted Platform</h3>
              <p className="text-primary-foreground/80 text-sm">Join 100,000+ satisfied creators worldwide</p>
            </div>
          </div>

          <div className="mt-8 text-sm text-primary-foreground/60">
            No credit card required for free plan • Cancel anytime • Secure payments
          </div>
        </div>
      </div>
    </section>
  );
};
