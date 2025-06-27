
import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { JPGToPDFConverter } from '@/components/converters/JPGToPDFConverter';
import { Image, FileText, Layers, Settings } from 'lucide-react';

export default function JPGToPDF() {
  const pageContent = {
    h1: "Convert JPG to PDF | Combine Images into PDF",
    h2Headings: [
      "Merge Multiple Images into PDF",
      "Batch Processing Features",
      "PDF Customization Options",
      "Why Choose Our Tool"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-white to-red-50">
      <EnhancedSEOManager pageContent={pageContent} />
      <Nav />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Convert JPG to PDF | <span className="text-orange-600">Combine Images into PDF</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Merge multiple JPG, PNG, and other image files into a single PDF document. Perfect for creating photo albums, reports, and presentations.
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

        {/* Features Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our Tool
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Batch Processing</h3>
              <p className="text-gray-600">Upload and convert up to 20 images at once. Save time with bulk processing.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Layout</h3>
              <p className="text-gray-600">Choose page size, orientation, and margins. Fit multiple images per page.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">High Quality</h3>
              <p className="text-gray-600">Maintain original image quality in the PDF output. No compression loss.</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
