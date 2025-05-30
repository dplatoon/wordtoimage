
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
    <section id="ai-features" className="py-24 bg-gray-50" aria-labelledby="core-features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 px-4 py-2">
            <Hash className="h-4 w-4 mr-2" aria-hidden="true" />
            Core Features
          </Badge>
          <h2 id="core-features-heading" className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gray-900">Powered by Advanced AI,</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Designed for Everyone</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-readable line-height-reading">
            Professional-grade image generation tools that make creating stunning visuals effortless and powerful.
          </p>
        </motion.header>

        {/* Primary Features - 2x2 Grid with improved spacing */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {primaryFeatures.map((feature, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 border border-gray-100"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-gray-900 text-readable">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-readable line-height-reading">{feature.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-indigo-600 font-semibold text-sm text-readable" aria-label={`Feature metric: ${feature.stats}`}>
                  {feature.stats}
                </span>
                <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-300">
                  <Check className="h-3 w-3 text-indigo-600" aria-hidden="true" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Advanced Features Section with improved hierarchy */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-gray-200 pt-16"
          aria-labelledby="advanced-features-heading"
        >
          <header className="text-center mb-12">
            <Badge className="mb-3 bg-purple-100 text-purple-800 px-3 py-1 text-sm">
              Professional Tools
            </Badge>
            <h3 id="advanced-features-heading" className="text-2xl font-bold text-gray-900 mb-2 text-readable">Advanced Features for Power Users</h3>
            <p className="text-gray-600 max-w-xl mx-auto text-readable line-height-reading">
              Additional capabilities for professional creators, teams, and businesses who need more control.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advancedFeatures.map((feature, index) => (
              <article
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100 hover:border-purple-200"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 text-readable">{feature.title}</h4>
                    <p className="text-gray-600 text-sm mb-2 text-readable line-height-reading">{feature.description}</p>
                    <span className="text-purple-600 font-medium text-xs text-readable" aria-label={`Feature metric: ${feature.stats}`}>
                      {feature.stats}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>
      </div>
    </section>
  );
};
