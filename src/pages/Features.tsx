
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { TemplatesSection } from '@/components/TemplatesSection';
import { Sparkles, Image as ImageIcon, Zap, Palette, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { StaticFeaturesSection } from '@/components/features/StaticFeaturesSection';
import { StaticTestimonialsSection } from '@/components/testimonials/StaticTestimonialsSection';
import { StaticPricingSection } from '@/components/pricing/StaticPricingSection';
import { StaticFAQSection } from '@/components/faq/StaticFAQSection';

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Nav />
      
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Powerful AI Features
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Transform Ideas into</span>
              <br />
              <span className="text-gray-900">Stunning Visuals</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the power of advanced AI technology that converts your imagination into 
              high-quality images in seconds. From concept to creation with 50+ artistic styles, 
              4K resolution output, and lightning-fast generation.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Start Creating Now
                <Zap className="ml-2 h-5 w-5 inline" />
              </button>
              <button className="border-2 border-violet-600 text-violet-600 bg-transparent hover:bg-violet-600 hover:text-white transition-all duration-300 font-semibold text-lg px-8 py-4 rounded-xl">
                Watch Demo
                <ImageIcon className="ml-2 h-5 w-5 inline" />
              </button>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
                <Zap className="h-4 w-4 mr-2" />
                Core Features
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Powered by Advanced AI,</span>
                <br />
                <span className="text-gray-900">Designed for Everyone</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional-grade image generation tools that make creating stunning visuals effortless and powerful.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: Zap,
                  title: "Lightning-Fast AI Generation",
                  description: "Create stunning images in under 10 seconds with our optimized AI models. No more waiting hours for results.",
                  stats: "< 10 seconds",
                  color: "from-yellow-400 to-orange-500",
                },
                {
                  icon: Palette,
                  title: "50+ Artistic Styles & Filters",
                  description: "Choose from photorealistic, abstract, watercolor, oil painting, and dozens more artistic styles with one click.",
                  stats: "50+ styles",
                  color: "from-purple-400 to-pink-500",
                },
                {
                  icon: ImageIcon,
                  title: "High-Resolution Downloads (Up to 4K)",
                  description: "Download your creations in crystal-clear 4K resolution without watermarks. Perfect for print and digital use.",
                  stats: "Up to 4K",
                  color: "from-blue-400 to-cyan-500",
                },
                {
                  icon: Users,
                  title: "Full Commercial License Included",
                  description: "Use your generated images for commercial projects, social media, and business materials with complete rights.",
                  stats: "100% yours",
                  color: "from-green-400 to-emerald-500",
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-violet-600 font-semibold text-sm">
                      {feature.stats}
                    </span>
                    <div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center">
                      <Sparkles className="h-3 w-3 text-violet-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StaticFeaturesSection />
        <StaticTestimonialsSection />
        <StaticPricingSection />
        
        <section id="templates">
          <TemplatesSection />
        </section>

        <StaticFAQSection />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Transform Your Ideas</span>?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join over 100,000 creators who are already using WordToImage to bring their ideas to life. 
              Start creating professional-quality images in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Start Your Free Trial
                <Sparkles className="ml-2 h-5 w-5 inline" />
              </button>
              <button className="border-2 border-violet-600 text-violet-600 bg-transparent hover:bg-violet-600 hover:text-white transition-all duration-300 font-semibold text-lg px-10 py-4 rounded-xl">
                View Pricing Plans
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
                <p className="text-gray-600 text-sm">Generate images in under 10 seconds</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">No Credit Card</h3>
                <p className="text-gray-600 text-sm">Start with free generations today</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Commercial Rights</h3>
                <p className="text-gray-600 text-sm">Use images for any project</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
