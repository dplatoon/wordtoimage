import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BackgroundRemoverConverter } from '@/components/converters/BackgroundRemoverConverter';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Zap, Shield, Download, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RemoveBackground = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Remove Background from Images – Free AI Tool | WordToImage.com</title>
        <meta name="description" content="Effortlessly remove image backgrounds using AI. Upload PNG/JPG & download transparent results in seconds. Try our free tool!" />
        <meta name="keywords" content="background remover, AI background removal, remove background, transparent background, image editing, transparent PNG, AI masking, background removal tool" />
        <link rel="canonical" href="https://wordtoimage.com/remove-background" />
        
        {/* Enhanced Open Graph */}
        <meta property="og:title" content="Free AI Background Remover Tool | WordToImage" />
        <meta property="og:description" content="Remove image backgrounds instantly with AI. Fast, free, and secure - no uploads needed. Download transparent PNG files." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordtoimage.com/remove-background" />
        <meta property="og:image" content="https://wordtoimage.com/og-background-remover.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free AI Background Remover Tool" />
        <meta name="twitter:description" content="Remove image backgrounds instantly with AI. Fast, free, and secure." />
        <meta name="twitter:image" content="https://wordtoimage.com/og-background-remover.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Background Remover",
            "applicationCategory": "ImageEditingApplication",
            "operatingSystem": "Web Browser",
            "description": "Free AI-powered background removal tool that processes images securely in your browser",
            "url": "https://wordtoimage.com/remove-background",
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
              "AI-powered background removal",
              "Browser-based processing",
              "PNG download with transparency",
              "No file uploads required",
              "Supports JPG, PNG, WebP formats"
            ]
          })}
        </script>
      </Helmet>

      <Nav />
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-6">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              Privacy First
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            AI Background Remover
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Remove image backgrounds in seconds with powerful AI. No uploads required - 
            everything processes securely in your browser.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="flex flex-col items-center p-4">
              <Zap className="w-8 h-8 text-primary mb-2" />
              <span className="text-sm font-medium">Lightning Fast</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium">100% Private</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <Download className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium">PNG Download</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <Sparkles className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium">AI Precision</span>
            </div>
          </div>
        </div>

        {/* Converter Component */}
        <BackgroundRemoverConverter />

        {/* How It Works */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">How Background Removal Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Your Image</h3>
              <p className="text-muted-foreground">Drag and drop or click to select your image. Supports PNG, JPG, and WebP formats up to 10MB.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Background Removal</h3>
              <p className="text-muted-foreground">Our advanced AI analyzes your image and precisely identifies the subject to remove the background with AI masking technology.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Download Transparent PNG</h3>
              <p className="text-muted-foreground">Download your image with a transparent background, perfect for social posts, e-commerce, and design projects.</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose Our AI Background Remover?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Privacy First Processing</h3>
                    <p className="text-muted-foreground">Your images never leave your browser. All background removal processing happens locally on your device for maximum privacy and security.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Professional Quality Results</h3>
                    <p className="text-muted-foreground">Get clean, precise cutouts perfect for product photos, portraits, and graphic design. Ideal for e-commerce and social media.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Instant Processing</h3>
                    <p className="text-muted-foreground">Remove backgrounds in seconds with our optimized AI. No waiting, no queues - just upload and get instant transparent PNGs.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Free & Unlimited</h3>
                    <p className="text-muted-foreground">Remove backgrounds from unlimited images at no cost. No sign-up required, no watermarks, no hidden fees.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="formats">
              <AccordionTrigger>What file types do you support?</AccordionTrigger>
              <AccordionContent>
                We support PNG, JPG, JPEG, and WebP image formats. Files can be up to 10MB in size. The output is always a transparent PNG file for maximum compatibility.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="accuracy">
              <AccordionTrigger>How accurate is the AI background removal?</AccordionTrigger>
              <AccordionContent>
                Our AI uses advanced segmentation models to achieve high accuracy in most cases. It works best with clear subjects and good contrast. For complex hair details or intricate edges, results may vary, but generally provide professional-quality cutouts.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="free">
              <AccordionTrigger>Are results free and downloadable?</AccordionTrigger>
              <AccordionContent>
                Yes! Our background remover is completely free with unlimited usage. Download your transparent PNG files immediately with no watermarks, registration, or hidden costs.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="privacy">
              <AccordionTrigger>Is my image data safe and private?</AccordionTrigger>
              <AccordionContent>
                Absolutely. All processing happens directly in your browser using WebGL acceleration. Your images are never uploaded to our servers, ensuring complete privacy and security of your data.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="usage">
              <AccordionTrigger>What can I use the transparent images for?</AccordionTrigger>
              <AccordionContent>
                Perfect for e-commerce product photos, social media posts, graphic design projects, presentations, and anywhere you need clean subject isolation. Great for creating professional-looking visuals quickly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-0">
              <h2 className="text-2xl font-bold text-foreground mb-4">Need More AI Tools?</h2>
              <p className="text-muted-foreground mb-6">
                Explore our complete suite of AI-powered image tools for all your creative needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/text-to-image" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Text to Image Generator
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/ai-upscaler" className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors">
                  AI Image Upscaler
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RemoveBackground;