
interface SEOPageConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  structuredData?: object;
  canonical?: string;
  noindex?: boolean;
  hreflang?: { [key: string]: string };
}

export const PAGE_SEO_CONFIG: Record<string, SEOPageConfig> = {
  '/': {
    title: 'WordToImage - Best AI Image Generator | Create Stunning AI Art from Text in 2025',
    description: 'Transform text into stunning AI-generated images instantly. Best AI art generator for social media, marketing, and creative projects. Free AI image maker with 50+ styles.',
    keywords: ['AI image generator', 'text to image AI', 'AI art generator', 'artificial intelligence image creation', 'machine learning art', 'free AI image maker'],
    ogImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&auto=format',
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
    description: 'Generate high-quality images from text descriptions using advanced AI. Create artwork, social media content, and marketing visuals instantly.',
    keywords: ['text to image generator', 'AI image creation', 'text to art', 'prompt to image', 'AI visual generator'],
    ogImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&auto=format'
  },
  '/dashboard': {
    title: 'AI Image Dashboard - Manage Your Generated Images | WordToImage',
    description: 'Access your AI-generated image gallery, manage projects, and track your creative journey with WordToImage dashboard.',
    keywords: ['AI image dashboard', 'image gallery', 'AI art management', 'generated images'],
    ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&auto=format'
  },
  '/features': {
    title: 'AI Image Generator Features - Advanced Text to Image Technology | WordToImage',
    description: 'Explore powerful AI image generation features: 50+ styles, 4K resolution, batch generation, commercial rights, and more. See what makes WordToImage the best AI art tool.',
    keywords: ['AI image features', 'text to image capabilities', 'AI art tools', 'image generation technology'],
    ogImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop&auto=format'
  },
  '/pricing': {
    title: 'AI Image Generator Pricing - Free & Pro Plans | WordToImage',
    description: 'Affordable AI image generation pricing. Start free with daily credits or upgrade to Pro for unlimited generations. Commercial use included.',
    keywords: ['AI image generator pricing', 'text to image cost', 'AI art subscription', 'image generation plans'],
    ogImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop&auto=format'
  },
  '/templates': {
    title: 'AI Image Templates - Professional Designs & Styles | WordToImage',
    description: 'Browse professional AI image templates for social media, marketing, and creative projects. Ready-to-use AI art templates with commercial rights.',
    keywords: ['AI image templates', 'AI art templates', 'social media templates', 'marketing templates'],
    ogImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=630&fit=crop&auto=format'
  },
  '/style-gallery': {
    title: 'AI Art Style Gallery - 50+ Artistic Styles | WordToImage',
    description: 'Explore our collection of AI art styles. From photorealistic to anime, watercolor to cyberpunk. Find the perfect style for your AI image generation.',
    keywords: ['AI art styles', 'image generation styles', 'artistic styles', 'AI art gallery', 'digital art styles', 'photorealistic style AI', 'anime style generator', 'cyberpunk art creator'],
    ogImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=630&fit=crop&auto=format'
  },
  '/batch-generator': {
    title: 'Batch AI Image Generator - Generate Multiple Images at Once | WordToImage',
    description: 'Generate multiple AI images simultaneously with our batch generator. Perfect for creating image collections, testing prompts, and bulk image creation.',
    keywords: ['batch AI image generator', 'bulk image generation', 'multiple AI images', 'batch text to image', 'bulk AI art creation'],
    ogImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=630&fit=crop&auto=format'
  },
  '/contact-support': {
    title: 'Contact Support - Get Help with WordToImage',
    description: 'Get support for WordToImage. Contact our team for technical help, billing questions, or general inquiries. Fast response times guaranteed.',
    keywords: ['WordToImage support', 'customer service', 'technical help', 'billing support', 'contact us'],
    ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop&auto=format'
  },
  '/blog': {
    title: 'AI Art Blog - Latest Tips, Tutorials & News | WordToImage',
    description: 'Learn AI art techniques, discover prompting tips, and stay updated with the latest AI image generation trends and tutorials.',
    keywords: ['AI art blog', 'AI image tutorials', 'text to image tips', 'AI art news', 'prompting techniques'],
    ogImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop&auto=format'
  },
  '/help': {
    title: 'Help & Support - AI Image Generator Guide | WordToImage',
    description: 'Get help with AI image generation. Find answers to common questions, troubleshooting guides, and support resources.',
    keywords: ['AI image help', 'support', 'troubleshooting', 'FAQ', 'AI art guide'],
    ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop&auto=format'
  },
  '/about': {
    title: 'About WordToImage - Leading AI Image Generation Platform',
    description: 'Learn about WordToImage, the leading AI-powered text-to-image generation platform. Our mission to democratize AI art creation.',
    keywords: ['about WordToImage', 'AI company', 'image generation platform', 'AI art technology'],
    ogImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop&auto=format'
  },
  '/contact': {
    title: 'Contact Us - AI Image Generator Support | WordToImage',
    description: 'Contact WordToImage for support, partnerships, or questions about our AI image generation platform. Get in touch with our team.',
    keywords: ['contact WordToImage', 'AI image support', 'customer service', 'partnerships'],
    ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop&auto=format'
  },
  '/privacy': {
    title: 'Privacy Policy - Data Protection & Privacy | WordToImage',
    description: 'Read WordToImage privacy policy to understand how we protect your data and respect your privacy while using our AI services.',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'privacy rights'],
    ogImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop&auto=format'
  },
  '/terms': {
    title: 'Terms of Service - Usage Agreement | WordToImage',
    description: 'Review WordToImage terms of service and usage agreement for our AI image generation platform and services.',
    keywords: ['terms of service', 'usage agreement', 'legal terms', 'service terms'],
    ogImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop&auto=format'
  },
  '/cookies': {
    title: 'Cookie Policy - How We Use Cookies | WordToImage',
    description: 'Learn about how WordToImage uses cookies to improve your experience on our AI image generation platform.',
    keywords: ['cookie policy', 'cookies', 'tracking', 'website cookies'],
    ogImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop&auto=format'
  },
  '/product': {
    title: 'AI Image Generation Product - WordToImage Platform Features',
    description: 'Discover WordToImage\'s complete AI image generation platform. Advanced text-to-image technology, batch processing, upscaling, and professional tools.',
    keywords: ['AI image generation platform', 'text to image product', 'AI art tools', 'batch image generation'],
    ogImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop&auto=format'
  },
  '/beta': {
    title: 'Beta Features - Early Access to AI Tools | WordToImage',
    description: 'Get early access to cutting-edge AI image generation features. Join our beta program and help shape the future of AI art.',
    keywords: ['AI beta', 'early access', 'beta features', 'AI testing'],
    ogImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&auto=format'
  },
  '/beta-landing': {
    title: 'Beta Program - Join Early Access | WordToImage',
    description: 'Sign up for WordToImage beta program and get exclusive access to new AI features before they launch.',
    keywords: ['beta signup', 'early access program', 'AI beta testing', 'exclusive features'],
    ogImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&auto=format'
  },
  '/api': {
    title: 'AI Image API Documentation - Developer Resources | WordToImage',
    description: 'Integrate AI image generation into your applications with WordToImage API. Complete documentation, examples, and SDKs.',
    keywords: ['AI image API', 'text to image API', 'developer tools', 'API documentation'],
    ogImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop&auto=format'
  },
  '/community': {
    title: 'AI Art Community - Share & Discover Amazing Creations | WordToImage',
    description: 'Join the WordToImage community to share AI art, get inspiration, and connect with other AI artists and creators.',
    keywords: ['AI art community', 'AI art gallery', 'share AI images', 'AI artist community'],
    ogImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=630&fit=crop&auto=format'
  },
  '/tutorials': {
    title: 'AI Image Generation Tutorials - Step-by-Step Guides | WordToImage',
    description: 'Master AI image generation with our comprehensive tutorials. Learn prompting techniques, style selection, and advanced AI art creation methods.',
    keywords: ['AI image tutorials', 'text to image guide', 'AI art tutorials', 'prompting guide'],
    ogImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop&auto=format'
  },
  '/design-tips': {
    title: 'AI Art Design Tips - Professional Visual Creation Guide | WordToImage',
    description: 'Professional design tips for AI-generated images. Learn composition, color theory, and visual principles for stunning AI artwork.',
    keywords: ['AI art design tips', 'AI image composition', 'visual design AI', 'AI art principles'],
    ogImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=630&fit=crop&auto=format'
  },
  '/updates': {
    title: 'Latest Updates - New AI Features & Improvements | WordToImage',
    description: 'Stay updated with the latest AI image generation features, improvements, and announcements from WordToImage.',
    keywords: ['AI updates', 'new features', 'product updates', 'AI improvements'],
    ogImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&auto=format'
  },
  '/careers': {
    title: 'Careers - Join the AI Revolution | WordToImage',
    description: 'Join WordToImage and help build the future of AI image generation. Explore career opportunities in AI, engineering, and design.',
    keywords: ['AI careers', 'jobs', 'AI engineer jobs', 'machine learning careers'],
    ogImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop&auto=format'
  }
};

export type { SEOPageConfig };
