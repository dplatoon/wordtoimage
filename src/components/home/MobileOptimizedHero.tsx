
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Sparkles, Zap, Download } from 'lucide-react';

export const MobileOptimizedHero = () => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (prompt.trim()) {
      window.location.href = `/text-to-image?prompt=${encodeURIComponent(prompt)}`;
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
      <div className="container mx-auto px-4 py-8 flex flex-col justify-center min-h-screen">
        {/* Hero content */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Image Generator
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Create Amazing Images
            <br />
            <span className="text-yellow-300">From Text</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Transform your ideas into stunning visuals with our AI-powered image generator
          </p>
        </div>

        {/* Input section - optimized for mobile */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Textarea
            placeholder="Describe your image... (e.g., 'A sunset over mountains with purple clouds')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full mb-4 min-h-[100px] bg-white/20 border-white/30 text-white placeholder:text-blue-200 focus:border-white focus:ring-white"
          />
          
          <Button
            onClick={handleGenerate}
            size="lg"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
            disabled={!prompt.trim()}
          >
            <Wand2 className="h-5 w-5 mr-2" />
            Generate Image
          </Button>
        </div>

        {/* Quick examples for mobile */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-center text-blue-200 text-sm mb-4">Quick examples:</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              "🌅 Peaceful mountain sunrise",
              "🌊 Ocean waves crashing on rocks",
              "🏙️ Futuristic city at night"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example.substring(2))}
                className="text-left p-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors text-sm"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Features grid - mobile optimized */}
        <div className="grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="h-6 w-6 text-yellow-300" />
            </div>
            <h3 className="font-medium text-sm">Fast</h3>
            <p className="text-xs text-blue-200">10s generation</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Sparkles className="h-6 w-6 text-yellow-300" />
            </div>
            <h3 className="font-medium text-sm">Quality</h3>
            <p className="text-xs text-blue-200">HD results</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Download className="h-6 w-6 text-yellow-300" />
            </div>
            <h3 className="font-medium text-sm">Free</h3>
            <p className="text-xs text-blue-200">No signup</p>
          </div>
        </div>

        {/* CTA at bottom */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-blue-200 text-xs mb-4">
            Join 100,000+ creators using AI to bring ideas to life
          </p>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-gray-900"
          >
            View Examples →
          </Button>
        </div>
      </div>
    </section>
  );
};
