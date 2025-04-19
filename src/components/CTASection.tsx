
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 py-16 px-6 sm:py-24 sm:px-12">
          {/* Decorative elements - hidden from screen readers */}
          <div className="absolute top-1/3 left-0 opacity-10" aria-hidden="true">
            <PenTool className="h-64 w-64 text-white" />
          </div>
          <div className="absolute bottom-0 right-10 opacity-10" aria-hidden="true">
            <Sparkles className="h-48 w-48 text-white" />
          </div>
          
          <div className="relative flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white font-poppins">
              Start Creating Beautiful Graphics Today
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl leading-8 text-white/90">
              Join thousands of creators and businesses using WordToImage to transform their ideas into stunning visuals instantly.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <PrimaryButton 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8"
                onClick={handleCreateDesignClick}
                aria-label="Create your first design with WordToImage"
              >
                Create Your First Design
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
            <p className="mt-6 text-white/80 text-sm" role="note">Start creating for free. No credit card required.</p>
            
            {/* Soft Launch Feedback Button */}
            <div className="mt-8 pt-4 border-t border-white/20 w-full max-w-md">
              <button 
                onClick={handleFeedbackClick}
                className="text-white/90 hover:text-white text-sm font-medium flex items-center justify-center mx-auto"
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
