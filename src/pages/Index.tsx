
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
    <div className="min-h-screen bg-white text-brand-slate-800 overflow-hidden">
      <SeoHead />
      <SkipToContent />
      
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none bg-pattern-subtle">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-brand-teal/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <Nav />
      
      <main id="main-content" className="relative z-10">
        {/* Hero section with refined styling */}
        <div className="relative bg-gradient-to-b from-brand-slate-50 to-white">
          <MinimalistHero onShowProFeatures={() => setShowProModal(true)} />
        </div>
        
        {/* How It Works section with better spacing */}
        <section className="section-spacing bg-white">
          <HowItWorksDetailed />
        </section>
        
        {/* Image Showcase with professional styling */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-spacing bg-gradient-to-b from-brand-slate-50/50 to-white"
        >
          <div className="content-container">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-inter font-bold text-brand-slate-900 mb-6">
                See What <span className="text-gradient-brand">You Can Create</span>
              </h2>
              <p className="text-xl text-brand-slate-600 max-w-3xl mx-auto leading-relaxed">
                From simple prompts to stunning visuals - explore the endless possibilities with AI-powered image generation
              </p>
            </motion.div>
            <ImageShowcaseGrid />
          </div>
        </motion.section>

        {/* Enhanced Testimonial Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-spacing bg-white border-t border-brand-slate-100"
        >
          <div className="content-container">
            <div className="testimonial-card">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <blockquote className="testimonial-quote">
                  "WordToImage has completely transformed my content creation process. I can now generate professional-quality visuals in seconds instead of spending hours on design. It's incredibly intuitive and the results are consistently impressive."
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-teal to-brand-purple rounded-full flex items-center justify-center text-white font-semibold">
                    SJ
                  </div>
                  <div className="text-left">
                    <div className="testimonial-author">Sarah Johnson</div>
                    <div className="testimonial-title">Content Creator & Marketing Professional</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Features section with modern cards */}
        <section className="section-spacing bg-gradient-to-b from-brand-slate-50/30 to-white">
          <FeaturesDetailed />
        </section>
        
        {/* Testimonials with refined styling */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-spacing bg-white border-t border-brand-slate-100"
        >
          <TestimonialsSlider />
        </motion.section>
        
        {/* FAQ section for better SEO */}
        <section className="section-spacing bg-gradient-to-b from-brand-slate-50/30 to-white border-t border-brand-slate-100">
          <FAQSection />
        </section>
        
        {/* SEO Content section */}
        <section className="section-spacing bg-white border-t border-brand-slate-100">
          <SEOContent />
        </section>
        
        {/* Pricing with professional styling */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-spacing bg-gradient-to-b from-brand-slate-50/30 to-white border-t border-brand-slate-100"
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
