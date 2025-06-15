
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOManager } from '@/components/seo/SEOManager';

const JoinOurTeam = () => {
  const positions = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Help build the next generation of AI image generation technology. Work with cutting-edge models and scalable infrastructure.",
      requirements: ["5+ years ML/AI experience", "Python, PyTorch", "Computer Vision background"],
      featured: true
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote / New York",
      type: "Full-time",
      description: "Design intuitive interfaces that make AI accessible to everyone. Shape the future of creative tools.",
      requirements: ["3+ years product design", "Figma expertise", "AI/ML tool experience"],
      featured: false
    },
    {
      title: "Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build responsive, performant user interfaces for our AI platform. Work with React, TypeScript, and modern web technologies.",
      requirements: ["React/TypeScript", "Performance optimization", "API integration"],
      featured: false
    },
    {
      title: "Content Marketing Manager",
      department: "Marketing",
      location: "Remote / Austin",
      type: "Full-time",
      description: "Create compelling content that educates users about AI and showcases the potential of our platform.",
      requirements: ["Content strategy", "AI/tech writing", "SEO knowledge"],
      featured: false
    }
  ];

  const benefits = [
    "Competitive salary and equity",
    "Comprehensive health insurance",
    "Flexible remote work",
    "Learning & development budget",
    "Latest equipment provided",
    "Unlimited PTO policy"
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOManager customConfig={{
        title: "Join Our Team - AI Careers at WordToImage",
        description: "Join WordToImage and help build the future of AI image generation. Remote-friendly positions in engineering, design, and more.",
        keywords: ["AI careers", "machine learning jobs", "remote work", "WordToImage jobs", "AI engineer positions"]
      }} />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Help us democratize AI and empower creativity worldwide
            </p>
          </div>

          {/* Company Values */}
          <div className="mb-16 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why WordToImage?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Mission-Driven</h3>
                <p className="text-gray-600">Make AI accessible to everyone and democratize creative tools</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Work-Life Balance</h3>
                <p className="text-gray-600">Flexible hours and remote-first culture with unlimited PTO</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Growth Focused</h3>
                <p className="text-gray-600">Continuous learning opportunities and career development</p>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Open Positions</h2>
            <div className="space-y-6">
              {positions.map((position, index) => (
                <div key={index} className={`bg-white rounded-xl border p-6 ${position.featured ? 'ring-2 ring-violet-200 shadow-lg' : 'shadow-sm'} hover:shadow-md transition-shadow`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
                      {position.featured && (
                        <Badge className="bg-violet-100 text-violet-800">Featured</Badge>
                      )}
                    </div>
                    <Button className="bg-violet-600 hover:bg-violet-700 self-start md:self-auto">
                      Apply Now
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{position.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{position.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{position.type}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{position.description}</p>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {position.requirements.map((req, reqIndex) => (
                        <Badge key={reqIndex} variant="outline">{req}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-xl border shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits & Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Don't see the right position?
            </h2>
            <p className="text-gray-600 mb-6">
              We're always looking for talented people. Send us your resume and tell us how you'd like to contribute.
            </p>
            <Button variant="outline" size="lg">
              Send General Application
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JoinOurTeam;
