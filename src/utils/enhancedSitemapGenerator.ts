import { SitemapGenerator } from './sitemapGenerator';

interface BlogPost {
  slug: string;
  lastModified: string;
  images?: string[];
  category?: string;
  tags?: string[];
}

interface Tutorial {
  slug: string;
  lastModified: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category?: string;
}

interface Template {
  id: string;
  slug: string;
  lastModified: string;
  category: string;
  preview?: string;
}

export class EnhancedSitemapGenerator extends SitemapGenerator {
  
  // Add blog posts with enhanced metadata
  addEnhancedBlogPosts(posts: BlogPost[]): void {
    posts.forEach(post => {
      this.urls.push({
        loc: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: post.lastModified,
        images: post.images?.map(img => ({
          loc: img,
          title: `Blog post image - ${post.slug}`,
          caption: `AI art blog illustration about ${post.category || 'AI techniques'}`
        }))
      });
    });
  }

  // Add tutorials with difficulty-based priority
  addEnhancedTutorials(tutorials: Tutorial[]): void {
    tutorials.forEach(tutorial => {
      const priority = tutorial.difficulty === 'Beginner' ? 0.8 : 
                      tutorial.difficulty === 'Intermediate' ? 0.7 : 0.6;
      
      this.urls.push({
        loc: `/tutorials/${tutorial.slug}`,
        changefreq: 'monthly',
        priority,
        lastmod: tutorial.lastModified
      });
    });
  }

  // Add template pages with categories
  addTemplatePages(templates: Template[]): void {
    // Add main templates page
    this.urls.push({
      loc: '/templates',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0]
    });

    // Add individual template pages
    templates.forEach(template => {
      this.urls.push({
        loc: `/templates/${template.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: template.lastModified,
        images: template.preview ? [{
          loc: template.preview,
          title: `Template preview - ${template.slug}`,
          caption: `AI art template for ${template.category}`
        }] : undefined
      });
    });

    // Add category pages
    const categories = [...new Set(templates.map(t => t.category))];
    categories.forEach(category => {
      this.urls.push({
        loc: `/templates/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString().split('T')[0]
      });
    });
  }

  // Add core product and feature pages
  addCoreProductPages(): void {
    const pages = [
      { path: '/product', priority: 0.9, lastmod: '2025-06-15' },
      { path: '/ai-templates', priority: 0.8, lastmod: '2025-06-15' },
      { path: '/style-gallery', priority: 0.8, lastmod: '2025-06-15' },
      { path: '/batch-generator', priority: 0.8, lastmod: '2025-06-15' },
      { path: '/ai-upscaler', priority: 0.8, lastmod: '2025-06-15' },
      { path: '/prompt-guide', priority: 0.7, lastmod: '2025-06-15' },
      { path: '/video-tutorials', priority: 0.7, lastmod: '2025-06-15' },
      { path: '/whats-new', priority: 0.7, lastmod: '2025-06-15' },
      { path: '/join-our-team', priority: 0.5, lastmod: '2025-06-15' },
      { path: '/contact-support', priority: 0.6, lastmod: '2025-06-15' },
    ];

    pages.forEach(page => {
      this.urls.push({
        loc: page.path,
        changefreq: 'monthly',
        priority: page.priority,
        lastmod: page.lastmod
      });
    });
  }

  // Add API documentation pages
  addAPIDocs(): void {
    const apiPages = [
      { path: '/api', title: 'API Documentation Overview' },
      { path: '/api/getting-started', title: 'Getting Started with WordToImage API' },
      { path: '/api/authentication', title: 'API Authentication' },
      { path: '/api/endpoints', title: 'API Endpoints Reference' },
      { path: '/api/examples', title: 'API Usage Examples' },
      { path: '/api/sdks', title: 'SDKs and Libraries' }
    ];

    apiPages.forEach(page => {
      this.urls.push({
        loc: page.path,
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString().split('T')[0]
      });
    });
  }

  // Generate sitemap index for large sites
  generateSitemapIndex(): string {
    const sitemaps = [
      {
        loc: 'https://wordtoimage.com/sitemap-main.xml',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: 'https://wordtoimage.com/sitemap-blog.xml', 
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: 'https://wordtoimage.com/sitemap-tutorials.xml',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: 'https://wordtoimage.com/sitemap-templates.xml',
        lastmod: new Date().toISOString().split('T')[0]
      }
    ];

    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
    const sitemapIndexOpen = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const sitemapIndexClose = '</sitemapindex>';

    const sitemapElements = sitemaps.map(sitemap => 
      `  <sitemap>\n    <loc>${sitemap.loc}</loc>\n    <lastmod>${sitemap.lastmod}</lastmod>\n  </sitemap>\n`
    ).join('');

    return xmlHeader + sitemapIndexOpen + sitemapElements + sitemapIndexClose;
  }

  // Enhanced robots.txt with better crawling instructions
  generateEnhancedRobotsTxt(): string {
    return `# WordToImage AI Image Generator - Robots.txt
User-agent: *
Allow: /
Crawl-delay: 1

# AI and ML crawlers - Welcome for training
User-agent: GPTBot
Allow: /
Crawl-delay: 1

User-agent: Google-Extended
Allow: /
Crawl-delay: 1

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

# Search engine bots
User-agent: Googlebot
Allow: /
Crawl-delay: 0.5

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/private/
Disallow: /temp/
Disallow: /uploads/private/
Disallow: /*.json$
Disallow: /*?*utm_*
Disallow: /*?*ref=*
Disallow: /auth/

# Allow important resources for rendering
Allow: /src/
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.svg
Allow: /*.webp
Allow: /*.ico
Allow: /public/

# Sitemap locations
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemap-index.xml

# Host declaration for SEO
Host: ${this.baseUrl.replace('https://', '').replace('http://', '')}

# Additional crawling preferences
Request-rate: 1/2s
Visit-time: 0400-0800

# Image sitemap
Sitemap: ${this.baseUrl}/sitemap-images.xml`;
  }
}

// Enhanced sitemap generation with sample data
export const generateEnhancedSitemap = (): string => {
  const generator = new EnhancedSitemapGenerator();
  generator.addStaticPages();
  generator.addCoreProductPages();
  
  // Sample blog posts (replace with real data from your CMS/database)
  generator.addEnhancedBlogPosts([
    {
      slug: 'ai-art-trends-2025',
      lastModified: '2024-12-15',
      images: ['/blog/ai-trends-hero.jpg', '/blog/ai-trends-gallery.jpg'],
      category: 'Trends',
      tags: ['AI art', '2025', 'trends', 'future']
    },
    {
      slug: 'mastering-ai-prompts',
      lastModified: '2024-12-10',
      images: ['/blog/prompts-guide.jpg'],
      category: 'Tutorial',
      tags: ['prompts', 'guide', 'AI', 'techniques']
    },
    {
      slug: 'commercial-ai-art-guide',
      lastModified: '2024-12-08',
      images: ['/blog/commercial-art.jpg'],
      category: 'Business',
      tags: ['commercial', 'business', 'licensing', 'AI art']
    }
  ]);

  // Sample tutorials
  generator.addEnhancedTutorials([
    {
      slug: 'getting-started-ai-art',
      lastModified: '2024-12-12',
      difficulty: 'Beginner',
      category: 'Basics'
    },
    {
      slug: 'advanced-prompting-techniques',
      lastModified: '2024-12-05',
      difficulty: 'Advanced',
      category: 'Prompting'
    },
    {
      slug: 'style-mixing-masterclass',
      lastModified: '2024-12-01',
      difficulty: 'Intermediate',
      category: 'Styling'
    }
  ]);

  // Sample templates
  generator.addTemplatePages([
    {
      id: '1',
      slug: 'social-media-posts',
      lastModified: '2024-12-14',
      category: 'Social Media',
      preview: '/templates/social-media-preview.jpg'
    },
    {
      id: '2', 
      slug: 'marketing-banners',
      lastModified: '2024-12-13',
      category: 'Marketing',
      preview: '/templates/marketing-preview.jpg'
    },
    {
      id: '3',
      slug: 'artistic-portraits',
      lastModified: '2024-12-11',
      category: 'Art',
      preview: '/templates/portraits-preview.jpg'
    }
  ]);

  generator.addAPIDocs();
  
  return generator.generateXML();
};

export const generateEnhancedRobotsTxt = (): string => {
  const generator = new EnhancedSitemapGenerator();
  return generator.generateEnhancedRobotsTxt();
};

export const generateSitemapIndex = (): string => {
  const generator = new EnhancedSitemapGenerator();
  return generator.generateSitemapIndex();
};
