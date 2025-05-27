
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturesCTASection = () => {
  return (
    <section className="py-16 md:py-24 relative border-t border-ai-primary/20">
      <div className="content-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient-neon">Create Magic</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using WordToImage to bring their ideas to life.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="btn-ai-neon text-lg px-10 py-4">
              Start Your Free Trial
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            <Button className="btn-ai-outline text-lg px-10 py-4">
              View Pricing
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
