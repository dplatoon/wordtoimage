
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';
import { ContactHeader } from '@/components/contact/ContactHeader';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { SkipToContent } from '@/components/accessibility/SkipToContent';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - WordToImage | Get Support for AI Image Generation</title>
        <meta name="description" content="Get in touch with WordToImage support team. Contact us for AI image generation help, partnership inquiries, or technical support. We're here to help!" />
        <meta name="keywords" content="contact WordToImage, AI image support, customer service, partnership inquiries, technical help" />
        <link rel="canonical" href="https://wordtoimage.com/contact" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Contact WordToImage - AI Image Generation Support" />
        <meta property="og:description" content="Get support for AI image generation, partnerships, and technical assistance. Contact our expert team today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordtoimage.com/contact" />
        
        {/* Structured data for contact page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact WordToImage",
            "description": "Contact page for WordToImage AI image generation platform",
            "mainEntity": {
              "@type": "Organization",
              "name": "WordToImage",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-ai-dark via-ai-surface to-ai-muted text-white">
        <SkipToContent />

        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-ai-primary/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-ai-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
        </div>

        <Nav />
        
        <main id="main-content" className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-4xl mx-auto">
              <header>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <ContactHeader />
                </motion.div>
              </header>
              
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                aria-labelledby="contact-info-heading"
              >
                <h2 id="contact-info-heading" className="sr-only">Contact Information</h2>
                <ContactInfo />
              </motion.section>
              
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                aria-labelledby="contact-form-heading"
              >
                <h2 id="contact-form-heading" className="sr-only">Contact Form</h2>
                <ContactForm />
              </motion.section>
            </div>
          </div>
        </main>
        
        <ModernFooter />
      </div>
    </>
  );
};

export default Contact;
