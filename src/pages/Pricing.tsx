
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { StaticPricingSection } from '@/components/pricing/StaticPricingSection';
import { StaticFAQSection } from '@/components/faq/StaticFAQSection';
import { PageSEO } from '@/components/seo/PageSEO';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Zap, Users, Shield } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title="Pricing Plans - WordToImage | AI Image Generation"
        description="Choose the perfect plan for your AI image generation needs. From free to enterprise, find transparent pricing with no hidden fees."
        keywords="AI image generation pricing, text to image cost, subscription plans, free AI art"
        canonical="https://wordtoimage.com/pricing"
        aiKeywords={['AI image generator pricing', 'artificial intelligence image creation cost', 'text to image subscription']}
        voiceSearchQueries={['WordToImage pricing plans', 'AI image generator cost', 'how much does AI image generation cost']}
      />
      
      <Nav />
      
      <main>
        <ContentBreadcrumbs />
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-violet-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Choose the perfect plan for your AI image generation needs. Start free and upgrade as you grow.
              </p>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-violet-600" />
                  <span>30-day money back</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-violet-600" />
                  <span>Instant activation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-violet-600" />
                  <span>10,000+ happy users</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <StaticPricingSection />
        
        {/* Feature Comparison */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              What's Included in Each Plan
            </h2>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Features</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div>Image generations</div>
                    <div>AI styles available</div>
                    <div>Image resolution</div>
                    <div>Download formats</div>
                    <div>Commercial usage</div>
                    <div>API access</div>
                    <div>Priority support</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="font-semibold text-lg mb-4">Free</h4>
                  <div className="space-y-3 text-sm">
                    <div>5 per day</div>
                    <div>10 styles</div>
                    <div>Standard (512px)</div>
                    <div>JPG, PNG</div>
                    <div className="text-red-500">✗</div>
                    <div className="text-red-500">✗</div>
                    <div>Community</div>
                  </div>
                </div>
                
                <div className="text-center bg-violet-50 rounded-xl p-4 -m-4">
                  <h4 className="font-semibold text-lg mb-4 text-violet-700">Pro</h4>
                  <div className="space-y-3 text-sm">
                    <div>Unlimited</div>
                    <div>50+ styles</div>
                    <div>High (1024px)</div>
                    <div>JPG, PNG, SVG</div>
                    <div className="text-green-500">✓</div>
                    <div>Basic</div>
                    <div>Email & Chat</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="font-semibold text-lg mb-4">Enterprise</h4>
                  <div className="space-y-3 text-sm">
                    <div>Unlimited</div>
                    <div>Custom styles</div>
                    <div>Ultra (2048px)</div>
                    <div>All formats</div>
                    <div className="text-green-500">✓</div>
                    <div>Full API</div>
                    <div>Dedicated manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <StaticFAQSection />
        
        {/* Final CTA */}
        <section className="py-16 bg-violet-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Create Amazing Images?
            </h2>
            <p className="text-xl text-violet-100 mb-8">
              Start with our free plan or jump straight to Pro for unlimited access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-gray-50">
                <Link to="/text-to-image">Start Free Today</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-violet-600">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
