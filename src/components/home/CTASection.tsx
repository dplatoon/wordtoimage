
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const CTASection = () => {
  const handleStartNow = () => {
    // Scroll to the image generation form
    const imageForm = document.querySelector('.image-generation-section');
    if (imageForm) {
      imageForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-violet-50 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-8 left-1/3 w-56 h-56 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="px-6 py-12 md:p-12 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
              <Wand2 className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Ideas Into Images?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using WordToImage to bring their ideas to life. Start creating stunning visuals in seconds, no design skills required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-600 text-white text-lg px-8 py-6 shadow-lg"
                onClick={handleStartNow}
              >
                Start Creating Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-blue-300 text-gray-700 hover:bg-blue-50"
              >
                View Pricing Plans
              </Button>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              No credit card required • Free plan available
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
