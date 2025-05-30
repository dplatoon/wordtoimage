
import { useState } from "react";
import { ResourcePageTemplate } from "@/components/templates/ResourcePageTemplate";
import { ContentCard } from "@/components/content/ContentCard";
import { ContentSearch } from "@/components/content/ContentSearch";
import { UserEngagementTracker } from "@/components/analytics/UserEngagementTracker";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const posts = [
    {
      id: "ai-art-trends-2025",
      title: "AI Art Trends Shaping 2025: What Creators Need to Know",
      description: "Explore the latest developments in AI-generated art and how they're revolutionizing creative industries. From new AI models to emerging artistic styles.",
      author: "Sarah Chen",
      date: "2024-12-15",
      readTime: "8 min read",
      image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
      category: "AI Trends",
      tags: ["AI Art", "Trends", "2025", "Creative Technology"],
      featured: true
    },
    {
      id: "prompting-mastery-guide",
      title: "The Complete Guide to AI Art Prompting: From Beginner to Expert",
      description: "Master the art of writing effective prompts for AI image generation with proven techniques, examples, and best practices.",
      author: "Michael Rodriguez",
      date: "2024-12-10",
      readTime: "12 min read",
      image: "/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png",
      category: "Tutorial",
      tags: ["Prompting", "Tutorial", "AI Art", "Techniques"]
    },
    {
      id: "commercial-ai-art-guide",
      title: "Using AI-Generated Images for Commercial Projects: Legal and Best Practices",
      description: "Navigate the legal landscape of AI art for commercial use and learn best practices for businesses and creators.",
      author: "Lisa Thompson",
      date: "2024-12-05",
      readTime: "10 min read",
      image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
      category: "Business",
      tags: ["Commercial Use", "Legal", "Business", "AI Art"]
    },
    {
      id: "style-transfer-techniques",
      title: "Advanced Style Transfer Techniques in AI Art",
      description: "Learn how to apply artistic styles to your AI-generated images with advanced techniques and workflows.",
      author: "David Kim",
      date: "2024-11-28",
      readTime: "15 min read",
      image: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png",
      category: "Tutorial",
      tags: ["Style Transfer", "Advanced", "Techniques", "AI Art"]
    },
    {
      id: "ai-art-community-showcase",
      title: "Community Showcase: Amazing AI Art from Our Users",
      description: "Discover incredible AI-generated artwork from our community members and learn about their creative processes.",
      author: "Emma Wilson",
      date: "2024-11-20",
      readTime: "6 min read",
      image: "/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png",
      category: "Community",
      tags: ["Community", "Showcase", "Inspiration", "Gallery"]
    },
    {
      id: "future-of-ai-creativity",
      title: "The Future of AI in Creative Industries",
      description: "Explore how AI is transforming creative industries and what the future holds for artists, designers, and creators.",
      author: "Alex Johnson",
      date: "2024-11-15",
      readTime: "11 min read",
      image: "/lovable-uploads/b8bd59bc-46c8-4f5f-9ad8-8eacbf6c7c20.png",
      category: "AI Trends",
      tags: ["Future", "Creativity", "Industry", "Innovation"]
    }
  ];

  const categories = ["AI Trends", "Tutorial", "Business", "Community"];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilters.length === 0 || 
      selectedFilters.includes(post.category);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <ResourcePageTemplate
      title="AI Art Blog"
      description="Latest insights, tutorials, and trends in AI image generation. Stay updated with expert tips, community showcases, and industry developments."
      seoTitle="AI Art Blog - Latest Trends, Tutorials & Tips for AI Image Generation"
      seoDescription="Stay updated with the latest AI art trends, tutorials, and expert tips. Learn advanced prompting techniques, commercial usage guidelines, and industry insights for AI image generation."
      keywords="AI art blog, AI image generation tutorials, AI art trends 2025, commercial AI art usage, AI prompting techniques"
      aiKeywords={[
        'AI art industry insights',
        'latest AI image generation trends',
        'professional AI art techniques',
        'AI art commercial applications',
        'advanced AI prompting strategies'
      ]}
      voiceSearchQueries={[
        'what are the latest AI art trends',
        'how to write better AI art prompts',
        'can I use AI art for commercial projects',
        'best AI art techniques for professionals'
      ]}
      currentPath="/blog"
      badge="Latest Articles"
    >
      <ContentSearch
        onSearch={setSearchQuery}
        onFilter={setSelectedFilters}
        categories={categories}
        selectedFilters={selectedFilters}
        placeholder="Search articles, tutorials, and guides..."
      />
      
      <UserEngagementTracker contentId="blog-posts" contentType="blog-listing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <UserEngagementTracker key={post.id} contentId={post.id} contentType="blog-post-preview">
              <ContentCard
                id={post.id}
                title={post.title}
                description={post.description}
                image={post.image}
                author={post.author}
                date={post.date}
                readTime={post.readTime}
                category={post.category}
                tags={post.tags}
                href={`/blog/${post.id}`}
                featured={post.featured && index === 0}
                contentType="blog-post"
              />
            </UserEngagementTracker>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </UserEngagementTracker>
    </ResourcePageTemplate>
  );
};

export default Blog;
