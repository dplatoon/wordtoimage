import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BackgroundRemover } from '@/components/converters/BackgroundRemover';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Zap, Shield, Download, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RemoveBackground = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-coral/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <Helmet>
        <title>Remove Background from Images – Free AI Tool | WordToImage</title>
        <meta name="description" content="Effortlessly remove image backgrounds using AI. Upload PNG/JPG & download transparent results in seconds. Try our free tool!" />
        <meta name="keywords" content="background remover, AI background removal, remove background, transparent background, image editing, transparent PNG, AI masking, background removal tool" />
        <link rel="canonical" href="https://wordtoimage.online/remove-background" />
      </Helmet>

      <Nav />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              <div className="flex justify-center gap-2 mb-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 shadow-neon">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  <Shield className="w-3 h-3 mr-1" />
                  Privacy First
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                <span className="text-foreground">AI Background</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-neon-coral to-neon-amber bg-clip-text text-transparent">Remover</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Remove image backgrounds in seconds with powerful AI. No uploads required - 
                everything processes securely in your browser.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { icon: Zap, label: 'Lightning Fast', color: 'text-primary' },
                  { icon: Shield, label: '100% Private', color: 'text-green-500' },
                  { icon: Download, label: 'PNG Download', color: 'text-neon-coral' },
                  { icon: Sparkles, label: 'AI Precision', color: 'text-neon-amber' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center p-4 rounded-xl backdrop-blur-xl bg-card/30 border border-border/50 hover:border-primary/30 transition-colors">
                    <item.icon className={`w-8 h-8 ${item.color} mb-2`} />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Converter Component */}
        <section className="container mx-auto px-4 pb-16">
          <BackgroundRemover />
        </section>

        {/* How It Works */}
        <section className="py-16 backdrop-blur-xl bg-card/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-primary to-neon-coral bg-clip-text text-transparent">
                How Background Removal Works
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Upload Your Image', desc: 'Drag and drop or click to select your image. Supports PNG, JPG, and WebP formats up to 10MB.', color: 'bg-primary shadow-neon' },
                { step: '2', title: 'AI Background Removal', desc: 'Our advanced AI analyzes your image and precisely identifies the subject to remove the background.', color: 'bg-neon-coral shadow-neon-coral' },
                { step: '3', title: 'Download Transparent PNG', desc: 'Download your image with a transparent background, perfect for social posts and design projects.', color: 'bg-green-500' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className={`w-16 h-16 ${item.color} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-primary to-neon-coral bg-clip-text text-transparent">
                Why Choose Our AI Background Remover?
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { title: 'Privacy First Processing', desc: 'Your images never leave your browser. All background removal processing happens locally on your device for maximum privacy and security.' },
                { title: 'Professional Quality Results', desc: 'Get clean, precise cutouts perfect for product photos, portraits, and graphic design. Ideal for e-commerce and social media.' },
                { title: 'Instant Processing', desc: 'Remove backgrounds in seconds with our optimized AI. No waiting, no queues - just upload and get instant transparent PNGs.' },
                { title: 'Free & Unlimited', desc: 'Remove backgrounds from unlimited images at no cost. No sign-up required, no watermarks, no hidden fees.' },
              ].map((item) => (
                <Card key={item.title} className="p-6 backdrop-blur-xl bg-card/30 border-border/50 hover:border-primary/30 hover:shadow-neon transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 backdrop-blur-xl bg-card/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-primary to-neon-coral bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  { q: 'What file types do you support?', a: 'We support PNG, JPG, JPEG, and WebP image formats. Files can be up to 10MB in size. The output is always a transparent PNG file for maximum compatibility.' },
                  { q: 'How accurate is the AI background removal?', a: 'Our AI uses advanced segmentation models to achieve high accuracy in most cases. It works best with clear subjects and good contrast.' },
                  { q: 'Are results free and downloadable?', a: 'Yes! Our background remover is completely free with unlimited usage. Download your transparent PNG files immediately with no watermarks.' },
                  { q: 'Is my image data safe and private?', a: 'Absolutely. All processing happens directly in your browser using WebGL acceleration. Your images are never uploaded to our servers.' },
                  { q: 'What can I use the transparent images for?', a: 'Perfect for e-commerce product photos, social media posts, graphic design projects, presentations, and anywhere you need clean subject isolation.' },
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="backdrop-blur-xl bg-card/30 rounded-xl border border-border/50 px-6 hover:border-primary/30 transition-colors">
                    <AccordionTrigger className="py-4 text-left hover:no-underline">
                      <span className="text-lg font-semibold text-foreground">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <p className="text-muted-foreground">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="p-8 backdrop-blur-xl bg-gradient-to-r from-primary/10 to-neon-coral/10 border-primary/20 max-w-3xl mx-auto text-center">
              <CardContent className="p-0">
                <h2 className="text-2xl font-display font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary to-neon-coral bg-clip-text text-transparent">
                    Need More AI Tools?
                  </span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Explore our complete suite of AI-powered image tools for all your creative needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/text-to-image" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium shadow-neon">
                    Text to Image Generator
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link to="/ai-enhance" className="inline-flex items-center justify-center px-6 py-3 backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl hover:border-primary/30 transition-colors font-medium text-foreground">
                    AI Image Enhancer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RemoveBackground;
