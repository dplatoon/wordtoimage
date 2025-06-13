
import React from 'react';
import { ArrowRight, Star, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const FeaturesCTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Creative Process?
          </h2>
          <p className="text-xl text-violet-100 max-w-3xl mx-auto mb-8">
            Join thousands of creators, marketers, and businesses who are already using 
            WordToImage to bring their ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild className="bg-white text-violet-900 hover:bg-gray-100 px-8 py-3 text-lg">
              <Link to="/text-to-image">
                Start Creating Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-2 border-violet-300 text-violet-100 hover:bg-violet-800 px-8 py-3 text-lg">
              <Link to="/pricing">
                View Pricing Plans
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2">50,000+</div>
            <div className="text-violet-200">Active Users</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2">10M+</div>
            <div className="text-violet-200">Images Generated</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2">4.9/5</div>
            <div className="text-violet-200">User Rating</div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">What Our Users Say</h3>
          <blockquote className="text-lg text-violet-100 mb-4 max-w-2xl mx-auto">
            "WordToImage has completely transformed our creative workflow. We can now create 
            professional-quality images in minutes instead of hours."
          </blockquote>
          <cite className="text-violet-300">
            - Sarah Chen, Creative Director at TechCorp
          </cite>
        </div>
      </div>
    </section>
  );
};
