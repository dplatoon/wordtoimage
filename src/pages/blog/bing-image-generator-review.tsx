import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BlogPostTemplate } from '@/components/content/BlogPostTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { InternalLink } from '@/components/seo/InternalLink';
import { Badge } from '@/components/ui/badge';

const BingImageGeneratorReview = () => {
  const blogData = {
    title: "Exploring Bing's Image Generator: Is it Worth Trying?",
    excerpt: "Bing has introduced its AI image generator, aiming to compete with existing tools. But does it deliver quality results?",
    author: {
      name: "WordToImage Team",
      avatar: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png"
    },
    publishDate: "2025-01-09",
    readTime: "6 min read",
    category: "Review",
    tags: ["Bing", "AI Image Generator", "Review", "Comparison"],
    image: "/lovable-uploads/e3ece80c-0df0-4887-a227-c06cf52b3c6e.png",
    slug: "bing-image-generator-review"
  };

  const bingPros = [
    "Easy to use interface",
    "Integrated into Bing search",
    "Free to access",
    "Quick generation times"
  ];

  const bingCons = [
    "Limited customization options",
    "Lower quality outputs",
    "Fewer style choices",
    "Limited resolution options"
  ];

  const competitors = [
    {
      name: "WordToImage.com",
      rating: "★★★★★",
      strengths: ["Higher quality", "Greater flexibility", "More styles", "Better interface"],
      weakness: "None significant"
    },
    {
      name: "Midjourney",
      rating: "★★★★☆",
      strengths: ["Superior artistic style", "High quality", "Great community"],
      weakness: "Complex interface"
    },
    {
      name: "Bing Image Creator",
      rating: "★★★☆☆",
      strengths: ["Easy access", "Simple interface"],
      weakness: "Limited quality and options"
    }
  ];

  const tips = [
    {
      tip: "Use highly specific prompts",
      description: "Be very detailed in your descriptions to get better results from Bing's generator"
    },
    {
      tip: "Stick to simpler visuals",
      description: "Bing performs better with straightforward concepts rather than complex scenes"
    },
    {
      tip: "Try multiple variations",
      description: "Generate several versions to find the best result"
    }
  ];

  const content = `
    <div class="prose prose-lg max-w-none">
      <p class="text-xl leading-relaxed mb-8">
        Bing has introduced its AI image generator, aiming to compete with established players in the AI art space. 
        But does Microsoft's offering deliver the quality and features that creators need? We've thoroughly tested 
        Bing's image generator to give you an honest, comprehensive review.
      </p>

      <h2 class="text-3xl font-bold mt-12 mb-6">Bing's Image Generator: First Impressions</h2>
      <p class="mb-6">
        Microsoft's entry into AI image generation leverages their integration with search technology. The tool is 
        accessible directly through Bing search and offers a straightforward approach to image creation. However, 
        first impressions reveal both strengths and significant limitations.
      </p>

      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
        <p class="font-semibold text-yellow-900 mb-2">⚠️ Key Limitation:</p>
        <p class="text-yellow-800">
          While Bing's generator is convenient and free, it falls short of dedicated platforms in terms of 
          quality, customization, and creative control. It's best suited for quick, simple image generation tasks.
        </p>
      </div>

      <h2 class="text-3xl font-bold mt-12 mb-6">Detailed Analysis: Pros and Cons</h2>
      <p class="mb-8">
        Let's break down what works well with Bing's image generator and where it falls short compared to alternatives.
      </p>
    </div>
  `;

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <BlogPostTemplate {...blogData} content={content} />
      
      {/* Pros and Cons */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Pros */}
          <Card className="border-green-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">✅</span>
                Pros
              </h3>
              <ul className="space-y-3">
                {bingPros.map((pro, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-green-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Cons */}
          <Card className="border-red-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">❌</span>
                Cons
              </h3>
              <ul className="space-y-3">
                {bingCons.map((con, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-red-700">{con}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <h2 className="text-3xl font-bold text-center mb-8">Comparison with Leading Tools</h2>
        <div className="space-y-4 mb-16">
          {competitors.map((tool, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{tool.name}</h3>
                  <Badge variant={index === 0 ? "default" : "secondary"}>
                    {tool.rating}
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-green-700 mb-2">Strengths:</p>
                    <ul className="text-sm space-y-1">
                      {tool.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-red-700 mb-2">Main Weakness:</p>
                    <p className="text-sm text-red-600">{tool.weakness}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips for Bing */}
        <h2 className="text-3xl font-bold text-center mb-8">Maximizing Results with Bing</h2>
        <div className="grid md:grid-cols-1 gap-4 mb-16">
          {tips.map((tipItem, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">{tipItem.tip}</h3>
                <p className="text-gray-600">{tipItem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Verdict */}
        <Card className="mb-16 bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Our Verdict</h2>
            <p className="text-lg text-blue-800 mb-6">
              While Bing's Image Generator is a decent entry-level tool, serious creators will find better quality 
              and more features with dedicated platforms like WordToImage.com.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <InternalLink to="/">Try WordToImage.com</InternalLink>
              </Button>
              <Button asChild size="lg" variant="outline">
                <InternalLink to="/features">Compare Features</InternalLink>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Experience Superior AI Image Generation</h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Don't settle for basic results. Create professional-quality images with advanced features and superior quality.
          </p>
          <Button asChild size="lg" variant="secondary">
            <InternalLink to="/">Start Creating Better Images</InternalLink>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BingImageGeneratorReview;