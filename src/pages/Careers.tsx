
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Target, Scale } from 'lucide-react';
import { PageSEO } from '@/components/seo/PageSEO';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';
import { ToolPageBackground } from '@/components/backgrounds/ToolPageBackground';

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
    <div className="min-h-screen bg-background relative">
      <ToolPageBackground variant="amber" />
      
      <PageSEO
        title="Careers - Join WordToImage AI Team"
        description="Join the WordToImage team and help build the future of AI image generation. Explore open positions in engineering, AI research, design, and marketing at our innovative company."
        keywords="careers, jobs, AI company careers, machine learning jobs, engineering jobs, WordToImage jobs"
        canonical="https://wordtoimage.online/careers"
        aiKeywords={['AI company careers', 'machine learning engineer jobs', 'artificial intelligence startup jobs']}
        voiceSearchQueries={['WordToImage careers', 'AI image generator jobs', 'machine learning company jobs']}
      />
      
      <Nav />
      <main className="relative z-10">
        <ContentBreadcrumbs />
        
        {/* Hero section */}
        <div className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Join Our Team</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Help us build the future of visual content creation and empower millions of creators worldwide.
              </p>
              <Button variant="neon" size="lg">
                View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Values section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Work With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20 hover:border-primary/40 hover:shadow-neon transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Impact</h3>
              <p className="text-muted-foreground">
                Build products that millions of people use to bring their ideas to life.
              </p>
            </div>
            <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20 hover:border-primary/40 hover:shadow-neon transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Growth</h3>
              <p className="text-muted-foreground">
                Work on cutting-edge technology and continuously develop your skills.
              </p>
            </div>
            <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20 hover:border-primary/40 hover:shadow-neon transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Scale className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Balance</h3>
              <p className="text-muted-foreground">
                Flexible work arrangements that respect your time and well-being.
              </p>
            </div>
          </div>
        </div>

        {/* Open positions */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Open Positions</h2>
            
            <div className="max-w-3xl mx-auto">
              {openPositions.map((position, index) => (
                <div key={index} className="bg-card/30 backdrop-blur-xl rounded-xl border border-primary/20 mb-4 p-6 hover:border-primary/40 hover:shadow-neon transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{position.title}</h3>
                      <div className="mt-2 flex flex-col md:flex-row md:items-center text-sm text-muted-foreground">
                        <span className="mr-4">{position.department}</span>
                        <span className="mr-4">{position.location}</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                    <Button variant="glass" className="mt-4 md:mt-0">
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
