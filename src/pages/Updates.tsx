
import { useState } from 'react';
import { ResourcePageTemplate } from '@/components/templates/ResourcePageTemplate';
import { ContentCard } from '@/components/content/ContentCard';
import { ContentSearch } from '@/components/content/ContentSearch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Rocket, Tag, Star, Zap, Shield } from 'lucide-react';

const Updates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const updates = [
    {
      id: "major-ui-redesign-2025",
      title: "Major UI Redesign & Performance Boost",
      description: "Complete overhaul of the user interface with improved performance, better mobile experience, and streamlined workflows. Generation speed increased by 60%.",
      date: "2024-12-20",
      category: "Major Release",
      version: "v3.0.0",
      image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
      tags: ["UI", "Performance", "Mobile", "UX"],
      icon: Rocket,
      featured: true
    },
    {
      id: "new-ai-models-integration",
      title: "Next-Generation AI Models Integration",
      description: "Integration of the latest AI models including DALL-E 3, Midjourney v6, and Stable Diffusion XL for superior image quality and faster generation.",
      date: "2024-12-15",
      category: "Feature",
      version: "v2.8.0",
      image: "/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png",
      tags: ["AI Models", "DALL-E 3", "Midjourney", "Quality"],
      icon: Star
    },
    {
      id: "template-library-expansion",
      title: "Massive Template Library Expansion",
      description: "Added 200+ new professional templates across 15 categories including social media, marketing materials, presentations, and educational content.",
      date: "2024-12-10",
      category: "Content",
      version: "v2.7.5",
      image: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png",
      tags: ["Templates", "Social Media", "Marketing", "Education"],
      icon: Tag
    },
    {
      id: "batch-processing-feature",
      title: "Advanced Batch Processing & API v2",
      description: "New batch processing capabilities allow generating up to 50 images simultaneously. API v2 includes webhook support and enhanced rate limiting.",
      date: "2024-12-05",
      category: "Feature",
      version: "v2.7.0",
      image: "/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png",
      tags: ["Batch Processing", "API", "Webhooks", "Automation"],
      icon: Zap
    },
    {
      id: "enhanced-security-compliance",
      title: "Enhanced Security & GDPR Compliance",
      description: "Implemented advanced security measures, SOC 2 compliance, and comprehensive GDPR data protection features for enterprise users.",
      date: "2024-11-28",
      category: "Security",
      version: "v2.6.8",
      image: "/lovable-uploads/b8bd59bc-46c8-4f5f-9ad8-8eacbf6c7c20.png",
      tags: ["Security", "GDPR", "Compliance", "Enterprise"],
      icon: Shield
    },
    {
      id: "collaboration-tools",
      title: "Team Collaboration & Workspace Features",
      description: "Introducing team workspaces, shared galleries, comment system, and real-time collaboration tools for creative teams and agencies.",
      date: "2024-11-20",
      category: "Feature",
      version: "v2.6.0",
      image: "/lovable-uploads/806c4eee-2b54-4f82-8d75-7bd3e7137f5c.png",
      tags: ["Collaboration", "Teams", "Workspace", "Sharing"],
      icon: Rocket
    }
  ];

  const categories = ["Major Release", "Feature", "Content", "Security", "Enhancement"];

  const filteredUpdates = updates.filter(update => {
    const matchesSearch = !searchQuery || 
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilters.length === 0 || 
      selectedFilters.includes(update.category);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <ResourcePageTemplate
      title="Product Updates & Releases"
      description="Stay informed about the newest features, improvements, and fixes to WordToImage. Follow our development journey and exciting new capabilities."
      seoTitle="WordToImage Updates - Latest Features & Product Releases"
      seoDescription="Stay updated with WordToImage's latest features, improvements, and product releases. See what's new in AI image generation technology."
      keywords="WordToImage updates, product releases, new features, AI image generation updates, changelog"
      aiKeywords={[
        'AI image generation updates',
        'product development news',
        'new AI features',
        'image generation improvements',
        'technology updates'
      ]}
      voiceSearchQueries={[
        'what is new in WordToImage',
        'latest AI image generation features',
        'WordToImage product updates',
        'new features in AI art tools'
      ]}
      currentPath="/updates"
      badge="What's New"
    >
      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 mb-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6">Get notified about new features, updates, and improvements directly in your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button className="bg-indigo-600 hover:bg-indigo-700 px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <ContentSearch
        onSearch={setSearchQuery}
        onFilter={setSelectedFilters}
        categories={categories}
        selectedFilters={selectedFilters}
        placeholder="Search updates and releases..."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredUpdates.map((update, index) => (
          <div key={update.id} className="relative">
            <ContentCard
              id={update.id}
              title={update.title}
              description={update.description}
              image={update.image}
              date={update.date}
              category={update.category}
              tags={update.tags}
              featured={update.featured && index === 0}
              contentType="update"
            />
            {/* Version badge */}
            <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {update.version}
            </div>
            {/* Category icon */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <update.icon className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
        ))}
      </div>
      
      {filteredUpdates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Rocket className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No updates found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find the updates you're looking for.</p>
        </div>
      )}
    </ResourcePageTemplate>
  );
};

export default Updates;
