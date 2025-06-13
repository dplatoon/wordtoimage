
import React from 'react';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const FeaturesHeroSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Advanced AI Features
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Creative Excellence
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8">
            Discover the advanced capabilities that make WordToImage the most powerful 
            AI image generation platform for creators, businesses, and developers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-3">
              <Link to="/text-to-image">
                Start Creating Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3">
              <Link to="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-violet-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600">Generate high-quality images in seconds with our optimized AI models</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Enterprise Ready</h3>
            <p className="text-sm text-gray-600">Built for scale with enterprise-grade security and reliability</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center md:col-span-1">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Powered</h3>
            <p className="text-sm text-gray-600">Latest AI technology for stunning, creative image generation</p>
          </div>
        </div>
      </div>
    </section>
  );
};
