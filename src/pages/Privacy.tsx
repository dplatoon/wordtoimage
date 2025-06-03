import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PageSEO } from '@/components/seo/PageSEO';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';

const Privacy = () => {
  const lastUpdated = "June 3, 2025";
  
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title="Privacy Policy - WordToImage AI Generator"
        description="Learn how WordToImage protects your privacy. Our privacy policy explains data collection, usage, and protection measures for our AI image generation service."
        keywords="privacy policy, data protection, AI image generator privacy, WordToImage security"
        canonical="https://wordtoimage.com/privacy"
        aiKeywords={['AI image generator privacy', 'artificial intelligence data protection', 'text to image privacy policy']}
        voiceSearchQueries={['WordToImage privacy policy', 'AI image generator data protection']}
      />
      
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <ContentBreadcrumbs />
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: {lastUpdated}</p>
          
          <div className="prose prose-violet max-w-none">
            <p>
              Welcome to WordToImage. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our website
              and tell you about your privacy rights and how the law protects you.
            </p>
            
            <h2>1. Important Information and Who We Are</h2>
            <p>
              WordToImage is the controller and responsible for your personal data (referred to as "we", "us" or "our" in this privacy policy).
              We have appointed a data protection officer (DPO) who is responsible for overseeing questions in relation to this privacy policy.
              If you have any questions, including any requests to exercise your legal rights, please contact the DPO using the details set out below.
            </p>
            
            <h2>2. The Data We Collect About You</h2>
            <p>
              Personal data, or personal information, means any information about an individual from which that person can be identified.
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul>
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, 
                time zone setting and location, browser plug-in types and versions, operating system and platform, and other 
                technology on the devices you use to access this website.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
            </ul>
            
            <h2>3. How We Use Your Personal Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, 
              altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business 
              need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
            </p>
            
            <h2>5. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul>
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
            
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> privacy@wordtoimage.com<br />
              <strong>Address:</strong> 123 Innovation Street, San Francisco, CA 94103
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
