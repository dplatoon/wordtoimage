interface SEOPageConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  structuredData?: object;
  canonical?: string;
  noindex?: boolean;
  hreflang?: { [key: string]: string };
  h1?: string;
  h2Headings?: string[];
}

export const PAGE_SEO_CONFIG: Record<string, SEOPageConfig> = {
  '/': {
    title: 'AI Image Generator – Transform Words into Stunning Images | WordToImage',
    description: 'Instantly create beautiful AI-generated images from your text prompts. Easy, powerful, and free to try. Join 50,000+ creators using AI to transform ideas into professional visuals.',
    keywords: ['AI image generator', 'text to image AI', 'AI art generator', 'create AI images from text', 'free AI image maker', 'AI graphics generator', 'text-to-image converter'],
    ogImage: 'https://wordtoimage.com/og-ai-generator.jpg',
    canonical: 'https://wordtoimage.com/',
    h1: 'Create Stunning Images from Any Text in Seconds',
    h2Headings: ['How AI Image Generation Works', 'Why Choose WordToImage', 'Start Creating Today'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "WordToImage - AI Image Generator",
      "description": "AI-powered text-to-image generator",
      "url": "https://wordtoimage.com",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web Browser"
    }
  },
  '/text-to-image': {
    title: 'AI Text to Image Generator - Create Images from Text | WordToImage',
    description: 'Generate high-quality images from text descriptions using advanced AI. Create artwork, social media content, and marketing visuals instantly with our powerful text-to-image generator.',
    keywords: ['text to image generator', 'AI image creation', 'text to art', 'prompt to image', 'AI visual generator', 'create images from text'],
    ogImage: 'https://wordtoimage.com/og-text-to-image.jpg',
    canonical: 'https://wordtoimage.com/text-to-image',
    h1: 'AI Text to Image Generator',
    h2Headings: ['How to Create AI Images', 'Choose Your Style', 'Generate & Download']
  },
  '/dashboard': {
    title: 'AI Image Dashboard - Manage Your Generated Images | WordToImage',
    description: 'Access your AI-generated image gallery, manage projects, and track your creative journey with WordToImage dashboard.',
    keywords: ['AI image dashboard', 'image gallery', 'AI art management', 'generated images'],
    ogImage: 'https://wordtoimage.com/og-dashboard.jpg',
    canonical: 'https://wordtoimage.com/dashboard'
  },
  '/features': {
    title: 'AI Image Generator Features - Advanced Text to Image Technology | WordToImage',
    description: 'Explore powerful AI image generation features: 50+ styles, 4K resolution, batch generation, commercial rights, and more. See what makes WordToImage the best AI art tool.',
    keywords: ['AI image features', 'text to image capabilities', 'AI art tools', 'image generation technology'],
    ogImage: 'https://wordtoimage.com/og-features.jpg',
    canonical: 'https://wordtoimage.com/features'
  },
  '/pricing': {
    title: 'AI Image Generator Pricing - Free & Pro Plans | WordToImage',
    description: 'Affordable AI image generation pricing. Start free with daily credits or upgrade to Pro for unlimited generations. Commercial use included in all plans.',
    keywords: ['AI image generator pricing', 'text to image cost', 'AI art subscription', 'image generation plans', 'free AI image maker'],
    ogImage: 'https://wordtoimage.com/og-pricing.jpg',
    canonical: 'https://wordtoimage.com/pricing',
    h1: 'Simple, Transparent Pricing',
    h2Headings: ['Choose Your Plan', 'Free vs Pro Features', 'Frequently Asked Questions']
  },
  '/templates': {
    title: 'AI Image Templates – Professional Designs & Styles | WordToImage',
    description: 'Browse professional AI image templates for social media, marketing, and creative projects. Ready-to-use AI art templates with commercial rights included.',
    keywords: ['AI image templates', 'AI art templates', 'social media templates', 'marketing templates', 'professional AI designs'],
    ogImage: 'https://wordtoimage.com/og-templates.jpg',
    canonical: 'https://wordtoimage.com/templates',
    h1: 'Professional AI Image Templates',
    h2Headings: ['Social Media Templates', 'Marketing Templates', 'Creative Templates', 'How to Use Templates']
  },
  '/style-gallery': {
    title: 'AI Art Styles Gallery – Inspiring AI-Generated Art Examples | WordToImage',
    description: 'Discover popular AI-generated art styles and create your own images effortlessly. Browse 50+ artistic styles from photorealistic to anime, watercolor to cyberpunk.',
    keywords: ['AI art styles', 'AI art gallery', 'image generation styles', 'artistic styles', 'digital art styles', 'AI art examples', 'photorealistic style AI', 'anime style generator'],
    ogImage: 'https://wordtoimage.com/og-styles.jpg',
    canonical: 'https://wordtoimage.com/style-gallery',
    h1: 'AI Art Styles Gallery – 50+ Inspiring Styles',
    h2Headings: ['Popular Art Styles', 'Photorealistic Styles', 'Artistic & Creative Styles', 'How to Use Styles']
  },
  '/batch-generator': {
    title: 'Batch AI Image Generator - Generate Multiple Images at Once | WordToImage',
    description: 'Generate multiple AI images simultaneously with our batch generator. Perfect for creating image collections, testing prompts, and bulk image creation.',
    keywords: ['batch AI image generator', 'bulk image generation', 'multiple AI images', 'batch text to image', 'bulk AI art creation'],
    ogImage: 'https://wordtoimage.com/og-batch.jpg',
    canonical: 'https://wordtoimage.com/batch-generator'
  },
  '/contact-support': {
    title: 'Contact Support - Get Help with WordToImage',
    description: 'Get support for WordToImage. Contact our team for technical help, billing questions, or general inquiries. Fast response times guaranteed.',
    keywords: ['WordToImage support', 'customer service', 'technical help', 'billing support', 'contact us'],
    ogImage: 'https://wordtoimage.com/og-support.jpg',
    canonical: 'https://wordtoimage.com/contact-support'
  },
  '/blog': {
    title: 'AI Art Blog – Latest Tips, Tutorials & News | WordToImage',
    description: 'Learn AI art techniques, discover prompting tips, and stay updated with the latest AI image generation trends, tutorials, and industry news.',
    keywords: ['AI art blog', 'AI image tutorials', 'text to image tips', 'AI art news', 'prompting techniques', 'AI art trends'],
    ogImage: 'https://wordtoimage.com/og-blog.jpg',
    canonical: 'https://wordtoimage.com/blog',
    h1: 'AI Art Blog & Resources',
    h2Headings: ['Latest Articles', 'Tutorial Guides', 'Industry News', 'Tips & Techniques']
  },
  '/help': {
    title: 'Help & Support - AI Image Generator Guide | WordToImage',
    description: 'Get help with AI image generation. Find answers to common questions, troubleshooting guides, and support resources.',
    keywords: ['AI image help', 'support', 'troubleshooting', 'FAQ', 'AI art guide'],
    ogImage: 'https://wordtoimage.com/og-help.jpg',
    canonical: 'https://wordtoimage.com/help'
  },
  '/about': {
    title: 'About WordToImage - Leading AI Image Generation Platform',
    description: 'Learn about WordToImage, the leading AI-powered text-to-image generation platform. Our mission to democratize AI art creation.',
    keywords: ['about WordToImage', 'AI company', 'image generation platform', 'AI art technology'],
    ogImage: 'https://wordtoimage.com/og-about.jpg',
    canonical: 'https://wordtoimage.com/about'
  },
  '/contact': {
    title: 'Contact Us - AI Image Generator Support | WordToImage',
    description: 'Contact WordToImage for support, partnerships, or questions about our AI image generation platform. Get in touch with our team.',
    keywords: ['contact WordToImage', 'AI image support', 'customer service', 'partnerships'],
    ogImage: 'https://wordtoimage.com/og-contact.jpg',
    canonical: 'https://wordtoimage.com/contact'
  },
  '/privacy': {
    title: 'Privacy Policy - Data Protection & Privacy | WordToImage',
    description: 'Read WordToImage privacy policy to understand how we protect your data and respect your privacy while using our AI services.',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'privacy rights'],
    ogImage: 'https://wordtoimage.com/og-privacy.jpg',
    canonical: 'https://wordtoimage.com/privacy'
  },
  '/terms': {
    title: 'Terms of Service - Usage Agreement | WordToImage',
    description: 'Review WordToImage terms of service and usage agreement for our AI image generation platform and services.',
    keywords: ['terms of service', 'usage agreement', 'legal terms', 'service terms'],
    ogImage: 'https://wordtoimage.com/og-terms.jpg',
    canonical: 'https://wordtoimage.com/terms'
  },
  '/cookies': {
    title: 'Cookie Policy - How We Use Cookies | WordToImage',
    description: 'Learn about how WordToImage uses cookies to improve your experience on our AI image generation platform.',
    keywords: ['cookie policy', 'cookies', 'tracking', 'website cookies'],
    ogImage: 'https://wordtoimage.com/og-cookies.jpg',
    canonical: 'https://wordtoimage.com/cookies'
  },
  '/product': {
    title: 'AI Image Generation Product - WordToImage Platform Features',
    description: 'Discover WordToImage\'s complete AI image generation platform. Advanced text-to-image technology, batch processing, upscaling, and professional tools.',
    keywords: ['AI image generation platform', 'text to image product', 'AI art tools', 'batch image generation'],
    ogImage: 'https://wordtoimage.com/og-product.jpg',
    canonical: 'https://wordtoimage.com/product'
  },
  '/beta': {
    title: 'Beta Features - Early Access to AI Tools | WordToImage',
    description: 'Get early access to cutting-edge AI image generation features. Join our beta program and help shape the future of AI art.',
    keywords: ['AI beta', 'early access', 'beta features', 'AI testing'],
    ogImage: 'https://wordtoimage.com/og-beta.jpg',
    canonical: 'https://wordtoimage.com/beta'
  },
  '/beta-landing': {
    title: 'Beta Program - Join Early Access | WordToImage',
    description: 'Sign up for WordToImage beta program and get exclusive access to new AI features before they launch.',
    keywords: ['beta signup', 'early access program', 'AI beta testing', 'exclusive features'],
    ogImage: 'https://wordtoimage.com/og-beta-landing.jpg',
    canonical: 'https://wordtoimage.com/beta-landing'
  },
  '/api': {
    title: 'AI Image API Documentation - Developer Resources | WordToImage',
    description: 'Integrate AI image generation into your applications with WordToImage API. Complete documentation, examples, and SDKs.',
    keywords: ['AI image API', 'text to image API', 'developer tools', 'API documentation'],
    ogImage: 'https://wordtoimage.com/og-api.jpg',
    canonical: 'https://wordtoimage.com/api'
  },
  '/community': {
    title: 'AI Art Community – Share & Discover Amazing Creations | WordToImage',
    description: 'Join the WordToImage community to share AI art, get inspiration, and connect with other AI artists and creators. Discover amazing AI-generated artwork.',
    keywords: ['AI art community', 'AI art gallery', 'share AI images', 'AI artist community', 'AI art inspiration'],
    ogImage: 'https://wordtoimage.com/og-community.jpg',
    canonical: 'https://wordtoimage.com/community',
    h1: 'AI Art Community',
    h2Headings: ['Featured Creations', 'Community Gallery', 'Artist Spotlights', 'Join the Community']
  },
  '/tutorials': {
    title: 'AI Image Generation Tutorials – Step-by-Step Guides | WordToImage',
    description: 'Master AI image generation with our comprehensive tutorials. Learn prompting techniques, style selection, and advanced AI art creation methods.',
    keywords: ['AI image tutorials', 'text to image guide', 'AI art tutorials', 'prompting guide', 'AI art techniques'],
    ogImage: 'https://wordtoimage.com/og-tutorials.jpg',
    canonical: 'https://wordtoimage.com/tutorials',
    h1: 'AI Image Generation Tutorials',
    h2Headings: ['Getting Started', 'Advanced Prompting Techniques', 'Style Selection Guide', 'Pro Tips & Tricks']
  },
  '/design-tips': {
    title: 'AI Art Design Tips – Professional Visual Creation Guide | WordToImage',
    description: 'Professional design tips for AI-generated images. Learn composition, color theory, and visual principles for stunning AI artwork.',
    keywords: ['AI art design tips', 'AI image composition', 'visual design AI', 'AI art principles'],
    ogImage: 'https://wordtoimage.com/og-design-tips.jpg',
    canonical: 'https://wordtoimage.com/design-tips'
  },
  '/updates': {
    title: 'Latest Updates – New AI Features & Improvements | WordToImage',
    description: 'Stay updated with the latest AI image generation features, improvements, and announcements from WordToImage.',
    keywords: ['AI updates', 'new features', 'product updates', 'AI improvements'],
    ogImage: 'https://wordtoimage.com/og-updates.jpg',
    canonical: 'https://wordtoimage.com/updates'
  },
  '/careers': {
    title: 'Careers – Join the AI Revolution | WordToImage',
    description: 'Join WordToImage and help build the future of AI image generation. Explore career opportunities in AI, engineering, and design.',
    keywords: ['AI careers', 'jobs', 'AI engineer jobs', 'machine learning careers'],
    ogImage: 'https://wordtoimage.com/og-careers.jpg',
    canonical: 'https://wordtoimage.com/careers'
  }
};

export type { SEOPageConfig };
