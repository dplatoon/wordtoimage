
import { useState } from 'react';
import { ResourcePageTemplate } from '@/components/templates/ResourcePageTemplate';
import { ContentCard } from '@/components/content/ContentCard';
import { ContentSearch } from '@/components/content/ContentSearch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Briefcase, Heart, Zap, Globe, Coffee } from 'lucide-react';

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const openPositions = [
    {
      id: "senior-frontend-engineer",
      title: "Senior Frontend Engineer",
      description: "Join our frontend team to build the next generation of AI-powered creative tools. Work with React, TypeScript, and cutting-edge web technologies.",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      level: "Senior",
      image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
      tags: ["React", "TypeScript", "Frontend", "Remote"],
      category: "Engineering",
      featured: true
    },
    {
      id: "ml-engineer-ai-research",
      title: "Machine Learning Engineer",
      description: "Lead AI research and development for our image generation models. Work on cutting-edge computer vision and generative AI technologies.",
      department: "AI Research",
      location: "San Francisco, CA",
      type: "Full-time",
      level: "Senior",
      image: "/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png",
      tags: ["Machine Learning", "AI", "Python", "Research"],
      category: "Engineering"
    },
    {
      id: "product-designer-ux",
      title: "Senior Product Designer",
      description: "Shape the future of creative AI tools through exceptional user experience design. Lead design systems and user research initiatives.",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      level: "Senior",
      image: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png",
      tags: ["UX Design", "Product Design", "Figma", "Research"],
      category: "Design"
    },
    {
      id: "growth-marketing-manager",
      title: "Growth Marketing Manager",
      description: "Drive user acquisition and retention through data-driven marketing strategies. Own the full marketing funnel from awareness to conversion.",
      department: "Marketing",
      location: "New York, NY / Remote",
      type: "Full-time",
      level: "Mid-Senior",
      image: "/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png",
      tags: ["Growth Marketing", "Analytics", "SEO", "Content"],
      category: "Marketing"
    },
    {
      id: "backend-engineer-infrastructure",
      title: "Backend Engineer - Infrastructure",
      description: "Build and scale our cloud infrastructure to support millions of AI image generations. Work with microservices, Kubernetes, and distributed systems.",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      level: "Mid-Senior",
      image: "/lovable-uploads/b8bd59bc-46c8-4f5f-9ad8-8eacbf6c7c20.png",
      tags: ["Backend", "Infrastructure", "Kubernetes", "Microservices"],
      category: "Engineering"
    },
    {
      id: "customer-success-manager",
      title: "Customer Success Manager",
      description: "Help our enterprise customers succeed with WordToImage. Build relationships, drive adoption, and ensure customer satisfaction.",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      level: "Mid-Level",
      image: "/lovable-uploads/806c4eee-2b54-4f82-8d75-7bd3e7137f5c.png",
      tags: ["Customer Success", "B2B", "Relationship Management", "SaaS"],
      category: "Sales"
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness stipends"
    },
    {
      icon: Zap,
      title: "Professional Growth",
      description: "Learning budget, conference attendance, and mentorship programs"
    },
    {
      icon: Globe,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and home office setup budget"
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Unlimited PTO, sabbatical programs, and company retreats"
    },
    {
      icon: Users,
      title: "Equity & Compensation",
      description: "Competitive salary, equity package, and performance bonuses"
    },
    {
      icon: Briefcase,
      title: "Cutting-Edge Tech",
      description: "Latest equipment, AI tools access, and innovative project opportunities"
    }
  ];

  const categories = ["Engineering", "Design", "Marketing", "Sales", "Operations"];

  const filteredPositions = openPositions.filter(position => {
    const matchesSearch = !searchQuery || 
      position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilters.length === 0 || 
      selectedFilters.includes(position.category);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <ResourcePageTemplate
      title="Join Our Team"
      description="Help us build the future of visual content creation and empower millions of creators worldwide. Discover exciting career opportunities."
      seoTitle="Careers at WordToImage - Join Our AI Innovation Team"
      seoDescription="Join WordToImage's mission to democratize AI-powered creativity. Explore open positions in engineering, design, marketing, and more."
      keywords="WordToImage careers, AI jobs, machine learning careers, frontend engineer jobs, product designer jobs"
      aiKeywords={[
        'AI company careers',
        'machine learning engineer jobs',
        'creative technology jobs',
        'AI startup opportunities',
        'remote AI jobs'
      ]}
      voiceSearchQueries={[
        'AI jobs at WordToImage',
        'machine learning engineer positions',
        'remote AI company jobs',
        'careers in AI image generation'
      ]}
      currentPath="/careers"
      badge="We're Hiring"
    >
      {/* Company Culture Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why WordToImage?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <benefit.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContentSearch
        onSearch={setSearchQuery}
        onFilter={setSelectedFilters}
        categories={categories}
        selectedFilters={selectedFilters}
        placeholder="Search positions by role, skills, or department..."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredPositions.map((position, index) => (
          <div key={position.id} className="relative">
            <div className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {position.image && (
                <div className="h-32 overflow-hidden bg-gray-100">
                  <img 
                    src={position.image} 
                    alt={position.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {position.department}
                  </Badge>
                  {position.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {position.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {position.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{position.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{position.type} • {position.level}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {position.tags.slice(0, 3).map((tag) => (
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
          </div>
        ))}
      </div>
      
      {filteredPositions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Briefcase className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No positions found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters, or check back later for new opportunities.</p>
          <Button variant="outline">
            View All Open Positions
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't See Your Role?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're always looking for talented individuals who share our passion for AI and creativity. 
          Send us your resume and let us know how you'd like to contribute.
        </p>
        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
          Send General Application
        </Button>
      </div>
    </ResourcePageTemplate>
  );
};

export default Careers;
