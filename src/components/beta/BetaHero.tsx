
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const BetaHero = () => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-3 bg-indigo-100 hover:bg-indigo-100 text-indigo-800 border-none">
            Beta Program
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 font-poppins mb-6">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Beta Program</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get early access to our newest features, provide feedback, and help shape the future of WordToImage.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-lg transform transition-transform hover:scale-105"
          >
            Apply Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
