
import { Wand2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleStartNow = () => {
    // Scroll to the image generation form
    const imageForm = document.querySelector('.image-generation-section');
    if (imageForm) {
      imageForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-violet-50 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-8 left-1/3 w-56 h-56 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="px-6 py-12 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-3/5">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                  <Wand2 className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ready to Transform Your Ideas Into Images?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Join thousands of creators who are already using WordToImage to bring their ideas to life. Start creating stunning visuals in seconds, no design skills required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                    asChild
                  >
                    <Link to="/text-to-image">
                      Start Creating Now
                    </Link>
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-indigo-300 text-gray-700 hover:bg-indigo-50 transition-colors transform hover:scale-105 px-8 py-6"
                    asChild
                  >
                    <Link to="/pricing">
                      View Pricing Plans
                    </Link>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                  No credit card required • Free plan available
                </p>
              </div>
              
              <div className="w-full md:w-2/5 bg-gray-50 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <Star className="h-6 w-6 text-yellow-500 mx-auto" />
                  <h3 className="text-lg font-semibold mt-2">Join Our Newsletter</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Get design tips, feature updates, and inspiration delivered to your inbox
                  </p>
                </div>
                
                {isSubscribed ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 text-green-700 p-4 rounded-lg text-center"
                  >
                    <p className="font-medium">Thanks for subscribing!</p>
                    <p className="text-sm mt-1">We'll keep you updated with the latest news.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe}>
                    <div className="mb-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="youremail@example.com"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-indigo-600 hover:bg-indigo-700" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-10 text-center">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} 
                    alt="User avatar" 
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-gray-700">
              <span className="font-semibold">10,000+</span> creators already joined
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
