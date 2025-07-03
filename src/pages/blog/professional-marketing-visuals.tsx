import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BlogPostTemplate } from '@/components/content/BlogPostTemplate';
import { Button } from '@/components/ui/button';
import { InternalLink } from '@/components/seo/InternalLink';

const ProfessionalMarketingVisuals = () => {
  const blogData = {
    title: "Creating Professional Marketing Visuals with AI",
    excerpt: "Discover how businesses are using AI-generated images to create compelling marketing materials and boost engagement.",
    author: {
      name: "Emma Thompson",
      avatar: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png"
    },
    publishDate: "2025-01-10",
    readTime: "5 min read",
    category: "Business",
    tags: ["Marketing", "Business", "AI Images", "Professional"],
    image: "/lovable-uploads/2eae8e86-b21c-42da-a038-310ef938fe38.png",
    slug: "professional-marketing-visuals"
  };

  const content = `
    <div class="prose prose-lg max-w-none">
      <p class="text-xl leading-relaxed mb-8">
        Discover how businesses are using AI-generated images to create compelling marketing materials and boost engagement. 
        From social media campaigns to professional presentations, AI is revolutionizing marketing visual creation.
      </p>

      <h2 class="text-3xl font-bold mt-12 mb-6">AI in Marketing Strategy</h2>
      <p class="mb-6">
        Modern marketing teams are leveraging AI image generation to create consistent, high-quality visuals that align 
        with their brand identity and resonate with their target audience.
      </p>

      <h2 class="text-3xl font-bold mt-12 mb-6">Best Practices</h2>
      <p class="mb-8">
        Learn the proven strategies that successful businesses use to create effective marketing visuals with AI technology.
      </p>
    </div>
  `;

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <BlogPostTemplate {...blogData} content={content} />
      
      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div className="text-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Elevate Your Marketing Visuals</h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Create professional marketing materials that drive results with WordToImage.com.
          </p>
          <Button asChild size="lg" variant="secondary">
            <InternalLink to="/">Create Marketing Visuals</InternalLink>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfessionalMarketingVisuals;