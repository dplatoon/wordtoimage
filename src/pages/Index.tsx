
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BetaBanner } from '@/components/BetaBanner';
import { CursorTrail } from '@/components/home/CursorTrail';
import { SeoHead } from '@/components/home/SeoHead';
import { SkipToContent } from '@/components/home/SkipToContent';
import { DecorativeBackground } from '@/components/DecorativeBackground';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Wand2, Star, Download, Image } from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { useAuth } from '@/contexts/AuthContext';
import { trackEvent } from '@/utils/analytics';

const Index = () => {
  const [showProModal, setShowProModal] = useState(false);
  const { user } = useAuth();

  const handleGetStarted = () => {
    trackEvent('cta_get_started_clicked');
  };

  const handleProFeatures = () => {
    setShowProModal(true);
    trackEvent('cta_pro_features_clicked');
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SeoHead />
      <CursorTrail />
      <SkipToContent />
      <Nav />
      
      <main id="main-content" className="relative">
        {/* Hero section with gradient background */}
        <div className="bg-gradient-to-b from-blue-50 to-white">
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins mb-6">
                Turn Words Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Stunning Images</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Generate beautiful visuals with AI – now with HD and Pro features.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <Link to="/text-to-image" onClick={handleGetStarted}>
                    Start Free
                    <Wand2 className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg border-2 border-blue-300 text-gray-700 hover:bg-blue-50 transition-colors px-8 py-6"
                  onClick={handleProFeatures}
                >
                  View Pro Features
                  <Star className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>
          
          {/* Features section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Features</h2>
                <p className="mt-4 text-lg text-gray-600">Everything you need to create amazing images</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">🎨</div>
                  <h3 className="text-xl font-semibold mb-2">HD Renders</h3>
                  <p className="text-gray-600">Unlock 2K+ images with no watermarks</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold mb-2">Faster Generation</h3>
                  <p className="text-gray-600">Pro users get results 3× faster</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">💾</div>
                  <h3 className="text-xl font-semibold mb-2">Save History</h3>
                  <p className="text-gray-600">Keep your renders in your gallery</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">🧠</div>
                  <h3 className="text-xl font-semibold mb-2">Prompt Boost</h3>
                  <p className="text-gray-600">Smart AI prompt assistance</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">📤</div>
                  <h3 className="text-xl font-semibold mb-2">Bulk Renders</h3>
                  <p className="text-gray-600">Generate 5 variations at once</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">🔓</div>
                  <h3 className="text-xl font-semibold mb-2">Commercial Use</h3>
                  <p className="text-gray-600">Royalty-free use in business projects</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Pricing section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Simple Pricing</h2>
                <p className="mt-4 text-lg text-gray-600">Choose the plan that works for you</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <p className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-500">/month</span></p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>SD Quality (720px)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>3 renders/day</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>Basic prompts</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" asChild>
                    <Link to="/text-to-image">
                      Start Free
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-500 relative">
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    POPULAR
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <p className="text-4xl font-bold mb-6">$9.99<span className="text-lg text-gray-500">/month</span></p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>HD Quality (2048px)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>50 renders/day</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>No watermarks</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>Gallery access</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>Prompt boost</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>Faster queue</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" onClick={handleProFeatures}>
                    Go Pro
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Generator section with CTA */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to create?</h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  Turn your words into stunning visuals with our AI-powered generator. Start creating now.
                </p>
                <Button 
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg shadow-lg px-8 py-6"
                  asChild
                >
                  <Link to="/text-to-image">
                    <Image className="mr-2 h-5 w-5" />
                    Start Creating
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          
          {/* Sample gallery section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
                <p className="mt-4 text-lg text-gray-600">Examples of what you can create</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
                    <img 
                      src={`https://source.unsplash.com/random/300x300?sig=${i}`} 
                      alt="AI generated" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Button 
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  asChild
                >
                  <Link to="/text-to-image">
                    <Download className="mr-2 h-5 w-5" />
                    Create Your Own
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
      <BetaBanner />
      
      {showProModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowProModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold mb-4">Upgrade to Pro</h3>
            <p className="text-gray-600 mb-6">
              Get access to HD renders, faster generation, and more with our Pro plan.
            </p>
            
            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Subscribe Now - $9.99/month
              </Button>
              
              <Button variant="outline" className="w-full" onClick={() => setShowProModal(false)}>
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
