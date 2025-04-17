
import { useState, useEffect } from 'react';
import { Heart, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export const HeroSection = () => {
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHearts(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pb-16 pt-10">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-lovable-lavender/30 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-lovable-pink/30 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 h-64 w-64 rounded-full bg-lovable-peach/30 blur-3xl"></div>
      </div>

      {/* Floating Hearts */}
      {showHearts && (
        <>
          <Heart className="absolute top-20 left-10 text-lovable-pink h-5 w-5 animate-float" fill="#FFDEE2" />
          <Heart className="absolute top-40 right-24 text-lovable-pink h-4 w-4 animate-float" fill="#FFDEE2" />
          <Heart className="absolute bottom-20 left-1/4 text-lovable-rose h-6 w-6 animate-float" fill="#FF719A" />
          <Sparkles className="absolute top-1/3 right-10 text-lovable-gold h-5 w-5 animate-float" />
          <Sparkles className="absolute bottom-40 left-20 text-lovable-gold h-4 w-4 animate-float" />
          <MessageCircle className="absolute top-60 left-1/3 text-lovable-lavender h-6 w-6 animate-float" fill="#E5DEFF" />
        </>
      )}
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-10 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-lovable-rose via-lovable-pink to-lovable-lavender animate-fade-in">
            Spread Love, Share Joy, Stay Connected.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 animate-fade-in">
            Join Lovable and create meaningful moments every day.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button className="lovable-button-primary text-lg" size="lg">
              Get Started
            </Button>
            <Button variant="outline" className="lovable-button-secondary text-lg" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 sm:mt-24 relative animate-fade-in">
          <div className="relative mx-auto rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" 
              alt="People connecting and sharing moments"
              className="w-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lovable-rose/40 to-transparent mix-blend-multiply rounded-xl"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg max-w-sm">
              <p className="font-poppins text-sm sm:text-base font-medium text-gray-900">
                "Lovable helped me connect with like-minded people and share moments that truly matter."
              </p>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                — Sarah, Lovable Member
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
