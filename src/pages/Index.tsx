
import { useState, useEffect } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BetaBanner } from '@/components/BetaBanner';
import { SeoHead } from '@/components/home/SeoHead';
import { SkipToContent } from '@/components/home/SkipToContent';
import { ModernAIHero } from '@/components/home/ModernAIHero';
import { ImageShowcaseGrid } from '@/components/home/ImageShowcaseGrid';
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider';
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
        {/* Hero section with proper heading hierarchy */}
        <header>
          <ModernAIHero onShowProFeatures={() => setShowProModal(true)} />
        </header>
        
        {/* How It Works section */}
        <section 
          className="py-20 md:py-28 bg-white" 
          aria-labelledby="how-it-works-heading"
          role="region"
        >
          <HowItWorksDetailed />
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

        {/* Customer testimonial section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-28 bg-white border-t border-gray-100"
          aria-labelledby="featured-testimonial-heading"
          role="region"
        >
          <div className="content-container">
            <div className="ai-card-modern max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 id="featured-testimonial-heading" className="sr-only">Featured Customer Testimonial</h2>
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                  "WordToImage has completely transformed my content creation process. I can now generate professional-quality visuals in seconds instead of spending hours on design. It's incredibly intuitive and the results are consistently impressive."
                </blockquote>
                <footer className="flex items-center justify-center space-x-4">
                  <div 
                    className="w-16 h-16 bg-ai-gradient rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg" 
                    aria-hidden="true"
                  >
                    SJ
                  </div>
                  <div className="text-left">
                    <cite className="text-xl font-semibold text-gray-900 not-italic">Sarah Johnson</cite>
                    <div className="text-lg text-gray-600">Content Creator & Marketing Professional</div>
                  </div>
                </footer>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Features section */}
        <section 
          className="py-20 md:py-28 bg-gradient-to-b from-gray-50/30 to-white" 
          aria-labelledby="features-heading"
          role="region"
        >
          <FeaturesDetailed />
        </section>
        
        {/* All testimonials section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-28 bg-white border-t border-gray-100"
          aria-labelledby="testimonials-heading"
          role="region"
        >
          <TestimonialsSlider />
        </motion.section>
        
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
      
      <Footer />
      <BetaBanner />
      
      <ProFeaturesModal 
        showModal={showProModal}
        onClose={() => setShowProModal(false)}
      />
    </div>
  );
};

export default Index;
