
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { PDFToJPGConverter } from '@/components/converters/PDFToJPGConverter';
import { FileText, Download, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PDFToJPG() {
  const pageContent = {
    h1: "Convert PDF to JPG – Free & Fast",
    h2Headings: [
      "How to Convert PDF to JPG",
      "Why Choose Our PDF to JPG Converter",
      "High-Quality Conversion Features",
      "Frequently Asked Questions"
    ]
  };

  const faqData = [
    {
      question: "How to convert scanned PDF to JPG?",
      answer: "Upload your scanned PDF file, select the desired quality (DPI), and click convert. Our tool handles both text and scanned PDFs."
    },
    {
      question: "What's the maximum file size supported?",
      answer: "You can upload PDF files up to 100MB. For larger files, try our desktop version for better performance."
    },
    {
      question: "Do you add watermarks to converted images?",
      answer: "No, we never add watermarks. Your converted JPG images are completely clean and professional."
    },
    {
      question: "What DPI quality should I choose?",
      answer: "For web use: 72-150 DPI. For print: 300-600 DPI. Higher DPI means better quality but larger file size."
    },
    {
      question: "Can I convert multiple pages at once?",
      answer: "Yes, multi-page PDFs are converted to separate JPG files and provided as a ZIP download."
    },
    {
      question: "Is my data secure during conversion?",
      answer: "All conversions happen in your browser. Your files never leave your device, ensuring complete privacy."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Convert PDF to JPG – Free & Fast | WordToImage</title>
        <meta name="description" content="Transform your PDF documents into high-quality JPG images instantly. Free, secure, and works in your browser. No watermarks!" />
        <meta name="keywords" content="convert PDF to JPG online, PDF to image converter, PDF to JPG free, extract images from PDF, PDF converter" />
        <link rel="canonical" href="https://wordtoimage.online/pdf-to-jpg" />
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      <Nav />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                <FileText className="w-3 h-3 mr-1" />
                PDF Converter Tool
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-foreground">Convert PDF to JPG</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Free & Fast</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Transform your PDF documents into high-quality JPG images instantly. Free, secure, and works in your browser.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { icon: FileText, label: 'Up to 100MB', color: 'text-primary' },
                  { icon: Zap, label: 'Fast Conversion', color: 'text-accent' },
                  { icon: Shield, label: '100% Secure', color: 'text-green-500' },
                  { icon: Download, label: 'ZIP Download', color: 'text-primary' },
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
          <PDFToJPGConverter />
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Why Choose Our PDF to JPG Converter
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: FileText, title: 'High-Quality Output', desc: 'Convert PDFs to JPGs with customizable DPI settings from 50 to 600 for perfect quality control.', color: 'bg-primary/20 text-primary' },
                { icon: Shield, title: '100% Private', desc: 'All conversions happen locally in your browser. Your files never leave your device.', color: 'bg-green-500/20 text-green-500' },
                { icon: Zap, title: 'Lightning Fast', desc: 'Instant conversion with no waiting time. Process multiple pages in seconds.', color: 'bg-accent/20 text-accent' },
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

        {/* How-to Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              How to Convert PDF to JPG
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Upload PDF', desc: 'Drag and drop your PDF file or click to browse. Files up to 100MB supported.', color: 'bg-primary' },
                { step: '2', title: 'Choose Quality', desc: 'Select your preferred DPI quality. Higher values for print, lower for web use.', color: 'bg-accent' },
                { step: '3', title: 'Download JPGs', desc: 'Get your converted JPG images instantly as individual files or ZIP archive.', color: 'bg-green-500' },
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
                { to: '/jpg-to-pdf', icon: FileText, title: 'JPG to PDF', desc: 'Combine images into PDF', color: 'text-primary' },
                { to: '/word-to-jpg', icon: FileText, title: 'Word to JPG', desc: 'Convert documents to images', color: 'text-green-500' },
                { to: '/jpg-to-word', icon: FileText, title: 'JPG to Word', desc: 'Extract text from images', color: 'text-accent' },
                { to: '/remove-background', icon: Shield, title: 'Remove Background', desc: 'AI background removal', color: 'text-primary' },
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
