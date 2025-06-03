
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PageSEO } from '@/components/seo/PageSEO';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Machine Learning Engineer",
      department: "AI Research",
      location: "San Francisco, CA",
      type: "Full-time"
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "New York, NY",
      type: "Full-time"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title="Careers - Join WordToImage AI Team"
        description="Join the WordToImage team and help build the future of AI image generation. Explore open positions in engineering, AI research, design, and marketing at our innovative company."
        keywords="careers, jobs, AI company careers, machine learning jobs, engineering jobs, WordToImage jobs"
        canonical="https://wordtoimage.com/careers"
        aiKeywords={['AI company careers', 'machine learning engineer jobs', 'artificial intelligence startup jobs']}
        voiceSearchQueries={['WordToImage careers', 'AI image generator jobs', 'machine learning company jobs']}
      />
      
      <Nav />
      <main>
        <ContentBreadcrumbs />
        
        {/* Hero section */}
        <div className="bg-gradient-to-b from-violet-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Join Our Team</h1>
              <p className="text-lg text-gray-700 mb-8">
                Help us build the future of visual content creation and empower millions of creators worldwide.
              </p>
              <Button className="inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-700">
                View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Values section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Work With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-violet-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Impact</h3>
              <p className="text-gray-700">
                Build products that millions of people use to bring their ideas to life.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-violet-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth</h3>
              <p className="text-gray-700">
                Work on cutting-edge technology and continuously develop your skills.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-violet-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Balance</h3>
              <p className="text-gray-700">
                Flexible work arrangements that respect your time and well-being.
              </p>
            </div>
          </div>
        </div>

        {/* Open positions */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Open Positions</h2>
            
            <div className="max-w-3xl mx-auto">
              {openPositions.map((position, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
                      <div className="mt-2 flex flex-col md:flex-row md:items-center text-sm text-gray-600">
                        <span className="mr-4">{position.department}</span>
                        <span className="mr-4">{position.location}</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4 md:mt-0">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
