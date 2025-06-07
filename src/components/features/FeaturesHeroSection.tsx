
import React from 'react';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const FeaturesHeroSection = () => {
  return (
    <section className="mobile-section bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <div className="mobile-first-container">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-700 mobile-text-sm font-medium mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Advanced AI Features
          </div>
          
          <h1 className="mobile-text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Creative Excellence
            </span>
          </h1>
          
          <p className="mobile-text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8">
            Discover the advanced capabilities that make WordToImage the most powerful 
            AI image generation platform for creators, businesses, and developers.
          </p>
          
          <div className="mobile-stack md:flex md:items-center md:justify-center md:gap-4">
            <Button asChild className="mobile-button-primary w-full md:w-auto">
              <Link to="/text-to-image">
                Start Creating Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="mobile-button-secondary w-full md:w-auto">
              <Link to="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>

        <div className="mobile-grid mobile-grid-sm-2 mobile-grid-lg-3 gap-4 md:gap-8 max-w-4xl mx-auto">
          <div className="mobile-card text-center">
            <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-violet-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="mobile-text-sm text-gray-600">Generate high-quality images in seconds with our optimized AI models</p>
          </div>
          
          <div className="mobile-card text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Enterprise Ready</h3>
            <p className="mobile-text-sm text-gray-600">Built for scale with enterprise-grade security and reliability</p>
          </div>
          
          <div className="mobile-card text-center md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Powered</h3>
            <p className="mobile-text-sm text-gray-600">Latest AI technology for stunning, creative image generation</p>
          </div>
        </div>
      </div>
    </section>
  );
};
