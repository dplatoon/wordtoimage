
import { Wand2, Palette, Clock, ShieldCheck, Download, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Wand2,
      title: "AI-Powered Creativity",
      description: "Generate unique visuals from any text input with our advanced AI technology."
    },
    {
      icon: Palette,
      title: "Customizable Styles",
      description: "Choose from a variety of artistic styles and themes to match your vision perfectly."
    },
    {
      icon: Clock,
      title: "Fast and Easy",
      description: "Get results in seconds with our intuitive, user-friendly interface."
    },
    {
      icon: ShieldCheck,
      title: "Quality Guaranteed",
      description: "High-resolution images with consistent quality for all your projects."
    },
    {
      icon: Download,
      title: "Easy Downloads",
      description: "Download your creations instantly in multiple formats for any use."
    },
    {
      icon: Layers,
      title: "Advanced Customization",
      description: "Fine-tune your results with detailed style and parameter controls."
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
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            <Wand2 className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>Features</span>
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
            Why Choose WordToImage?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to transform your ideas into stunning visuals
          </p>
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
              className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
