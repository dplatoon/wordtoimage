
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

const Terms = () => {
  const lastUpdated = "April 15, 2025";
  
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last Updated: {lastUpdated}</p>
          
          <div className="prose prose-blue max-w-none">
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the WordToImage website
              ("Service") operated by WordToImage, Inc. ("us", "we", or "our").
            </p>
            
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing our Service, you agree to be bound by these Terms. If you disagree with any part of the terms,
              then you may not access our Service.
            </p>
            
            <h2>2. Intellectual Property Rights</h2>
            <p>
              Our Service and its original content, features, and functionality are and will remain the exclusive property of
              WordToImage, Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the
              United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product
              or service without the prior written consent of WordToImage, Inc.
            </p>
            
            <h2>3. User Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics,
              videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service,
              including its legality, reliability, and appropriateness.
            </p>
            <p>
              By posting Content on or through the Service, you represent and warrant that: (i) the Content is yours
              (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and
              (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights,
              copyrights, contract rights or any other rights of any person or entity.
            </p>
            
            <h2>4. Accounts</h2>
            <p>
              When you create an account with us, you guarantee that you are above the age of 18, and that the information you
              provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result
              in the immediate termination of your account on the Service.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your account and password, including but not limited to
              the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities
              or actions that occur under your account and/or password.
            </p>
            
            <h2>5. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability,
              under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
            
            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall WordToImage, Inc., nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
              loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or
              inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any
              content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content,
              whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have
              been informed of the possibility of such damage.
            </p>
            
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> legal@wordtoimage.com<br />
              <strong>Address:</strong> 123 Innovation Street, San Francisco, CA 94103
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
