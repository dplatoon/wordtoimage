
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">About WordToImage</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              WordToImage was founded in 2023 with a simple mission: to make it effortless for anyone to create stunning visual content from text.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Vision</h2>
            <p className="text-gray-700 mb-6">
              We believe that everyone should have access to powerful design tools, regardless of their technical or artistic background. 
              By harnessing the latest advances in artificial intelligence, we're democratizing design and empowering creators worldwide.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Team</h2>
            <p className="text-gray-700 mb-6">
              Our diverse team brings together experts in machine learning, design, and software engineering. 
              We're passionate about building tools that bridge the gap between imagination and creation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-900">Alex Johnson</h3>
                <p className="text-gray-600">CEO & Co-Founder</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-900">Maya Patel</h3>
                <p className="text-gray-600">CTO & Co-Founder</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-900">Sam Lee</h3>
                <p className="text-gray-600">Head of Design</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Values</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li className="text-gray-700"><strong>Innovation:</strong> We constantly push the boundaries of what's possible.</li>
              <li className="text-gray-700"><strong>Accessibility:</strong> We build tools that everyone can use.</li>
              <li className="text-gray-700"><strong>Quality:</strong> We're committed to excellence in everything we do.</li>
              <li className="text-gray-700"><strong>Community:</strong> We value and support our global community of creators.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
