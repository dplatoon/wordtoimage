import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wand2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EXAMPLE_PROMPTS = [
  "A majestic dragon flying over a crystal castle",
  "Cyberpunk cityscape with neon lights and rain",
  "Watercolor painting of a peaceful garden",
  "Futuristic robot exploring an alien planet",
  "Victorian mansion in a misty forest"
];

const ANIMATED_RESULTS = [
  "/lovable-uploads/4034377e-d4f1-439d-b479-367253c12770.png",
  "/lovable-uploads/99f5c8dc-6b8d-4daf-81a1-ff186d0ee10a.png",
  "/lovable-uploads/53e8165c-d2db-4f0c-9509-f0e76e5c179f.png"
];

export const HeroPromptInput = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [currentExample, setCurrentExample] = useState(0);
  const [currentResult, setCurrentResult] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Cycle through example prompts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % EXAMPLE_PROMPTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate generation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentResult((prev) => (prev + 1) % ANIMATED_RESULTS.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = () => {
    const promptToUse = prompt || EXAMPLE_PROMPTS[currentExample];
    navigate(`/text-to-image?prompt=${encodeURIComponent(promptToUse)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 mb-16">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 lg:p-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Input */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-violet-400" />
              <span className="text-violet-300 font-medium">Try it now</span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              Describe Your Vision
            </h3>
            
            {/* Prompt Input */}
            <div className="space-y-4">
              <div className="relative">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={EXAMPLE_PROMPTS[currentExample]}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 text-lg py-6 px-6 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                />
              </div>
              
              <Button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Generate AI Image
                <Wand2 className="ml-3 h-5 w-5" />
              </Button>
            </div>
            
            {/* Example Text */}
            <div className="mt-6">
              <p className="text-gray-300 text-sm mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.slice(0, 3).map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="text-xs bg-white/10 hover:bg-white/20 text-violet-300 px-3 py-2 rounded-full transition-colors border border-white/20"
                  >
                    {example.slice(0, 25)}...
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Side - Animated Preview */}
          <div className="relative">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-sm">AI Generating...</span>
              </div>
              
              {/* Result Preview */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-violet-900/20 to-indigo-900/20">
                <img
                  src={ANIMATED_RESULTS[currentResult]}
                  alt="AI generated preview"
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isAnimating ? 'scale-110 opacity-50' : 'scale-100 opacity-100'
                  }`}
                />
                
                {/* Generation Overlay */}
                {isAnimating && (
                  <div className="absolute inset-0 bg-violet-600/20 flex items-center justify-center">
                    <div className="bg-white/90 rounded-lg px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-violet-600 font-medium text-sm">Generating...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                <div>
                  <div className="text-violet-400 font-bold text-lg">3s</div>
                  <div className="text-gray-400 text-xs">Generation</div>
                </div>
                <div>
                  <div className="text-indigo-400 font-bold text-lg">4K</div>
                  <div className="text-gray-400 text-xs">Quality</div>
                </div>
                <div>
                  <div className="text-purple-400 font-bold text-lg">Free</div>
                  <div className="text-gray-400 text-xs">To Try</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};