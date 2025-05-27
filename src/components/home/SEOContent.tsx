
import { motion } from 'framer-motion';

export const SEOContent = () => {
  return (
    <section className="py-16 bg-ai-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white">AI Image Generator from Text</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transform any text description into stunning AI-generated images. Our advanced text-to-image AI 
              technology creates professional-quality visuals from simple prompts, perfect for content creators, 
              marketers, and designers who need high-quality images quickly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white">Create Social Media Graphics with AI</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Generate eye-catching social media images, blog post headers, and marketing materials in seconds. 
              Our AI image creator understands style, composition, and branding needs, making it the perfect tool 
              for social media managers and content creators.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white">Free AI Art Generator Online</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Start creating beautiful AI art for free with WordToImage. No sign-up required to try our AI art 
              generator. Create unlimited variations, explore different artistic styles, and download high-resolution 
              images for personal and commercial use.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
