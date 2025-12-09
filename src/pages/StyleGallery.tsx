import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Eye, Heart, Copy, Palette, Sparkles, ArrowRight, Star, Users, Target, HelpCircle, Brush, Camera, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SEOManager } from '@/components/seo/SEOManager';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { useNavigate } from 'react-router-dom';

const StyleGallery = () => {
  const navigate = useNavigate();
  
  const styles = [
    { id: 1, name: "Photorealistic", description: "Ultra-realistic photography style", likes: 2341, styleId: "photorealistic", category: "Photography" },
    { id: 2, name: "Digital Art", description: "Modern digital artwork style", likes: 1876, styleId: "digital-art", category: "Digital" },
    { id: 3, name: "Oil Painting", description: "Classic oil painting technique", likes: 1532, styleId: "oil-painting", category: "Traditional" },
    { id: 4, name: "Watercolor", description: "Soft watercolor painting style", likes: 1234, styleId: "watercolor", category: "Traditional" },
    { id: 5, name: "Cyberpunk", description: "Futuristic cyberpunk aesthetic", likes: 2987, styleId: "cyberpunk", category: "Sci-Fi" },
    { id: 6, name: "Anime", description: "Japanese anime illustration style", likes: 3421, styleId: "anime", category: "Illustration" },
    { id: 7, name: "Renaissance", description: "Classical Renaissance art style", likes: 1876, styleId: "renaissance", category: "Traditional" },
    { id: 8, name: "Pop Art", description: "Bold pop art aesthetic", likes: 2134, styleId: "pop-art", category: "Modern" },
    { id: 9, name: "Impressionist", description: "Soft impressionist painting style", likes: 1654, styleId: "impressionist", category: "Traditional" },
  ];

  const handleUseStyle = (styleId: string) => {
    navigate(`/text-to-image?style=${styleId}`);
  };

  const faqData = [
    {
      question: "How do I apply a style to my AI-generated image?",
      answer: "Click 'Use Style' on any style card to automatically apply it to the AI generator. The style will be pre-selected when you create your next image."
    },
    {
      question: "Can I combine multiple styles?",
      answer: "Currently, you can select one primary style per generation. However, you can mention additional style elements in your prompt text for mixed results."
    },
    {
      question: "Are new styles added regularly?",
      answer: "Yes! We continuously expand our style gallery based on trending art movements, user requests, and the latest AI capabilities. Check back regularly for new additions."
    },
    {
      question: "What's the difference between photorealistic and digital art styles?",
      answer: "Photorealistic aims for camera-like realism, while digital art emphasizes artistic interpretation with stylized elements, enhanced colors, and creative effects."
    },
    {
      question: "Do I need a premium subscription to use all styles?",
      answer: "Basic styles are free to use. Premium subscribers get access to exclusive artist-inspired styles, seasonal collections, and priority processing."
    }
  ];

  const styleCategories = [
    { name: "Photography", count: 12, description: "Camera-realistic styles" },
    { name: "Traditional", count: 18, description: "Classic art techniques" },
    { name: "Digital", count: 15, description: "Modern digital art" },
    { name: "Illustration", count: 8, description: "Stylized illustrations" },
    { name: "Sci-Fi", count: 6, description: "Futuristic aesthetics" },
    { name: "Modern", count: 9, description: "Contemporary art styles" }
  ];

  const pageContent = {
    h1: "AI Art Style Gallery – 50+ Professional Artistic Styles",
    h2Headings: [
      "Style Categories",
      "Popular Art Styles", 
      "How to Use Styles",
      "Featured Artists",
      "Frequently Asked Questions"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>AI Art Style Gallery – 50+ Professional Artistic Styles | WordToImage</title>
        <meta name="description" content="Explore 50+ professional AI art styles including photorealistic, anime, cyberpunk, watercolor & more. Transform your images with expert-curated artistic styles." />
        <meta name="keywords" content="AI art styles, image generation styles, artistic styles gallery, photorealistic AI, anime style generator, digital art styles, painting styles AI" />
        <link rel="canonical" href="https://wordtoimage.online/style-gallery" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "AI Art Style Gallery",
            "description": "Professional collection of AI art styles for image generation",
            "url": "https://wordtoimage.online/style-gallery",
            "mainEntity": {
              "@type": "ItemList",
              "name": "AI Art Styles",
              "numberOfItems": styles.length,
              "itemListElement": styles.map((style, index) => ({
                "@type": "CreativeWork",
                "position": index + 1,
                "name": style.name,
                "description": style.description,
                "genre": style.category,
                "interactionStatistic": {
                  "@type": "InteractionCounter",
                  "interactionType": "http://schema.org/LikeAction",
                  "userInteractionCount": style.likes
                }
              }))
            },
            "provider": {
              "@type": "Organization",
              "name": "WordToImage",
              "url": "https://wordtoimage.online"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "3200"
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
                "name": "Style Gallery",
                "item": "https://wordtoimage.online/style-gallery"
              }
            ]
          })}
        </script>
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      
      <Nav />
      
      <main className="container mx-auto px-4 py-24 flex-grow">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 mr-4">
              <Palette className="text-primary h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-foreground">AI Art Style Gallery – </span>
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">50+ Professional Styles</span>
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Explore 50+ professional AI art styles including photorealistic, anime, cyberpunk, watercolor & more. Transform your images with expert-curated artistic styles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-primary/20">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Professional art styles</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-primary/20">
              <div className="text-2xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Style categories</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-primary/20">
              <div className="text-2xl font-bold text-primary">1-Click</div>
              <div className="text-sm text-muted-foreground">Style application</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="neon" size="lg">
              <Link to="/text-to-image">
                <Sparkles className="h-5 w-5 mr-2" />
                Try Styles Now
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="/ai-templates">
                Browse Templates
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Style Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Style Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {styleCategories.map((category, index) => (
              <Card key={index} className="text-center cursor-pointer group">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                    <Brush className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{category.count} styles</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Art Styles Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Popular Art Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {styles.map((style) => (
              <Card key={style.id} className="overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <img
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop"
                        alt={`Visual representation of ${style.name} AI art style`}
                        className="w-24 h-24 rounded-xl mx-auto mb-2 object-cover shadow-neon"
                        loading="lazy"
                      />
                      <p className="text-sm text-foreground font-semibold">{style.name} Style</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="glass">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{style.name}</h3>
                    <Badge variant="outline" className="border-primary/30 text-primary">{style.category}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{style.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4 text-primary" />
                      <span>{style.likes.toLocaleString()}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="neon-outline" 
                      className="min-h-[44px] text-xs sm:text-sm px-2 sm:px-4"
                      onClick={() => handleUseStyle(style.styleId)}
                    >
                      <Copy className="h-4 w-4 mr-1 sm:mr-2" />
                      <span>Use Style</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Use Styles Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">How to Use Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Choose Style</h3>
                <p className="text-muted-foreground">Browse our gallery and click on any style that matches your creative vision. Preview examples before applying.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Apply Instantly</h3>
                <p className="text-muted-foreground">Click 'Use Style' to automatically apply it to the AI generator. The style will be pre-selected for your next creation.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Create Magic</h3>
                <p className="text-muted-foreground">Enter your prompt and generate images with professional artistic styling applied automatically.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Artists Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Featured Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Vincent AI</h4>
                    <p className="text-sm text-muted-foreground">Digital Renaissance Artist</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"The photorealistic style helped me create stunning portraits for my client portfolio. Results exceeded expectations!"</p>
                <div className="flex items-center text-primary">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center mr-3">
                    <Target className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Maya Digital</h4>
                    <p className="text-sm text-muted-foreground">Cyberpunk Specialist</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"Cyberpunk and anime styles are incredibly detailed and true to form. Perfect for my sci-fi artwork series."</p>
                <div className="flex items-center text-primary">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mr-3">
                    <Brush className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Alex Studio</h4>
                    <p className="text-sm text-muted-foreground">Traditional Art Enthusiast</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"Oil painting and watercolor styles perfectly capture the essence of traditional techniques. Incredible quality!"</p>
                <div className="flex items-center text-primary">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary" />
            Frequently Asked Questions
          </h2>
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-primary/10">
                    <AccordionTrigger className="text-foreground hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Create?</h2>
              <p className="text-muted-foreground mb-6">
                Start generating stunning AI art with our professional style collection.
              </p>
              <Button asChild variant="neon" size="lg">
                <Link to="/text-to-image">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Creating Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StyleGallery;
