
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PageSEO } from '@/components/seo/PageSEO';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';

const Cookies = () => {
  const lastUpdated = "June 3, 2025";
  
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title="Cookie Policy - WordToImage AI Generator"
        description="Learn about WordToImage's cookie usage. Our cookie policy explains how we use cookies and similar technologies to improve your experience with our AI image generator."
        keywords="cookie policy, cookies usage, AI image generator cookies, WordToImage tracking"
        canonical="https://wordtoimage.com/cookies"
        aiKeywords={['AI image generator cookies', 'artificial intelligence website cookies', 'text to image cookie policy']}
        voiceSearchQueries={['WordToImage cookie policy', 'AI image generator cookie usage']}
      />
      
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <ContentBreadcrumbs />
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: {lastUpdated}</p>
          
          <div className="prose prose-blue max-w-none">
            <p>
              This Cookie Policy explains how WordToImage, Inc. ("we", "us", or "our") uses cookies and similar technologies
              to recognize you when you visit our website at wordtoimage.com ("Website"). It explains what these technologies are
              and why we use them, as well as your rights to control our use of them.
            </p>
            
            <h2>What are cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website.
              Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
              as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, WordToImage, Inc.) are called "first party cookies".
              Cookies set by parties other than the website owner are called "third party cookies". Third party cookies
              enable third party features or functionality to be provided on or through the website (e.g. like advertising,
              interactive content and analytics). The parties that set these third party cookies can recognize your computer
              both when it visits the website in question and also when it visits certain other websites.
            </p>
            
            <h2>Why do we use cookies?</h2>
            <p>
              We use first and third party cookies for several reasons. Some cookies are required for technical reasons in order
              for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies
              also enable us to track and target the interests of our users to enhance the experience on our Online Properties.
              Third parties serve cookies through our Website for advertising, analytics and other purposes.
            </p>
            
            <h2>The specific types of first and third party cookies served through our Website and the purposes they perform</h2>
            <p>
              <strong>Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.
            </p>
            <p>
              <strong>Performance and functionality cookies:</strong> These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
            </p>
            <p>
              <strong>Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
            </p>
            <p>
              <strong>Advertising cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
            </p>
            
            <h2>How can you control cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
            </p>
            <p>
              If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.
            </p>
            
            <h2>Changes to this Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us at:
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

export default Cookies;
