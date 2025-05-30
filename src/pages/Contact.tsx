
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
      
      {/* Enhanced animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ai-primary/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ai-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-ai-accent/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
      </div>

      <header>
        <Nav />
      </header>
      
      <main id="main-content" className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced header section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              aria-label="Contact introduction"
              className="mb-20"
            >
              <ContactHeader />
            </motion.section>
            
            {/* Enhanced contact information section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              aria-label="Contact details and methods"
              className="mb-20"
            >
              <ContactInfo />
            </motion.section>
            
            {/* Enhanced contact form section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              aria-label="Contact form"
              className="relative"
            >
              {/* Decorative elements around form */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-ai-primary/20 rounded-full blur-sm"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-ai-secondary/20 rounded-full blur-sm"></div>
              
              <ContactForm />
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
