
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TemplatesSection } from '@/components/TemplatesSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Image as ImageIcon, Zap, Palette, Download, Shield, Clock, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageGenerationForm } from '@/components/hero/ImageGenerationForm';
import { ImagePreview } from '@/components/hero/ImagePreview';
import { motion } from 'framer-motion';

const Features = () => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scroll animation observer
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    const elements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const aiFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast Generation",
      description: "Generate stunning images in seconds with our optimized AI models",
      stats: "< 10 seconds",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Palette,
      title: "Multiple Art Styles",
      description: "Choose from dozens of artistic styles from photorealistic to abstract",
      stats: "50+ styles",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Download,
      title: "High Resolution Output",
      description: "Download your creations in up to 4K resolution without watermarks",
      stats: "Up to 4K",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Commercial License",
      description: "Use your generated images for commercial projects with full rights",
      stats: "100% yours",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Batch Processing",
      description: "Generate multiple variations simultaneously to find the perfect image",
      stats: "Up to 5 at once",
      color: "from-indigo-400 to-purple-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share your generations with team members and build together",
      stats: "Unlimited sharing",
      color: "from-pink-400 to-rose-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-dark via-ai-surface to-ai-muted text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ai-primary/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-ai-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-ai-accent/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <Nav />
      
      <main className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="py-20 md:py-32 relative">
          <div className="content-container">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-6 bg-gradient-to-r from-ai-primary to-ai-secondary text-white border-none px-6 py-2 text-lg">
                  <Sparkles className="h-5 w-5 mr-2" />
                  AI-Powered Features
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                  <span className="text-gradient-neon">Unleash Your</span>
                  <br />
                  <span className="text-white">Creative Potential</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
                  Transform your imagination into stunning visuals with our cutting-edge AI technology. 
                  From concept to creation in seconds.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Button className="btn-ai-neon text-lg px-10 py-6">
                    Start Creating Now
                    <Zap className="ml-2 h-5 w-5" />
                  </Button>
                  <Button className="btn-ai-outline text-lg px-10 py-6">
                    Watch Demo
                    <ImageIcon className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-1/4 left-10 floating">
            <div className="w-4 h-4 bg-ai-neon rounded-full animate-pulse"></div>
          </div>
          <div className="absolute top-1/3 right-20 floating-delayed">
            <div className="w-6 h-6 bg-ai-secondary rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-1/4 right-10 floating-slow">
            <div className="w-3 h-3 bg-ai-accent rounded-full animate-pulse"></div>
          </div>
        </section>

        {/* AI Features Grid */}
        <section className="py-20 md:py-32 relative">
          <div className="content-container">
            <motion.div
              className="text-center mb-16 scroll-fade-in"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-ai-primary/20 text-ai-neon border-ai-primary/30 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Advanced Capabilities
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Powered by AI,</span>
                <br />
                <span className="text-white">Designed for You</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our advanced AI features are built to make image generation effortless, 
                powerful, and accessible to everyone.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="ai-card group hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-ai-neon font-semibold">{feature.stats}</span>
                    <div className="w-8 h-8 bg-ai-primary/20 rounded-full flex items-center justify-center group-hover:bg-ai-primary/40 transition-colors duration-300">
                      <Check className="h-4 w-4 text-ai-neon" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-ai-surface/50 to-ai-muted/50 backdrop-blur-sm">
          <div className="content-container">
            <div className="text-center mb-16 scroll-fade-in">
              <Badge className="mb-4 bg-ai-accent/20 text-ai-accent border-ai-accent/30 px-4 py-2">
                <ImageIcon className="h-4 w-4 mr-2" />
                Live Demo
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Try It <span className="text-gradient-neon">Right Now</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the power of AI image generation instantly. 
                Enter your prompt and watch your ideas come to life.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="scroll-slide-left">
                <ImageGenerationForm 
                  onImageGenerated={setGeneratedImageUrl}
                  onGeneratingChange={setIsGenerating}
                  onError={setError}
                />
              </div>
              <div className="scroll-slide-right">
                <ImagePreview 
                  imageUrl={generatedImageUrl}
                  isGenerating={isGenerating}
                  error={error}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <FeaturesSection />

        {/* Templates Section */}
        <TemplatesSection />

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative">
          <div className="content-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Ready to <span className="text-gradient-neon">Create Magic</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands of creators who are already using WordToImage to bring their ideas to life.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button className="btn-ai-neon text-lg px-12 py-6">
                  Start Your Free Trial
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
                <Button className="btn-ai-outline text-lg px-12 py-6">
                  View Pricing
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
