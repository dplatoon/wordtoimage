import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export const FeaturesHeroSection = () => {
  return <section id="hero" className="py-24 md:py-32 relative overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
          <motion.div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-8" initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.2,
          duration: 0.6
        }}>
            <Sparkles className="h-4 w-4 mr-2" />
            Powerful AI Features
          </motion.div>
          
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.7
        }}>
            Everything You Need for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Professional AI Image Creation
            </span>
          </motion.h1>
          
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4,
          duration: 0.7
        }}>
            Discover powerful tools and features designed to transform your creative ideas into stunning visuals with professional quality and ease.
          </motion.p>
          
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5,
          duration: 0.7
        }}>
            <Link to="/text-to-image" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[52px]" aria-label="Try AI image generation features for free">
              Try Features Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 min-h-[52px]" aria-label="View pricing plans for AI image generation">
              View Pricing
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};