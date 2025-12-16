
import React from 'react';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const FeaturesHeroSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4 md:mb-6 border border-primary/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Advanced AI Features
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Creative Excellence
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8">
            Discover the advanced capabilities that make WordToImage the most powerful 
            AI image generation platform for creators, businesses, and developers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="neon" size="lg">
              <Link to="/text-to-image">
                Start Creating Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20 text-center hover:border-primary/40 hover:shadow-neon transition-all">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">Generate high-quality images in seconds with our optimized AI models</p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20 text-center hover:border-primary/40 hover:shadow-neon transition-all">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Enterprise Ready</h3>
            <p className="text-sm text-muted-foreground">Built for scale with enterprise-grade security and reliability</p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20 text-center hover:border-primary/40 hover:shadow-neon transition-all">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">AI Powered</h3>
            <p className="text-sm text-muted-foreground">Latest AI technology for stunning, creative image generation</p>
          </div>
        </div>
      </div>
    </section>
  );
};
