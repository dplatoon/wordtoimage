
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Calendar, User, Clock } from "lucide-react";
import { ContentBreadcrumbs } from "@/components/seo/ContentBreadcrumbs";
import { ContentNavigation } from "@/components/seo/ContentNavigation";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { PageSEO } from "@/components/seo/PageSEO";
import { SocialShareButtons } from "@/components/social/SocialShareButtons";
import { UserEngagementTracker } from "@/components/analytics/UserEngagementTracker";
import { ReadingProgress } from "@/components/content/ReadingProgress";
import { ContentBookmarks } from "@/components/content/ContentBookmarks";

const Blog = () => {
  const posts = [
    {
      id: "ai-art-trends-2025",
      title: "AI Art Trends Shaping 2025: What Creators Need to Know",
      excerpt: "Explore the latest developments in AI-generated art and how they're revolutionizing creative industries.",
      author: "Sarah Chen",
      date: "2024-12-15",
      readTime: "8 min read",
      image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
      tags: ["AI Art", "Trends", "2025", "Creative Technology"]
    },
    {
      id: "prompting-mastery-guide",
      title: "The Complete Guide to AI Art Prompting: From Beginner to Expert",
      excerpt: "Master the art of writing effective prompts for AI image generation with proven techniques and examples.",
      author: "Michael Rodriguez",
      date: "2024-12-10",
      readTime: "12 min read",
      image: "/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png",
      tags: ["Prompting", "Tutorial", "AI Art", "Techniques"]
    },
    {
      id: "commercial-ai-art-guide",
      title: "Using AI-Generated Images for Commercial Projects: Legal and Best Practices",
      excerpt: "Navigate the legal landscape of AI art for commercial use and learn best practices for businesses.",
      author: "Lisa Thompson",
      date: "2024-12-05",
      readTime: "10 min read",
      image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
      tags: ["Commercial Use", "Legal", "Business", "AI Art"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO
        title="AI Art Blog - Latest Trends, Tutorials & Tips for AI Image Generation"
        description="Stay updated with the latest AI art trends, tutorials, and expert tips. Learn advanced prompting techniques, commercial usage guidelines, and industry insights for AI image generation."
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
      />
      
      <ReadingProgress target="main" />
      <Nav />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <ContentBreadcrumbs />
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">AI Art Blog</h1>
          <p className="mt-4 text-xl text-gray-600">
            Latest insights, tutorials, and trends in AI image generation
          </p>
        </div>
        
        <ContentNavigation />
        
        <UserEngagementTracker contentId="blog-posts" contentType="blog-listing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post, index) => (
              <UserEngagementTracker key={post.id} contentId={post.id} contentType="blog-post-preview">
                <article className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <ContentBookmarks
                        contentId={post.id}
                        contentType="blog-post"
                        title={post.title}
                      />
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <SocialShareButtons
                        url={`https://wordtoimage.com/blog/${post.id}`}
                        title={post.title}
                        description={post.excerpt}
                        className="justify-center"
                        showCopyLink={false}
                      />
                    </div>
                  </div>
                </article>
              </UserEngagementTracker>
            ))}
          </div>
        </UserEngagementTracker>
        
        <RelatedContent currentPath="/blog" />
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
