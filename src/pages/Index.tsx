import { Nav } from '@/components/Nav';
import { HeroSection } from '@/components/HeroSection';
import { TemplatesSection } from '@/components/TemplatesSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { PricingSection } from '@/components/PricingSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { BetaBanner } from '@/components/BetaBanner';
import { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

// Lazy load non-critical sections for better initial load performance
const LazyFeaturesSection = lazy(() => import('@/components/FeaturesSection').then(module => ({ default: module.FeaturesSection })));
const LazyTestimonialsSection = lazy(() => import('@/components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const LazyPricingSection = lazy(() => import('@/components/PricingSection').then(module => ({ default: module.PricingSection })));

const Index = () => {
  useEffect(() => {
    // Track page view with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Home - WordToImage',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
    
    // Add page-specific metadata
    document.title = "WordToImage - Transform Text Into Images with AI";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>WordToImage - Transform Text Into Images with AI</title>
        <meta name="description" content="Turn your ideas into vivid images in seconds—no design skills needed. Create professional-looking visuals for social media, presentations, or inspiration." />
        <meta property="og:url" content="https://wordtoimage.com" />
        <meta property="og:title" content="WordToImage: AI Text-to-Image Generator" />
        <meta property="og:description" content="Create stunning visuals in seconds from text prompts. Free to try, no credit card required." />
        <meta property="og:image" content="https://wordtoimage.com/home-og.png" />
        <meta name="twitter:image" content="https://wordtoimage.com/home-og.png" />
      </Helmet>
      
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-50">
        Skip to main content
      </a>
      
      <Nav />
      
      <main id="main-content">
        <HeroSection />
        <TemplatesSection />
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading features...</div>}>
          <LazyFeaturesSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading testimonials...</div>}>
          <LazyTestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading pricing...</div>}>
          <LazyPricingSection />
        </Suspense>
        
        <CTASection />
        
        {/* FAQ Section for SEO */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">How does the AI text-to-image generator work?</h3>
                <p className="text-gray-700">
                  Our AI text-to-image generator uses advanced machine learning models that understand the relationship between text descriptions and visual elements. When you enter a text prompt, the AI analyzes your description and generates a corresponding image, considering style, composition, and content.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Do I need design experience to use WordToImage?</h3>
                <p className="text-gray-700">
                  Not at all! WordToImage is specifically designed for users with no design experience. Simply enter your text description, and our AI will generate an image for you. You can further customize it using our simple editing tools if desired.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">What kind of images can I create with WordToImage?</h3>
                <p className="text-gray-700">
                  You can create a wide variety of images including social media graphics, marketing materials, concept art, illustrations, and more. The possibilities are limited only by your imagination!
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">How fast is the AI image generation process?</h3>
                <p className="text-gray-700">
                  The WordToImage AI can generate high-quality images in seconds, with most images taking between 3-5 seconds to create. Complex descriptions may take slightly longer but are still completed in under 10 seconds.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Can I use the generated images commercially?</h3>
                <p className="text-gray-700">
                  Yes! Images generated with our Free plan can be used for personal projects. For commercial use, our Pro and Business plans provide full commercial usage rights for all generated images without any additional licensing fees.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BetaBanner />
    </div>
  );
};

export default Index;
