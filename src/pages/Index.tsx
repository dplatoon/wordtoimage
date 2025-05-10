
import { useState } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BetaBanner } from '@/components/BetaBanner';
import { CursorTrail } from '@/components/home/CursorTrail';
import { SeoHead } from '@/components/home/SeoHead';
import { SkipToContent } from '@/components/home/SkipToContent';
import { PricingTable } from '@/components/pricing/PricingTable';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CtaGeneratorSection } from '@/components/home/CtaGeneratorSection';
import { GallerySection } from '@/components/home/GallerySection';
import { ProFeaturesModal } from '@/components/home/ProFeaturesModal';
import { motion } from 'framer-motion';

const Index = () => {
  const [showProModal, setShowProModal] = useState(false);
  
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SeoHead />
      <CursorTrail />
      <SkipToContent />
      <Nav />
      
      <main id="main-content" className="relative">
        {/* Hero section with gradient background */}
        <div className="bg-gradient-to-b from-indigo-50 to-white">
          <HeroSection />
          
          {/* Features section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <FeaturesSection />
          </motion.div>
          
          {/* Pricing section */}
          <motion.section 
            className="py-16 bg-gray-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Simple Pricing</h2>
                <p className="mt-4 text-lg text-gray-600">Choose the plan that works for you</p>
              </div>
              
              {/* Replace the old pricing with the consistent PricingTable component */}
              <PricingTable />
            </div>
          </motion.section>
          
          {/* Generator section with CTA */}
          <CtaGeneratorSection />
          
          {/* Sample gallery section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GallerySection />
          </motion.div>
        </div>
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
