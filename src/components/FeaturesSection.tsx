
import { Wand2, Palette, Clock, ShieldCheck, Download, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const FeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  const features = [
    {
      icon: Wand2,
      title: "AI-Powered Creativity",
      description: "Generate unique visuals from any text input with our advanced AI technology that understands context and nuance.",
      extendedDescription: "Our AI model has been trained on millions of images to understand the relationships between words and visuals, enabling it to create truly unique artwork from your descriptions."
    },
    {
      icon: Palette,
      title: "Customizable Styles",
      description: "Choose from a variety of artistic styles and themes to match your vision perfectly.",
      extendedDescription: "From photorealistic to abstract art, watercolor to oil painting, our platform offers dozens of artistic styles that you can apply to your creations with a single click."
    },
    {
      icon: Clock,
      title: "Fast and Easy",
      description: "Get results in seconds with our intuitive, user-friendly interface designed for creators of all skill levels.",
      extendedDescription: "No more waiting hours for design work. Our optimized AI generates high-quality images in under 10 seconds, letting you iterate quickly on your creative ideas."
    },
    {
      icon: ShieldCheck,
      title: "Quality Guaranteed",
      description: "High-resolution images with consistent quality for all your projects, every time.",
      extendedDescription: "Our quality assurance algorithms ensure that every image meets our high standards for clarity, composition, and artistic integrity before delivering it to you."
    },
    {
      icon: Download,
      title: "Easy Downloads",
      description: "Download your creations instantly in multiple formats for any use case or platform.",
      extendedDescription: "Export your images in PNG, JPG, or SVG formats at various resolutions, perfect for social media, print materials, or web design projects."
    },
    {
      icon: Layers,
      title: "Advanced Customization",
      description: "Fine-tune your results with detailed style and parameter controls for perfect outputs.",
      extendedDescription: "Take creative control with adjustable parameters for style intensity, color palette, composition, and other artistic elements to make your vision come to life exactly as you imagined."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
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
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Wand2 className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>Features</span>
          </motion.span>
          
          <motion.h2 
            className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 font-poppins"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Why Choose WordToImage?
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Powerful features designed to transform your ideas into stunning visuals
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className={`p-6 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 ${
                hoveredFeature === index ? 'shadow-lg border-blue-200 scale-105' : 'hover:shadow-md'
              }`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              
              {hoveredFeature === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-gray-500 border-t pt-3 mt-3"
                >
                  {feature.extendedDescription}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
