
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <Helmet>
        <title>AI Art Style Gallery – 50+ Professional Artistic Styles | WordToImage</title>
        <meta name="description" content="Explore 50+ professional AI art styles including photorealistic, anime, cyberpunk, watercolor & more. Transform your images with expert-curated artistic styles." />
        <meta name="keywords" content="AI art styles, image generation styles, artistic styles gallery, photorealistic AI, anime style generator, digital art styles, painting styles AI" />
        <link rel="canonical" href="https://wordtoimage.com/style-gallery" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "AI Art Style Gallery",
            "description": "Professional collection of AI art styles for image generation",
            "url": "https://wordtoimage.com/style-gallery",
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
              "url": "https://wordtoimage.com"
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
                "item": "https://wordtoimage.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Style Gallery",
                "item": "https://wordtoimage.com/style-gallery"
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
            <Palette className="text-purple-600 mr-3 h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              AI Art Style Gallery – 50+ Professional Artistic Styles
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore 50+ professional AI art styles including photorealistic, anime, cyberpunk, watercolor & more. Transform your images with expert-curated artistic styles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">Professional art styles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">6</div>
              <div className="text-sm text-gray-600">Style categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1-Click</div>
              <div className="text-sm text-gray-600">Style application</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Link to="/text-to-image">
                <Sparkles className="h-5 w-5 mr-2" />
                Try Styles Now
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

        {/* Style Categories Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Style Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {styleCategories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Brush className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <Badge variant="secondary">{category.count} styles</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Art Styles Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Popular Art Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {styles.map((style) => (
              <div key={style.id} className="bg-white rounded-xl shadow-lg border overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-violet-100 to-indigo-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                       <img
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop"
                        alt={`Visual representation of ${style.name} AI art style`}
                        className="w-24 h-24 rounded-xl mx-auto mb-2 object-cover shadow-lg"
                        loading="lazy"
                      />
                      <p className="text-sm text-gray-600 font-semibold">{style.name} Style</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{style.name}</h3>
                    <Badge variant="outline">{style.category}</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{style.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Heart className="h-4 w-4" />
                      <span>{style.likes.toLocaleString()}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleUseStyle(style.styleId)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Use Style
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use Styles Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">How to Use Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Style</h3>
              <p className="text-gray-600">Browse our gallery and click on any style that matches your creative vision. Preview examples before applying.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply Instantly</h3>
              <p className="text-gray-600">Click 'Use Style' to automatically apply it to the AI generator. The style will be pre-selected for your next creation.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Magic</h3>
              <p className="text-gray-600">Enter your prompt and generate images with professional artistic styling applied automatically.</p>
            </div>
          </div>
        </div>

        {/* Featured Artists Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Featured Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Vincent AI</h4>
                  <p className="text-sm text-gray-600">Digital Renaissance Artist</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"The photorealistic style helped me create stunning portraits for my client portfolio. Results exceeded expectations!"</p>
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
                  <h4 className="font-semibold">Maya Digital</h4>
                  <p className="text-sm text-gray-600">Cyberpunk Specialist</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"Cyberpunk and anime styles are incredibly detailed and true to form. Perfect for my sci-fi artwork series."</p>
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
                  <Brush className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Isabella Art</h4>
                  <p className="text-sm text-gray-600">Traditional Artist</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"The watercolor and oil painting styles capture the essence of traditional art perfectly. Absolutely stunning results!"</p>
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
            Explore More Creative Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/ai-templates" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">AI Templates</h3>
                <p className="text-sm text-gray-600">Ready-made prompts</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            
            <Link to="/prompt-guide" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Prompt Guide</h3>
                <p className="text-sm text-gray-600">Learn prompt writing</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            
            <Link to="/text-to-image" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                <Camera className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">AI Generator</h3>
                <p className="text-sm text-gray-600">Create images now</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            
            <Link to="/gallery" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                <Eye className="w-5 h-5 text-orange-600" />
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

export default StyleGallery;
