import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SEOManager } from '@/components/seo/SEOManager';
import { ToolPageBackground } from '@/components/backgrounds/ToolPageBackground';
import { motion } from 'framer-motion';

const Product = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ToolPageBackground variant="primary" />
      
      <SEOManager customConfig={{
        title: "AI Image Generation Product - WordToImage Platform Features",
        description: "Discover WordToImage's complete AI image generation platform. Advanced text-to-image technology, batch processing, upscaling, and professional tools for creators.",
        keywords: ["AI image generation platform", "text to image product", "AI art tools", "batch image generation", "AI upscaler", "best AI art platform 2025", "professional AI image tools for artists"]
      }} />
      
      <Nav />
      
      <main className="pt-8 pb-16 relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                AI Image Generation
                <span className="block bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Transform your ideas into stunning visuals with our comprehensive AI image generation platform. 
                From simple prompts to professional artwork in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 shadow-neon">
                  <Link to="/text-to-image">
                    Start Creating Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-primary/30 hover:bg-primary/10">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Complete AI Image Suite
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, enhance, and manage AI-generated images
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: "Text to Image",
                  description: "Generate stunning images from text descriptions using advanced AI models.",
                  link: "/text-to-image",
                  linkText: "Try Now →",
                  delay: 0.3
                },
                {
                  icon: Zap,
                  title: "Batch Generator",
                  description: "Create multiple variations and generate images in bulk for efficiency.",
                  link: "/batch-generator",
                  linkText: "Learn More →",
                  delay: 0.4
                },
                {
                  icon: Shield,
                  title: "AI Upscaler",
                  description: "Enhance image quality and resolution with AI-powered upscaling.",
                  link: "/ai-upscaler",
                  linkText: "Explore →",
                  delay: 0.5
                },
                {
                  icon: Globe,
                  title: "Style Gallery",
                  description: "Choose from 50+ artistic styles and customizable templates.",
                  link: "/style-gallery",
                  linkText: "Browse Styles →",
                  delay: 0.6
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  className="bg-card/30 backdrop-blur-xl rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-neon group"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Link to={feature.link} className="text-primary hover:text-primary/80 font-medium transition-colors">
                    {feature.linkText}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-r from-primary/20 to-violet-500/20 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-primary/30 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Create Amazing Images?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of creators using WordToImage to bring their ideas to life
              </p>
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 shadow-neon">
                <Link to="/text-to-image">
                  Start Creating Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
