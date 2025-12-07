
import { motion } from 'framer-motion';
import { Sparkles, Zap, Palette, Download, Shield, Globe, ArrowRight, Layers, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Creation",
    description: "Advanced neural networks transform your text into stunning visuals with remarkable accuracy.",
    gradient: "from-violet-500 to-purple-600",
    bgGlow: "violet"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate professional images in just 3 seconds with our optimized AI infrastructure.",
    gradient: "from-amber-500 to-orange-600",
    bgGlow: "amber"
  },
  {
    icon: Palette,
    title: "50+ Art Styles",
    description: "From photorealistic to anime, oil paintings to digital art - endless creative possibilities.",
    gradient: "from-pink-500 to-rose-600",
    bgGlow: "pink"
  },
  {
    icon: Download,
    title: "4K Resolution",
    description: "Download crisp, high-resolution images perfect for professional use and printing.",
    gradient: "from-cyan-500 to-blue-600",
    bgGlow: "cyan"
  },
  {
    icon: Shield,
    title: "Commercial Ready",
    description: "Full commercial rights included. Use your creations anywhere without restrictions.",
    gradient: "from-emerald-500 to-green-600",
    bgGlow: "emerald"
  },
  {
    icon: Globe,
    title: "Free Credits Daily",
    description: "Start creating immediately with free credits. No signup required to begin.",
    gradient: "from-indigo-500 to-violet-600",
    bgGlow: "indigo"
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
  visible: { opacity: 1, y: 0 }
};

export const AdvancedFeatures = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Layers className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Create Amazing Art
            </span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Professional-grade AI tools designed for creators, marketers, and artists seeking exceptional results.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative h-full p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/[0.05]">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl`} />
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent" />
            
            <div className="relative px-6 py-12 md:px-12 md:py-16 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Create Something Amazing?
              </h3>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Join thousands of creators using our AI to bring their imagination to life.
              </p>
              
              <Button
                size="lg"
                className="group bg-white text-slate-900 hover:bg-gray-100 font-semibold px-8 py-6 text-lg rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02]"
                asChild
              >
                <Link to="/text-to-image">
                  Start Creating Now
                  <Wand2 className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-10">
            Perfect For Every Creator
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Content Creators', desc: 'Thumbnails & graphics' },
              { title: 'Marketers', desc: 'Ads & campaigns' },
              { title: 'Designers', desc: 'Concepts & mockups' },
              { title: 'Businesses', desc: 'Brand assets' },
            ].map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300 text-center"
              >
                <div className="text-white font-semibold mb-1 group-hover:text-violet-300 transition-colors">
                  {useCase.title}
                </div>
                <div className="text-gray-500 text-sm">{useCase.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
