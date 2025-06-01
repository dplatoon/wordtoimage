
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - WordToImage</title>
        <meta name="description" content="Read our privacy policy to understand how we protect your data and respect your privacy." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Nav />
        
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  generate images, or contact us for support.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to provide, maintain, and improve our AI image generation services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at privacy@wordtoimage.com
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

export default Privacy;
