import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LazyImage } from '@/components/common/LazyImage';
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Filter, 
  TrendingUp, 
  BookOpen,
  Heart,
  Eye,
  Share2,
  Mail,
  ChevronRight,
  Star
} from 'lucide-react';
import { ContentService, BlogPost } from '@/services/contentService';
import { useConversionTracking } from '@/hooks/useConversionTracking';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { toast } from '@/hooks/use-toast';

export default function ContentHub() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { trackFeatureUsage } = useConversionTracking();

  useEffect(() => {
    fetchContent();
    trackFeatureUsage('content_hub_visit');
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      // For now, using the existing static data while the database schema is being set up
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: '7 Stunning AI Art Styles and How to Generate Them',
          slug: 'ai-art-styles',
          excerpt: 'Discover 7 popular AI-generated art styles, from anime to impressionism, with easy step-by-step prompts you can use instantly.',
          content: 'Full article content...',
          author_id: '1',
          author_name: 'WordToImage Team',
          category: 'Tutorial',
          tags: ['AI art', 'styles', 'prompts'],
          featured_image: '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png',
          featured: true,
          published: true,
          publish_date: '2025-01-20',
          read_time: 8,
          views: 2847,
          likes: 156,
          created_at: '2025-01-20',
          updated_at: '2025-01-20'
        },
        {
          id: '2',
          title: 'Ultimate Guide: Writing Powerful Prompts for AI Image Generation',
          slug: 'prompt-writing-guide',
          excerpt: 'Learn how to write powerful, effective prompts for stunning AI-generated images with our comprehensive guide.',
          content: 'Full article content...',
          author_id: '1',
          author_name: 'Sarah Chen',
          category: 'Tutorial',
          tags: ['prompts', 'AI', 'guide'],
          featured_image: '/lovable-uploads/19295794-7457-41ec-9272-41faed11b055.png',
          featured: false,
          published: true,
          publish_date: '2025-01-18',
          read_time: 10,
          views: 1923,
          likes: 98,
          created_at: '2025-01-18',
          updated_at: '2025-01-18'
        },
        {
          id: '3',
          title: 'How Businesses Are Leveraging AI-Generated Images for Marketing Success',
          slug: 'ai-marketing-success',
          excerpt: 'Explore real-world examples and strategies of businesses successfully using AI-generated images to boost marketing results.',
          content: 'Full article content...',
          author_id: '2',
          author_name: 'Michael Rodriguez',
          category: 'Business',
          tags: ['marketing', 'business', 'case studies'],
          featured_image: '/lovable-uploads/269b93d2-3c01-438b-b2bb-e7b1fbc3b233.png',
          featured: false,
          published: true,
          publish_date: '2025-01-15',
          read_time: 12,
          views: 1654,
          likes: 87,
          created_at: '2025-01-15',
          updated_at: '2025-01-15'
        }
      ];

      setFeaturedPosts(mockPosts.filter(post => post.featured));
      setPosts(mockPosts.filter(post => !post.featured));
      
      setCategories([
        { name: 'All', slug: '', post_count: mockPosts.length },
        { name: 'Tutorial', slug: 'tutorial', post_count: 2 },
        { name: 'Business', slug: 'business', post_count: 1 },
        { name: 'Industry', slug: 'industry', post_count: 0 },
        { name: 'Case Studies', slug: 'case-studies', post_count: 0 }
      ]);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    trackFeatureUsage('content_search', { query: searchQuery });
    
    // Enhanced search experience
    const filteredResults = posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    if (filteredResults.length > 0) {
      setPosts(filteredResults);
      toast({ 
        title: `Found ${filteredResults.length} result${filteredResults.length === 1 ? '' : 's'}`,
        description: 'Clear search to see all articles' 
      });
    } else {
      toast({ 
        title: 'No results found', 
        description: 'Try different keywords or browse our categories',
        variant: 'destructive' 
      });
    }
  };

  const handleNewsletterSignup = async () => {
    if (!newsletterEmail.trim()) {
      toast({ title: 'Email required', description: 'Please enter your email address', variant: 'destructive' });
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast({ title: 'Invalid email', description: 'Please enter a valid email address', variant: 'destructive' });
      return;
    }
    
    try {
      trackFeatureUsage('newsletter_signup', { email: newsletterEmail });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({ 
        title: '🎉 Welcome to our community!', 
        description: 'You\'ll receive weekly AI art tips and tutorials.' 
      });
      setNewsletterEmail('');
    } catch (error) {
      toast({ 
        title: 'Subscription failed', 
        description: 'Please try again later or contact support.', 
        variant: 'destructive' 
      });
    }
  };

  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category.toLowerCase() === selectedCategory)
    : posts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <EnhancedSEOManager 
        pageContent={{
          h1: "Content Marketing Hub - AI Art & Creative Resources",
          h2Headings: [
            "Latest AI Art Tutorials",
            "Featured Content",
            "Expert Insights & Case Studies",
            "Join Our Creative Community"
          ]
        }}
      />

      <Nav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Content Marketing <span className="text-violet-600">Hub</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Your go-to resource for AI art tutorials, industry insights, and creative inspiration. 
            Learn from experts, discover new techniques, and stay ahead of the curve.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search articles, tutorials, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <BookOpen className="h-8 w-8 text-violet-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Articles</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">100K+</div>
              <div className="text-sm text-gray-600">Views</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">5K+</div>
              <div className="text-sm text-gray-600">Likes</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2K+</div>
              <div className="text-sm text-gray-600">Subscribers</div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="latest" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="latest" className="mt-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.slug)}
                  className="rounded-full"
                >
                  {category.name} ({category.post_count})
                </Button>
              ))}
            </div>

            {/* Latest Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <LazyImage
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      aspectRatio={16/9}
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {post.likes}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-2" />
                        <span>{post.author_name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.read_time} min</span>
                      </div>
                    </div>
                    <Button asChild className="w-full mt-4">
                      <Link to={`/blog/${post.slug}`}>
                        Read Article
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="mt-8">
            {/* Featured Posts */}
            <div className="space-y-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="aspect-video lg:aspect-auto">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="w-4 h-4 mr-2" />
                          <span className="mr-4">{post.author_name}</span>
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{post.read_time} min read</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                      <Button asChild size="lg">
                        <Link to={`/blog/${post.slug}`}>
                          Read Full Article
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-8">
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trending Content</h3>
              <p className="text-gray-600 mb-6">
                Discover the most popular articles based on views, likes, and shares.
              </p>
              <Button variant="outline">
                Coming Soon
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white mb-12">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Creative Community</h2>
            <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
              Get exclusive AI art tutorials, industry insights, and early access to new features 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-white text-gray-900"
              />
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleNewsletterSignup}
                className="whitespace-nowrap"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-violet-200 mt-4">
              Join 2,000+ creators. Unsubscribe anytime.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}