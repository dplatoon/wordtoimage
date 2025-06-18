
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PageSEO } from '@/components/seo/PageSEO';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Mastering AI Art Prompts: A Complete Guide for 2025",
      excerpt: "Learn the secrets of writing effective prompts that generate stunning AI artwork. From basic techniques to advanced strategies.",
      author: "Sarah Chen",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "Tutorial",
      image: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png",
      featured: true
    },
    {
      id: 2,
      title: "The Future of AI Image Generation: Trends to Watch",
      excerpt: "Explore the latest developments in AI image generation technology and what they mean for creators and businesses.",
      author: "Michael Rodriguez",
      date: "2025-01-12",
      readTime: "6 min read",
      category: "Industry",
      image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png"
    },
    {
      id: 3,
      title: "Creating Professional Marketing Visuals with AI",
      excerpt: "Discover how businesses are using AI-generated images to create compelling marketing materials and boost engagement.",
      author: "Emma Thompson",
      date: "2025-01-10",
      readTime: "5 min read",
      category: "Business",
      image: "/lovable-uploads/f0dea1ce-ca91-4c0b-9849-6b3649a98249.png"
    }
  ];

  const categories = ["All", "Tutorial", "Industry", "Business", "Tips", "Case Studies"];

  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title="AI Art Blog - Latest Tips, Tutorials & Industry News | WordToImage"
        description="Stay updated with the latest AI art techniques, tutorials, and industry trends. Learn from experts and discover new ways to create stunning AI-generated images."
        keywords="AI art blog, AI image tutorials, text to image tips, AI art news, AI generator guides"
        canonical="https://wordtoimage.com/blog"
        aiKeywords={['AI art blog', 'AI image generation tutorials', 'text to image tips', 'AI art techniques']}
        voiceSearchQueries={['AI art tutorials', 'how to create AI images', 'AI image generation tips']}
      />
      
      <Nav />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ContentBreadcrumbs />
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Art <span className="text-violet-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the latest trends, tutorials, and insights in AI image generation. 
            Learn from experts and master the art of creating stunning visuals with AI.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <Card key={post.id} className="mb-16 overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-violet-100 text-violet-700">
                  Featured
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
                <Button asChild className="w-fit">
                  <Link to={`/blog/${post.id}`}>
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Button variant="outline" asChild className="w-full">
                  <Link to={`/blog/${post.id}`}>
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white mt-16">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Get the latest AI art tutorials, tips, and industry insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
