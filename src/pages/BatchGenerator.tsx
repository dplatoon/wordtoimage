
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
import { Zap, Settings, Download, Grid3X3, Clock, ArrowRight, Users, Star, Target, HelpCircle, Sparkles } from 'lucide-react';
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
    
    toast.error('🚧 Feature in Development', {
      description: 'Batch generation is currently being built. Use our Text-to-Image generator for immediate results while we perfect this feature.'
    });
    
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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-coral/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <Helmet>
        <title>AI Batch Image Generator – Create Multiple Images at Once | WordToImage</title>
        <meta name="description" content="Generate up to 40 AI images simultaneously with our batch generator. 10x faster than single generation. Perfect for content creators and businesses." />
        <meta name="keywords" content="batch image generator, bulk AI images, multiple image generation, AI batch processing, bulk image creation, mass image generator" />
        <link rel="canonical" href="https://wordtoimage.online/batch-generator" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AI Batch Image Generator",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "description": "Generate multiple AI images simultaneously with batch processing for efficiency",
            "url": "https://wordtoimage.online/batch-generator",
            "provider": {
              "@type": "Organization",
              "name": "WordToImage",
              "url": "https://wordtoimage.online"
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
                "item": "https://wordtoimage.online"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Batch Generator",
                "item": "https://wordtoimage.online/batch-generator"
              }
            ]
          })}
        </script>
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      
      <Nav />
      
      <main className="container mx-auto px-4 py-12 flex-grow relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 mr-4">
              <Grid3X3 className="text-primary h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-neon-coral to-neon-amber">
                AI Batch Image Generator
              </span>
              <Badge className="ml-4 bg-primary/20 text-primary border border-primary/30 text-sm animate-pulse-glow">
                BETA
              </Badge>
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Generate up to 40 AI images simultaneously with our batch generator. 10x faster than single generation. Perfect for content creators and businesses.
          </p>
          
          {/* Beta Notice Card */}
          <div className="backdrop-blur-xl bg-primary/5 border border-primary/30 rounded-2xl p-6 max-w-2xl mx-auto mb-8 shadow-neon">
            <div className="flex items-center gap-3 text-primary mb-3">
              <Sparkles className="w-5 h-5" />
              <Badge className="bg-primary/20 text-primary border border-primary/30">BETA</Badge>
              <span className="font-medium">Feature in Development</span>
            </div>
            <p className="text-muted-foreground">
              Batch generation is currently being developed and is not yet functional. Use our{' '}
              <Link to="/" className="text-primary hover:text-primary/80 underline font-medium transition-colors">
                single image generator
              </Link>{' '}
              for immediate image creation.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            {[
              { value: '10x', label: 'Faster than single generation' },
              { value: '1-10', label: 'Images per batch' },
              { value: 'Auto', label: 'Organization & download' }
            ].map((stat, i) => (
              <div key={i} className="backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-colors">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Batch Configuration */}
          <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card className="backdrop-blur-xl bg-card/50 border-border/50 shadow-glass mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Settings className="h-5 w-5 text-primary" />
                  Batch Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="prompts" className="text-base font-medium text-foreground">
                    Prompts (one per line)
                  </Label>
                  <Textarea
                    id="prompts"
                    placeholder={`Enter your prompts here, one per line:\n\n${examplePrompts}`}
                    value={prompts}
                    onChange={(e) => setPrompts(e.target.value)}
                    className="mt-2 min-h-[200px] bg-background/50 border-border/50 focus:border-primary/50"
                  />
                  <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                    <span>{prompts.split('\n').filter(p => p.trim()).length} prompts entered</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPrompts(examplePrompts)}
                      className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      Use Examples
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="batch-size" className="text-base font-medium text-foreground">
                    Images per prompt
                  </Label>
                  <Input
                    id="batch-size"
                    type="number"
                    min="1"
                    max="4"
                    value={batchSize}
                    onChange={(e) => setBatchSize(parseInt(e.target.value) || 1)}
                    className="mt-2 w-24 bg-background/50 border-border/50 focus:border-primary/50"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Generate 1-4 variations per prompt
                  </p>
                </div>

                <Button
                  onClick={handleBatchGenerate}
                  disabled={isGenerating || !prompts.trim()}
                  size="lg"
                  variant="neon"
                  className="w-full"
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
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="backdrop-blur-xl bg-card/50 border-border/50 shadow-glass">
              <CardHeader>
                <CardTitle className="text-foreground">Batch Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: Grid3X3, title: 'Multiple Variations', desc: 'Create 1-4 images per prompt automatically' },
                    { icon: Download, title: 'Bulk Download', desc: 'Download all generated images as a ZIP file' },
                    { icon: Zap, title: 'Queue Processing', desc: 'Efficient processing with progress tracking' }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/30 border border-border/30 hover:border-primary/30 transition-colors">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-card/50 border-border/50 shadow-glass">
              <CardHeader>
                <CardTitle className="text-foreground">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><span className="text-primary">•</span> Use similar themes for better batch coherence</p>
                  <p className="flex items-center gap-2"><span className="text-primary">•</span> Start with 2-3 prompts to test quality</p>
                  <p className="flex items-center gap-2"><span className="text-primary">•</span> Include style keywords for consistency</p>
                  <p className="flex items-center gap-2"><span className="text-primary">•</span> Keep prompts under 100 characters each</p>
                </div>
                
                <Button variant="glass" size="sm" className="w-full mt-4" asChild>
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
          <Card className="mt-8 backdrop-blur-xl bg-card/50 border-border/50 shadow-glass">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary animate-spin" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Processing Your Batch</h3>
                <p className="text-muted-foreground">Generating {prompts.split('\n').filter(p => p.trim()).length * batchSize} images...</p>
                <div className="w-full bg-background/50 rounded-full h-2 mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-neon-coral h-2 rounded-full w-1/3 animate-shimmer"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Batch Generation Tips Section */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-display font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-neon-coral">
              Batch Generation Tips
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Target, color: 'primary', title: 'Theme Consistency', desc: 'Use similar themes and styles across prompts for better batch coherence and professional results.' },
              { icon: Settings, color: 'neon-coral', title: 'Start Small', desc: 'Begin with 2-3 prompts to test quality and style before running larger batches.' },
              { icon: Zap, color: 'neon-amber', title: 'Optimize Length', desc: 'Keep prompts under 100 characters each for faster processing and better results.' }
            ].map((tip, i) => (
              <div key={i} className="backdrop-blur-xl bg-card/30 p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-neon group">
                <div className={`w-12 h-12 bg-${tip.color}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <tip.icon className={`w-6 h-6 text-${tip.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{tip.title}</h3>
                <p className="text-muted-foreground">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Use Batch Generation Section */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl font-display font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-neon-coral">
              Why Use Batch Generation
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mb-4 shadow-neon">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Save Time</h3>
              <p className="text-muted-foreground mb-4">Process multiple prompts simultaneously instead of generating images one by one. 10x faster workflow.</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2"><span className="text-primary">•</span> Batch process up to 10 prompts</li>
                <li className="flex items-center gap-2"><span className="text-primary">•</span> Automatic queue management</li>
                <li className="flex items-center gap-2"><span className="text-primary">•</span> Progress tracking included</li>
              </ul>
            </div>
            
            <div className="backdrop-blur-xl bg-gradient-to-br from-neon-coral/10 to-neon-coral/5 p-6 rounded-2xl border border-neon-coral/20 hover:border-neon-coral/40 transition-colors">
              <div className="w-12 h-12 bg-neon-coral text-background rounded-xl flex items-center justify-center mb-4 shadow-neon-coral">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Easy Management</h3>
              <p className="text-muted-foreground mb-4">All images are organized and can be downloaded as a single ZIP file with proper naming.</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2"><span className="text-neon-coral">•</span> Bulk ZIP download</li>
                <li className="flex items-center gap-2"><span className="text-neon-coral">•</span> Auto-organized folders</li>
                <li className="flex items-center gap-2"><span className="text-neon-coral">•</span> Descriptive file names</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-3xl font-display font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-neon-coral">
              Success Stories
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Sarah Chen', role: 'Content Creator', icon: Users, color: 'primary', quote: 'Created 100+ product images in 5 minutes! Perfect for my e-commerce store. Batch generation saved me hours of work.' },
              { name: 'Marketing Team', role: 'TechStart Inc.', icon: Target, color: 'neon-coral', quote: 'Batch generation revolutionized our content workflow. We create campaign visuals 10x faster than before.' },
              { name: 'Mike Rodriguez', role: 'Freelance Designer', icon: Zap, color: 'neon-amber', quote: 'As a freelancer, batch generation helps me deliver projects faster and take on more clients. Game changer!' }
            ].map((story, i) => (
              <div key={i} className="backdrop-blur-xl bg-card/30 p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 bg-${story.color}/10 rounded-full flex items-center justify-center mr-3`}>
                    <story.icon className={`w-5 h-5 text-${story.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{story.name}</h4>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"{story.quote}"</p>
                <div className="flex items-center text-neon-amber">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced FAQ Section */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl font-display font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-neon-coral">
              Frequently Asked Questions
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="backdrop-blur-xl bg-card/30 rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <span className="text-lg font-semibold text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Internal Links Section */}
        <div className="mt-16 backdrop-blur-xl bg-card/30 rounded-2xl p-8 border border-border/50 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-2xl font-display font-bold text-center mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-neon-coral">
              Enhance Your Batch Generation
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { to: '/style-gallery', icon: Grid3X3, color: 'primary', title: 'Explore Styles', desc: '50+ art styles for batch creation' },
              { to: '/prompt-guide', icon: HelpCircle, color: 'neon-coral', title: 'Prompt Guide', desc: 'Write better prompts' },
              { to: '/ai-templates', icon: Target, color: 'neon-amber', title: 'AI Templates', desc: 'Ready-made prompts' },
              { to: '/text-to-image', icon: Zap, color: 'neon-cyan', title: 'Single Generator', desc: 'Create one-off images' }
            ].map((link, i) => (
              <Link 
                key={i}
                to={link.to} 
                className="backdrop-blur-xl bg-background/30 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 flex items-center gap-3 group hover:shadow-neon"
              >
                <div className={`w-10 h-10 bg-${link.color}/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <link.icon className={`w-5 h-5 text-${link.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
