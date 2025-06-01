
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';

const Cookies = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - WordToImage</title>
        <meta name="description" content="Learn about our cookie policy and how we use cookies to improve your experience." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Nav />
        
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies</h2>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that are stored on your computer or mobile device when you visit our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>Essential cookies for site functionality</li>
                  <li>Analytics cookies to understand usage</li>
                  <li>Preference cookies to remember your settings</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Cookies</h2>
                <p className="text-gray-600 mb-4">
                  You can control cookies through your browser settings. However, disabling cookies may affect site functionality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  For questions about our cookie policy, contact us at cookies@wordtoimage.com
                </p>
              </section>
            </div>
          </div>
        </main>

        <ModernFooter />
      </div>
    </>
  );
};

export default Cookies;
