
import { useState } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BetaBanner } from '@/components/BetaBanner';
import { SeoHead } from '@/components/home/SeoHead';
import { SkipToContent } from '@/components/home/SkipToContent';
import { MinimalistHero } from '@/components/home/MinimalistHero';
import { ImageShowcaseGrid } from '@/components/home/ImageShowcaseGrid';
import { MinimalistFeatures } from '@/components/home/MinimalistFeatures';
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider';
import { MinimalistPricing } from '@/components/home/MinimalistPricing';
import { ProFeaturesModal } from '@/components/home/ProFeaturesModal';
import { motion } from 'framer-motion';

const Index = () => {
  const [showProModal, setShowProModal] = useState(false);
  
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SeoHead />
      <SkipToContent />
      <Nav />
      
      <main id="main-content" className="relative">
        {/* Hero section with gradient background and blurred image */}
        <MinimalistHero onShowProFeatures={() => setShowProModal(true)} />
        
        {/* Image Showcase Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-16 md:py-20 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">See What You Can Create</h2>
            <ImageShowcaseGrid />
          </div>
        </motion.section>
        
        {/* Minimalist Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-16 md:py-20 bg-white"
        >
          <MinimalistFeatures />
        </motion.section>
        
        {/* Testimonials Slider */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-16 md:py-20 bg-gray-50"
        >
          <TestimonialsSlider />
        </motion.section>
        
        {/* Minimalist Pricing */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-16 md:py-20 bg-white"
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
