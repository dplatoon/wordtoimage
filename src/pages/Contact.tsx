
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ContactHeader } from '@/components/contact/ContactHeader';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-dark via-ai-surface to-ai-muted text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ai-primary/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ai-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
      </div>

      <Nav />
      
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ContactHeader />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ContactInfo />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
