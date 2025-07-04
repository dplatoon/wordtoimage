
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { JPGToWordConverter } from '@/components/converters/JPGToWordConverter';
import { Image, FileText, Zap, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-green-50">
      <Helmet>
        <title>Convert JPG to Word Online – Free OCR Tool | WordToImage</title>
        <meta name="description" content="Extract text from JPG images to editable Word documents using advanced OCR technology. Free, secure, and supports 100+ languages." />
        <meta name="keywords" content="convert JPG to Word online, JPG to Word OCR, image to text converter, OCR online, extract text from image" />
        <link rel="canonical" href="https://wordtoimage.com/jpg-to-word" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "JPG to Word OCR Converter",
            "applicationCategory": "OCRApplication",
            "operatingSystem": "Web Browser",
            "description": "Convert JPG images to editable Word documents using optical character recognition technology",
            "url": "https://wordtoimage.com/jpg-to-word",
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
              "OCR text extraction",
              "100+ languages supported",
              "Editable Word output",
              "High accuracy recognition",
              "Browser-based processing"
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
            Convert JPG to Word Online – <span className="text-purple-600">Free OCR Tool</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Extract text from JPG images to editable Word documents using advanced OCR technology. Free, secure, and supports 100+ languages.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Image className="w-5 h-5 text-blue-500" />
              <span>JPG, PNG, WEBP</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Eye className="w-5 h-5 text-green-500" />
              <span>OCR Technology</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FileText className="w-5 h-5 text-purple-500" />
              <span>Editable Word</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="w-5 h-5 text-orange-500" />
              <span>Multi-Language</span>
            </div>
          </div>
        </div>

        {/* Converter Component */}
        <div className="mb-16">
          <JPGToWordConverter />
        </div>

        {/* How-to Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            How to Convert JPG to Word
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
                <p className="text-gray-600">Select JPG, PNG, or other image files containing text from your device.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">OCR Processing</h3>
                <p className="text-gray-600">Advanced OCR technology analyzes and extracts text with 95%+ accuracy.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Download Word</h3>
                <p className="text-gray-600">Get your editable Word document instantly. Edit, format, and save as needed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our Converter
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">High Accuracy OCR</h3>
              <p className="text-gray-600">Advanced OCR technology achieves 95%+ accuracy on clear images with readable text.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100+ Languages</h3>
              <p className="text-gray-600">Support for over 100 languages including English, Chinese, Japanese, Arabic, and more.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Editable Output</h3>
              <p className="text-gray-600">Get fully editable Word documents that you can modify and format as needed.</p>
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
            Explore More Converter Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/word-to-jpg" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <FileText className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-semibold">Word to JPG</h3>
                <p className="text-sm text-gray-600">Convert documents to images</p>
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
              <Image className="w-8 h-8 text-purple-500" />
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
