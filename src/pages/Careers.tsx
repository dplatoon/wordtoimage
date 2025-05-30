
import { useState } from "react";
import { ResourcePageTemplate } from "@/components/templates/ResourcePageTemplate";
import { ContentCard } from "@/components/content/ContentCard";
import { ContentSearch } from "@/components/content/ContentSearch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Users, Heart, Zap } from "lucide-react";

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const jobs = [
    {
      id: "senior-ai-engineer",
      title: "Senior AI Engineer",
      description: "Lead the development of cutting-edge AI models for image generation. Work with large-scale distributed systems and state-of-the-art machine learning frameworks.",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      salary: "$140k - $200k",
      image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
      tags: ["Python", "PyTorch", "ML", "AI", "Remote"],
      featured: true
    },
    {
      id: "product-designer",
      title: "Product Designer",
      description: "Design intuitive user experiences for our AI-powered platform. Create beautiful interfaces that make complex AI technology accessible to everyone.",
      department: "Design",
      location: "Remote / New York",
      type: "Full-time",
      salary: "$110k - $150k",
      image: "/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png",
      tags: ["Figma", "UX/UI", "Design Systems", "Remote"]
    },
    {
      id: "frontend-developer",
      title: "Frontend Developer",
      description: "Build responsive, high-performance web applications using React and modern JavaScript. Work closely with designers to create pixel-perfect user interfaces.",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$100k - $140k",
      image: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png",
      tags: ["React", "TypeScript", "CSS", "JavaScript", "Remote"]
    },
    {
      id: "devops-engineer",
      title: "DevOps Engineer",
      description: "Scale our infrastructure to handle millions of AI image generations. Implement robust CI/CD pipelines and monitoring systems for high-availability services.",
      department: "Engineering",
      location: "Remote / Austin",
      type: "Full-time",
      salary: "$120k - $160k",
      image: "/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png",
      tags: ["AWS", "Kubernetes", "Docker", "CI/CD", "Remote"]
    },
    {
      id: "marketing-manager",
      title: "Growth Marketing Manager",
      description: "Drive user acquisition and engagement through data-driven marketing campaigns. Develop strategies across multiple channels to grow our creator community.",
      department: "Marketing",
      location: "Remote / Los Angeles",
      type: "Full-time",
      salary: "$90k - $120k",
      image: "/lovable-uploads/b8bd59bc-46c8-4f5f-9ad8-8eacbf6c7c20.png",
      tags: ["Growth Marketing", "Analytics", "SEO", "Content", "Remote"]
    },
    {
      id: "customer-success",
      title: "Customer Success Manager",
      description: "Help our enterprise customers maximize value from our AI platform. Build relationships, provide technical guidance, and ensure customer satisfaction.",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      salary: "$80k - $110k",
      image: "/lovable-uploads/806c4eee-2b54-4f82-8d75-7bd3e7137f5c.png",
      tags: ["Customer Success", "SaaS", "Communication", "Remote"]
    }
  ];

  const departments = ["Engineering", "Design", "Marketing", "Customer Success"];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilters.length === 0 || 
      selectedFilters.includes(job.department);
    
    return matchesSearch && matchesFilter;
  });

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance plus wellness stipend"
    },
    {
      icon: Zap,
      title: "Flexible Work",
      description: "Work remotely or from our offices with flexible hours that fit your life"
    },
    {
      icon: Users,
      title: "Learning & Growth",
      description: "Professional development budget and opportunities to attend conferences"
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Market-rate salaries plus equity in a fast-growing AI company"
    }
  ];

  return (
    <ResourcePageTemplate
      title="Join Our Team"
      description="Help us democratize AI-powered creativity. Join a team of passionate individuals building the future of image generation technology."
      seoTitle="Careers at WordToImage - Join Our AI Team"
      seoDescription="Join WordToImage and help build the future of AI-powered image generation. We're hiring engineers, designers, and growth professionals for remote and hybrid roles."
      keywords="WordToImage careers, AI jobs, machine learning jobs, remote developer jobs, startup careers"
      aiKeywords={[
        'AI startup careers',
        'machine learning engineer jobs',
        'remote AI developer positions',
        'image generation technology jobs',
        'startup engineering roles'
      ]}
      voiceSearchQueries={[
        'WordToImage job openings',
        'AI startup career opportunities',
        'remote machine learning jobs',
        'image generation company jobs'
      ]}
      currentPath="/careers"
      badge="We're Hiring"
    >
      {/* Company Culture Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Work With Us?</h3>
          <p className="text-lg text-gray-600 mb-8">
            We're building the future of creative AI, and we want passionate, talented people to join us on this journey. 
            Work on cutting-edge technology while making creativity accessible to everyone.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <Icon className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ContentSearch
        onSearch={setSearchQuery}
        onFilter={setSelectedFilters}
        categories={departments}
        selectedFilters={selectedFilters}
        placeholder="Search job openings..."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.map((job, index) => (
          <div key={job.id} className="relative">
            <div className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group p-6">
              {job.featured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-100 text-green-800">Featured</Badge>
                </div>
              )}
              
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">{job.department}</Badge>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {job.description}
                </p>
              </div>
              
              <div className="space-y-2 mb-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{job.salary}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                Apply Now
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No positions found</h3>
          <p className="text-gray-500">Try adjusting your search or check back later for new openings.</p>
        </div>
      )}
      
      {/* Contact Section */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't See a Perfect Fit?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're always looking for exceptional talent. Send us your resume and tell us how you'd like to contribute to the future of AI-powered creativity.
        </p>
        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
          Send General Application
        </Button>
      </div>
    </ResourcePageTemplate>
  );
};

export default Careers;
