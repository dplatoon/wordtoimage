import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BackgroundRemoverConverter } from '@/components/converters/BackgroundRemoverConverter';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Download, Sparkles } from 'lucide-react';

const RemoveBackground = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Free AI Background Remover – WordToImage.com</title>
        <meta name="description" content="Easily remove backgrounds from your images using advanced AI. Fast, free, and high-quality output with WordToImage." />
        <meta name="keywords" content="background remover, AI background removal, remove background, transparent background, image editing" />
        <link rel="canonical" href="https://wordtoimage.com/remove-background" />
      </Helmet>

      <Nav />
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-6">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              Privacy First
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            AI Background Remover
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Remove image backgrounds in seconds with powerful AI. No uploads required - 
            everything processes securely in your browser.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="flex flex-col items-center p-4">
              <Zap className="w-8 h-8 text-primary mb-2" />
              <span className="text-sm font-medium">Lightning Fast</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium">100% Private</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <Download className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium">PNG Download</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <Sparkles className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium">AI Precision</span>
            </div>
          </div>
        </div>

        {/* Converter Component */}
        <BackgroundRemoverConverter />

        {/* How It Works */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Your Image</h3>
              <p className="text-muted-foreground">Drag and drop or click to select your image. Supports PNG, JPG, and WebP formats.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Processing</h3>
              <p className="text-muted-foreground">Our advanced AI analyzes your image and precisely identifies the subject to remove the background.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Download Result</h3>
              <p className="text-muted-foreground">Download your image with a transparent background, ready to use in your projects.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RemoveBackground;