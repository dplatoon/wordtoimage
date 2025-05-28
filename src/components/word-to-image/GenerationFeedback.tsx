
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';

interface GenerationFeedbackProps {
  isGenerating: boolean;
  generationTime?: string | null;
}

export function GenerationFeedback({ isGenerating, generationTime }: GenerationFeedbackProps) {
  return (
    <>
      {/* Enhanced Generation Feedback */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                <Sparkles className="absolute top-0 left-0 h-6 w-6 text-blue-400 animate-pulse" />
              </div>
              <span className="text-blue-800 font-medium">Creating your image... This usually takes 3-5 seconds</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Success Message */}
      <AnimatePresence>
        {generationTime && (
          <motion.div 
            className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center text-green-800">
              <Zap className="h-4 w-4 mr-2" />
              <span className="text-sm">Generated in {generationTime}s! Your image is ready.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
