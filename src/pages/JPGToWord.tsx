
import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { JPGToWordConverter } from '@/components/converters/JPGToWordConverter';
import { Image, FileText, Zap, Eye } from 'lucide-react';

export default function JPGToWord() {
  const pageContent = {
    h1: "Extract Text from Images to Editable Word Docs",
    h2Headings: [
      "How JPG to Word Conversion Works",
      "OCR Technology Benefits",
      "Supported Languages",
      "Common Use Cases"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-green-50">
      <EnhancedSEOManager pageContent={pageContent} />
      <Nav />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Extract Text from Images to <span className="text-purple-600">Editable Word Docs</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Convert JPG, PNG, and other images containing text into fully editable Word documents using advanced OCR technology.
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

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            How JPG to Word Conversion Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
              <p className="text-gray-600 text-sm">Select images containing text from your device</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold mb-2">OCR Processing</h3>
              <p className="text-gray-600 text-sm">Advanced OCR extracts text with high accuracy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold mb-2">Text Recognition</h3>
              <p className="text-gray-600 text-sm">Recognizes multiple languages and formats</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold mb-2">Download Word</h3>
              <p className="text-gray-600 text-sm">Get editable Word document instantly</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Common Use Cases
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Digitize Documents</h3>
              <p className="text-gray-600">Convert scanned documents, receipts, and forms into editable text.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-green-600">Extract Screenshots</h3>
              <p className="text-gray-600">Turn screenshots of text into editable Word documents for easy editing.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Archive Photos</h3>
              <p className="text-gray-600">Extract text from photos of books, notes, and handwritten content.</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
