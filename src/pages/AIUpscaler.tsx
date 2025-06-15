
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Upload, ArrowUp, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOManager } from '@/components/seo/SEOManager';

const AIUpscaler = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOManager customConfig={{
        title: "AI Image Upscaler - Enhance Image Quality | WordToImage",
        description: "Enhance your images with AI-powered upscaling. Increase resolution up to 4x while maintaining quality. Perfect for improving low-resolution images.",
        keywords: ["AI upscaler", "image enhancement", "image quality improvement", "AI image enlargement", "photo upscaling", "free AI image upscaler online", "4x image resolution increase", "enhance low resolution photo with AI"]
      }} />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI Image Upscaler
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your images with AI-powered upscaling technology
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-violet-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Image</h3>
                  <p className="text-gray-600 mb-4">Drop your image here or click to browse</p>
                  <Button variant="outline">Choose File</Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upscale Factor
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">2x</Button>
                      <Button variant="outline" size="sm">3x</Button>
                      <Button variant="outline" size="sm">4x</Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enhancement Type
                    </label>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">General</Button>
                      <Button variant="outline" className="w-full justify-start">Photo</Button>
                      <Button variant="outline" className="w-full justify-start">Art/Illustration</Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-violet-600 hover:bg-violet-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Enhance Image
                </Button>
              </div>

              {/* Preview Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Before & After</h3>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg border flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                        <p className="text-sm text-gray-500">Original Image</p>
                        <p className="text-xs text-gray-400">1024 x 768</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <ArrowUp className="h-6 w-6 text-violet-600" />
                    </div>
                    
                    <div className="aspect-video bg-violet-50 rounded-lg border-2 border-violet-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-violet-200 rounded-lg mx-auto mb-2"></div>
                        <p className="text-sm text-violet-700">Enhanced Image</p>
                        <p className="text-xs text-violet-600">2048 x 1536</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Download Enhanced
                </Button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowUp className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4x Upscaling</h3>
              <p className="text-gray-600">Increase image resolution up to 4 times the original size</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Enhancement</h3>
              <p className="text-gray-600">Smart detail enhancement preserves and improves image quality</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
              <p className="text-gray-600">Support for JPG, PNG, WebP and other popular formats</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIUpscaler;
