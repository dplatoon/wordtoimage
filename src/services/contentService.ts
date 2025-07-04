export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_id: string;
  author_name: string;
  category: string;
  tags: string[];
  featured_image: string;
  featured: boolean;
  published: boolean;
  publish_date: string;
  seo_title?: string;
  seo_description?: string;
  read_time: number;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  post_count: number;
}

// Mock data for demonstration - this would come from the database in production
const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '7 Stunning AI Art Styles and How to Generate Them',
    slug: 'ai-art-styles',
    excerpt: 'Discover 7 popular AI-generated art styles, from anime to impressionism, with easy step-by-step prompts you can use instantly.',
    content: `
      <h2>Introduction to AI Art Styles</h2>
      <p>AI-generated art has revolutionized the creative landscape, making it possible for anyone to create stunning visuals with just a few words...</p>
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
  },
  {
    id: '2',
    title: 'Ultimate Guide: Writing Powerful Prompts for AI Image Generation',
    slug: 'prompt-writing-guide',
    excerpt: 'Learn how to write powerful, effective prompts for stunning AI-generated images with our comprehensive guide.',
    content: '<p>Content for prompt writing guide...</p>',
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
    content: '<p>Content for marketing success...</p>',
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

const MOCK_CATEGORIES: BlogCategory[] = [
  { id: '1', name: 'All', slug: '', description: 'All posts', post_count: MOCK_POSTS.length },
  { id: '2', name: 'Tutorial', slug: 'tutorial', description: 'Step-by-step guides', post_count: 2 },
  { id: '3', name: 'Business', slug: 'business', description: 'Business insights', post_count: 1 },
  { id: '4', name: 'Industry', slug: 'industry', description: 'Industry news', post_count: 0 },
  { id: '5', name: 'Case Studies', slug: 'case-studies', description: 'Real examples', post_count: 0 }
];

export class ContentService {
  // Blog Posts
  static async getAllPosts(filters?: {
    category?: string;
    tags?: string[];
    published?: boolean;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }) {
    let filteredPosts = MOCK_POSTS.filter(post => {
      if (filters?.category && post.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      if (filters?.published !== undefined && post.published !== filters.published) {
        return false;
      }
      if (filters?.featured !== undefined && post.featured !== filters.featured) {
        return false;
      }
      return true;
    });

    if (filters?.offset) {
      filteredPosts = filteredPosts.slice(filters.offset);
    }
    if (filters?.limit) {
      filteredPosts = filteredPosts.slice(0, filters.limit);
    }

    return { data: filteredPosts, error: null };
  }

  static async getPostBySlug(slug: string) {
    const post = MOCK_POSTS.find(p => p.slug === slug);
    
    if (post) {
      // Simulate incrementing view count
      post.views += 1;
      return { data: post, error: null };
    }
    
    return { data: null, error: { message: 'Post not found' } };
  }

  static async getRelatedPosts(postId: string, category: string, tags: string[], limit = 3) {
    const related = MOCK_POSTS
      .filter(post => post.id !== postId && (
        post.category === category || 
        post.tags.some(tag => tags.includes(tag))
      ))
      .slice(0, limit);
    
    return { data: related, error: null };
  }

  static async incrementPostViews(postId: string) {
    const post = MOCK_POSTS.find(p => p.id === postId);
    if (post) {
      post.views += 1;
    }
    return { data: null, error: null };
  }

  static async likePost(postId: string, userId: string) {
    const post = MOCK_POSTS.find(p => p.id === postId);
    if (post) {
      // Simple toggle for demo
      post.likes += 1;
      return { data: { liked: true }, error: null };
    }
    return { data: null, error: { message: 'Post not found' } };
  }

  // Categories
  static async getAllCategories() {
    return { data: MOCK_CATEGORIES, error: null };
  }

  // Search
  static async searchPosts(query: string, filters?: {
    category?: string;
    limit?: number;
  }) {
    const results = MOCK_POSTS.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );

    return { data: results.slice(0, filters?.limit || 10), error: null };
  }

  // Newsletter (mock implementation)
  static async subscribeToNewsletter(email: string, name?: string) {
    console.log('Newsletter subscription:', { email, name });
    return { data: { success: true }, error: null };
  }

  static async unsubscribeFromNewsletter(email: string) {
    console.log('Newsletter unsubscription:', email);
    return { data: { success: true }, error: null };
  }

  // Analytics
  static async getContentAnalytics(dateRange: { start: string; end: string }) {
    const topPosts = MOCK_POSTS
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    const categoryViews = MOCK_POSTS.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + post.views;
      return acc;
    }, {} as Record<string, number>);

    return {
      data: {
        topPosts,
        categoryViews
      },
      error: null
    };
  }
}