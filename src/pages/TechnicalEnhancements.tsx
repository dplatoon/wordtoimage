import React from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdvancedImageEditor } from '@/components/image-editor/AdvancedImageEditor';
import { BatchProcessingEngine } from '@/components/batch/BatchProcessingEngine';
import { MobileOptimizationDashboard } from '@/components/mobile/MobileOptimizationDashboard';
import { 
  Edit3, 
  Layers, 
  Smartphone, 
  Zap,
  Settings,
  BarChart3
} from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const TechnicalEnhancements = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const handleEditImage = () => {
    // Use a sample image for demo
    setSelectedImageUrl('https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&auto=format');
    setIsEditorOpen(true);
  };

  const handleSaveEditedImage = (blob: Blob) => {
    // Handle saving the edited image
    console.log('Edited image saved:', blob);
    setIsEditorOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Technical Enhancements
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced tools for professional image editing, batch processing, API optimization, and mobile performance enhancement.
          </p>
        </div>

        {/* Feature Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleEditImage}>
            <CardContent className="p-6 text-center">
              <Edit3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Image Editor</h3>
              <p className="text-gray-600 text-sm">Professional editing tools with filters, effects, and drawing capabilities</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Layers className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Batch Processing</h3>
              <p className="text-gray-600 text-sm">Generate multiple images simultaneously with queue management</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">API Optimization</h3>
              <p className="text-gray-600 text-sm">Rate limiting, caching, and performance optimization</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Smartphone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Mobile Optimization</h3>
              <p className="text-gray-600 text-sm">Device detection, performance optimization, and mobile UI enhancement</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              <span className="hidden sm:inline">Image Editor</span>
            </TabsTrigger>
            <TabsTrigger value="batch" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">Batch Processing</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">API Optimization</span>
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span className="hidden sm:inline">Mobile Optimization</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5" />
                  Advanced Image Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Edit3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Image Editing</h3>
                  <p className="text-gray-600 mb-6">
                    Edit your AI-generated images with professional tools including crop, resize, filters, drawing, and text overlay.
                  </p>
                  <button
                    onClick={handleEditImage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Open Image Editor (Demo)
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Settings className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-medium">Filters & Effects</h4>
                    <p className="text-sm text-gray-600">Brightness, contrast, saturation, blur, and more</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Edit3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-medium">Drawing Tools</h4>
                    <p className="text-sm text-gray-600">Brush, eraser, shapes, and text overlay</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Layers className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h4 className="font-medium">Crop & Resize</h4>
                    <p className="text-sm text-gray-600">Precise cropping and resizing tools</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-medium">History & Undo</h4>
                    <p className="text-sm text-gray-600">Full edit history with undo/redo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="batch">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Batch Processing Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BatchProcessingEngine />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  API Optimization & Caching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Rate Limiting</h3>
                      <p className="text-gray-600 text-sm">
                        Intelligent rate limiting based on user plans with configurable limits and windows
                      </p>
                      <div className="mt-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">100</div>
                        <div className="text-xs text-gray-600">requests/hour (Pro)</div>
                      </div>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Smart Caching</h3>
                      <p className="text-gray-600 text-sm">
                        LRU cache with configurable TTL, prompt-based cache keys, and hit rate optimization
                      </p>
                      <div className="mt-4 text-center">
                        <div className="text-2xl font-bold text-green-600">85%</div>
                        <div className="text-xs text-gray-600">cache hit rate</div>
                      </div>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                      <Settings className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Performance Monitoring</h3>
                      <p className="text-gray-600 text-sm">
                        Real-time API metrics, response time tracking, and error monitoring
                      </p>
                      <div className="mt-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">250ms</div>
                        <div className="text-xs text-gray-600">avg response time</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">API Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Plan-based rate limiting</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Intelligent caching with TTL</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Background usage logging</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Cache management endpoints</span>
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Rate limit status API</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Error handling & retries</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Performance analytics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">HuggingFace integration</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-2">💡 API Optimization Benefits</h5>
                    <p className="text-blue-800 text-sm">
                      Our optimized API reduces response times by up to 60%, decreases server costs through intelligent caching, 
                      and provides better user experience with plan-appropriate rate limiting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mobile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile Optimization Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MobileOptimizationDashboard />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Editor Modal */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Image Editor</DialogTitle>
          </DialogHeader>
          {selectedImageUrl && (
            <AdvancedImageEditor
              imageUrl={selectedImageUrl}
              onSave={handleSaveEditedImage}
              onClose={() => setIsEditorOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default TechnicalEnhancements;