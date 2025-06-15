
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SEOManager } from '@/components/seo/SEOManager';

const Product = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOManager customConfig={{
        title: "AI Image Generation Product - WordToImage Platform Features",
        description: "Discover WordToImage's complete AI image generation platform. Advanced text-to-image technology, batch processing, upscaling, and professional tools for creators.",
        keywords: ["AI image generation platform", "text to image product", "AI art tools", "batch image generation", "AI upscaler"]
      }} />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-violet-50 to-indigo-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                AI Image Generation
                <span className="block text-violet-600">Made Simple</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Transform your ideas into stunning visuals with our comprehensive AI image generation platform. 
                From simple prompts to professional artwork in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700">
                  <Link to="/text-to-image">
                    Start Creating Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Complete AI Image Suite
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to create, enhance, and manage AI-generated images
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Text to Image</h3>
                <p className="text-gray-600 mb-4">Generate stunning images from text descriptions using advanced AI models.</p>
                <Link to="/text-to-image" className="text-violet-600 hover:text-violet-700 font-medium">
                  Try Now →
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Batch Generator</h3>
                <p className="text-gray-600 mb-4">Create multiple variations and generate images in bulk for efficiency.</p>
                <Link to="/batch-generator" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Learn More →
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Upscaler</h3>
                <p className="text-gray-600 mb-4">Enhance image quality and resolution with AI-powered upscaling.</p>
                <Link to="/ai-upscaler" className="text-purple-600 hover:text-purple-700 font-medium">
                  Explore →
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Style Gallery</h3>
                <p className="text-gray-600 mb-4">Choose from 50+ artistic styles and customizable templates.</p>
                <Link to="/style-gallery" className="text-blue-600 hover:text-blue-700 font-medium">
                  Browse Styles →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-violet-600 to-indigo-600 py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Create Amazing Images?
            </h2>
            <p className="text-xl text-violet-100 mb-8">
              Join thousands of creators using WordToImage to bring their ideas to life
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/text-to-image">
                Start Creating Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
