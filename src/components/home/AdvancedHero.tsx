
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Play, Sparkles, ArrowRight, Zap, Star, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/utils/analytics';
import { motion } from 'framer-motion';

const floatingImages = [
  '/lovable-uploads/4034377e-d4f1-439d-b479-367253c12770.png',
  '/lovable-uploads/60da266c-4810-4f41-9449-ae54c2026373.png',
  '/lovable-uploads/53e8165c-d2db-4f0c-9509-f0e76e5c179f.png',
];

export const AdvancedHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % floatingImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    trackEvent('hero_get_started_clicked');
  };

  const handleViewExamples = () => {
    trackEvent('hero_view_examples_clicked');
    const showcaseSection = document.getElementById('showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-950">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-600/15 via-transparent to-transparent" />
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-violet-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/30 backdrop-blur-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="text-violet-300 text-sm font-medium">AI-Powered Creative Studio</span>
              <Crown className="w-4 h-4 text-amber-400" />
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              <span className="text-white">Create </span>
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Stunning Art
              </span>
              <br />
              <span className="text-white">With </span>
              <span className="relative">
                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                  AI Magic
                </span>
                <Sparkles className="absolute -top-2 -right-6 w-5 h-5 text-amber-400 animate-pulse" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-300/90 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Transform your ideas into breathtaking visuals in seconds. 
              Professional-quality AI art generation, no design skills required.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              {[
                { value: '50+', label: 'Art Styles', icon: Sparkles },
                { value: '3s', label: 'Generation', icon: Zap },
                { value: '4K', label: 'Quality', icon: Star },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <stat.icon className="w-5 h-5 text-violet-400" />
                  <div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40 hover:scale-[1.02]" 
                asChild
              >
                <Link to="/text-to-image" onClick={handleGetStarted}>
                  <span className="relative z-10 flex items-center">
                    Start Creating Free
                    <Wand2 className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="group border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 px-8 py-6 text-lg rounded-2xl transition-all duration-300"
                onClick={handleViewExamples}
              >
                View Examples
                <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 text-sm text-gray-400"
            >
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Free to try
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                No signup needed
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Commercial use OK
              </span>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main Image Card */}
            <div className="relative">
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/20 border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square bg-gradient-to-br from-violet-900/50 to-indigo-900/50 backdrop-blur-sm">
                  <img
                    src={floatingImages[currentImageIndex]}
                    alt="AI Generated Art"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
                
                {/* Overlay UI */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-violet-300 mb-1">AI Generated</div>
                      <div className="text-white font-medium">Cyberpunk City</div>
                    </div>
                    <div className="flex gap-2">
                      {floatingImages.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === currentImageIndex ? 'bg-violet-400 w-6' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-6 -right-6 px-4 py-3 rounded-2xl bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2 text-white">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-semibold">3s Generation</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-6 px-4 py-3 rounded-2xl bg-gradient-to-r from-violet-500/90 to-purple-500/90 backdrop-blur-sm shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-2 text-white">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-semibold">4K Quality</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Image Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="lg:hidden mt-12"
        >
          <div className="relative max-w-sm mx-auto">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/20 border border-white/10">
              <img
                src={floatingImages[currentImageIndex]}
                alt="AI Generated Art"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {floatingImages.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentImageIndex ? 'bg-violet-400 w-6' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Prompt Input - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-3xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Try It Now</h2>
                <p className="text-gray-400 text-sm">Describe what you want to create</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A magical forest with glowing mushrooms..."
                  className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all text-base"
                />
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold px-8 py-4 rounded-2xl whitespace-nowrap"
                  asChild
                >
                  <Link to={`/text-to-image${prompt ? `?prompt=${encodeURIComponent(prompt)}` : ''}`}>
                    Generate
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Quick Suggestions */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {['Cyberpunk city', 'Fantasy dragon', 'Anime portrait', 'Abstract art'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setPrompt(suggestion)}
                    className="px-3 py-1.5 rounded-full bg-white/10 text-gray-300 text-xs hover:bg-white/20 hover:text-white transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-400/50 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-gray-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
