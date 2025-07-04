
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { WordToJPGConverter } from '@/components/converters/WordToJPGConverter';
import { FileText, Image, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-white to-blue-50">
      <Helmet>
        <title>Convert Word to JPG – Free Online Tool | WordToImage</title>
        <meta name="description" content="Convert Word documents (.doc, .docx) to high-quality JPG images while preserving formatting, fonts, and layout. Free and secure." />
        <meta name="keywords" content="convert Word to JPG, Word to image converter, DOCX to JPG, document to image, Word to picture" />
        <link rel="canonical" href="https://wordtoimage.com/word-to-jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Word to JPG Converter",
            "applicationCategory": "ConverterApplication",
            "operatingSystem": "Web Browser",
            "description": "Convert Word documents to JPG images online while preserving formatting and layout",
            "url": "https://wordtoimage.com/word-to-jpg",
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
              "Convert DOC and DOCX files",
              "Preserve formatting and layout",
              "High-quality image output",
              "Multiple output formats",
              "Browser-based conversion"
            ]
          })}
        </script>
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      <Nav />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Convert Word to JPG – <span className="text-green-600">Free Online Tool</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Convert Word documents (.doc, .docx) to high-quality JPG images while preserving formatting, fonts, and layout. Free and secure.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <FileText className="w-5 h-5 text-blue-500" />
              <span>.doc & .docx</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Image className="w-5 h-5 text-green-500" />
              <span>JPG & PNG</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="w-5 h-5 text-orange-500" />
              <span>Fast Processing</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-purple-500" />
              <span>Secure Upload</span>
            </div>
          </div>
        </div>

        {/* Converter Component */}
        <WordToJPGConverter />

        {/* How-to Section */}
        <section className="mt-16 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            How to Convert Word to JPG
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Upload Document</h3>
                <p className="text-gray-600">Select your Word document (.doc or .docx) from your device. Up to 50MB supported.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Choose Settings</h3>
                <p className="text-gray-600">Select output format (JPG/PNG) and enable "Preserve formatting" for best results.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Download Images</h3>
                <p className="text-gray-600">Get your converted images instantly. Multi-page documents create separate image files.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Convert Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Convert Word Documents to Images
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-green-600">Easy Sharing</h3>
              <p className="text-gray-600">Share documents as images on social media, websites, or messaging apps without formatting issues.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Universal Compatibility</h3>
              <p className="text-gray-600">JPG images work on any device or platform, ensuring your content looks the same everywhere.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Prevent Editing</h3>
              <p className="text-gray-600">Convert documents to images to prevent unauthorized editing while maintaining visual appeal.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-orange-600">Web Integration</h3>
              <p className="text-gray-600">Embed document images directly into websites, presentations, or digital portfolios.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-md">
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
        </section>

        {/* Internal Links */}
        <section className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Try Our Other Converter Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/jpg-to-word" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="font-semibold">JPG to Word</h3>
                <p className="text-sm text-gray-600">Extract text from images</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            <Link to="/pdf-to-jpg" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <Image className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-semibold">PDF to JPG</h3>
                <p className="text-sm text-gray-600">Extract images from PDF</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            <Link to="/jpg-to-pdf" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <FileText className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="font-semibold">JPG to PDF</h3>
                <p className="text-sm text-gray-600">Combine images into PDF</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            <Link to="/remove-background" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <Image className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-semibold">Remove Background</h3>
                <p className="text-sm text-gray-600">AI background removal</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
