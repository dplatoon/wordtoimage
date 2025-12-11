
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { JPGToPDFConverter } from '@/components/converters/JPGToPDFConverter';
import { Image, FileText, Layers, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function JPGToPDF() {
  const pageContent = {
    h1: "Convert JPG to PDF Online Free – Fast & Secure",
    h2Headings: [
      "How to Convert JPG to PDF",
      "Why Choose Our JPG to PDF Converter",
      "Batch Processing Features",
      "Frequently Asked Questions"
    ]
  };

  const faqData = [
    {
      question: "How do I convert multiple JPG files to one PDF?",
      answer: "Simply upload multiple images at once, arrange them in your preferred order, and click convert. All images will be combined into a single PDF file."
    },
    {
      question: "What's the maximum file size limit?",
      answer: "You can upload up to 20 images with a total size of 100MB. Each individual image can be up to 25MB."
    },
    {
      question: "What image formats are supported?",
      answer: "We support JPG, PNG, WEBP, GIF, and BMP formats. All formats can be mixed in a single PDF conversion."
    },
    {
      question: "Can I customize the PDF layout?",
      answer: "Yes! Choose from various page sizes (A4, Letter, Legal), orientation (portrait/landscape), and images per page options."
    },
    {
      question: "Is my data secure during conversion?",
      answer: "Absolutely. All conversions happen in your browser. Your files never leave your device, ensuring complete privacy."
    },
    {
      question: "Do you add watermarks to the PDF?",
      answer: "No, we never add watermarks. Your converted PDF is completely clean and professional."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-neon-coral/5" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-neon-coral/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <Helmet>
        <title>Convert JPG to PDF Online Free – Fast & Secure | WordToImage</title>
        <meta name="description" content="Upload JPG, turn it into high-quality PDF in seconds. No signup, 100% secure. Try our free JPG→PDF converter now!" />
        <meta name="keywords" content="convert JPG to PDF online, JPG to PDF converter, images to PDF, merge images PDF, online PDF creator" />
        <link rel="canonical" href="https://wordtoimage.online/jpg-to-pdf" />
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      <Nav />
      
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              <Badge className="mb-6 bg-neon-coral/10 text-neon-coral border-neon-coral/20 shadow-neon-coral">
                <Image className="w-3 h-3 mr-1" />
                Image to PDF Tool
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                <span className="text-foreground">Convert JPG to PDF</span>
                <br />
                <span className="bg-gradient-to-r from-neon-coral via-primary to-neon-amber bg-clip-text text-transparent">Fast & Secure</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Merge multiple images into professional PDF documents. No signup, 100% secure processing in your browser.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { icon: Image, label: 'Multiple Formats', color: 'text-primary' },
                  { icon: Layers, label: 'Batch Processing', color: 'text-neon-coral' },
                  { icon: Settings, label: 'Custom Layout', color: 'text-green-500' },
                  { icon: FileText, label: 'High Quality PDF', color: 'text-neon-amber' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-card/30 border border-border/50 hover:border-primary/30 transition-colors">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Converter Component */}
        <section className="container mx-auto px-4 pb-16">
          <JPGToPDFConverter />
        </section>

        {/* How-to Section */}
        <section className="py-16 backdrop-blur-xl bg-card/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-neon-coral to-primary bg-clip-text text-transparent">
                How to Convert JPG to PDF
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Upload Images', desc: 'Select JPG, PNG, or other image files from your device. Up to 20 images supported.', color: 'bg-neon-coral shadow-neon-coral' },
                { step: '2', title: 'Arrange & Configure', desc: 'Drag to reorder images. Choose page size, orientation, and layout options.', color: 'bg-primary shadow-neon' },
                { step: '3', title: 'Download PDF', desc: 'Get your professional PDF document instantly. No watermarks, completely free.', color: 'bg-green-500' },
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
              <span className="bg-gradient-to-r from-neon-coral to-primary bg-clip-text text-transparent">
                Why Choose Our JPG to PDF Converter
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Layers, title: 'Batch Processing', desc: 'Upload and convert up to 20 images at once. Save time with bulk processing capabilities.', color: 'bg-primary/10 text-primary' },
                { icon: Settings, title: 'Custom Layout', desc: 'Choose page size, orientation, and margins. Fit multiple images per page as needed.', color: 'bg-neon-coral/10 text-neon-coral' },
                { icon: FileText, title: 'High Quality', desc: 'Maintain original image quality in PDF output. No compression loss or watermarks.', color: 'bg-green-500/10 text-green-500' },
              ].map((feature) => (
                <Card key={feature.title} className="p-6 backdrop-blur-xl bg-card/30 border-border/50 hover:border-primary/30 hover:shadow-neon transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 backdrop-blur-xl bg-card/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-neon-coral to-primary bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="backdrop-blur-xl bg-card/30 rounded-xl border border-border/50 px-6 hover:border-primary/30 transition-colors">
                    <AccordionTrigger className="py-4 text-left hover:no-underline">
                      <span className="text-lg font-semibold text-foreground">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-display font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-neon-coral to-primary bg-clip-text text-transparent">
                Try Our Other Converter Tools
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { to: '/pdf-to-jpg', icon: FileText, title: 'PDF to JPG', desc: 'Extract images from PDF', color: 'text-primary' },
                { to: '/word-to-jpg', icon: Image, title: 'Word to JPG', desc: 'Convert documents to images', color: 'text-green-500' },
                { to: '/jpg-to-word', icon: FileText, title: 'JPG to Word', desc: 'Extract text from images', color: 'text-neon-coral' },
                { to: '/remove-background', icon: Image, title: 'Remove Background', desc: 'AI background removal', color: 'text-neon-amber' },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="group">
                  <Card className="p-4 backdrop-blur-xl bg-card/30 border-border/50 hover:border-primary/30 hover:shadow-neon transition-all duration-300 flex items-center gap-3">
                    <link.icon className={`w-8 h-8 ${link.color}`} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{link.title}</h3>
                      <p className="text-sm text-muted-foreground">{link.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
