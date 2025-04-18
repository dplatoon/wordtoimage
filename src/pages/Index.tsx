
import { Nav } from '@/components/Nav';
import { HeroSection } from '@/components/HeroSection';
import { TemplatesSection } from '@/components/TemplatesSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { PricingSection } from '@/components/PricingSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { BetaBanner } from '@/components/BetaBanner';
import { useEffect } from 'react';

const Index = () => {
  // Log page view for analytics
  useEffect(() => {
    // Track page view with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Home',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <HeroSection />
        <TemplatesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
      <BetaBanner />
    </div>
  );
};

export default Index;
