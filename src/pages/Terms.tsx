
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - WordToImage</title>
        <meta name="description" content="Read our terms of service to understand the rules and guidelines for using WordToImage." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Nav />
        
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using WordToImage, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
                <p className="text-gray-600 mb-4">
                  Permission is granted to temporarily use WordToImage for personal, 
                  non-commercial transitory viewing only.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Content</h2>
                <p className="text-gray-600 mb-4">
                  You retain ownership of any content you submit, post or display on or through the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-600">
                  If you have any questions about these Terms, please contact us at legal@wordtoimage.com
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

export default Terms;
