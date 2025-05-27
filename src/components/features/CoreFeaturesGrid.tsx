
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Palette, Download, Shield, Clock, Users, Hash, Wand2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const coreFeatures = [
  {
    icon: Zap,
    title: "Lightning-Fast AI Generation",
    description: "Create stunning images in under 10 seconds with our optimized AI models. No more waiting hours for results.",
    stats: "< 10 seconds",
    color: "from-yellow-400 to-orange-500",
    priority: "core"
  },
  {
    icon: Palette,
    title: "50+ Artistic Styles & Filters",
    description: "Choose from photorealistic, abstract, watercolor, oil painting, and dozens more artistic styles with one click.",
    stats: "50+ styles",
    color: "from-purple-400 to-pink-500",
    priority: "core"
  },
  {
    icon: Download,
    title: "High-Resolution Downloads (Up to 4K)",
    description: "Download your creations in crystal-clear 4K resolution without watermarks. Perfect for print and digital use.",
    stats: "Up to 4K",
    color: "from-blue-400 to-cyan-500",
    priority: "core"
  },
  {
    icon: Shield,
    title: "Full Commercial License Included",
    description: "Use your generated images for commercial projects, social media, and business materials with complete rights.",
    stats: "100% yours",
    color: "from-green-400 to-emerald-500",
    priority: "core"
  },
  {
    icon: Wand2,
    title: "Smart Prompt Enhancement",
    description: "Our AI automatically improves your prompts for better results, suggesting keywords and style modifications.",
    stats: "Auto-enhanced",
    color: "from-indigo-400 to-purple-500",
    priority: "advanced"
  },
  {
    icon: Layers,
    title: "Batch Generation (5 at Once)",
    description: "Generate multiple variations simultaneously to explore different creative directions and find the perfect image.",
    stats: "Up to 5 at once",
    color: "from-pink-400 to-rose-500",
    priority: "advanced"
  }
];

export const CoreFeaturesGrid = () => {
  const primaryFeatures = coreFeatures.filter(f => f.priority === "core");
  const advancedFeatures = coreFeatures.filter(f => f.priority === "advanced");

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
            <span className="text-gradient">Powered by Advanced AI,</span>
            <br />
            <span className="text-white">Designed for Everyone</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Professional-grade image generation tools that make creating stunning visuals effortless and powerful.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {primaryFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="ai-card group hover:scale-105 transition-all duration-300"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-ai-neon font-semibold text-sm" aria-label={`Feature metric: ${feature.stats}`}>
                  {feature.stats}
                </span>
                <div className="w-7 h-7 bg-ai-primary/20 rounded-full flex items-center justify-center group-hover:bg-ai-primary/40 transition-colors duration-300">
                  <Check className="h-3 w-3 text-ai-neon" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-ai-primary/20 pt-12"
        >
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-ai-accent/20 text-ai-accent border-ai-accent/30 px-3 py-1 text-sm">
              Professional Tools
            </Badge>
            <h3 className="text-2xl font-bold text-white mb-2">Advanced Features for Power Users</h3>
            <p className="text-gray-400 max-w-xl mx-auto">
              Additional capabilities for professional creators, teams, and businesses who need more control.
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
                    <feature.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-300 text-sm mb-2">{feature.description}</p>
                    <span className="text-ai-accent font-medium text-xs" aria-label={`Feature metric: ${feature.stats}`}>
                      {feature.stats}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
