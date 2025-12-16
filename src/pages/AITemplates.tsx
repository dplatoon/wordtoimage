
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sparkles, ArrowRight, Copy, Star, Users, Clock, Target, HelpCircle, BookOpen, Palette, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { ToolPageBackground } from '@/components/backgrounds/ToolPageBackground';

const templateCategories = [
  {
    name: 'Portrait Art',
    description: 'Professional portrait templates',
    templates: [
      { name: 'Corporate Headshot', prompt: 'professional corporate headshot, studio lighting, business attire, clean background', popularity: 95 },
      { name: 'Fantasy Portrait', prompt: 'fantasy portrait art, magical lighting, ethereal atmosphere, detailed character design', popularity: 88 },
      { name: 'Anime Character', prompt: 'anime style character portrait, vibrant colors, detailed eyes, manga art style', popularity: 92 }
    ]
  },
  {
    name: 'Landscapes',
    description: 'Stunning natural and fantasy landscapes',
    templates: [
      { name: 'Sunset Mountains', prompt: 'majestic mountain landscape at sunset, golden hour lighting, dramatic clouds, photorealistic', popularity: 90 },
      { name: 'Mystical Forest', prompt: 'enchanted forest scene, magical atmosphere, glowing lights, fantasy landscape art', popularity: 85 },
      { name: 'Ocean Waves', prompt: 'powerful ocean waves crashing, dramatic seascape, stormy weather, high detail photography', popularity: 78 }
    ]
  },
  {
    name: 'Digital Art',
    description: 'Modern digital art styles',
    templates: [
      { name: 'Cyberpunk City', prompt: 'futuristic cyberpunk cityscape, neon lights, rain, dark atmosphere, sci-fi digital art', popularity: 94 },
      { name: 'Abstract Geometric', prompt: 'abstract geometric art, vibrant colors, modern digital design, minimalist composition', popularity: 72 },
      { name: 'Space Exploration', prompt: 'space scene with astronaut, distant planets, cosmic background, sci-fi illustration', popularity: 86 }
    ]
  }
];

export default function AITemplates() {
  const copyToClipboard = (prompt: string, templateName: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success(`"${templateName}" template copied!`, {
      description: 'Paste it in the text-to-image generator'
    });
  };

  const useTemplate = (prompt: string) => {
    const url = `/text-to-image?prompt=${encodeURIComponent(prompt)}`;
    window.location.href = url;
  };

  const faqData = [
    {
      question: "How do I use AI prompt templates?",
      answer: "Simply click 'Copy' to copy a template prompt, then paste it into our text-to-image generator. You can also click 'Use' to automatically load the template into the generator."
    },
    {
      question: "Can I modify the templates?",
      answer: "Absolutely! These templates are starting points. Feel free to modify, combine, or add your own creative elements to make them uniquely yours."
    },
    {
      question: "What makes a good AI prompt?",
      answer: "Good prompts are specific, descriptive, and include style keywords. They mention composition, lighting, mood, and artistic style for best results."
    },
    {
      question: "Are new templates added regularly?",
      answer: "Yes! We continuously add new templates based on trending styles, user requests, and the latest AI art techniques."
    },
    {
      question: "Do I need a paid plan to use templates?",
      answer: "Templates are free to use! However, some advanced features and unlimited generations require a premium subscription."
    }
  ];

  const pageContent = {
    h1: "AI Prompt Templates – Ready-to-Use Image Generation Prompts",
    h2Headings: [
      "Portrait Art",
      "Landscapes", 
      "Digital Art",
      "Template Usage Guide",
      "Success Stories",
      "Frequently Asked Questions"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <ToolPageBackground variant="coral" />
      
      <Helmet>
        <title>AI Prompt Templates – Ready-to-Use Image Generation Prompts | WordToImage</title>
        <meta name="description" content="Discover 50+ professional AI prompt templates for image generation. Copy & use expert-crafted prompts for portraits, landscapes, digital art & more. Free templates available." />
        <meta name="keywords" content="AI prompt templates, image generation prompts, AI art prompts, text to image prompts, free AI templates, prompt library, AI image generator" />
        <link rel="canonical" href="https://wordtoimage.online/ai-templates" />
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      
      <Nav />
      
      <main className="container mx-auto px-4 py-12 flex-grow relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-xl bg-primary/20 mr-3">
              <Sparkles className="text-primary h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              AI Prompt Templates
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Ready-to-use prompt templates crafted by AI experts. Get professional results instantly with our curated collection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="neon" size="lg">
              <Link to="/text-to-image">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Creating
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="/style-gallery">
                Browse Styles
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Template Categories */}
        <div className="space-y-12">
          {templateCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.templates.map((template, templateIndex) => (
                  <Card key={templateIndex} className="bg-card/30 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all hover:shadow-neon">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-foreground">{template.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-primary fill-current" />
                          <span className="text-sm text-muted-foreground">{template.popularity}%</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {template.prompt}
                      </p>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="glass"
                          size="sm"
                          onClick={() => copyToClipboard(template.prompt, template.name)}
                          className="flex-1"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="neon"
                          size="sm"
                          onClick={() => useTemplate(template.prompt)}
                          className="flex-1"
                        >
                          <Sparkles className="h-4 w-4 mr-1" />
                          Use
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Template Usage Guide Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Template Usage Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Copy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Copy & Paste</h3>
              <p className="text-muted-foreground">Click 'Copy' to copy any template prompt, then paste it into the text-to-image generator for instant use.</p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Customize</h3>
              <p className="text-muted-foreground">Modify templates by adding your own details, changing colors, styles, or combining multiple templates together.</p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Experiment</h3>
              <p className="text-muted-foreground">Use templates as inspiration to learn prompt writing techniques and develop your own unique style.</p>
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Digital Artist</h4>
                  <p className="text-sm text-muted-foreground">@ArtisticSoul</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">"These templates saved me hours of prompt writing! The portrait templates especially helped me create stunning character art for my client projects."</p>
              <div className="flex items-center text-primary">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            
            <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Marketing Manager</h4>
                  <p className="text-sm text-muted-foreground">TechStart Inc.</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">"The landscape templates were perfect for our nature campaign. Professional results without needing an expensive photo shoot!"</p>
              <div className="flex items-center text-primary">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            
            <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl border border-primary/20">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Content Creator</h4>
                  <p className="text-sm text-muted-foreground">@CreativeMinds</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">"I've learned so much about prompt engineering from these templates. They're educational and produce amazing results!"</p>
              <div className="flex items-center text-primary">
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
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card/30 backdrop-blur-xl rounded-lg border border-primary/20">
                  <AccordionTrigger className="px-6 py-4 text-left text-foreground hover:no-underline">
                    <span className="text-lg font-semibold">{faq.question}</span>
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
        <div className="mt-16 bg-card/30 backdrop-blur-xl rounded-xl border border-primary/20 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Explore More</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/text-to-image" className="text-center p-4 rounded-lg bg-background/50 hover:bg-primary/10 transition-colors border border-primary/10">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="text-foreground font-medium">Generate Images</span>
            </Link>
            <Link to="/style-gallery" className="text-center p-4 rounded-lg bg-background/50 hover:bg-primary/10 transition-colors border border-primary/10">
              <Palette className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="text-foreground font-medium">Style Gallery</span>
            </Link>
            <Link to="/tutorials" className="text-center p-4 rounded-lg bg-background/50 hover:bg-primary/10 transition-colors border border-primary/10">
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="text-foreground font-medium">Tutorials</span>
            </Link>
            <Link to="/help" className="text-center p-4 rounded-lg bg-background/50 hover:bg-primary/10 transition-colors border border-primary/10">
              <HelpCircle className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="text-foreground font-medium">Help Center</span>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl p-8 border border-primary/30">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Create Amazing AI Art?</h2>
          <p className="text-muted-foreground mb-6">Use these templates as your starting point and bring your creative vision to life.</p>
          <Button asChild variant="neon" size="lg">
            <Link to="/text-to-image">
              Start Generating Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
