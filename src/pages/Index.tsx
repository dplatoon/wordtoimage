
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { OptimizedHeader } from '@/components/navigation/OptimizedHeader';
import { OptimizedHero } from '@/components/hero/OptimizedHero';
import { StaticFeaturesSection } from '@/components/features/StaticFeaturesSection';
import { StaticTestimonialsSection } from '@/components/testimonials/StaticTestimonialsSection';
import { StaticPricingSection } from '@/components/pricing/StaticPricingSection';
import { StaticFAQSection } from '@/components/faq/StaticFAQSection';
import { ModernFooter } from '@/components/home/ModernFooter';

const Index = () => {
  useEffect(() => {
    // Defer analytics to not block rendering
    if (typeof window !== 'undefined') {
      const timeoutId = setTimeout(() => {
        import('@/utils/analytics').then(({ trackPageView }) => {
          trackPageView('/', 'Home - AI Image Generator');
        }).catch(() => {
          // Fail silently for analytics
        });
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "WordToImage – Create Stunning AI Images from Text",
    "description": "Generate beautiful, AI-powered visuals from any text. No design skills required.",
    "url": "https://wordtoimage.com"
  };

  return (
    <>
      <Helmet>
        <title>WordToImage – Create Stunning AI Images from Text</title>
        <meta name="description" content="Generate beautiful, AI-powered visuals from any text. No design skills required." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <OptimizedHeader />
        
        <main id="main-content" role="main" className="pt-16">
          <OptimizedHero />
          <StaticFeaturesSection />
          <StaticTestimonialsSection />
          <StaticPricingSection />
          <StaticFAQSection />
        </main>
        
        <ModernFooter />
      </div>
    </>
  );
};

export default Index;
