
import { useState } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BetaBanner } from '@/components/BetaBanner';
import { SeoHead } from '@/components/home/SeoHead';
import { SkipToContent } from '@/components/home/SkipToContent';
import { MinimalistHero } from '@/components/home/MinimalistHero';
import { ImageShowcaseGrid } from '@/components/home/ImageShowcaseGrid';
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider';
import { MinimalistPricing } from '@/components/home/MinimalistPricing';
import { ProFeaturesModal } from '@/components/home/ProFeaturesModal';
import { HowItWorksDetailed } from '@/components/home/HowItWorksDetailed';
import { FeaturesDetailed } from '@/components/home/FeaturesDetailed';
import { FAQSection } from '@/components/home/FAQSection';
import { SEOContent } from '@/components/home/SEOContent';
import { motion } from 'framer-motion';

const Index = () => {
  const [showProModal, setShowProModal] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-dark via-ai-surface to-ai-muted text-white overflow-hidden">
      <SeoHead />
      <SkipToContent />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ai-primary/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-ai-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-ai-accent/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-circuit-pattern opacity-20"></div>
      </div>

      <Nav />
      
      <main id="main-content" className="relative z-10">
        {/* Enhanced Hero section with AI theme */}
        <div className="relative">
          <MinimalistHero onShowProFeatures={() => setShowProModal(true)} />
        </div>
        
        {/* How It Works - Detailed Section */}
        <HowItWorksDetailed />
        
        {/* Image Showcase Grid with enhanced styling */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-32 bg-gradient-to-r from-ai-surface/30 to-ai-muted/30 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                See What <span className="text-gradient-neon">You Can Create</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                From simple prompts to stunning visuals - explore the endless possibilities with AI-powered image generation
              </p>
            </motion.div>
            <ImageShowcaseGrid />
          </div>
        </motion.section>
        
        {/* Enhanced Features Section - Now More Detailed */}
        <FeaturesDetailed />
        
        {/* Enhanced Testimonials */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-32 bg-gradient-to-r from-ai-muted/20 to-ai-surface/20 backdrop-blur-sm"
        >
          <TestimonialsSlider />
        </motion.section>
        
        {/* FAQ Section for Better SEO */}
        <FAQSection />
        
        {/* SEO Content Section */}
        <SEOContent />
        
        {/* Enhanced Pricing */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-32 relative"
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
