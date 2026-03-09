
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Play, Sparkles, ArrowRight, Zap, Star, Crown, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/utils/analytics';
import { motion, AnimatePresence } from 'framer-motion';

// Import hero images
import cyberpunkCity from '@/assets/hero/cyberpunk-city.jpg';
import fantasyForest from '@/assets/hero/fantasy-forest.jpg';
import dragonFire from '@/assets/hero/dragon-fire.jpg';

const floatingImages = [
  { src: cyberpunkCity, title: 'Cyberpunk City' },
  { src: fantasyForest, title: 'Fantasy Forest' },
  { src: dragonFire, title: 'Fire Dragon' },
];

export const AdvancedHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % floatingImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

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
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />
        
        {/* Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-[10%] w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.3), transparent)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
            y: [0, -40, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.25), transparent)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.15), transparent)' }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Additional accent orbs */}
        <motion.div
          className="absolute top-[30%] right-[20%] w-48 h-48 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, hsl(var(--neon-coral) / 0.2), transparent)' }}
          animate={{
            y: [0, -60, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-primary text-sm font-semibold">Next-Gen AI Studio</span>
              <Flame className="w-4 h-4 text-accent" />
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8">
              <span className="text-foreground">Free AI Image Generator – </span>
              <span className="text-gradient-primary">
                Transform Text
              </span>
              <br />
              <span className="text-foreground">Into </span>
              <span className="relative inline-block">
                <span className="text-gradient-primary neon-text">
                  Stunning Images
                </span>
                <Sparkles className="absolute -top-3 -right-8 w-6 h-6 text-primary animate-pulse" />
              </span>
            </h1>

            {/* Description - Enhanced for SEO */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
              Create professional AI-generated images in seconds with WordToImage. Simply describe what you want, 
              and our advanced AI technology transforms your text into stunning, high-quality visuals.
            </p>
            <p className="text-base text-muted-foreground/80 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Perfect for social media content, marketing campaigns, blog graphics, and creative projects. 
              No design skills or experience required – join 50,000+ creators already using AI to bring their ideas to life.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
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
                  className="glass-card px-5 py-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
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
                size="xl" 
                variant="neon"
                className="group relative text-lg font-bold" 
                asChild
              >
                <Link to="/text-to-image" onClick={handleGetStarted}>
                  <span className="relative z-10 flex items-center">
                    Start Creating Free
                    <Wand2 className="ml-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </span>
                </Link>
              </Button>
              
              <Button 
                size="xl" 
                variant="glass"
                className="group text-lg"
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
              className="flex flex-wrap justify-center lg:justify-start gap-6 mt-10 text-sm text-muted-foreground"
            >
              {['Free to try', 'No signup needed', 'Commercial use OK'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-neon" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main Image Card */}
            <div 
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="relative glass-card rounded-3xl overflow-hidden shadow-neon-lg"
                whileHover={{ scale: 1.03, rotateY: 5 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="aspect-square relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={floatingImages[currentImageIndex].src}
                      alt={floatingImages[currentImageIndex].title}
                      className="w-full h-full object-cover"
                      width={600}
                      height={600}
                      loading="eager"
                      fetchPriority="high"
                      initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  
                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ x: '100%', opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                
                {/* Overlay UI */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <motion.div 
                        className="text-xs text-primary font-semibold mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`label-${currentImageIndex}`}
                      >
                        AI Generated
                      </motion.div>
                      <AnimatePresence mode="wait">
                        <motion.div 
                          className="text-foreground font-bold text-lg"
                          key={`title-${currentImageIndex}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {floatingImages[currentImageIndex].title}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="flex gap-2">
                      {floatingImages.map((_, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            i === currentImageIndex 
                              ? 'bg-primary w-8 shadow-neon' 
                              : 'bg-muted-foreground/30 w-2 hover:bg-primary/50'
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3 mt-4 justify-center">
                {floatingImages.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                      i === currentImageIndex 
                        ? 'ring-2 ring-primary shadow-neon scale-105' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                      loading="lazy"
                    />
                    {i === currentImageIndex && (
                      <motion.div
                        className="absolute inset-0 bg-primary/20"
                        layoutId="activeThumb"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-6 -right-6 px-5 py-3 rounded-2xl glass-card border-primary/30"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-foreground font-bold">3s</span>
                    <span className="text-muted-foreground text-sm ml-1">Generation</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-6 px-5 py-3 rounded-2xl glass-card border-accent/30"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="text-foreground font-bold">4K</span>
                    <span className="text-muted-foreground text-sm ml-1">Quality</span>
                  </div>
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
            <div className="aspect-square glass-card rounded-3xl overflow-hidden shadow-neon">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={floatingImages[currentImageIndex].src}
                  alt={floatingImages[currentImageIndex].title}
                  className="w-full h-full object-cover"
                  width={384}
                  height={384}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {floatingImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentImageIndex 
                      ? 'bg-primary w-8 shadow-neon' 
                      : 'bg-muted-foreground/30 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Prompt Input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl" />
            
            <div className="relative glass-card rounded-3xl p-6 md:p-8 border-primary/20">
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Try It Now</h2>
                <p className="text-muted-foreground text-sm">Describe what you want to create</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A magical forest with glowing mushrooms..."
                  className="flex-1 px-5 py-4 rounded-2xl bg-secondary/50 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-base"
                />
                <Button 
                  size="lg"
                  variant="neon"
                  className="whitespace-nowrap"
                  asChild
                >
                  <Link to={`/text-to-image${prompt ? `?prompt=${encodeURIComponent(prompt)}` : ''}`}>
                    Generate
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Quick Suggestions */}
              <div className="flex flex-wrap gap-2 mt-5 justify-center">
                {['Cyberpunk city', 'Fantasy dragon', 'Anime portrait', 'Abstract art'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setPrompt(suggestion)}
                    className="px-4 py-2 rounded-full bg-muted/50 border border-border text-muted-foreground text-sm hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all touch-feedback focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label={`Use prompt: ${suggestion}`}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
