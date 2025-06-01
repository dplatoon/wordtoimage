
import { useState, useEffect } from 'react';
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';
import { BetaBanner } from '@/components/BetaBanner';
import { SeoHead } from '@/components/home/SeoHead';
import { SkipToContent } from '@/components/accessibility/SkipToContent';
import { ModernAIHero } from '@/components/home/ModernAIHero';
import { FeaturesGridSection } from '@/components/home/FeaturesGridSection';
import { HowItWorksDetailed } from '@/components/home/HowItWorksDetailed';
import { ImageShowcaseGrid } from '@/components/home/ImageShowcaseGrid';
import { StylePresetsGallery } from '@/components/home/StylePresetsGallery';
import { SamplePromptsSection } from '@/components/home/SamplePromptsSection';
import { EnhancedTestimonials } from '@/components/home/EnhancedTestimonials';
import { MinimalistPricing } from '@/components/home/MinimalistPricing';
import { FAQSection } from '@/components/home/FAQSection';
import { ProFeaturesModal } from '@/components/home/ProFeaturesModal';
import { SocialMetaTags } from '@/components/social/SocialMetaTags';
import { ReadingProgress } from '@/components/content/ReadingProgress';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [showBetaBanner, setShowBetaBanner] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@/utils/analytics').then(({ trackPageView }) => {
        trackPageView('/', 'Home - AI Image Generator');
      }).catch(error => {
        console.warn('Analytics tracking failed:', error);
      });
    }

    const isDismissed = localStorage.getItem('betaBannerDismissed') === 'true';
    if (isDismissed) {
      setShowBetaBanner(false);
    }
  }, []);

  const handleShowProFeatures = () => {
    setIsPricingModalOpen(true);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "WordToImage – Create Stunning AI Images from Text",
    "description": "Generate beautiful, AI-powered visuals from any text. No design skills required.",
    "url": "https://wordtoimage.com",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "WordToImage AI Image Generator",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>WordToImage – Create Stunning AI Images from Text</title>
        <meta name="description" content="Generate beautiful, AI-powered visuals from any text. No design skills required." />
        <meta name="keywords" content="AI image generator, text to image, AI art generator, image creation, artificial intelligence, free AI tool" />
        
        {/* Open Graph */}
        <meta property="og:title" content="WordToImage – Create Stunning AI Images from Text" />
        <meta property="og:description" content="Generate beautiful, AI-powered visuals from any text. No design skills required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordtoimage.com" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WordToImage – Create Stunning AI Images from Text" />
        <meta name="twitter:description" content="Generate beautiful, AI-powered visuals from any text. No design skills required." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <SeoHead />
        <SocialMetaTags
          title="WordToImage – AI Text-to-Image Generator"
          description="Create stunning AI-generated images from text descriptions. Fast, easy, and high-quality results."
          type="website"
          url="https://wordtoimage.com"
        />
        
        <ReadingProgress target="main" />
        <SkipToContent />
        <BetaBanner />
        
        <header id="navigation">
          <Nav />
        </header>
        
        <div className={`${showBetaBanner ? 'pt-[106px]' : 'pt-16'}`}>
          <main id="main-content" className="relative" tabIndex={-1}>
            <section aria-labelledby="hero-heading">
              <h1 id="hero-heading" className="sr-only">WordToImage AI Image Generator</h1>
              <ModernAIHero onShowProFeatures={handleShowProFeatures} />
            </section>
            
            <section aria-labelledby="features-heading">
              <h2 id="features-heading" className="sr-only">Features Overview</h2>
              <FeaturesGridSection />
            </section>
            
            <section aria-labelledby="how-it-works-heading">
              <h2 id="how-it-works-heading" className="sr-only">How It Works</h2>
              <HowItWorksDetailed />
            </section>
            
            <section aria-labelledby="image-showcase-heading">
              <h2 id="image-showcase-heading" className="sr-only">Image Showcase</h2>
              <ImageShowcaseGrid />
            </section>
            
            <section aria-labelledby="style-presets-heading">
              <h2 id="style-presets-heading" className="sr-only">Style Presets</h2>
              <StylePresetsGallery />
            </section>
            
            <section aria-labelledby="sample-prompts-heading">
              <h2 id="sample-prompts-heading" className="sr-only">Sample Prompts</h2>
              <SamplePromptsSection />
            </section>
            
            <section aria-labelledby="testimonials-heading">
              <h2 id="testimonials-heading" className="sr-only">Customer Testimonials</h2>
              <EnhancedTestimonials />
            </section>
            
            <section aria-labelledby="pricing-heading">
              <h2 id="pricing-heading" className="sr-only">Pricing Plans</h2>
              <MinimalistPricing onShowProFeatures={handleShowProFeatures} />
            </section>
            
            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="sr-only">Frequently Asked Questions</h2>
              <FAQSection />
            </section>
          </main>
        </div>
        
        <footer id="footer" tabIndex={-1}>
          <ModernFooter />
        </footer>
        
        {isPricingModalOpen && (
          <ProFeaturesModal 
            showModal={isPricingModalOpen}
            onClose={() => setIsPricingModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default Index;
