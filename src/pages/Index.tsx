
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BetaBanner } from '@/components/BetaBanner';
import { Suspense, lazy, useEffect } from 'react';
import { Loading } from '@/components/ui/loading';

// Lazy load heavy components
const HeroSection = lazy(() => import('@/components/HeroSection').then(module => ({ default: module.HeroSection })));
const TemplatesSection = lazy(() => import('@/components/TemplatesSection').then(module => ({ default: module.TemplatesSection })));
const FeaturesSection = lazy(() => import('@/components/FeaturesSection').then(module => ({ default: module.FeaturesSection })));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const PricingSection = lazy(() => import('@/components/PricingSection').then(module => ({ default: module.PricingSection })));
const CTASection = lazy(() => import('@/components/CTASection').then(module => ({ default: module.CTASection })));

const Index = () => {
  // For SEO: Add structured data and page tracking
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
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      <Nav />
      
      <main id="main-content">
        <Suspense fallback={<Loading />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <TemplatesSection />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <FeaturesSection />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <CTASection />
        </Suspense>
        
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
