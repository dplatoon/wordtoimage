import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileImage, FileText, Eraser, Sparkles, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { AdvancedFooter } from '@/components/home/AdvancedFooter';

const tools = [
  {
    title: 'PDF to JPG',
    description: 'Convert PDF documents to high-quality JPG images instantly',
    icon: FileImage,
    href: '/pdf-to-jpg',
    gradient: 'from-primary to-neon-coral',
  },
  {
    title: 'JPG to PDF',
    description: 'Transform your JPG images into professional PDF documents',
    icon: FileText,
    href: '/jpg-to-pdf',
    gradient: 'from-neon-coral to-neon-amber',
  },
  {
    title: 'Word to JPG',
    description: 'Convert Word documents to JPG images with perfect formatting',
    icon: FileImage,
    href: '/word-to-jpg',
    gradient: 'from-green-500 to-primary',
  },
  {
    title: 'JPG to Word',
    description: 'Extract text from images and convert to editable Word documents',
    icon: FileText,
    href: '/jpg-to-word',
    gradient: 'from-neon-cyan to-primary',
  },
  {
    title: 'Background Remover',
    description: 'Remove backgrounds from images with AI-powered precision',
    icon: Eraser,
    href: '/remove-background',
    gradient: 'from-primary to-neon-amber',
  },
  {
    title: 'AI Image Enhance',
    description: 'Upscale, denoise, and enhance images with advanced AI',
    icon: Sparkles,
    href: '/ai-enhance',
    gradient: 'from-neon-coral to-primary',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const Tools = () => {
  return (
    <>
      <Helmet>
        <title>Free Online Tools | PDF, JPG, Word Converter & More</title>
        <meta name="description" content="Access powerful free online tools for document conversion, background removal, and AI image enhancement. Convert PDF to JPG, Word to JPG, and more." />
        <link rel="canonical" href="https://wordtoimage.online/tools" />
      </Helmet>
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-coral/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <Nav />
      <main className="min-h-screen bg-background pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 shadow-neon"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Free Online Tools</span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-neon-coral to-neon-amber bg-clip-text text-transparent">
                  Powerful Conversion Tools
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Transform your documents and images with our suite of free, fast, and secure online tools.
              </p>
            </motion.div>

            {/* Tools Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {tools.map((tool) => (
                <motion.div key={tool.href} variants={cardVariants}>
                  <Link to={tool.href} className="block group">
                    <div className="relative h-full p-6 rounded-2xl backdrop-blur-xl bg-card/30 border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-neon">
                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      {/* Icon */}
                      <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} p-0.5 mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                          <tool.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                        {tool.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {tool.description}
                      </p>

                      {/* Arrow */}
                      <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                        <span className="text-sm font-medium">Get Started</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>

                      {/* Corner Glow */}
                      <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${tool.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { title: '100% Free', desc: 'No hidden fees or subscriptions required' },
              { title: 'Fast & Secure', desc: 'Files are processed locally and never stored' },
              { title: 'No Sign-up', desc: 'Use all tools instantly without registration' },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 rounded-xl backdrop-blur-xl bg-card/30 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <AdvancedFooter />
    </>
  );
};

export default Tools;
