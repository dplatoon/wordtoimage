
import { motion } from 'framer-motion';
import { Wand2, Zap, Palette, Download } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'AI-Powered Generation',
    description: 'Transform any text prompt into stunning visual art using advanced AI technology.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate high-quality images in seconds, not hours. Perfect for rapid prototyping.'
  },
  {
    icon: Palette,
    title: 'Multiple Styles',
    description: 'Choose from 50+ artistic styles including photorealistic, abstract, and cartoon.'
  },
  {
    icon: Download,
    title: 'High Resolution',
    description: 'Download your creations in high resolution, perfect for print and digital use.'
  }
];

export const FeaturesGridSection = () => {
  return (
    <section className="py-16 bg-white" aria-labelledby="features-grid-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 id="features-grid-heading" className="text-3xl font-bold text-gray-900 mb-4 text-readable">
            Powerful AI Features
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-readable line-height-reading">
            Everything you need to create stunning AI-generated images
          </p>
        </motion.header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.article
              key={index}
              className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-readable">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm text-readable line-height-reading">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
