
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { JPGToWordConverter } from '@/components/converters/JPGToWordConverter';
import { Image, FileText, Zap, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function JPGToWord() {
  const pageContent = {
    h1: "Convert JPG to Word Online – Free OCR Tool",
    h2Headings: [
      "How to Convert JPG to Word",
      "OCR Technology Benefits",
      "Why Choose Our Converter",
      "Frequently Asked Questions"
    ]
  };

  const faqData = [
    {
      question: "What image formats can I convert to Word?",
      answer: "We support JPG, PNG, WEBP, GIF, and BMP formats. Our OCR technology works with both scanned documents and digital images containing text."
    },
    {
      question: "How accurate is the text extraction?",
      answer: "Our advanced OCR technology achieves 95%+ accuracy on clear, well-lit images. Accuracy depends on image quality and text clarity."
    },
    {
      question: "What languages are supported?",
      answer: "We support over 100 languages including English, Spanish, French, German, Chinese, Japanese, Arabic, and many more."
    },
    {
      question: "Can I edit the extracted text?",
      answer: "Yes! The output is a fully editable Word document (.docx) that you can modify, format, and save using Microsoft Word or compatible editors."
    },
    {
      question: "What's the maximum file size?",
      answer: "You can upload images up to 25MB. For best results, use high-resolution images with clear, readable text."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All processing happens in your browser. Your images and extracted text never leave your device."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Convert JPG to Word Online – Free OCR Tool | WordToImage</title>
        <meta name="description" content="Extract text from JPG images to editable Word documents using advanced OCR technology. Free, secure, and supports 100+ languages." />
        <meta name="keywords" content="convert JPG to Word online, JPG to Word OCR, image to text converter, OCR online, extract text from image" />
        <link rel="canonical" href="https://wordtoimage.online/jpg-to-word" />
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      <Nav />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
                <Eye className="w-3 h-3 mr-1" />
                OCR Technology
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-foreground">Convert JPG to Word</span>
                <br />
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Free OCR Tool</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Extract text from JPG images to editable Word documents using advanced OCR technology. Supports 100+ languages.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { icon: Image, label: 'JPG, PNG, WEBP', color: 'text-primary' },
                  { icon: Eye, label: 'OCR Technology', color: 'text-accent' },
                  { icon: FileText, label: 'Editable Word', color: 'text-green-500' },
                  { icon: Zap, label: 'Multi-Language', color: 'text-primary' },
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
          <JPGToWordConverter />
        </section>

        {/* How-to Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              How to Convert JPG to Word
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Upload Image', desc: 'Select JPG, PNG, or other image files containing text from your device.', color: 'bg-accent' },
                { step: '2', title: 'OCR Processing', desc: 'Advanced OCR technology analyzes and extracts text with 95%+ accuracy.', color: 'bg-primary' },
                { step: '3', title: 'Download Word', desc: 'Get your editable Word document instantly. Edit, format, and save as needed.', color: 'bg-green-500' },
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

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Why Choose Our Converter
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Eye, title: 'High Accuracy OCR', desc: 'Advanced OCR technology achieves 95%+ accuracy on clear images with readable text.', color: 'bg-primary/20 text-primary' },
                { icon: Zap, title: '100+ Languages', desc: 'Support for over 100 languages including English, Chinese, Japanese, Arabic, and more.', color: 'bg-accent/20 text-accent' },
                { icon: FileText, title: 'Editable Output', desc: 'Get fully editable Word documents that you can modify and format as needed.', color: 'bg-green-500/20 text-green-500' },
              ].map((feature) => (
                <Card key={feature.title} className="p-6 bg-card/50 border-border hover:shadow-neon transition-all duration-300 group">
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
              Explore More Converter Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { to: '/word-to-jpg', icon: FileText, title: 'Word to JPG', desc: 'Convert documents to images', color: 'text-green-500' },
                { to: '/pdf-to-jpg', icon: Image, title: 'PDF to JPG', desc: 'Extract images from PDF', color: 'text-primary' },
                { to: '/jpg-to-pdf', icon: FileText, title: 'JPG to PDF', desc: 'Combine images into PDF', color: 'text-accent' },
                { to: '/remove-background', icon: Image, title: 'Remove Background', desc: 'AI background removal', color: 'text-primary' },
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
