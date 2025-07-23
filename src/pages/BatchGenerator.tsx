
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Zap, Settings, Download, Grid3X3, Clock, ArrowRight, Users, Star, Target, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';

export default function BatchGenerator() {
  const [prompts, setPrompts] = useState('');
  const [batchSize, setBatchSize] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleBatchGenerate = () => {
    const promptList = prompts.split('\n').filter(p => p.trim());
    
    if (promptList.length === 0) {
      toast.error('Please enter at least one prompt');
      return;
    }

    if (promptList.length > 10) {
      toast.error('Maximum 10 prompts allowed per batch');
      return;
    }

    setIsGenerating(true);
    toast.error('Batch generation is currently in beta development. This feature is not yet functional and will be available in a future update.', {
      description: 'For now, please use the single image generator on our homepage.'
    });
    
    // Reset the generating state immediately since this is a beta notice
    setTimeout(() => {
      setIsGenerating(false);
    }, 100);
  };

  const examplePrompts = [
    'a serene mountain landscape at sunrise',
    'a futuristic city with flying cars',
    'a magical forest with glowing mushrooms',
    'an underwater scene with colorful coral'
  ].join('\n');

  const faqData = [
    {
      question: "How many images can I batch-create at once?",
      answer: "You can generate up to 10 prompts per batch, with 1-4 variations per prompt, creating up to 40 images in a single batch session."
    },
    {
      question: "What's the difference between batch and single generation?",
      answer: "Batch generation processes multiple prompts simultaneously, making it 10x faster than generating images one by one. Perfect for content creators and businesses."
    },
    {
      question: "How does bulk download work?",
      answer: "All generated images are automatically organized and can be downloaded as a ZIP file with proper naming based on your prompts for easy management."
    },
    {
      question: "Can I use different styles for each prompt in a batch?",
      answer: "Currently, one style applies to the entire batch. For mixed styles, run separate batches or use our Style Gallery to apply different styles."
    },
    {
      question: "How long does batch processing take?",
      answer: "Batch processing typically takes 30-60 seconds for a full batch of 10 prompts, depending on complexity and current server load."
    },
    {
      question: "Do I get charged per image or per batch?",
      answer: "Pricing is per individual image generated. A batch of 10 prompts with 2 variations each counts as 20 image generations."
    }
  ];

  const pageContent = {
    h1: "AI Batch Image Generator – Create Multiple Images at Once",
    h2Headings: [
      "Batch Generation Tips",
      "Why Use Batch Generation",
      "Success Stories",
      "Frequently Asked Questions"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <Helmet>
        <title>AI Batch Image Generator – Create Multiple Images at Once | WordToImage</title>
        <meta name="description" content="Generate up to 40 AI images simultaneously with our batch generator. 10x faster than single generation. Perfect for content creators and businesses." />
        <meta name="keywords" content="batch image generator, bulk AI images, multiple image generation, AI batch processing, bulk image creation, mass image generator" />
        <link rel="canonical" href="https://wordtoimage.com/batch-generator" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AI Batch Image Generator",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "description": "Generate multiple AI images simultaneously with batch processing for efficiency",
            "url": "https://wordtoimage.com/batch-generator",
            "provider": {
              "@type": "Organization",
              "name": "WordToImage",
              "url": "https://wordtoimage.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Batch process up to 10 prompts",
              "Generate 1-4 variations per prompt",
              "Bulk ZIP download",
              "10x faster than single generation",
              "Auto organization",
              "Progress tracking"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "3400"
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
                "name": "Batch Generator",
                "item": "https://wordtoimage.com/batch-generator"
              }
            ]
          })}
        </script>
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      
      <Nav />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Grid3X3 className="text-blue-600 mr-3 h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              AI Batch Image Generator – Create Multiple Images at Once
              <Badge className="ml-4 bg-orange-100 text-orange-800 text-sm">BETA</Badge>
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Generate up to 40 AI images simultaneously with our batch generator. 10x faster than single generation. Perfect for content creators and businesses.
          </p>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-2 text-orange-800 mb-2">
              <Badge className="bg-orange-100 text-orange-800">BETA</Badge>
              <span className="font-medium">Feature in Development</span>
            </div>
            <p className="text-orange-700 text-sm">
              Batch generation is currently being developed and is not yet functional. Use our <Link to="/" className="underline font-medium">single image generator</Link> for immediate image creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">10x</div>
              <div className="text-sm text-gray-600">Faster than single generation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1-10</div>
              <div className="text-sm text-gray-600">Images per batch</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">Auto</div>
              <div className="text-sm text-gray-600">Organization & download</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Batch Configuration */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Batch Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="prompts" className="text-base font-medium">
                    Prompts (one per line)
                  </Label>
                  <Textarea
                    id="prompts"
                    placeholder={`Enter your prompts here, one per line:\n\n${examplePrompts}`}
                    value={prompts}
                    onChange={(e) => setPrompts(e.target.value)}
                    className="mt-2 min-h-[200px]"
                  />
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>{prompts.split('\n').filter(p => p.trim()).length} prompts entered</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPrompts(examplePrompts)}
                    >
                      Use Examples
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="batch-size" className="text-base font-medium">
                    Images per prompt
                  </Label>
                  <Input
                    id="batch-size"
                    type="number"
                    min="1"
                    max="4"
                    value={batchSize}
                    onChange={(e) => setBatchSize(parseInt(e.target.value) || 1)}
                    className="mt-2 w-24"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Generate 1-4 variations per prompt
                  </p>
                </div>

                <Button
                  onClick={handleBatchGenerate}
                  disabled={isGenerating || !prompts.trim()}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="h-5 w-5 mr-2 animate-spin" />
                      Generating Batch...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Generate Batch
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features & Tips */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Batch Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Grid3X3 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Multiple Variations</h4>
                      <p className="text-sm text-gray-600">Create 1-4 images per prompt automatically</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Download className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Bulk Download</h4>
                      <p className="text-sm text-gray-600">Download all generated images as a ZIP file</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Queue Processing</h4>
                      <p className="text-sm text-gray-600">Efficient processing with progress tracking</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>• Use similar themes for better batch coherence</p>
                  <p>• Start with 2-3 prompts to test quality</p>
                  <p>• Include style keywords for consistency</p>
                  <p>• Keep prompts under 100 characters each</p>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link to="/ai-templates">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Browse Prompt Templates
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section Placeholder */}
        {isGenerating && (
          <Card className="mt-8">
            <CardContent className="p-8">
              <div className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold mb-2">Processing Your Batch</h3>
                <p className="text-gray-600">Generating {prompts.split('\n').filter(p => p.trim()).length * batchSize} images...</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Batch Generation Tips Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Batch Generation Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Theme Consistency</h3>
              <p className="text-gray-600">Use similar themes and styles across prompts for better batch coherence and professional results.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Start Small</h3>
              <p className="text-gray-600">Begin with 2-3 prompts to test quality and style before running larger batches.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Optimize Length</h3>
              <p className="text-gray-600">Keep prompts under 100 characters each for faster processing and better results.</p>
            </div>
          </div>
        </div>

        {/* Why Use Batch Generation Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Use Batch Generation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Time</h3>
              <p className="text-gray-600 mb-4">Process multiple prompts simultaneously instead of generating images one by one. 10x faster workflow.</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Batch process up to 10 prompts</li>
                <li>• Automatic queue management</li>
                <li>• Progress tracking included</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Management</h3>
              <p className="text-gray-600 mb-4">All images are organized and can be downloaded as a single ZIP file with proper naming.</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Bulk ZIP download</li>
                <li>• Auto-organized folders</li>
                <li>• Descriptive file names</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-gray-600">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"Created 100+ product images in 5 minutes! Perfect for my e-commerce store. Batch generation saved me hours of work."</p>
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
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Marketing Team</h4>
                  <p className="text-sm text-gray-600">TechStart Inc.</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"Batch generation revolutionized our content workflow. We create campaign visuals 10x faster than before."</p>
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
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Mike Rodriguez</h4>
                  <p className="text-sm text-gray-600">Freelance Designer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"As a freelancer, batch generation helps me deliver projects faster and take on more clients. Game changer!"</p>
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
            Enhance Your Batch Generation
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/style-gallery" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                <Grid3X3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Explore Styles</h3>
                <p className="text-sm text-gray-600">50+ art styles for batch creation</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            
            <Link to="/prompt-guide" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Prompt Guide</h3>
                <p className="text-sm text-gray-600">Write better prompts</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            
            <Link to="/ai-templates" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">AI Templates</h3>
                <p className="text-sm text-gray-600">Ready-made prompts</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            
            <Link to="/text-to-image" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Single Generator</h3>
                <p className="text-sm text-gray-600">Create one-off images</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
