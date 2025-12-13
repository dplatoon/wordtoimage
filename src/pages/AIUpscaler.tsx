import React, { useState, useRef } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Zap, Download, Image, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { ToolPageBackground } from '@/components/backgrounds/ToolPageBackground';

export default function AIUpscaler() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be under 10MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      setSelectedFile(file);
      toast.success('Image uploaded successfully!');
    }
  };

  const handleUpscale = () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setIsUpscaling(true);
    setProgress(0);

    // Enhanced demo simulation with clear messaging
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpscaling(false);
          setUpscaledImage('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'); // Demo placeholder
          toast.success('🎬 Demo Preview Complete!', {
            description: 'This shows our upcoming upscaling interface. Real AI upscaling will be available soon with actual image processing.'
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      fileInputRef.current.files = e.dataTransfer.files;
      handleFileSelect({ target: { files: e.dataTransfer.files } } as any);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ToolPageBackground variant="primary" />
      <Nav />
      
      <main className="container mx-auto px-4 py-12 flex-grow relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Zap className="text-primary mr-3 h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-glow">
              AI Image Upscaler
              <Badge className="ml-4 bg-primary/20 text-primary border border-primary/30 text-sm">DEMO ONLY</Badge>
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Enhance your images with AI-powered upscaling. Increase resolution up to 4x while preserving details and improving quality.
          </p>
          
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Badge className="bg-primary/20 text-primary border border-primary/30">DEMO ONLY</Badge>
              <span className="font-medium">Preview Interface</span>
            </div>
            <p className="text-primary/80 text-sm">
              This is a demonstration of the upscaling interface. Real AI upscaling functionality is in development. Results shown are sample images only.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4x</div>
              <div className="text-sm text-muted-foreground">Resolution boost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">AI</div>
              <div className="text-sm text-muted-foreground">Smart enhancement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">30s</div>
              <div className="text-sm text-muted-foreground">Processing time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">HD+</div>
              <div className="text-sm text-muted-foreground">Output quality</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-card/50"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {selectedFile ? (
                    <div className="space-y-4">
                      <CheckCircle className="h-12 w-12 text-primary mx-auto" />
                      <div>
                        <h3 className="font-medium text-foreground">{selectedFile.name}</h3>
                        <p className="text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => setSelectedFile(null)}>
                        Choose Different Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Image className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <h3 className="font-medium text-foreground">Drop your image here</h3>
                        <p className="text-muted-foreground">or click to browse</p>
                      </div>
                      <div className="text-xs text-muted-foreground/70">
                        Supports JPG, PNG, WebP • Max 10MB
                      </div>
                    </div>
                  )}
                </div>

                {selectedFile && !isUpscaling && !upscaledImage && (
                  <Button
                    onClick={handleUpscale}
                    size="lg"
                    variant="neon"
                    className="w-full mt-6"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Upscale Image
                  </Button>
                )}

                {isUpscaling && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Upscaling in progress...</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                )}

                {upscaledImage && (
                  <div className="mt-6 space-y-4">
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Upscaling Complete!</span>
                      </div>
                      <p className="text-primary/80 text-sm mt-1">
                        Your image has been enhanced and is ready for download.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" onClick={() => {
                        setSelectedFile(null);
                        setUpscaledImage(null);
                        setProgress(0);
                      }}>
                        Upscale Another
                      </Button>
                      <Button variant="neon">
                        <Download className="h-4 w-4 mr-2" />
                        Download HD
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Features & Information */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-foreground">Enhancement Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">AI Super Resolution</h4>
                      <p className="text-sm text-muted-foreground">Advanced neural networks enhance details intelligently</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Image className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Noise Reduction</h4>
                      <p className="text-sm text-muted-foreground">Removes artifacts while preserving important details</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Edge Enhancement</h4>
                      <p className="text-sm text-muted-foreground">Sharpens edges and improves overall clarity</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Best Results Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• Use high-quality source images when possible</p>
                  <p>• Works best with photos and realistic images</p>
                  <p>• Avoid heavily compressed or low-res sources</p>
                  <p>• Processing time depends on original image size</p>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link to="/text-to-image">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Generate New Images
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comparison Preview */}
        {upscaledImage && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-foreground">Before & After Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Badge variant="secondary" className="mb-2">Original</Badge>
                  <div className="bg-card/50 border border-border rounded-lg aspect-video flex items-center justify-center">
                    <span className="text-muted-foreground">Original Image Preview</span>
                  </div>
                </div>
                <div>
                  <Badge className="mb-2 bg-primary text-primary-foreground">Enhanced 4x</Badge>
                  <div className="bg-card/50 border border-border rounded-lg aspect-video flex items-center justify-center">
                    <span className="text-muted-foreground">Enhanced Image Preview</span>
                  </div>
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
