
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Get in Touch</h1>
          <p className="text-lg text-gray-700 mb-12 text-center">
            We'd love to hear from you. Please fill out the form below or reach out through our email.
          </p>
          
          <div className="flex justify-center mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center max-w-sm w-full">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-700">
                <a href="mailto:contact@wordtoimage.com" className="text-blue-600 hover:underline">contact@wordtoimage.com</a>
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
            
            <form>
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <div>
                <Button type="submit" className="w-full">Send Message</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
