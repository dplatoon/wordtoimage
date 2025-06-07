
// Advanced SEO sitemap generator with dynamic content support

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
}

export class SitemapGenerator {
  protected baseUrl: string;
  protected urls: SitemapUrl[] = [];

  constructor(baseUrl: string = 'https://wordtoimage.com') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  // Add static pages
  addStaticPages(): void {
    const staticPages: SitemapUrl[] = [
      {
        loc: '/',
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString().split('T')[0],
        images: [
          {
            loc: '/hero-ai-generator.jpg',
            title: 'WordToImage AI Image Generator Interface',
            caption: 'AI-powered text-to-image generation tool'
          }
        ]
      },
      {
        loc: '/text-to-image',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/features',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/pricing',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/templates',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/blog',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/tutorials',
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/design-tips',
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/help',
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/api',
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/about',
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/contact',
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/community',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString().split('T')[0]
      }
    ];

    this.urls.push(...staticPages);
  }

  // Add blog posts dynamically
  addBlogPosts(posts: Array<{ slug: string; lastModified: string; images?: string[] }>): void {
    posts.forEach(post => {
      this.urls.push({
        loc: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: post.lastModified,
        images: post.images?.map(img => ({
          loc: img,
          title: `Blog post image - ${post.slug}`,
          caption: 'AI art blog post illustration'
        }))
      });
    });
  }

  // Add tutorial pages
  addTutorials(tutorials: Array<{ slug: string; lastModified: string }>): void {
    tutorials.forEach(tutorial => {
      this.urls.push({
        loc: `/tutorials/${tutorial.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: tutorial.lastModified
      });
    });
  }

  // Generate XML sitemap
  generateXML(): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
    const urlsetClose = '</urlset>';

    const urlElements = this.urls.map(url => {
      let urlXml = '  <url>\n';
      urlXml += `    <loc>${this.baseUrl}${url.loc}</loc>\n`;
      
      if (url.lastmod) {
        urlXml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      
      if (url.changefreq) {
        urlXml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      }
      
      if (url.priority) {
        urlXml += `    <priority>${url.priority}</priority>\n`;
      }

      // Add image information
      if (url.images && url.images.length > 0) {
        url.images.forEach(image => {
          urlXml += '    <image:image>\n';
          urlXml += `      <image:loc>${this.baseUrl}${image.loc}</image:loc>\n`;
          if (image.title) {
            urlXml += `      <image:title>${this.escapeXml(image.title)}</image:title>\n`;
          }
          if (image.caption) {
            urlXml += `      <image:caption>${this.escapeXml(image.caption)}</image:caption>\n`;
          }
          urlXml += '    </image:image>\n';
        });
      }

      urlXml += '  </url>\n';
      return urlXml;
    }).join('');

    return xmlHeader + urlsetOpen + urlElements + urlsetClose;
  }

  // Escape XML special characters
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  // Generate robots.txt content
  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /
Crawl-delay: 1

# AI crawlers
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ChatGPT-User
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/private/
Disallow: /temp/
Disallow: /*.json$

# Allow important resources
Allow: /src/
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.svg
Allow: /*.webp

# Sitemap location
Sitemap: ${this.baseUrl}/sitemap.xml

# Host declaration
Host: ${this.baseUrl.replace('https://', '').replace('http://', '')}`;
  }
}

// Usage example
export const generateSitemap = (): string => {
  const generator = new SitemapGenerator();
  generator.addStaticPages();
  
  // Add example blog posts (in a real app, fetch from your CMS/database)
  generator.addBlogPosts([
    {
      slug: 'ai-art-trends-2025',
      lastModified: '2024-12-15',
      images: ['/blog/ai-trends-hero.jpg']
    },
    {
      slug: 'prompting-mastery-guide',
      lastModified: '2024-12-10',
      images: ['/blog/prompting-guide.jpg']
    }
  ]);
  
  return generator.generateXML();
};

export const generateRobotsTxt = (): string => {
  const generator = new SitemapGenerator();
  return generator.generateRobotsTxt();
};
