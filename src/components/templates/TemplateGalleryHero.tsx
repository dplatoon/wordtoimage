
import { Sparkles, Palette, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const TemplateGalleryHero = () => {
  return (
    <motion.section 
      className="relative mb-12 bg-gradient-to-br from-brand-purple/5 via-blue-50/30 to-pink-50/20 rounded-2xl p-8 md:p-12 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-brand-purple/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-brand-purple/10 rounded-full p-3">
              <Palette className="h-8 w-8 text-brand-purple" />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-space leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            AI Template Gallery
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-brand-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover professionally designed templates to jumpstart your creative projects. 
            Each template comes with optimized settings and example prompts to get you started instantly.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-subtle">
            <div className="bg-blue-500/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Style Templates</h3>
            <p className="text-sm text-brand-slate-600">
              Professional artistic styles from watercolor to digital art
            </p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-subtle">
            <div className="bg-green-500/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Ready to Use</h3>
            <p className="text-sm text-brand-slate-600">
              Click any template to instantly load optimized settings
            </p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-subtle">
            <div className="bg-purple-500/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Palette className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fully Customizable</h3>
            <p className="text-sm text-brand-slate-600">
              Use as starting points and customize with your own content
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
