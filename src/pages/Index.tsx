
import { useState, useEffect } from 'react';
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';
import { BetaBanner } from '@/components/BetaBanner';
import { SeoHead } from '@/components/home/SeoHead';
import { SkipToContent } from '@/components/home/SkipToContent';
import { ModernAIHero } from '@/components/home/ModernAIHero';
import { StylePresetsGallery } from '@/components/home/StylePresetsGallery';
import { SamplePromptsSection } from '@/components/home/SamplePromptsSection';
import { EnhancedTestimonials } from '@/components/home/EnhancedTestimonials';
import { ImageShowcaseGrid } from '@/components/home/ImageShowcaseGrid';
import { MinimalistPricing } from '@/components/home/MinimalistPricing';
import { ProFeaturesModal } from '@/components/home/ProFeaturesModal';
import { HowItWorksDetailed } from '@/components/home/HowItWorksDetailed';
import { FeaturesDetailed } from '@/components/home/FeaturesDetailed';
import { FAQSection } from '@/components/home/FAQSection';
import { SEOContent } from '@/components/home/SEOContent';
import { motion } from 'framer-motion';
import { initAccessibility } from '@/utils/accessibility';

const Index = () => {
  const [showProModal, setShowProModal] = useState(false);
  
  useEffect(() => {
    // Initialize accessibility features
    initAccessibility();
  }, []);
  
  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-hidden">
      <SeoHead />
      <SkipToContent />

      <Nav />
      
      <main id="main-content" className="relative z-10" role="main">
        {/* Modern AI Hero section */}
        <header>
          <ModernAIHero onShowProFeatures={() => setShowProModal(true)} />
        </header>
        
        {/* Style Presets Gallery section */}
        <section 
          aria-labelledby="style-presets-heading"
          role="region"
        >
          <StylePresetsGallery onStyleSelect={(preset) => {
            // Handle style selection - could navigate to generator with preset
            console.log('Style selected:', preset);
          }} />
        </section>
        
        {/* How It Works section */}
        <section 
          className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50/50" 
          aria-labelledby="how-it-works-heading"
          role="region"
        >
          <HowItWorksDetailed />
        </section>
        
        {/* Sample Prompts section */}
        <section 
          aria-labelledby="sample-prompts-heading"
          role="region"
        >
          <SamplePromptsSection onPromptSelect={(prompt) => {
            // Handle prompt selection - could navigate to generator with prompt
            console.log('Prompt selected:', prompt);
          }} />
        </section>
        
        {/* Image Showcase section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-28 bg-gradient-to-b from-gray-50/50 to-white"
          aria-labelledby="showcase-heading"
          role="region"
        >
          <div className="content-container">
            <motion.header 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 id="showcase-heading" className="section-title text-gray-900 mb-6">
                See What <span className="text-gradient-ai">You Can Create</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                From simple prompts to stunning visuals - explore the endless possibilities with AI-powered image generation
              </p>
            </motion.header>
            <ImageShowcaseGrid />
          </div>
        </motion.section>

        {/* Enhanced Testimonials section */}
        <section 
          aria-labelledby="testimonials-heading"
          role="region"
        >
          <EnhancedTestimonials />
        </section>
        
        {/* Features section */}
        <section 
          className="py-20 md:py-28 bg-gradient-to-b from-gray-50/30 to-white" 
          aria-labelledby="features-heading"
          role="region"
        >
          <FeaturesDetailed />
        </section>
        
        {/* FAQ section */}
        <section 
          className="py-20 md:py-28 bg-gradient-to-b from-gray-50/30 to-white border-t border-gray-100" 
          aria-labelledby="faq-heading"
          role="region"
        >
          <FAQSection />
        </section>
        
        {/* SEO Content section */}
        <section 
          className="py-20 md:py-28 bg-white border-t border-gray-100" 
          aria-labelledby="seo-content-heading"
          role="region"
        >
          <SEOContent />
        </section>
        
        {/* Pricing section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-28 bg-gradient-to-b from-gray-50/30 to-white border-t border-gray-100"
          aria-labelledby="pricing-heading"
          role="region"
        >
          <MinimalistPricing onShowProFeatures={() => setShowProModal(true)} />
        </motion.section>
      </main>
      
      <ModernFooter />
      <BetaBanner />
      
      <ProFeaturesModal 
        showModal={showProModal}
        onClose={() => setShowProModal(false)}
      />
    </div>
  );
};

export default Index;
