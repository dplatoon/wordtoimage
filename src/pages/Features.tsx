
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TemplatesSection } from '@/components/TemplatesSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Image as ImageIcon, Zap, Palette, Download, Shield, Clock, Users, ArrowRight, Hash } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageGenerationForm } from '@/components/hero/ImageGenerationForm';
import { ImagePreview } from '@/components/hero/ImagePreview';
import { motion } from 'framer-motion';

const Features = () => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Feature sections for navigation
  const featureSections = [
    { id: 'hero', title: 'Overview', icon: Sparkles },
    { id: 'ai-features', title: 'AI Features', icon: Zap },
    { id: 'demo', title: 'Live Demo', icon: ImageIcon },
    { id: 'detailed-features', title: 'All Features', icon: Users },
    { id: 'templates', title: 'Templates', icon: Palette }
  ];

  // Scroll spy for active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = featureSections.map(section => document.getElementById(section.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(featureSections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Core AI features data
  const aiFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast Generation",
      description: "Generate stunning images in seconds with our optimized AI models",
      stats: "< 10 seconds",
      color: "from-yellow-400 to-orange-500",
      priority: "core"
    },
    {
      icon: Palette,
      title: "Multiple Art Styles",
      description: "Choose from dozens of artistic styles from photorealistic to abstract",
      stats: "50+ styles",
      color: "from-purple-400 to-pink-500",
      priority: "core"
    },
    {
      icon: Download,
      title: "High Resolution Output",
      description: "Download your creations in up to 4K resolution without watermarks",
      stats: "Up to 4K",
      color: "from-blue-400 to-cyan-500",
      priority: "core"
    },
    {
      icon: Shield,
      title: "Commercial License",
      description: "Use your generated images for commercial projects with full rights",
      stats: "100% yours",
      color: "from-green-400 to-emerald-500",
      priority: "core"
    },
    {
      icon: Clock,
      title: "Batch Processing",
      description: "Generate multiple variations simultaneously to find the perfect image",
      stats: "Up to 5 at once",
      color: "from-indigo-400 to-purple-500",
      priority: "advanced"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share your generations with team members and build together",
      stats: "Unlimited sharing",
      color: "from-pink-400 to-rose-500",
      priority: "advanced"
    }
  ];

  const coreFeatures = aiFeatures.filter(f => f.priority === "core");
  const advancedFeatures = aiFeatures.filter(f => f.priority === "advanced");

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
      
      {/* Feature Navigation */}
      <div className="sticky top-16 z-40 bg-ai-dark/80 backdrop-blur-sm border-b border-ai-primary/20">
        <div className="content-container">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-1 overflow-x-auto hide-scrollbar">
              {featureSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      activeSection === section.id
                        ? 'bg-ai-primary text-white'
                        : 'text-gray-300 hover:text-white hover:bg-ai-primary/20'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{section.title}</span>
                  </button>
                );
              })}
            </div>
            <Button className="btn-ai-neon text-sm px-4 py-2 ml-4">
              <ArrowRight className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Get Started</span>
            </Button>
          </div>
        </div>
      </div>
      
      <main className="relative z-10">
        {/* Enhanced Hero Section */}
        <section id="hero" className="py-12 md:py-20 relative">
          <div className="content-container">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-6 bg-gradient-to-r from-ai-primary to-ai-secondary text-white border-none px-6 py-2 text-lg">
                  <Sparkles className="h-5 w-5 mr-2" />
                  ✨ Powerful Features
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                  <span className="text-gradient-neon">Unleash Your</span>
                  <br />
                  <span className="text-white">Creative Potential</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Transform your imagination into stunning visuals with our cutting-edge AI technology. 
                  From concept to creation in seconds.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="btn-ai-neon text-lg px-8 py-4">
                    Start Creating Now
                    <Zap className="ml-2 h-5 w-5" />
                  </Button>
                  <Button className="btn-ai-outline text-lg px-8 py-4">
                    Watch Demo
                    <ImageIcon className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core AI Features Grid */}
        <section id="ai-features" className="py-16 md:py-24 relative">
          <div className="content-container">
            <motion.div
              className="text-center mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-ai-primary/20 text-ai-neon border-ai-primary/30 px-4 py-2">
                <Hash className="h-4 w-4 mr-2" />
                Core Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-gradient">Powered by AI,</span>
                <br />
                <span className="text-white">Designed for You</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Essential features that make image generation effortless and powerful.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="ai-card group hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-ai-neon font-semibold text-sm">{feature.stats}</span>
                    <div className="w-7 h-7 bg-ai-primary/20 rounded-full flex items-center justify-center group-hover:bg-ai-primary/40 transition-colors duration-300">
                      <Check className="h-3 w-3 text-ai-neon" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Advanced Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-t border-ai-primary/20 pt-12"
            >
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-ai-accent/20 text-ai-accent border-ai-accent/30 px-3 py-1 text-sm">
                  Advanced Features
                </Badge>
                <h3 className="text-2xl font-bold text-white mb-2">Professional Tools</h3>
                <p className="text-gray-400 max-w-xl mx-auto">
                  Additional capabilities for power users and teams.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advancedFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="ai-card group border border-ai-accent/20 hover:border-ai-accent/40"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <feature.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                        <p className="text-gray-300 text-sm mb-2">{feature.description}</p>
                        <span className="text-ai-accent font-medium text-xs">{feature.stats}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section id="demo" className="py-16 md:py-24 bg-gradient-to-r from-ai-surface/50 to-ai-muted/50 backdrop-blur-sm">
          <div className="content-container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-ai-accent/20 text-ai-accent border-ai-accent/30 px-4 py-2">
                <ImageIcon className="h-4 w-4 mr-2" />
                Live Demo
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Try It <span className="text-gradient-neon">Right Now</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Experience the power of AI image generation instantly. 
                Enter your prompt and watch your ideas come to life.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ImageGenerationForm 
                  onImageGenerated={setGeneratedImageUrl}
                  onGeneratingChange={setIsGenerating}
                  onError={setError}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ImagePreview 
                  imageUrl={generatedImageUrl}
                  isGenerating={isGenerating}
                  error={error}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section id="detailed-features">
          <FeaturesSection />
        </section>

        {/* Templates Section */}
        <section id="templates">
          <TemplatesSection />
        </section>

        {/* CTA Section with better spacing */}
        <section className="py-16 md:py-24 relative border-t border-ai-primary/20">
          <div className="content-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to <span className="text-gradient-neon">Create Magic</span>?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already using WordToImage to bring their ideas to life.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="btn-ai-neon text-lg px-10 py-4">
                  Start Your Free Trial
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
                <Button className="btn-ai-outline text-lg px-10 py-4">
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
