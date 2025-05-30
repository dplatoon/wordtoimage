
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ContactHeader } from '@/components/contact/ContactHeader';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';
import { PageSEO } from '@/components/seo/PageSEO';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-dark via-ai-surface to-ai-muted text-white">
      <PageSEO
        title="Contact – Get in Touch with WordToImage"
        description="Contact WordToImage support via phone, email, or message form. We're here to help."
        keywords="WordToImage contact, AI image generator support, customer service, help desk"
        aiKeywords={[
          'WordToImage contact support',
          'AI image generator help',
          'text-to-image customer service',
          'AI art support'
        ]}
      />
      
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ai-primary/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ai-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
      </div>

      <header>
        <Nav />
      </header>
      
      <main id="main-content" className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-5xl mx-auto">
            {/* Improved section organization and spacing */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              aria-label="Contact introduction"
              className="mb-16"
            >
              <ContactHeader />
            </motion.section>
            
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              aria-label="Contact methods and information"
              className="mb-20"
            >
              <ContactInfo />
            </motion.section>
            
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              aria-label="Contact form"
              className="mb-16"
            >
              <ContactForm />
            </motion.section>

            {/* Additional support information */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              aria-label="Support hours and response times"
              className="text-center"
            >
              <div className="bg-ai-primary/10 rounded-2xl p-8 border border-ai-primary/20 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4 text-readable">Support Hours & Response Times</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                  <div>
                    <h3 className="font-semibold text-ai-neon mb-2 text-readable">Email Support</h3>
                    <p className="text-sm text-readable line-height-reading">We typically respond within 24 hours during business days</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ai-neon mb-2 text-readable">Phone Support</h3>
                    <p className="text-sm text-readable line-height-reading">Available Monday-Friday, 9 AM - 6 PM PST</p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
      
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Contact;
