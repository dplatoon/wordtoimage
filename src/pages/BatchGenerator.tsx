
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Upload, Settings, Download, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SEOManager } from '@/components/seo/SEOManager';

const BatchGenerator = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOManager customConfig={{
        title: "Batch AI Image Generator - Create Multiple Images | WordToImage",
        description: "Generate multiple AI images at once with our batch processing tool. Perfect for creating variations, bulk content, and large-scale projects.",
        keywords: ["batch image generation", "bulk AI images", "multiple image creation", "AI batch processing", "mass image generation"]
      }} />
      
      <Nav />
      
      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Batch Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Generate multiple AI images simultaneously for maximum efficiency
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Prompt
                  </label>
                  <Textarea 
                    placeholder="Enter your base prompt that will be used for all generations..."
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variations (one per line)
                  </label>
                  <Textarea 
                    placeholder={`red background\nblue background\ngreen background\nsunset lighting\nstudio lighting`}
                    className="min-h-[150px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch Size
                  </label>
                  <Input type="number" defaultValue={5} min={1} max={50} />
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 bg-violet-600 hover:bg-violet-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Batch
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Preview Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview Queue</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Image {i}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Batch Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Images:</span>
                      <span>0/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Progress:</span>
                      <span>0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Time:</span>
                      <span>--</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-600">Generate multiple images in parallel for maximum speed</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexible Settings</h3>
              <p className="text-gray-600">Customize each variation with different parameters</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Bulk Download</h3>
              <p className="text-gray-600">Download all generated images as a convenient ZIP file</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BatchGenerator;
