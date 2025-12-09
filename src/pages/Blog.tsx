import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PageSEO } from '@/components/seo/PageSEO';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      title: "7 Stunning AI Art Styles and How to Generate Them",
      excerpt: "Discover 7 popular AI-generated art styles, from anime to impressionism, with easy step-by-step prompts you can use instantly at WordToImage.com.",
      author: "WordToImage Team",
      date: "2025-01-20",
      readTime: "8 min read",
      category: "Tutorial",
      image: "/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png",
      featured: true,
      slug: "ai-art-styles"
    },
    {
      title: "Best Free AI Image Generators to Bring Your Ideas to Life",
      excerpt: "In today's digital age, AI-driven image generation tools have transformed the creative landscape. These tools enable anyone to produce stunning visuals effortlessly.",
      author: "WordToImage Team",
      date: "2025-01-22",
      readTime: "7 min read",
      category: "Tools",
      image: "/lovable-uploads/c0cd939b-5fe6-4732-af93-ee61f070b689.png",
      featured: false,
      slug: "best-free-ai-image-generators"
    },
    {
      title: "Ultimate Guide: Writing Powerful Prompts for AI Image Generation",
      excerpt: "Learn how to write powerful, effective prompts for stunning AI-generated images with our ultimate prompt writing guide at WordToImage.com.",
      author: "WordToImage Team",
      date: "2025-01-18",
      readTime: "10 min read",
      category: "Tutorial",
      image: "/lovable-uploads/19295794-7457-41ec-9272-41faed11b055.png",
      slug: "prompt-writing-guide"
    },
    {
      title: "How to Use an AI Image Generator Online for Free",
      excerpt: "AI image generators online allow creatives to turn words into vivid images instantly. Learn how to use these powerful tools effectively.",
      author: "WordToImage Team",
      date: "2025-01-17",
      readTime: "6 min read",
      category: "Tutorial",
      image: "/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png",
      slug: "ai-image-generator-online-free"
    },
    {
      title: "How Businesses Are Leveraging AI-Generated Images for Marketing Success",
      excerpt: "Explore real-world examples and strategies of businesses successfully using AI-generated images to boost marketing results with WordToImage.com.",
      author: "WordToImage Team",
      date: "2025-01-15",
      readTime: "12 min read",
      category: "Business",
      image: "/lovable-uploads/269b93d2-3c01-438b-b2bb-e7b1fbc3b233.png",
      slug: "ai-marketing-success"
    },
    {
      title: "The Ultimate Guide to Image Generator Codes: Create Visuals Programmatically",
      excerpt: "Image generator codes allow developers and tech-savvy creatives to automate image creation through programming languages.",
      author: "WordToImage Team",
      date: "2025-01-14",
      readTime: "9 min read",
      category: "Development",
      image: "/lovable-uploads/8916d6c1-4854-473f-b0fb-0c6d9833633e.png",
      slug: "image-generator-codes-guide"
    },
    {
      title: "Mastering AI Art Prompts: A Complete Guide for 2025",
      excerpt: "Learn the secrets of writing effective prompts that generate stunning AI artwork. From basic techniques to advanced strategies.",
      author: "Sarah Chen",
      date: "2025-01-13",
      readTime: "8 min read",
      category: "Tutorial",
      image: "/lovable-uploads/317dfa28-3425-4dac-a167-343034ee797b.png",
      slug: "mastering-ai-art-prompts"
    },
    {
      title: "Image Generator AI: Revolutionizing Digital Creativity",
      excerpt: "AI-driven image generators have profoundly impacted digital art, making it accessible and innovative for creators worldwide.",
      author: "WordToImage Team",
      date: "2025-01-12",
      readTime: "8 min read",
      category: "Industry",
      image: "/lovable-uploads/5780c58f-29ec-4462-a0eb-3ba9829bf938.png",
      slug: "ai-image-generator-revolution"
    },
    {
      title: "The Future of AI Image Generation: Trends to Watch",
      excerpt: "Explore the latest developments in AI image generation technology and what they mean for creators and businesses.",
      author: "Michael Rodriguez",
      date: "2025-01-11",
      readTime: "6 min read",
      category: "Industry",
      image: "/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png",
      slug: "future-ai-image-generation"
    },
    {
      title: "Creating Professional Marketing Visuals with AI",
      excerpt: "Discover how businesses are using AI-generated images to create compelling marketing materials and boost engagement.",
      author: "Emma Thompson",
      date: "2025-01-10",
      readTime: "5 min read",
      category: "Business",
      image: "/lovable-uploads/2eae8e86-b21c-42da-a038-310ef938fe38.png",
      slug: "professional-marketing-visuals"
    },
    {
      title: "Exploring Bing's Image Generator: Is it Worth Trying?",
      excerpt: "Bing has introduced its AI image generator, aiming to compete with existing tools. But does it deliver quality results?",
      author: "WordToImage Team",
      date: "2025-01-09",
      readTime: "6 min read",
      category: "Review",
      image: "/lovable-uploads/e3ece80c-0df0-4887-a227-c06cf52b3c6e.png",
      slug: "bing-image-generator-review"
    }
  ];

  const categories = ["All", "Tutorial", "Business", "Industry", "Tips", "Case Studies"];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>WordToImage Blog – Image Conversion & AI Tools Tips</title>
        <meta name="description" content="Explore tutorials, case studies, and tips on using image converters, background removers, and AI tools. Stay updated with the latest trends." />
        <meta name="keywords" content="AI art blog, image conversion tutorials, background removal tips, AI image generator guides, converter tools" />
        <link rel="canonical" href="https://wordtoimage.online/blog" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "WordToImage Blog",
            "description": "Tutorials and insights on AI image generation, background removal, and image conversion tools",
            "url": "https://wordtoimage.online/blog",
            "publisher": {
              "@type": "Organization",
              "name": "WordToImage",
              "url": "https://wordtoimage.online"
            },
            "mainEntity": {
              "@type": "CollectionPage",
              "name": "AI Art & Conversion Tools Blog Posts"
            }
          })}
        </script>
      </Helmet>
      
      <Nav />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <ContentBreadcrumbs />
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Latest Articles</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">WordToImage </span>
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore tutorials, case studies, and tips on using image converters, background removers, and AI tools. 
            Learn from experts and discover new ways to enhance your creative workflow.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "neon" : "glass"}
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
          <Card key={post.slug} className="mb-16 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent lg:hidden" />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <User className="w-4 h-4 mr-2 text-primary" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  <span>{post.readTime}</span>
                </div>
                <Button asChild variant="neon" className="w-fit">
                  <Link to={`/blog/${post.slug}`}>
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
            <Card key={post.slug} className="overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardHeader className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <User className="w-4 h-4 mr-2 text-primary/60" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="w-4 h-4 mr-2 text-primary/60" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Button variant="neon-outline" asChild className="w-full">
                  <Link to={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 overflow-hidden">
          <div className="relative p-8 md:p-12 text-center">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get the latest AI art tutorials, tips, and industry insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-primary/20 bg-background/60 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
                <Button variant="neon" size="lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
