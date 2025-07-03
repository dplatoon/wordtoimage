import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BlogPostTemplate } from '@/components/content/BlogPostTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { InternalLink } from '@/components/seo/InternalLink';

const MasteringAIArtPrompts = () => {
  const blogData = {
    title: "Mastering AI Art Prompts: A Complete Guide for 2025",
    excerpt: "Learn the secrets of writing effective prompts that generate stunning AI artwork. From basic techniques to advanced strategies.",
    author: {
      name: "Sarah Chen",
      avatar: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png"
    },
    publishDate: "2025-01-13",
    readTime: "8 min read",
    category: "Tutorial",
    tags: ["AI Prompts", "Tutorial", "AI Art", "Tips"],
    image: "/lovable-uploads/317dfa28-3425-4dac-a167-343034ee797b.png",
    slug: "mastering-ai-art-prompts"
  };

  const content = `
    <div class="prose prose-lg max-w-none">
      <p class="text-xl leading-relaxed mb-8">
        Learn the secrets of writing effective prompts that generate stunning AI artwork. From basic techniques to advanced strategies, 
        this comprehensive guide will transform your AI art generation skills and help you create exactly what you envision.
      </p>

      <h2 class="text-3xl font-bold mt-12 mb-6">The Art of Prompt Writing</h2>
      <p class="mb-6">
        Writing effective AI prompts is both an art and a science. The key is understanding how AI interprets language 
        and learning to communicate your vision clearly and precisely.
      </p>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
        <p class="font-semibold text-blue-900 mb-2">💡 Pro Tip:</p>
        <p class="text-blue-800">
          Start with clear, simple descriptions and gradually add details. Think of prompt writing as painting with words - 
          each adjective adds another layer of detail to your vision.
        </p>
      </div>

      <h2 class="text-3xl font-bold mt-12 mb-6">Advanced Prompting Techniques</h2>
      <p class="mb-8">
        Master these advanced techniques to unlock the full potential of AI image generation and create professional-quality artwork.
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
          <h2 className="text-3xl font-bold mb-4">Master AI Art Prompts Today</h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Apply these techniques and start creating amazing AI artwork with WordToImage.com.
          </p>
          <Button asChild size="lg" variant="secondary">
            <InternalLink to="/">Start Creating Now</InternalLink>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MasteringAIArtPrompts;