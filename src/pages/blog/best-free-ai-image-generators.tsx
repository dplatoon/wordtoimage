import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BlogPostTemplate } from '@/components/content/BlogPostTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { InternalLink } from '@/components/seo/InternalLink';
import { Badge } from '@/components/ui/badge';

const BestFreeAIImageGenerators = () => {
  const blogData = {
    title: "Best Free AI Image Generators to Bring Your Ideas to Life",
    excerpt: "In today's digital age, AI-driven image generation tools have transformed the creative landscape. These tools enable anyone to produce stunning visuals effortlessly.",
    author: {
      name: "WordToImage Team",
      avatar: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png"
    },
    publishDate: "2025-01-22",
    readTime: "7 min read",
    category: "Tools",
    tags: ["AI Image Generator", "Free Tools", "Creative Tools", "Digital Art"],
    image: "/lovable-uploads/c0cd939b-5fe6-4732-af93-ee61f070b689.png",
    slug: "best-free-ai-image-generators"
  };

  const generators = [
    {
      name: "WordToImage.com",
      description: "Fast, intuitive, and generates high-quality images based on textual prompts.",
      features: ["High-quality outputs", "User-friendly interface", "Multiple styles", "Fast generation"],
      rating: "★★★★★"
    },
    {
      name: "DALL-E Mini",
      description: "Ideal for quick concept visualization and creative experimentation.",
      features: ["Quick generation", "Simple interface", "Good for concepts", "Free access"],
      rating: "★★★★☆"
    },
    {
      name: "DeepArt",
      description: "Great for artistic transformations and stylized images.",
      features: ["Artistic styles", "Style transfer", "Creative effects", "Good quality"],
      rating: "★★★★☆"
    }
  ];

  const content = `
    <div class="prose prose-lg max-w-none">
      <p class="text-xl leading-relaxed mb-8">
        In today's digital age, AI-driven image generation tools have transformed the creative landscape. 
        These tools enable anyone, regardless of artistic skill, to produce stunning visuals effortlessly. 
        Whether you're a designer, marketer, or creative enthusiast, these free AI image generators can bring your ideas to life.
      </p>

      <h2 class="text-3xl font-bold mt-12 mb-6">Top Free AI Image Generators</h2>
      <p class="mb-8">
        We've tested and reviewed the best free AI image generators available today. Each tool has its unique strengths 
        and is suitable for different types of creative projects.
      </p>

      <h2 class="text-3xl font-bold mt-12 mb-6">Step-by-Step Guide to Get Started</h2>
      <ol class="list-decimal list-inside space-y-4 mb-8">
        <li><strong>Choose your preferred AI image generator</strong> - Consider your specific needs and preferred style</li>
        <li><strong>Enter a descriptive prompt</strong> - Clearly define your idea with specific details</li>
        <li><strong>Customize settings</strong> - Adjust image style, size, and complexity as needed</li>
        <li><strong>Generate and download</strong> - Create your visual masterpiece and save it for use</li>
      </ol>

      <div class="bg-green-50 border-l-4 border-green-500 p-6 my-8">
        <p class="font-semibold text-green-900 mb-2">💡 Optimization Tips:</p>
        <ul class="text-green-800 space-y-2">
          <li>• Use clear, detailed prompts for better results</li>
          <li>• Experiment with different artistic styles</li>
          <li>• Optimize image resolution for your intended use</li>
          <li>• Save your successful prompts for future reference</li>
        </ul>
      </div>

      <p class="text-xl font-semibold text-center mt-12 mb-8">
        Ready to transform your ideas into stunning visuals? Try WordToImage.com now and bring your creativity to life!
      </p>
    </div>
  `;

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <BlogPostTemplate {...blogData} content={content} />
      
      {/* Generators Comparison */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured AI Image Generators</h2>
        <div className="grid md:grid-cols-1 gap-6">
          {generators.map((generator, index) => (
            <Card key={index} className="overflow-hidden shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{generator.name}</h3>
                  <Badge variant="secondary">{generator.rating}</Badge>
                </div>
                <p className="text-gray-600 mb-4">{generator.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {generator.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                
                {index === 0 && (
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    <InternalLink to="/">Try WordToImage.com Now</InternalLink>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Start Creating Amazing Images Today</h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using AI to bring their ideas to life. Start your creative journey now!
          </p>
          <Button asChild size="lg" variant="secondary">
            <InternalLink to="/">Get Started for Free</InternalLink>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BestFreeAIImageGenerators;