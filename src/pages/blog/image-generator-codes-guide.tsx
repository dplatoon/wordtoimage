import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BlogPostTemplate } from '@/components/content/BlogPostTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { InternalLink } from '@/components/seo/InternalLink';

const ImageGeneratorCodesGuide = () => {
  const blogData = {
    title: "The Ultimate Guide to Image Generator Codes: Create Visuals Programmatically",
    excerpt: "Image generator codes allow developers and tech-savvy creatives to automate image creation through programming languages.",
    author: {
      name: "WordToImage Team",
      avatar: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png"
    },
    publishDate: "2025-01-14",
    readTime: "9 min read",
    category: "Development",
    tags: ["Programming", "API", "Image Generation", "Development"],
    image: "/lovable-uploads/8916d6c1-4854-473f-b0fb-0c6d9833633e.png",
    slug: "image-generator-codes-guide"
  };

  const libraries = [
    {
      name: "Python PIL (Pillow)",
      description: "Powerful library for image processing and basic generation",
      language: "Python",
      useCase: "Image manipulation, basic graphics"
    },
    {
      name: "TensorFlow & PyTorch",
      description: "Machine learning frameworks for AI-based image generation",
      language: "Python",
      useCase: "AI model training, advanced generation"
    },
    {
      name: "JavaScript Canvas API",
      description: "Browser-based image generation and manipulation",
      language: "JavaScript",
      useCase: "Web applications, interactive graphics"
    }
  ];

  const steps = [
    {
      title: "Set up development environment",
      description: "Install necessary tools and dependencies for your chosen language"
    },
    {
      title: "Install required libraries",
      description: "Add image processing libraries like Pillow or Canvas API"
    },
    {
      title: "Write the generation script",
      description: "Create code that defines your image generation logic"
    },
    {
      title: "Execute and optimize",
      description: "Run your script and optimize for performance and quality"
    }
  ];

  const content = `
    <div class="prose prose-lg max-w-none">
      <p class="text-xl leading-relaxed mb-8">
        Image generator codes allow developers and tech-savvy creatives to automate image creation through programming. 
        Whether you're building applications, automating workflows, or creating custom tools, understanding how to 
        programmatically generate images opens up endless possibilities.
      </p>

      <h2 class="text-3xl font-bold mt-12 mb-6">Understanding Image Generator Codes</h2>
      <p class="mb-6">
        Image generator codes are snippets of programming that create, manipulate, or transform images automatically. 
        These can range from simple geometric patterns to complex AI-driven artwork generation systems.
      </p>

      <div class="bg-purple-50 border-l-4 border-purple-500 p-6 my-8">
        <p class="font-semibold text-purple-900 mb-2">🔧 What You Can Build:</p>
        <ul class="text-purple-800 space-y-2">
          <li>• Automated social media content generators</li>
          <li>• Dynamic website graphics systems</li>
          <li>• Batch image processing tools</li>
          <li>• Custom AI image generation interfaces</li>
        </ul>
      </div>

      <h2 class="text-3xl font-bold mt-12 mb-6">Popular Libraries and Frameworks</h2>
      <p class="mb-8">
        Choose the right tools based on your project requirements and programming experience.
      </p>
    </div>
  `;

  const codeExample = `
# Python example using Pillow
from PIL import Image, ImageDraw, ImageFont

# Create a new image
img = Image.new('RGB', (800, 600), color='white')
draw = ImageDraw.Draw(img)

# Add text and shapes
draw.rectangle([50, 50, 750, 550], outline='blue', width=3)
draw.text((400, 300), "Generated Image", fill='black')

# Save the image
img.save('generated_image.png')
  `;

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <BlogPostTemplate {...blogData} content={content} />
      
      {/* Libraries Section */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-1 gap-6 mb-12">
          {libraries.map((library, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">{library.name}</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {library.language}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{library.description}</p>
                <p className="text-sm text-gray-500">
                  <strong>Best for:</strong> {library.useCase}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tutorial Steps */}
        <h2 className="text-3xl font-bold text-center mb-8">Step-by-Step Tutorial</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Code Example */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Sample Code Example</h3>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeExample}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="mb-12 bg-green-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-green-900">Best Practices</h3>
            <ul className="space-y-3 text-green-800">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Keep scripts modular and reusable for easier maintenance</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Optimize code for performance, especially with large images</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Regularly update libraries to ensure security and compatibility</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Test thoroughly with different input parameters</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Integrate AI Image Generation?</h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            WordToImage.com provides seamless API integration for developers. Build advanced image generation into your applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <InternalLink to="/api">Explore Our API</InternalLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-violet-600">
              <InternalLink to="/">Try the Interface</InternalLink>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ImageGeneratorCodesGuide;