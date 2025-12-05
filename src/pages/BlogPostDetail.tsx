import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  User, 
  Heart, 
  Eye, 
  Share2, 
  ArrowLeft,
  ChevronRight,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { ContentService, BlogPost } from '@/services/contentService';
import { useAuth } from '@/contexts/AuthContext';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { toast } from '@/hooks/use-toast';
import { SafeHTML } from '@/components/SafeHTML';

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  const fetchPost = async (postSlug: string) => {
    setLoading(true);
    try {
      // Mock data for now
      const mockPost: BlogPost = {
        id: '1',
        title: '7 Stunning AI Art Styles and How to Generate Them',
        slug: 'ai-art-styles',
        excerpt: 'Discover 7 popular AI-generated art styles, from anime to impressionism, with easy step-by-step prompts you can use instantly.',
        content: `
          <h2>Introduction to AI Art Styles</h2>
          <p>AI-generated art has revolutionized the creative landscape, making it possible for anyone to create stunning visuals with just a few words. Whether you're a professional designer, content creator, or someone exploring their artistic side, understanding different AI art styles can dramatically improve your results.</p>
          
          <h2>1. Photorealistic Style</h2>
          <p>Photorealistic AI art mimics real photography with incredible detail and accuracy. This style is perfect for creating images that look like they were captured with a camera.</p>
          <p><strong>Example prompt:</strong> "A photorealistic portrait of a woman with curly red hair, wearing a blue sweater, natural lighting, high detail, professional photography"</p>
          
          <h2>2. Anime and Manga Style</h2>
          <p>One of the most popular styles in AI art generation, anime style creates characters and scenes reminiscent of Japanese animation and comics.</p>
          <p><strong>Example prompt:</strong> "Anime style illustration of a young warrior with silver hair, holding a glowing sword, fantasy background, vibrant colors"</p>
          
          <h2>3. Oil Painting Style</h2>
          <p>This classical art style adds texture and depth to your images, creating the appearance of traditional oil paintings.</p>
          <p><strong>Example prompt:</strong> "Oil painting of a serene landscape with mountains and a lake, impressionist style, warm colors, textured brushstrokes"</p>
          
          <h2>4. Cyberpunk and Futuristic</h2>
          <p>Perfect for creating sci-fi inspired images with neon colors, high-tech elements, and dystopian aesthetics.</p>
          <p><strong>Example prompt:</strong> "Cyberpunk city at night, neon lights, flying cars, rain-soaked streets, futuristic architecture, purple and blue color scheme"</p>
          
          <h2>5. Watercolor Style</h2>
          <p>Creates soft, flowing images with the characteristic bleeding and transparency effects of watercolor paintings.</p>
          <p><strong>Example prompt:</strong> "Watercolor painting of a garden with blooming flowers, soft edges, transparent layers, pastel colors"</p>
          
          <h2>6. Minimalist and Abstract</h2>
          <p>Clean, simple designs that focus on essential elements, perfect for modern art and design projects.</p>
          <p><strong>Example prompt:</strong> "Minimalist abstract composition with geometric shapes, clean lines, limited color palette, modern design"</p>
          
          <h2>7. Vintage and Retro</h2>
          <p>Captures the aesthetic of past decades, from Victorian elegance to 80s nostalgia.</p>
          <p><strong>Example prompt:</strong> "Vintage 1950s advertisement style, pin-up art, retro colors, classic typography, nostalgic feel"</p>
          
          <h2>Pro Tips for Better Results</h2>
          <ul>
            <li>Be specific about details you want to see</li>
            <li>Include lighting and mood descriptions</li>
            <li>Mention specific artists or art movements for style reference</li>
            <li>Use quality descriptors like "high detail" or "professional"</li>
            <li>Experiment with different combinations</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>Mastering these AI art styles opens up endless creative possibilities. Remember that the key to great AI art is in the details of your prompts. Don't be afraid to experiment and iterate until you achieve the perfect result.</p>
        `,
        author_id: '1',
        author_name: 'WordToImage Team',
        category: 'Tutorial',
        tags: ['AI art', 'styles', 'prompts', 'tutorial'],
        featured_image: '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png',
        featured: true,
        published: true,
        publish_date: '2025-01-20',
        seo_title: '7 Stunning AI Art Styles & How to Generate Them | WordToImage Guide',
        seo_description: 'Master 7 popular AI art styles with our comprehensive guide. Learn photorealistic, anime, oil painting, cyberpunk & more styles with example prompts.',
        read_time: 8,
        views: 2847,
        likes: 156,
        created_at: '2025-01-20',
        updated_at: '2025-01-20'
      };

      setPost(mockPost);
      setLikeCount(mockPost.likes);
      
      // Mock related posts
      setRelatedPosts([
        {
          id: '2',
          title: 'Ultimate Guide: Writing Powerful Prompts for AI Image Generation',
          slug: 'prompt-writing-guide',
          excerpt: 'Learn how to write powerful, effective prompts for stunning AI-generated images.',
          content: '',
          author_id: '1',
          author_name: 'Sarah Chen',
          category: 'Tutorial',
          tags: ['prompts'],
          featured_image: '/lovable-uploads/19295794-7457-41ec-9272-41faed11b055.png',
          featured: false,
          published: true,
          publish_date: '2025-01-18',
          read_time: 10,
          views: 1923,
          likes: 98,
          created_at: '2025-01-18',
          updated_at: '2025-01-18'
        }
      ]);

      console.log('Blog post viewed:', postSlug);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast({ title: 'Please sign in to like posts', variant: 'destructive' });
      return;
    }

    if (!post) return;

    try {
      setLiked(!liked);
      setLikeCount(prev => liked ? prev - 1 : prev + 1);
      console.log('Post liked:', post.id);
      toast({ title: liked ? 'Post unliked' : 'Post liked!' });
    } catch (error) {
      setLiked(liked);
      setLikeCount(post.likes);
      toast({ title: 'Failed to update like', variant: 'destructive' });
    }
  };

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied to clipboard!' });
    }
    console.log('Post shared:', post?.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/content-hub">Back to Content Hub</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <EnhancedSEOManager 
        pageContent={{
          h1: post.seo_title || post.title,
          h2Headings: ['Introduction', 'Key Takeaways', 'Related Articles']
        }}
      />

      <Nav />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/content-hub" className="hover:text-violet-600">Content Hub</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/content-hub?category=${post.category.toLowerCase()}`} className="hover:text-violet-600">
            {post.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{post.title}</span>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Badge variant="secondary">{post.category}</Badge>
            {post.featured && (
              <Badge className="bg-yellow-500 text-white">Featured</Badge>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publish_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.read_time} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{post.views} views</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video rounded-xl overflow-hidden mb-8">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Social Actions */}
          <div className="flex items-center gap-4 pb-8 border-b">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-2 ${liked ? 'text-red-600 border-red-600' : ''}`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              {likeCount}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Comment
            </Button>
          </div>
        </header>

        {/* Article Content */}
        <SafeHTML html={post.content} className="prose prose-lg prose-violet max-w-none mb-12" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="outline">#{tag}</Badge>
          ))}
        </div>

        <Separator className="mb-12" />

        {/* Related Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={relatedPost.featured_image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">{relatedPost.category}</Badge>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{relatedPost.read_time} min</span>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/blog/${relatedPost.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Back to Hub */}
        <div className="mt-12 pt-8 border-t">
          <Button asChild variant="outline">
            <Link to="/content-hub" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Content Hub
            </Link>
          </Button>
        </div>
      </article>

      <Footer />
    </div>
  );
}