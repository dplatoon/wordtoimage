
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Blog</h1>
          <p className="mt-4 text-xl text-gray-600">
            Stay updated with the latest news, tips, and insights from WordToImage
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
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
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-full h-full object-cover"
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
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
