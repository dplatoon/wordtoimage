
import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BlogPostTemplate } from '@/components/content/BlogPostTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InternalLink } from '@/components/seo/InternalLink';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

const PromptWritingGuideBlogPost = () => {
  const blogData = {
    title: "Ultimate Guide: Writing Powerful Prompts for AI Image Generation",
    excerpt: "Learn how to write powerful, effective prompts for stunning AI-generated images with our ultimate prompt writing guide at WordToImage.com.",
    author: {
      name: "WordToImage Team",
      avatar: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png"
    },
    publishDate: "2025-01-18",
    readTime: "10 min read",
    category: "Tutorial",
    tags: ["AI Image Prompts", "Prompt Writing", "AI Tutorial", "Image Generation"],
    image: "/lovable-uploads/f0dea1ce-ca91-4c0b-9849-6b3649a98249.png",
    slug: "prompt-writing-guide"
  };

  const promptExamples = [
    {
      category: "Portrait Photography",
      weak: "woman portrait",
      strong: "realistic portrait of a confident woman, cinematic lighting, high detail, Rembrandt style, professional photography",
      explanation: "The improved prompt specifies the style, lighting, quality, and artistic reference."
    },
    {
      category: "Landscape Art",
      weak: "mountain scene",
      strong: "majestic mountain landscape at golden hour, oil painting style, dramatic clouds, misty valleys, inspired by Albert Bierstadt",
      explanation: "Added time of day, artistic medium, atmospheric details, and artist reference."
    },
    {
      category: "Fantasy Illustration",
      weak: "dragon picture",
      strong: "ancient red dragon breathing fire, fantasy illustration, detailed scales, dramatic pose, cinematic composition, concept art style",
      explanation: "Specified creature details, action, artistic style, and composition quality."
    }
  ];

  const promptComponents = [
    {
      title: "Subject",
      description: "The main focus of your image",
      examples: ["portrait of a warrior", "futuristic cityscape", "abstract geometric pattern"],
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Style",
      description: "The artistic approach or medium",
      examples: ["oil painting", "digital art", "watercolor", "pixel art"],
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Mood & Atmosphere",
      description: "The emotional tone and feeling",
      examples: ["dramatic", "peaceful", "mysterious", "vibrant"],
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Technical Details",
      description: "Quality and composition specifics",
      examples: ["high resolution", "cinematic lighting", "detailed", "wide angle"],
      color: "bg-purple-100 text-purple-800"
    }
  ];

  const content = `
    <div class="prose prose-lg max-w-none">
      <p class="text-xl leading-relaxed mb-8">
        The art of prompt writing is the bridge between your imagination and AI-generated masterpieces. A well-crafted prompt 
        can mean the difference between a generic image and a stunning visual that perfectly captures your vision. This comprehensive 
        guide will teach you everything you need to know about writing effective prompts for AI image generation.
      </p>

      <h2 class="text-3xl font-bold mt-12 mb-6">Understanding AI Image Prompts</h2>
      <p class="mb-6">
        An AI image prompt is a text description that tells the AI what you want to see in your generated image. Think of it as 
        giving instructions to an incredibly talented artist who can create anything you describe, but needs clear, specific 
        directions to understand your vision.
      </p>

      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
        <p class="font-semibold text-yellow-900 mb-2">⚡ Quick Tip:</p>
        <p class="text-yellow-800">
          Start with your main subject, then add style, mood, and technical details. Think: "What + How + Where + When = Perfect Prompt"
        </p>
      </div>

      <h2 class="text-3xl font-bold mt-12 mb-6">The Anatomy of Effective Prompts</h2>
      <p class="mb-8">
        Every great prompt consists of four key components that work together to create compelling results. Understanding these 
        components will help you craft prompts that consistently generate amazing images.
      </p>
    </div>
  `;

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <BlogPostTemplate {...blogData} content={content} />
      
      {/* Prompt Components */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {promptComponents.map((component, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${component.color}`}>
                    {index + 1}
                  </span>
                  {component.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{component.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Examples:</p>
                  {component.examples.map((example, i) => (
                    <Badge key={i} variant="outline" className="mr-2 mb-2">
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Before/After Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Prompt Transformation Examples</h2>
          <p className="text-center text-gray-600 mb-8">
            See how simple prompts can be transformed into powerful, detailed instructions that generate stunning results.
          </p>
          
          <div className="space-y-8">
            {promptExamples.map((example, index) => (
              <Card key={index} className="overflow-hidden shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                  <CardTitle className="text-xl">{example.category}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-red-600">
                        <XCircle className="w-5 h-5" />
                        <span className="font-semibold">Weak Prompt</span>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <code className="text-red-700">"{example.weak}"</code>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Strong Prompt</span>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <code className="text-green-700">"{example.strong}"</code>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Why it works:</strong> {example.explanation}
                    </p>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button 
                      asChild 
                      size="sm"
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      <InternalLink to="/">Try This Prompt</InternalLink>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-16 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-800">Common Prompt Mistakes to Avoid</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-2 text-red-600 mb-3">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Too Vague</span>
              </div>
              <p className="text-gray-700 mb-2">Prompts like "nice picture" or "beautiful art" don't give the AI enough direction.</p>
              <p className="text-sm text-gray-600"><strong>Fix:</strong> Be specific about what you want to see.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-2 text-red-600 mb-3">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Overly Complicated</span>
              </div>
              <p className="text-gray-700 mb-2">Extremely long prompts with conflicting instructions confuse the AI.</p>
              <p className="text-sm text-gray-600"><strong>Fix:</strong> Keep prompts focused and coherent.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-2 text-red-600 mb-3">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Unclear Terms</span>
              </div>
              <p className="text-gray-700 mb-2">Using ambiguous words that could mean different things to different people.</p>
              <p className="text-sm text-gray-600"><strong>Fix:</strong> Use descriptive, specific language.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-2 text-red-600 mb-3">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Conflicting Instructions</span>
              </div>
              <p className="text-gray-700 mb-2">Asking for "realistic cartoon" or "bright dark colors" creates confusion.</p>
              <p className="text-sm text-gray-600"><strong>Fix:</strong> Ensure all elements work together harmoniously.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Master AI Prompts?</h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Put these prompt writing techniques into practice and start creating amazing AI-generated images today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <InternalLink to="/">Try Our Prompt Generator</InternalLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-violet-600">
              <InternalLink to="/templates">Browse Style Templates</InternalLink>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PromptWritingGuideBlogPost;
