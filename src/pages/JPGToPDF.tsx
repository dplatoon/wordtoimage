
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { JPGToPDFConverter } from '@/components/converters/JPGToPDFConverter';
import { Image, FileText, Layers, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-white to-red-50">
      <Helmet>
        <title>Convert JPG to PDF Online Free – Fast & Secure | WordToImage</title>
        <meta name="description" content="Upload JPG, turn it into high-quality PDF in seconds. No signup, 100% secure. Try our free JPG→PDF converter now!" />
        <meta name="keywords" content="convert JPG to PDF online, JPG to PDF converter, images to PDF, merge images PDF, online PDF creator" />
        <link rel="canonical" href="https://wordtoimage.com/jpg-to-pdf" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "JPG to PDF Converter",
            "applicationCategory": "ConverterApplication",
            "operatingSystem": "Web Browser",
            "description": "Convert JPG images to PDF documents online. Fast, secure, and free converter.",
            "url": "https://wordtoimage.com/jpg-to-pdf",
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
              "Convert multiple images to PDF",
              "Batch processing support",
              "Custom page layouts",
              "No watermarks",
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
            Convert JPG to PDF Online Free – <span className="text-orange-600">Fast & Secure</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload JPG, turn it into high-quality PDF in seconds. No signup, 100% secure. Merge multiple images into professional PDF documents.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Image className="w-5 h-5 text-blue-500" />
              <span>Multiple Formats</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Layers className="w-5 h-5 text-green-500" />
              <span>Batch Processing</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Settings className="w-5 h-5 text-purple-500" />
              <span>Custom Layout</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FileText className="w-5 h-5 text-orange-500" />
              <span>High Quality PDF</span>
            </div>
          </div>
        </div>

        {/* Converter Component */}
        <div className="mb-16">
          <JPGToPDFConverter />
        </div>

        {/* How-to Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            How to Convert JPG to PDF
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Upload Images</h3>
                <p className="text-gray-600">Select JPG, PNG, or other image files from your device. Up to 20 images supported.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Arrange & Configure</h3>
                <p className="text-gray-600">Drag to reorder images. Choose page size, orientation, and layout options.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Download PDF</h3>
                <p className="text-gray-600">Get your professional PDF document instantly. No watermarks, completely free.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our JPG to PDF Converter
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Batch Processing</h3>
              <p className="text-gray-600">Upload and convert up to 20 images at once. Save time with bulk processing capabilities.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Layout</h3>
              <p className="text-gray-600">Choose page size, orientation, and margins. Fit multiple images per page as needed.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">High Quality</h3>
              <p className="text-gray-600">Maintain original image quality in PDF output. No compression loss or watermarks.</p>
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
            <Link to="/pdf-to-jpg" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-semibold">PDF to JPG</h3>
                <p className="text-sm text-gray-600">Extract images from PDF</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            <Link to="/word-to-jpg" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <Image className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-semibold">Word to JPG</h3>
                <p className="text-sm text-gray-600">Convert documents to images</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            <Link to="/jpg-to-word" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="font-semibold">JPG to Word</h3>
                <p className="text-sm text-gray-600">Extract text from images</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            <Link to="/remove-background" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <Image className="w-8 h-8 text-orange-500" />
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
