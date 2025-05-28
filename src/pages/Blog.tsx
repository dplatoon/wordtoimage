import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ContentBreadcrumbs } from "@/components/seo/ContentBreadcrumbs";
import { ContentNavigation } from "@/components/seo/ContentNavigation";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { PageSEO } from "@/components/seo/PageSEO";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      image: "/placeholder.svg",
      category: "AI News",
      title: "The Future of AI-Generated Images",
      excerpt: "Exploring the latest advancements in AI image generation technology.",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg",
        date: "April 11, 2025"
      }
    },
    {
      id: 2,
      image: "/placeholder.svg",
      category: "Design Tips",
      title: "Creating Eye-Catching Social Media Graphics",
      excerpt: "Learn how to design engaging social media content that stands out.",
      author: {
        name: "Michael Chen",
        avatar: "/placeholder.svg",
        date: "April 12, 2025"
      }
    },
    {
      id: 3,
      image: "/placeholder.svg",
      category: "Product Updates",
      title: "New Features: Enhanced Text-to-Image Generation",
      excerpt: "Discover our latest improvements in AI image generation.",
      author: {
        name: "Alex Thompson",
        avatar: "/placeholder.svg",
        date: "April 13, 2025"
      }
    },
    {
      id: 4,
      image: "/placeholder.svg",
      category: "Tutorials",
      title: "Mastering WordToImage: A Beginner's Guide",
      excerpt: "Step-by-step guide to creating stunning visuals with our platform.",
      author: {
        name: "Emily Davis",
        avatar: "/placeholder.svg",
        date: "April 14, 2025"
      }
    },
    {
      id: 5,
      image: "/placeholder.svg",
      category: "Case Studies",
      title: "How Businesses Are Using AI-Generated Images",
      excerpt: "Real-world examples of AI image generation in marketing.",
      author: {
        name: "David Wilson",
        avatar: "/placeholder.svg",
        date: "April 15, 2025"
      }
    },
    {
      id: 6,
      image: "/placeholder.svg",
      category: "Industry Insights",
      title: "The Evolution of Digital Content Creation",
      excerpt: "How AI is transforming the way we create visual content.",
      author: {
        name: "Lisa Anderson",
        avatar: "/placeholder.svg",
        date: "April 16, 2025"
      }
    }
  ];

  // Collection of different default images from Unsplash for different blog post categories
  const defaultImages = {
    aiNews: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e", // robot image
    designTips: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // person using laptop
    productUpdates: "https://images.unsplash.com/photo-1518770660439-4636190af475", // circuit board
    tutorials: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // coding screen
    caseStudies: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", // person using MacBook
    industry: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", // digital matrix
  };

  // Function to get the appropriate default image based on category
  const getDefaultImageForPost = (post) => {
    switch (post.category) {
      case "AI News":
        return defaultImages.aiNews;
      case "Design Tips":
        return defaultImages.designTips;
      case "Product Updates":
        return defaultImages.productUpdates;
      case "Tutorials":
        return defaultImages.tutorials;
      case "Case Studies":
        return defaultImages.caseStudies;
      case "Industry Insights":
        return defaultImages.industry;
      default:
        return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"; // default fallback
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO
        title="AI Art Blog - Latest Insights & Tutorials"
        description="Discover the latest AI art trends, tutorials, and insights. Learn how to create stunning AI-generated images with expert tips and case studies."
        keywords="AI art blog, AI image generation tutorials, AI art insights, machine learning art, digital art creation"
        aiKeywords={[
          'AI art trends 2025',
          'AI image generation tips',
          'AI art tutorials for beginners',
          'creative AI tools',
          'digital art with AI'
        ]}
        voiceSearchQueries={[
          'how to create AI art',
          'what are the latest AI art trends',
          'best AI art tutorials',
          'how to improve AI art skills'
        ]}
      />
      
      <Nav />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <ContentBreadcrumbs />
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">AI Art Blog</h1>
          <p className="mt-4 text-xl text-gray-600">
            Stay updated with the latest AI art trends, tutorials, and insights from WordToImage
          </p>
        </div>
        
        <ContentNavigation />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={post.image === '/placeholder.svg' ? getDefaultImageForPost(post) : post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-blue-600 mb-1">
                  {post.category}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-300">
                    <img 
                      src={post.author.avatar === '/placeholder.svg' ? `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}` : post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                    <p className="text-sm text-gray-500">{post.author.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <RelatedContent currentPath="/blog" />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
