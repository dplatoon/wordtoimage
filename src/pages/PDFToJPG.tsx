
import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { PDFToJPGConverter } from '@/components/converters/PDFToJPGConverter';
import { FileText, Download, Zap, Shield } from 'lucide-react';

export default function PDFToJPG() {
  const pageContent = {
    h1: "Convert PDF to JPG in 1 Click (No Watermarks)",
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
    },
    {
      question: "What browsers are supported?",
      answer: "Works on all modern browsers including Chrome, Firefox, Safari, and Edge."
    },
    {
      question: "Can I convert password-protected PDFs?",
      answer: "Currently, password-protected PDFs need to be unlocked before conversion. We're working on this feature."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <EnhancedSEOManager pageContent={pageContent} />
      <Nav />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Convert PDF to JPG in 1 Click <span className="text-blue-600">(No Watermarks)</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your PDF documents into high-quality JPG images instantly. Free, secure, and works in your browser.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <FileText className="w-5 h-5 text-blue-500" />
              <span>Up to 100MB</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="w-5 h-5 text-green-500" />
              <span>Fast Conversion</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-purple-500" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Download className="w-5 h-5 text-orange-500" />
              <span>ZIP Download</span>
            </div>
          </div>
        </div>

        {/* Converter Component */}
        <PDFToJPGConverter />

        {/* Features Section */}
        <section className="mt-16 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our PDF to JPG Converter
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">High-Quality Output</h3>
              <p className="text-gray-600">Convert PDFs to JPGs with customizable DPI settings from 50 to 600 for perfect quality control.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Private</h3>
              <p className="text-gray-600">All conversions happen locally in your browser. Your files never leave your device.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Instant conversion with no waiting time. Process multiple pages in seconds.</p>
            </div>
          </div>
        </section>

        {/* How-to Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            How to Convert PDF to JPG
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Upload PDF</h3>
                <p className="text-gray-600">Drag and drop your PDF file or click to browse. Files up to 100MB supported.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Choose Quality</h3>
                <p className="text-gray-600">Select your preferred DPI quality. Higher values for print, lower for web use.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Download JPGs</h3>
                <p className="text-gray-600">Get your converted JPG images instantly as individual files or ZIP archive.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
