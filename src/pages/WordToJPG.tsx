
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { WordToJPGConverter } from '@/components/converters/WordToJPGConverter';
import { FileText, Image, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function WordToJPG() {
  const pageContent = {
    h1: "Convert Word to JPG – Free Online Tool",
    h2Headings: [
      "How to Convert Word to JPG",
      "Why Convert Word Documents to Images",
      "Professional Features",
      "Frequently Asked Questions"
    ]
  };

  const faqData = [
    {
      question: "Which Word formats are supported?",
      answer: "We support .doc, .docx, and .rtf formats. Both older and newer Word document versions work perfectly."
    },
    {
      question: "Will my formatting be preserved?",
      answer: "Yes! Our converter maintains fonts, tables, images, and layout exactly as they appear in your Word document."
    },
    {
      question: "Can I convert documents with images and tables?",
      answer: "Absolutely. Complex documents with embedded images, tables, charts, and graphics are fully supported."
    },
    {
      question: "What's the maximum document size?",
      answer: "You can upload Word documents up to 50MB. This covers most typical business documents."
    },
    {
      question: "Do you support password-protected documents?",
      answer: "Currently, password-protected documents need to be unlocked before conversion. This feature is coming soon."
    },
    {
      question: "Can I choose the output image format?",
      answer: "Yes, you can convert to JPG or PNG format based on your needs. PNG preserves transparency if present."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Convert Word to JPG – Free Online Tool | WordToImage</title>
        <meta name="description" content="Convert Word documents (.doc, .docx) to high-quality JPG images while preserving formatting, fonts, and layout. Free and secure." />
        <meta name="keywords" content="convert Word to JPG, Word to image converter, DOCX to JPG, document to image, Word to picture" />
        <link rel="canonical" href="https://wordtoimage.online/word-to-jpg" />
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      <Nav />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-green-500/10 text-green-500 border-green-500/20">
                <FileText className="w-3 h-3 mr-1" />
                Document Converter
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-foreground">Convert Word to JPG</span>
                <br />
                <span className="bg-gradient-to-r from-green-500 to-primary bg-clip-text text-transparent">Free Online Tool</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Convert Word documents to high-quality JPG images while preserving formatting, fonts, and layout.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { icon: FileText, label: '.doc & .docx', color: 'text-primary' },
                  { icon: Image, label: 'JPG & PNG', color: 'text-green-500' },
                  { icon: Zap, label: 'Fast Processing', color: 'text-accent' },
                  { icon: Shield, label: 'Secure Upload', color: 'text-primary' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
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
          <WordToJPGConverter />
        </section>

        {/* How-to Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              How to Convert Word to JPG
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Upload Document', desc: 'Select your Word document (.doc or .docx) from your device. Up to 50MB supported.', color: 'bg-green-500' },
                { step: '2', title: 'Choose Settings', desc: 'Select output format (JPG/PNG) and enable "Preserve formatting" for best results.', color: 'bg-primary' },
                { step: '3', title: 'Download Images', desc: 'Get your converted images instantly. Multi-page documents create separate image files.', color: 'bg-accent' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className={`w-16 h-16 ${item.color} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Convert Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Why Convert Word Documents to Images
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { title: 'Easy Sharing', desc: 'Share documents as images on social media, websites, or messaging apps without formatting issues.', color: 'text-green-500' },
                { title: 'Universal Compatibility', desc: 'JPG images work on any device or platform, ensuring your content looks the same everywhere.', color: 'text-primary' },
                { title: 'Prevent Editing', desc: 'Convert documents to images to prevent unauthorized editing while maintaining visual appeal.', color: 'text-accent' },
                { title: 'Web Integration', desc: 'Embed document images directly into websites, presentations, or digital portfolios.', color: 'text-primary' },
              ].map((item) => (
                <Card key={item.title} className="p-6 bg-card/50 border-border hover:shadow-neon transition-all duration-300">
                  <h3 className={`text-xl font-semibold mb-3 ${item.color}`}>{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 rounded-xl border border-border px-6">
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
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              Try Our Other Converter Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { to: '/jpg-to-word', icon: FileText, title: 'JPG to Word', desc: 'Extract text from images', color: 'text-accent' },
                { to: '/pdf-to-jpg', icon: Image, title: 'PDF to JPG', desc: 'Extract images from PDF', color: 'text-primary' },
                { to: '/jpg-to-pdf', icon: FileText, title: 'JPG to PDF', desc: 'Combine images into PDF', color: 'text-accent' },
                { to: '/remove-background', icon: Image, title: 'Remove Background', desc: 'AI background removal', color: 'text-green-500' },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="group">
                  <Card className="p-4 bg-card/50 border-border hover:border-primary/50 hover:shadow-neon transition-all duration-300 flex items-center gap-3">
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
