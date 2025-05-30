
import { useState } from "react";
import { ResourcePageTemplate } from "@/components/templates/ResourcePageTemplate";
import { ContentCard } from "@/components/content/ContentCard";
import { ContentSearch } from "@/components/content/ContentSearch";
import { Play } from "lucide-react";

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const tutorials = [
    {
      id: "getting-started-wordtoimage",
      title: "Getting Started with WordToImage",
      description: "Learn the basics of converting text to images with our platform. Perfect for beginners who want to create their first AI-generated artwork.",
      readTime: "5 min",
      level: "Beginner",
      image: "/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png",
      category: "Beginner",
      tags: ["Getting Started", "Basics", "Introduction"],
      featured: true
    },
    {
      id: "advanced-image-customization",
      title: "Advanced Image Customization",
      description: "Discover how to fine-tune your generated images for perfect results using advanced settings and techniques.",
      readTime: "10 min",
      level: "Intermediate",
      image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
      category: "Intermediate",
      tags: ["Customization", "Advanced", "Settings"]
    },
    {
      id: "using-templates-effectively",
      title: "Using Templates Effectively",
      description: "Get the most out of our pre-designed templates for quick and professional results in minutes.",
      readTime: "7 min",
      level: "Beginner",
      image: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png",
      category: "Beginner",
      tags: ["Templates", "Quick Start", "Efficiency"]
    },
    {
      id: "creating-custom-backgrounds",
      title: "Creating Custom Backgrounds",
      description: "Learn to craft unique backgrounds for your text-to-image creations using advanced composition techniques.",
      readTime: "12 min",
      level: "Advanced",
      image: "/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png",
      category: "Advanced",
      tags: ["Backgrounds", "Custom", "Composition"]
    },
    {
      id: "bulk-image-generation",
      title: "Bulk Image Generation",
      description: "Efficiently create multiple images for your marketing campaigns with batch processing techniques.",
      readTime: "8 min",
      level: "Intermediate",
      image: "/lovable-uploads/b8bd59bc-46c8-4f5f-9ad8-8eacbf6c7c20.png",
      category: "Intermediate",
      tags: ["Bulk", "Batch", "Marketing", "Efficiency"]
    },
    {
      id: "social-media-optimization",
      title: "Image Optimization for Social Media",
      description: "Optimize your generated images for various social media platforms with proper sizing and formatting.",
      readTime: "9 min",
      level: "Intermediate",
      image: "/lovable-uploads/806c4eee-2b54-4f82-8d75-7bd3e7137f5c.png",
      category: "Intermediate",
      tags: ["Social Media", "Optimization", "Formats"]
    }
  ];

  const categories = ["Beginner", "Intermediate", "Advanced"];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = !searchQuery || 
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilters.length === 0 || 
      selectedFilters.includes(tutorial.category);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <ResourcePageTemplate
      title="AI Art Tutorials"
      description="Master AI image generation with our comprehensive step-by-step tutorials. From beginner basics to advanced techniques."
      seoTitle="AI Image Generation Tutorials - Step by Step Guides"
      seoDescription="Master AI image generation with our comprehensive tutorials. Learn how to create stunning AI art from text prompts with step-by-step guides for all skill levels."
      keywords="AI image tutorials, text to image guides, AI art tutorials, machine learning tutorials, AI image generation how-to"
      aiKeywords={[
        'AI image generation tutorials',
        'step by step AI art guide',
        'text-to-image tutorials',
        'AI art for beginners',
        'advanced AI image techniques'
      ]}
      voiceSearchQueries={[
        'how to generate AI images step by step',
        'AI art tutorial for beginners',
        'how to create better AI images',
        'what are the best AI art techniques'
      ]}
      currentPath="/tutorials"
      badge="Interactive Guides"
    >
      <ContentSearch
        onSearch={setSearchQuery}
        onFilter={setSelectedFilters}
        categories={categories}
        selectedFilters={selectedFilters}
        placeholder="Search tutorials and guides..."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTutorials.map((tutorial, index) => (
          <div key={tutorial.id} className="relative">
            <ContentCard
              id={tutorial.id}
              title={tutorial.title}
              description={tutorial.description}
              image={tutorial.image}
              readTime={tutorial.readTime}
              category={tutorial.category}
              tags={tutorial.tags}
              featured={tutorial.featured && index === 0}
              contentType="tutorial"
            />
            {/* Play button overlay */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <Play className="h-5 w-5 text-indigo-600" fill="currentColor" />
            </div>
          </div>
        ))}
      </div>
      
      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Play className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tutorials found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find the tutorial you need.</p>
        </div>
      )}
    </ResourcePageTemplate>
  );
};

export default Tutorials;
