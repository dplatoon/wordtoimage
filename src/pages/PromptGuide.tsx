import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Lightbulb, Target, Palette, Camera, Book, Star, Users, ArrowRight, Copy, CheckCircle, TrendingUp, Zap, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SEOManager } from '@/components/seo/SEOManager';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { toast } from '@/components/ui/sonner';

const PromptGuide = () => {
  const promptTips = [
    {
      title: "Be Specific",
      icon: Target,
      description: "Include detailed descriptions rather than vague terms",
      example: "Instead of 'a dog', try 'a golden retriever sitting in a sunny meadow'"
    },
    {
      title: "Use Style Keywords",
      icon: Palette,
      description: "Add artistic style descriptors to guide the aesthetic",
      example: "Add terms like 'digital art', 'oil painting', 'photorealistic', or 'minimalist'"
    },
    {
      title: "Specify Camera Settings",
      icon: Camera,
      description: "Include photography terms for realistic images",
      example: "'shot with 85mm lens', 'shallow depth of field', 'golden hour lighting'"
    },
    {
      title: "Add Quality Modifiers",
      icon: Lightbulb,
      description: "Use quality descriptors for better results",
      example: "'highly detailed', 'sharp focus', '4K resolution', 'professional photography'"
    }
  ];

  const examples = [
    {
      category: "Portrait Photography",
      prompt: "Professional headshot of a business woman, 85mm lens, shallow depth of field, studio lighting, sharp focus, high resolution",
      copyable: true
    },
    {
      category: "Digital Art",
      prompt: "Cyberpunk city at night, neon lights, rain reflections, digital art style, highly detailed, vibrant colors",
      copyable: true
    },
    {
      category: "Nature Photography",
      prompt: "Majestic mountain landscape at sunrise, golden hour lighting, wide angle shot, mist in valleys, professional nature photography",
      copyable: true
    },
    {
      category: "Abstract Art",
      prompt: "Abstract geometric patterns, bold colors, modern minimalist style, clean composition, digital illustration",
      copyable: true
    },
    {
      category: "Fantasy Art",
      prompt: "Mystical dragon soaring through clouds, iridescent scales, fantasy art style, magical atmosphere, epic composition",
      copyable: true
    },
    {
      category: "Street Photography",
      prompt: "Bustling city street at night, rain-soaked pavement, neon reflections, candid street photography, documentary style",
      copyable: true
    }
  ];

  const copyToClipboard = (prompt: string, category: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success(`${category} prompt copied!`, {
      description: 'Paste it in the AI generator'
    });
  };

  const faqData = [
    {
      question: "What makes a good AI prompt?",
      answer: "A good AI prompt is specific, descriptive, and includes style keywords. It should clearly describe the subject, setting, and desired artistic style while using quality modifiers for better results."
    },
    {
      question: "How long should my prompts be?",
      answer: "Effective prompts are usually 10-50 words. Too short lacks detail, while too long can confuse the AI. Focus on the most important descriptive elements."
    },
    {
      question: "Should I use negative prompts?",
      answer: "Yes! Negative prompts help exclude unwanted elements. Use terms like 'avoid blurry, low quality, distorted' to improve image quality and accuracy."
    },
    {
      question: "How do I get consistent characters across images?",
      answer: "Use detailed character descriptions including specific features, clothing, and pose. Consider using reference phrases and maintain consistent style keywords across prompts."
    },
    {
      question: "What are the most important style keywords?",
      answer: "Key style terms include: 'photorealistic', 'digital art', 'oil painting', 'watercolor', 'anime style', 'minimalist', and quality modifiers like 'highly detailed', 'sharp focus', '4K resolution'."
    }
  ];

  const advancedTechniques = [
    {
      title: "Weighted Prompts",
      description: "Use parentheses to emphasize important elements",
      example: "(beautiful face:1.3), detailed eyes, professional lighting"
    },
    {
      title: "Negative Space",
      description: "Specify what you don't want in your image",
      example: "Avoid: blurry, low quality, distorted proportions, bad anatomy"
    },
    {
      title: "Artistic References",
      description: "Reference famous artists or art movements",
      example: "In the style of Van Gogh, impressionist painting, post-impressionism"
    },
    {
      title: "Composition Rules",
      description: "Include photography composition terms",
      example: "Rule of thirds, leading lines, symmetrical composition, wide angle"
    }
  ];

  const pageContent = {
    h1: "AI Prompt Writing Guide – Master Text-to-Image Prompts",
    h2Headings: [
      "Essential Prompt Tips",
      "Prompt Examples",
      "Advanced Techniques",
      "Success Stories",
      "Frequently Asked Questions"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-violet-50 via-white to-indigo-50">
      <Helmet>
        <title>AI Prompt Writing Guide – Master Text-to-Image Prompts | WordToImage</title>
        <meta name="description" content="Master AI prompt writing with our comprehensive guide. Learn techniques, see examples, and create stunning AI-generated images with professional-quality prompts." />
        <meta name="keywords" content="AI prompt guide, text to image prompts, prompt engineering, AI art prompts, prompt writing tips, AI image generation guide" />
        <link rel="canonical" href="https://wordtoimage.com/prompt-guide" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Write Effective AI Image Prompts",
            "description": "Complete guide to writing effective prompts for AI image generation",
            "image": "https://wordtoimage.com/og-prompt-guide.jpg",
            "totalTime": "PT15M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            },
            "supply": [
              {
                "@type": "HowToSupply",
                "name": "AI Image Generator Access"
              }
            ],
            "tool": [
              {
                "@type": "HowToTool",
                "name": "WordToImage AI Generator"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Be Specific",
                "text": "Include detailed descriptions rather than vague terms",
                "image": "https://wordtoimage.com/step1.jpg"
              },
              {
                "@type": "HowToStep", 
                "name": "Use Style Keywords",
                "text": "Add artistic style descriptors to guide the aesthetic",
                "image": "https://wordtoimage.com/step2.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Specify Camera Settings", 
                "text": "Include photography terms for realistic images",
                "image": "https://wordtoimage.com/step3.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Add Quality Modifiers",
                "text": "Use quality descriptors for better results",
                "image": "https://wordtoimage.com/step4.jpg"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "1850"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://wordtoimage.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Prompt Guide",
                "item": "https://wordtoimage.com/prompt-guide"
              }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "AI Prompt Writing Guide",
            "description": "Comprehensive guide to writing effective AI image generation prompts",
            "learningResourceType": "Guide",
            "educationalLevel": "Beginner to Advanced",
            "timeRequired": "PT15M",
            "inLanguage": "en",
            "teaches": [
              "Prompt engineering fundamentals",
              "Style keyword usage",
              "Quality modifier techniques",
              "Advanced prompt strategies"
            ],
            "provider": {
              "@type": "Organization",
              "name": "WordToImage",
              "url": "https://wordtoimage.com"
            }
          })}
        </script>
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      
      <Nav />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Book className="text-violet-600 mr-3 h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
              AI Prompt Writing Guide – Master Text-to-Image Prompts
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master AI prompt writing with our comprehensive guide. Learn techniques, see examples, and create stunning AI-generated images with professional-quality prompts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">20+</div>
              <div className="text-sm text-gray-600">Expert techniques</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">50+</div>
              <div className="text-sm text-gray-600">Example prompts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">Free</div>
              <div className="text-sm text-gray-600">Complete guide</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600">
              <Link to="/text-to-image">
                <Zap className="h-5 w-5 mr-2" />
                Try Now
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/ai-templates">
                Browse Templates
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Essential Prompt Tips Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Essential Prompt Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promptTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                    <tip.icon className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 mb-3">{tip.description}</p>
                    <div className="bg-gray-50 rounded-md p-3 text-sm">
                      <p className="text-gray-700 italic">"{tip.example}"</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt Examples Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Prompt Examples</h2>
          <div className="space-y-6">
            {examples.map((example, index) => (
              <div key={index} className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-violet-600">{example.category}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(example.prompt, example.category)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-gray-800 font-mono text-sm leading-relaxed">{example.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Techniques Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Advanced Techniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advancedTechniques.map((technique, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-violet-600" />
                    {technique.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{technique.description}</p>
                  <div className="bg-violet-50 rounded-md p-3">
                    <p className="text-violet-800 font-mono text-sm">{technique.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Prompt Structure Template */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Prompt Structure Template</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border-l-4 border-violet-500">
                <h4 className="font-semibold text-gray-900 mb-2">1. Subject</h4>
                <p className="text-gray-600">What is the main focus of your image?</p>
                <p className="text-sm text-gray-500 mt-1">Example: "A majestic lion"</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                <h4 className="font-semibold text-gray-900 mb-2">2. Description</h4>
                <p className="text-gray-600">Add details about appearance, pose, or action</p>
                <p className="text-sm text-gray-500 mt-1">Example: "standing proudly on a rocky cliff"</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2">3. Environment</h4>
                <p className="text-gray-600">Describe the setting or background</p>
                <p className="text-sm text-gray-500 mt-1">Example: "overlooking an African savanna at sunset"</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 mb-2">4. Style & Quality</h4>
                <p className="text-gray-600">Add artistic style and quality modifiers</p>
                <p className="text-sm text-gray-500 mt-1">Example: "wildlife photography, 85mm lens, golden hour lighting"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Alex Creative</h4>
                  <p className="text-sm text-gray-600">Digital Artist</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"This guide transformed my prompt writing! My images went from basic to professional quality overnight. The structure template is gold."</p>
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Maria Designer</h4>
                  <p className="text-sm text-gray-600">Freelance Creator</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"The advanced techniques section helped me master weighted prompts. Now I can control exactly what I want in my images!"</p>
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">James Marketer</h4>
                  <p className="text-sm text-gray-600">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"Perfect for beginners! Clear examples and practical tips. I'm creating professional marketing visuals in minutes now."</p>
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-md border">
                  <AccordionTrigger className="px-6 py-4 text-left">
                    <span className="text-lg font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Internal Links Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Continue Your AI Journey
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/ai-templates" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-violet-100 rounded flex items-center justify-center">
                <Book className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold">AI Templates</h3>
                <p className="text-sm text-gray-600">Ready-made prompts</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            
            <Link to="/style-gallery" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                <Palette className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Style Gallery</h3>
                <p className="text-sm text-gray-600">Browse art styles</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            
            <Link to="/text-to-image" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">AI Generator</h3>
                <p className="text-sm text-gray-600">Create images now</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            
            <Link to="/gallery" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                <Camera className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Community Gallery</h3>
                <p className="text-sm text-gray-600">See user creations</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromptGuide;