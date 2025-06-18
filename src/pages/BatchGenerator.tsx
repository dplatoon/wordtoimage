
import React, { useState } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, Settings, Download, Grid3X3, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

export default function BatchGenerator() {
  const [prompts, setPrompts] = useState('');
  const [batchSize, setBatchSize] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleBatchGenerate = () => {
    const promptList = prompts.split('\n').filter(p => p.trim());
    
    if (promptList.length === 0) {
      toast.error('Please enter at least one prompt');
      return;
    }

    if (promptList.length > 10) {
      toast.error('Maximum 10 prompts allowed per batch');
      return;
    }

    setIsGenerating(true);
    toast.success(`Starting batch generation for ${promptList.length} prompts...`);
    
    // Simulate batch generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Batch generation completed!');
    }, 3000);
  };

  const examplePrompts = [
    'a serene mountain landscape at sunrise',
    'a futuristic city with flying cars',
    'a magical forest with glowing mushrooms',
    'an underwater scene with colorful coral'
  ].join('\n');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <Nav />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Grid3X3 className="text-blue-600 mr-3 h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Batch Generator
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Generate multiple AI images at once. Perfect for creating variations, testing different prompts, or building image collections efficiently.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">10x</div>
              <div className="text-sm text-gray-600">Faster than single generation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1-10</div>
              <div className="text-sm text-gray-600">Images per batch</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">Auto</div>
              <div className="text-sm text-gray-600">Organization & download</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Batch Configuration */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Batch Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="prompts" className="text-base font-medium">
                    Prompts (one per line)
                  </Label>
                  <Textarea
                    id="prompts"
                    placeholder={`Enter your prompts here, one per line:\n\n${examplePrompts}`}
                    value={prompts}
                    onChange={(e) => setPrompts(e.target.value)}
                    className="mt-2 min-h-[200px]"
                  />
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>{prompts.split('\n').filter(p => p.trim()).length} prompts entered</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPrompts(examplePrompts)}
                    >
                      Use Examples
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="batch-size" className="text-base font-medium">
                    Images per prompt
                  </Label>
                  <Input
                    id="batch-size"
                    type="number"
                    min="1"
                    max="4"
                    value={batchSize}
                    onChange={(e) => setBatchSize(parseInt(e.target.value) || 1)}
                    className="mt-2 w-24"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Generate 1-4 variations per prompt
                  </p>
                </div>

                <Button
                  onClick={handleBatchGenerate}
                  disabled={isGenerating || !prompts.trim()}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="h-5 w-5 mr-2 animate-spin" />
                      Generating Batch...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Generate Batch
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features & Tips */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Batch Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Grid3X3 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Multiple Variations</h4>
                      <p className="text-sm text-gray-600">Create 1-4 images per prompt automatically</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Download className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Bulk Download</h4>
                      <p className="text-sm text-gray-600">Download all generated images as a ZIP file</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Queue Processing</h4>
                      <p className="text-sm text-gray-600">Efficient processing with progress tracking</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>• Use similar themes for better batch coherence</p>
                  <p>• Start with 2-3 prompts to test quality</p>
                  <p>• Include style keywords for consistency</p>
                  <p>• Keep prompts under 100 characters each</p>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link to="/ai-templates">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Browse Prompt Templates
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section Placeholder */}
        {isGenerating && (
          <Card className="mt-8">
            <CardContent className="p-8">
              <div className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold mb-2">Processing Your Batch</h3>
                <p className="text-gray-600">Generating {prompts.split('\n').filter(p => p.trim()).length * batchSize} images...</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
