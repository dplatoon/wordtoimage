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
    ogImage: 'https://wordtoimage.online/og-ai-generator.jpg',
    canonical: 'https://wordtoimage.online/',
    h1: 'Create Stunning Images from Any Text in Seconds',
    h2Headings: ['How AI Image Generation Works', 'Why Choose WordToImage', 'Start Creating Today'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "WordToImage - AI Image Generator",
      "description": "AI-powered text-to-image generator",
      "url": "https://wordtoimage.online",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web Browser"
    }
  },
  '/text-to-image': {
    title: 'AI Text to Image Generator - Create Images from Text | WordToImage',
    description: 'Generate high-quality images from text descriptions using advanced AI. Create artwork, social media content, and marketing visuals instantly with our powerful text-to-image generator.',
    keywords: ['text to image generator', 'AI image creation', 'text to art', 'prompt to image', 'AI visual generator', 'create images from text'],
    ogImage: 'https://wordtoimage.online/og-text-to-image.jpg',
    canonical: 'https://wordtoimage.online/text-to-image',
    h1: 'AI Text to Image Generator',
    h2Headings: ['How to Create AI Images', 'Choose Your Style', 'Generate & Download']
  },
  '/dashboard': {
    title: 'AI Image Dashboard - Manage Your Generated Images | WordToImage',
    description: 'Access your AI-generated image gallery, manage projects, and track your creative journey with WordToImage dashboard.',
    keywords: ['AI image dashboard', 'image gallery', 'AI art management', 'generated images'],
    ogImage: 'https://wordtoimage.online/og-dashboard.jpg',
    canonical: 'https://wordtoimage.online/dashboard'
  },
  '/features': {
    title: 'AI Image Generator Features - Advanced Text to Image Technology | WordToImage',
    description: 'Explore powerful AI image generation features: 50+ styles, 4K resolution, batch generation, commercial rights, and more. See what makes WordToImage the best AI art tool.',
    keywords: ['AI image features', 'text to image capabilities', 'AI art tools', 'image generation technology'],
    ogImage: 'https://wordtoimage.online/og-features.jpg',
    canonical: 'https://wordtoimage.online/features'
  },
  '/pricing': {
    title: 'AI Image Generator Pricing - Free & Pro Plans | WordToImage',
    description: 'Affordable AI image generation pricing. Start free with daily credits or upgrade to Pro for unlimited generations. Commercial use included in all plans.',
    keywords: ['AI image generator pricing', 'text to image cost', 'AI art subscription', 'image generation plans', 'free AI image maker'],
    ogImage: 'https://wordtoimage.online/og-pricing.jpg',
    canonical: 'https://wordtoimage.online/pricing',
    h1: 'Simple, Transparent Pricing',
    h2Headings: ['Choose Your Plan', 'Free vs Pro Features', 'Frequently Asked Questions']
  },
  '/templates': {
    title: 'AI Image Templates – Professional Designs & Styles | WordToImage',
    description: 'Browse professional AI image templates for social media, marketing, and creative projects. Ready-to-use AI art templates with commercial rights included.',
    keywords: ['AI image templates', 'AI art templates', 'social media templates', 'marketing templates', 'professional AI designs'],
    ogImage: 'https://wordtoimage.online/og-templates.jpg',
    canonical: 'https://wordtoimage.online/templates',
    h1: 'Professional AI Image Templates',
    h2Headings: ['Social Media Templates', 'Marketing Templates', 'Creative Templates', 'How to Use Templates']
  },
  '/style-gallery': {
    title: 'AI Art Styles Gallery – Inspiring AI-Generated Art Examples | WordToImage',
    description: 'Discover popular AI-generated art styles and create your own images effortlessly. Browse 50+ artistic styles from photorealistic to anime, watercolor to cyberpunk.',
    keywords: ['AI art styles', 'AI art gallery', 'image generation styles', 'artistic styles', 'digital art styles', 'AI art examples', 'photorealistic style AI', 'anime style generator'],
    ogImage: 'https://wordtoimage.online/og-styles.jpg',
    canonical: 'https://wordtoimage.online/style-gallery',
    h1: 'AI Art Styles Gallery – 50+ Inspiring Styles',
    h2Headings: ['Popular Art Styles', 'Photorealistic Styles', 'Artistic & Creative Styles', 'How to Use Styles']
  },
  '/batch-generator': {
    title: 'Batch AI Image Generator - Generate Multiple Images at Once | WordToImage',
    description: 'Generate multiple AI images simultaneously with our batch generator. Perfect for creating image collections, testing prompts, and bulk image creation.',
    keywords: ['batch AI image generator', 'bulk image generation', 'multiple AI images', 'batch text to image', 'bulk AI art creation'],
    ogImage: 'https://wordtoimage.online/og-batch.jpg',
    canonical: 'https://wordtoimage.online/batch-generator'
  },
  '/contact-support': {
    title: 'Contact Support - Get Help with WordToImage',
    description: 'Get support for WordToImage. Contact our team for technical help, billing questions, or general inquiries. Fast response times guaranteed.',
    keywords: ['WordToImage support', 'customer service', 'technical help', 'billing support', 'contact us'],
    ogImage: 'https://wordtoimage.online/og-support.jpg',
    canonical: 'https://wordtoimage.online/contact-support'
  },
  '/blog': {
    title: 'AI Art Blog – Latest Tips, Tutorials & News | WordToImage',
    description: 'Learn AI art techniques, discover prompting tips, and stay updated with the latest AI image generation trends, tutorials, and industry news.',
    keywords: ['AI art blog', 'AI image tutorials', 'text to image tips', 'AI art news', 'prompting techniques', 'AI art trends'],
    ogImage: 'https://wordtoimage.online/og-blog.jpg',
    canonical: 'https://wordtoimage.online/blog',
    h1: 'AI Art Blog & Tutorials',
    h2Headings: ['Latest Articles', 'Popular Tutorials', 'AI Art Tips & Tricks']
  },
  '/help': {
    title: 'Help Center - WordToImage Guide & FAQ',
    description: 'Find answers to common questions, learn how to use WordToImage effectively, and get tips for creating better AI-generated images.',
    keywords: ['WordToImage help', 'AI image generator FAQ', 'how to use AI art', 'text to image guide', 'troubleshooting'],
    ogImage: 'https://wordtoimage.online/og-help.jpg',
    canonical: 'https://wordtoimage.online/help'
  },
  '/about': {
    title: 'About WordToImage - AI Image Generation Made Simple',
    description: 'Learn about WordToImage\'s mission to democratize AI art creation. Discover our story, team, and commitment to making AI image generation accessible to everyone.',
    keywords: ['about WordToImage', 'AI art company', 'text to image story', 'AI image generation team'],
    ogImage: 'https://wordtoimage.online/og-about.jpg',
    canonical: 'https://wordtoimage.online/about'
  },
  '/contact': {
    title: 'Contact WordToImage - Get in Touch',
    description: 'Contact WordToImage for partnerships, press inquiries, or general questions. We\'d love to hear from you and help with your AI image generation needs.',
    keywords: ['contact WordToImage', 'get in touch', 'partnerships', 'press inquiries', 'customer support'],
    ogImage: 'https://wordtoimage.online/og-contact.jpg',
    canonical: 'https://wordtoimage.online/contact'
  },
  '/privacy': {
    title: 'Privacy Policy - WordToImage',
    description: 'Read WordToImage\'s privacy policy to understand how we collect, use, and protect your personal information and generated images.',
    keywords: ['privacy policy', 'data protection', 'user privacy', 'WordToImage privacy'],
    ogImage: 'https://wordtoimage.online/og-privacy.jpg',
    canonical: 'https://wordtoimage.online/privacy'
  },
  '/terms': {
    title: 'Terms of Service - WordToImage',
    description: 'Review WordToImage\'s terms of service, including usage rights, commercial licensing, and platform guidelines for AI image generation.',
    keywords: ['terms of service', 'usage terms', 'commercial rights', 'WordToImage terms'],
    ogImage: 'https://wordtoimage.online/og-terms.jpg',
    canonical: 'https://wordtoimage.online/terms'
  },
  '/cookies': {
    title: 'Cookie Policy - WordToImage',
    description: 'Learn about WordToImage\'s cookie usage, including essential cookies, analytics, and personalization features for enhanced user experience.',
    keywords: ['cookie policy', 'website cookies', 'tracking', 'user experience'],
    ogImage: 'https://wordtoimage.online/og-cookies.jpg',
    canonical: 'https://wordtoimage.online/cookies'
  },
  '/product': {
    title: 'WordToImage Product - AI Image Generation Platform',
    description: 'Explore WordToImage\'s comprehensive AI image generation platform with advanced features, multiple styles, and professional tools.',
    keywords: ['AI image platform', 'product features', 'image generation tools', 'AI art platform'],
    ogImage: 'https://wordtoimage.online/og-product.jpg',
    canonical: 'https://wordtoimage.online/product'
  },
  '/beta': {
    title: 'Beta Features - Try WordToImage\'s Latest AI Tools',
    description: 'Get early access to WordToImage\'s newest AI image generation features and help shape the future of AI art creation.',
    keywords: ['beta features', 'early access', 'new AI tools', 'experimental features'],
    ogImage: 'https://wordtoimage.online/og-beta.jpg',
    canonical: 'https://wordtoimage.online/beta'
  },
  '/beta-landing': {
    title: 'Join WordToImage Beta - Early Access to AI Features',
    description: 'Sign up for WordToImage beta to access cutting-edge AI image generation features before they\'re released to the public.',
    keywords: ['beta signup', 'early access program', 'beta testing', 'new features'],
    ogImage: 'https://wordtoimage.online/og-beta-landing.jpg',
    canonical: 'https://wordtoimage.online/beta-landing'
  },
  '/api': {
    title: 'WordToImage API - Integrate AI Image Generation',
    description: 'Integrate WordToImage\'s powerful AI image generation into your applications with our developer-friendly API.',
    keywords: ['AI image API', 'text to image API', 'developer tools', 'image generation API'],
    ogImage: 'https://wordtoimage.online/og-api.jpg',
    canonical: 'https://wordtoimage.online/api'
  },
  '/community': {
    title: 'WordToImage Community - Share & Discover AI Art',
    description: 'Join the WordToImage community to share your AI-generated artwork, discover inspiration, and connect with fellow creators.',
    keywords: ['AI art community', 'share artwork', 'AI creators', 'art inspiration'],
    ogImage: 'https://wordtoimage.online/og-community.jpg',
    canonical: 'https://wordtoimage.online/community',
    h1: 'Join Our Creative Community',
    h2Headings: ['Featured Artwork', 'Community Guidelines', 'Share Your Creations']
  },
  '/tutorials': {
    title: 'AI Art Tutorials - Learn to Create Better Images | WordToImage',
    description: 'Master AI image generation with our comprehensive tutorials. Learn prompting techniques, style selection, and advanced tips for creating stunning AI art.',
    keywords: ['AI art tutorials', 'prompting guide', 'AI image tips', 'text to image tutorial', 'AI art techniques'],
    ogImage: 'https://wordtoimage.online/og-tutorials.jpg',
    canonical: 'https://wordtoimage.online/tutorials',
    h1: 'Master AI Image Generation',
    h2Headings: ['Getting Started', 'Advanced Techniques', 'Style Guides', 'Pro Tips']
  },
  '/design-tips': {
    title: 'AI Design Tips - Create Professional Images | WordToImage',
    description: 'Learn professional design tips for AI image generation. Discover color theory, composition techniques, and style combinations for better results.',
    keywords: ['AI design tips', 'image composition', 'color theory AI', 'professional AI art', 'design principles'],
    ogImage: 'https://wordtoimage.online/og-design-tips.jpg',
    canonical: 'https://wordtoimage.online/design-tips'
  },
  '/updates': {
    title: 'WordToImage Updates - Latest Features & Improvements',
    description: 'Stay updated with WordToImage\'s latest features, improvements, and AI model updates. See what\'s new in AI image generation.',
    keywords: ['WordToImage updates', 'new features', 'AI improvements', 'platform updates'],
    ogImage: 'https://wordtoimage.online/og-updates.jpg',
    canonical: 'https://wordtoimage.online/updates'
  },
  '/careers': {
    title: 'Careers at WordToImage - Join Our AI Team',
    description: 'Join WordToImage\'s mission to democratize AI art creation. Explore career opportunities in AI, engineering, design, and more.',
    keywords: ['WordToImage careers', 'AI jobs', 'tech careers', 'join our team'],
    ogImage: 'https://wordtoimage.online/og-careers.jpg',
    canonical: 'https://wordtoimage.online/careers'
  }
};

export type { SEOPageConfig };