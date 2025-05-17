
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ContactHeader } from '@/components/contact/ContactHeader';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <ContactHeader />
          <ContactInfo />
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
