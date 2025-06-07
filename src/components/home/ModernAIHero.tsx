
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Wand2, Sparkles, Zap, Star, Play, ArrowRight } from 'lucide-react';

export const ModernAIHero = () => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (prompt.trim()) {
      window.location.href = `/text-to-image?prompt=${encodeURIComponent(prompt)}`;
    }
  };

  const examplePrompts = [
    "A cyberpunk cityscape with neon lights",
    "Watercolor painting of a serene lake",
    "Modern minimalist logo design",
    "Abstract geometric art in vibrant colors"
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none px-6 py-2 text-lg">
            <Sparkles className="h-5 w-5 mr-2" />
            Next-Gen AI Technology
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              AI-Powered
            </span>
            <br />
            Image Creation
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your imagination into stunning visuals with our cutting-edge AI technology. 
            Create professional-quality images from simple text descriptions in seconds.
          </p>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 mb-8 text-sm text-gray-400">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>4.9/5 Rating</span>
            </div>
            <div>100k+ Creators</div>
            <div>1M+ Images Generated</div>
          </div>
        </div>

        {/* Main CTA Section */}
        <div className="max-w-4xl mx-auto">
          {/* Input area */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Describe your dream image... (e.g., 'A majestic dragon soaring over a fantasy castle')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-14 text-lg bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-cyan-400 focus:ring-cyan-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                />
              </div>
              <Button
                onClick={handleGenerate}
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold"
                disabled={!prompt.trim()}
              >
                <Wand2 className="h-5 w-5 mr-2" />
                Generate Now
              </Button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
            >
              View Gallery
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          {/* Example prompts */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-gray-400 mb-4">🎨 Get inspired by these examples:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-gray-300 hover:text-white transition-all duration-200 border border-white/20 hover:border-white/40"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features showcase */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Generate in 5-10 seconds" },
            { icon: Sparkles, title: "High Quality", desc: "Up to 4K resolution" },
            { icon: Wand2, title: "Easy to Use", desc: "Just type and create" },
            { icon: Star, title: "Commercial Use", desc: "Full rights included" }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10 animate-fade-in"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
