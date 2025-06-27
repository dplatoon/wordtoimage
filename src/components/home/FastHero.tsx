
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Play, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/utils/analytics';

export const FastHero = () => {
  const [showProModal, setShowProModal] = useState(false);
  
  const handleGetStarted = () => {
    trackEvent('hero_get_started_clicked');
  };
  
  const handleViewExamples = () => {
    trackEvent('hero_view_examples_clicked');
    // Scroll to showcase section
    const showcaseSection = document.getElementById('showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* AI Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium mb-6 sm:mb-8">
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Creative Studio
        </div>
        
        {/* Main H1 Headline - SEO Optimized */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8">
          <span className="block">AI Image Generator:</span>
          <span className="block mt-2 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Transform Text Into Art
          </span>
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-300">
            Create Stunning Visuals Instantly
          </span>
        </h1>
        
        {/* Enhanced Description - SEO Content */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed mb-4">
            Generate professional-quality images from simple text descriptions using advanced artificial intelligence. 
            Our AI image generator powered by cutting-edge machine learning models transforms your creative ideas 
            into stunning visual artwork in seconds.
          </p>
          
          <p className="text-base sm:text-lg text-violet-300 font-medium">
            Perfect for content creators, marketers, designers, and artists seeking high-quality AI-generated images 
            for social media, websites, presentations, and creative projects. No design experience required – 
            just describe what you want and watch our AI bring your vision to life.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10 sm:mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
            <div className="text-2xl font-bold text-violet-400 mb-1">50+</div>
            <div className="text-sm text-gray-300">AI Art Styles</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
            <div className="text-2xl font-bold text-indigo-400 mb-1">4K</div>
            <div className="text-sm text-gray-300">Resolution Output</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-400 mb-1">3 Sec</div>
            <div className="text-sm text-gray-300">Generation Time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
            <div className="text-2xl font-bold text-pink-400 mb-1">Free</div>
            <div className="text-sm text-gray-300">Daily Credits</div>
          </div>
        </div>

        {/* How it Works Process */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">How Our AI Image Generator Works</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-white">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
                <div className="font-semibold">Write Your Prompt</div>
                <div className="text-sm text-gray-400">Describe the image you want to create</div>
              </div>
              <div className="hidden sm:block w-8 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
                <div className="font-semibold">AI Generates Art</div>
                <div className="text-sm text-gray-400">Our AI creates your unique image</div>
              </div>
              <div className="hidden sm:block w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
                <div className="font-semibold">Download & Use</div>
                <div className="text-sm text-gray-400">Get high-res images instantly</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold px-10 py-6 text-xl rounded-xl shadow-lg transition-all duration-300 w-full sm:w-auto" 
            asChild
          >
            <Link to="/text-to-image" onClick={handleGetStarted}>
              Start Creating Free
              <Wand2 className="ml-3 h-6 w-6" />
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            className="border-2 border-violet-400 text-violet-400 bg-transparent hover:bg-violet-400 hover:text-slate-900 w-full sm:w-auto text-xl px-10 py-6 rounded-xl transition-all duration-300"
            onClick={handleViewExamples}
          >
            View AI Art Examples
            <Play className="ml-3 h-5 w-5" />
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-400 mb-8">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-violet-400" />
            Free to try - No signup required
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-violet-400" />
            Commercial use allowed
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-violet-400" />
            Professional 4K quality
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-violet-400" />
            50+ artistic styles available
          </div>
        </div>

        {/* Additional SEO Content */}
        <div className="max-w-4xl mx-auto text-left">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why Choose WordToImage AI Generator?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-violet-300 mb-2">Advanced AI Technology</h3>
                <p className="text-sm leading-relaxed">
                  Our state-of-the-art artificial intelligence models are trained on millions of high-quality images 
                  to understand context, style, and artistic composition. Generate photorealistic images, digital art, 
                  illustrations, and concept art with unprecedented quality and detail.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-300 mb-2">Multiple Art Styles</h3>
                <p className="text-sm leading-relaxed">
                  From photorealistic portraits to abstract digital art, anime illustrations to oil paintings, 
                  our AI image generator supports over 50 different artistic styles. Create images in any style 
                  you can imagine – perfect for branding, social media, presentations, and creative projects.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Lightning Fast Generation</h3>
                <p className="text-sm leading-relaxed">
                  Generate high-quality AI images in just 3 seconds. Our optimized infrastructure ensures 
                  fast processing times without compromising on image quality. Create multiple variations 
                  quickly to find the perfect image for your needs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-pink-300 mb-2">Commercial License Included</h3>
                <p className="text-sm leading-relaxed">
                  All generated images come with full commercial usage rights. Use your AI-created artwork 
                  for marketing campaigns, website content, social media posts, product designs, and any 
                  commercial purpose without additional licensing fees or restrictions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
