
import { useEffect } from 'react';
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';
import { BetaBanner } from '@/components/BetaBanner';
import { OptimizedSeoHead } from '@/components/home/OptimizedSeoHead';
import { SkipToContent } from '@/components/accessibility/SkipToContent';
import { OptimizedHeroSection } from '@/components/home/OptimizedHeroSection';
import { FeaturesGridSection } from '@/components/home/FeaturesGridSection';
import { ImageShowcaseGrid } from '@/components/home/ImageShowcaseGrid';
import { EnhancedTestimonials } from '@/components/home/EnhancedTestimonials';
import { MinimalistPricing } from '@/components/home/MinimalistPricing';
import { FAQSection } from '@/components/home/FAQSection';

const OptimizedIndex = () => {
  useEffect(() => {
    // Track page view for analytics
    if (typeof window !== 'undefined') {
      import('@/utils/analytics').then(({ trackPageView }) => {
        trackPageView('/', 'Home - AI Image Generator');
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <OptimizedSeoHead page="home" />
      <SkipToContent />
      <BetaBanner />
      <Nav />
      
      <main id="main-content" className="relative">
        {/* Hero Section with proper H1 */}
        <OptimizedHeroSection />
        
        {/* Features Section */}
        <section aria-labelledby="features-heading" className="py-16 bg-white">
          <div className="content-container">
            <h2 id="features-heading" className="text-3xl font-bold text-center mb-12 text-gray-900">
              Powerful AI Features
            </h2>
            <FeaturesGridSection />
          </div>
        </section>
        
        {/* Gallery Section */}
        <section aria-labelledby="gallery-heading" className="py-16 bg-gray-50">
          <div className="content-container">
            <h2 id="gallery-heading" className="text-3xl font-bold text-center mb-12 text-gray-900">
              AI-Generated Masterpieces
            </h2>
            <ImageShowcaseGrid />
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section aria-labelledby="testimonials-heading" className="py-16 bg-white">
          <div className="content-container">
            <h2 id="testimonials-heading" className="text-3xl font-bold text-center mb-12 text-gray-900">
              What Our Users Say
            </h2>
            <EnhancedTestimonials />
          </div>
        </section>
        
        {/* Pricing Section */}
        <section aria-labelledby="pricing-heading" className="py-16 bg-gray-50">
          <div className="content-container">
            <h2 id="pricing-heading" className="text-3xl font-bold text-center mb-12 text-gray-900">
              Choose Your Plan
            </h2>
            <MinimalistPricing />
          </div>
        </section>
        
        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" className="py-16 bg-white">
          <div className="content-container">
            <h2 id="faq-heading" className="text-3xl font-bold text-center mb-12 text-gray-900">
              Frequently Asked Questions
            </h2>
            <FAQSection />
          </div>
        </section>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default OptimizedIndex;
