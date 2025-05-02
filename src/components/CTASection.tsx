
import { Wand2, ImagePlus, PenTool, Sparkles } from 'lucide-react';
import { PrimaryButton } from './ui/primary-button';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export const CTASection = () => {
  const navigate = useNavigate();

  const trackCtaClick = (action: string) => {
    // Track CTA clicks with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: action
      });
    }
  };

  const handleCreateDesignClick = () => {
    trackCtaClick('create_design');
    // Scroll to the image generation section
    const imageForm = document.querySelector('.image-generation-section');
    if (imageForm) {
      imageForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreTemplatesClick = () => {
    trackCtaClick('explore_templates');
    navigate('/templates');
  };

  const handleFeedbackClick = () => {
    trackCtaClick('feedback');
    navigate('/contact');
  };

  return (
    <section className="py-16 md:py-24" aria-label="Call to Action">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 py-16 px-6 sm:py-24 sm:px-12 shadow-xl">
          {/* Decorative elements - hidden from screen readers */}
          <div className="absolute top-1/3 left-0 opacity-10" aria-hidden="true">
            <PenTool className="h-64 w-64 text-white" />
          </div>
          <div className="absolute bottom-0 right-10 opacity-10" aria-hidden="true">
            <Sparkles className="h-48 w-48 text-white" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white font-poppins">
              Create Beautiful Graphics <span className="block md:inline">in Seconds, Not Hours</span>
            </h2>
            
            <div className="w-24 h-1 bg-white/30 my-6 rounded-full"></div>
            
            <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl leading-8 text-white/90">
              Join thousands of creators and businesses using WordToImage to transform their ideas into stunning visuals instantly.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 w-full md:w-auto">
                <div className="text-4xl font-bold text-white mb-1">10,000+</div>
                <div className="text-white/80 text-sm">Images Generated</div>
              </div>
              
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 w-full md:w-auto">
                <div className="text-4xl font-bold text-white mb-1">4.9/5</div>
                <div className="text-white/80 text-sm">User Satisfaction</div>
              </div>
              
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 w-full md:w-auto">
                <div className="text-4xl font-bold text-white mb-1">3 sec</div>
                <div className="text-white/80 text-sm">Average Generation Time</div>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <PrimaryButton 
                size="lg" 
                className="bg-white text-blue-600 text-lg px-8 shadow-lg"
                onClick={handleCreateDesignClick}
                aria-label="Create your first design with WordToImage"
              >
                Start Creating Now - It's Free!
                <Wand2 className="ml-2 h-5 w-5" aria-hidden="true" />
              </PrimaryButton>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleExploreTemplatesClick}
                className="text-white border-white hover:bg-white/10 text-lg"
                aria-label="Browse template gallery"
              >
                Explore Templates
                <ImagePlus className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            
            <p className="mt-6 text-white/80 text-sm bg-white/10 px-4 py-2 rounded-full" role="note">
              <span className="font-semibold">Start creating for free.</span> No credit card required.
            </p>
            
            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center">
              <div className="flex -space-x-2 mr-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white/30 bg-gradient-to-br from-blue-300 to-purple-300"></div>
                ))}
              </div>
              <span className="text-white/90 text-sm">Join <span className="font-bold">2,500+</span> satisfied users today</span>
            </div>
            
            {/* Soft Launch Feedback Button */}
            <div className="mt-8 pt-4 border-t border-white/20 w-full max-w-md">
              <button 
                onClick={handleFeedbackClick}
                className="text-white/90 hover:text-white text-sm font-medium flex items-center justify-center mx-auto hover:bg-white/10 px-4 py-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Share Feedback (Beta)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
