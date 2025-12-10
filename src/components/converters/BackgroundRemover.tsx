import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileUploader } from './shared/FileUploader';
import { ProgressBar } from './shared/ProgressBar';
import { DownloadButton } from './shared/DownloadButton';
import { Image, Wand2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Lightweight background removal implementation
const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    console.log('Starting background removal process...');
    
    // Create canvas for processing
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Set canvas dimensions
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    
    // Draw image to canvas
    ctx.drawImage(imageElement, 0, 0);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Simple edge detection background removal
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Simple background detection (white/light backgrounds)
      const brightness = (r + g + b) / 3;
      const isBackground = brightness > 240 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20;
      
      if (isBackground) {
        data[i + 3] = 0; // Set alpha to 0 (transparent)
      }
    }
    
    // Put processed image data back
    ctx.putImageData(imageData, 0, 0);
    
    // Convert to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedImage, setProcessedImage] = useState<string>('');

  const handleFileSelect = useCallback((selectedFile: File) => {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!supportedTypes.includes(selectedFile.type)) {
      toast.error('Please select an image file (JPG, PNG, or WEBP)');
      return;
    }
    
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size too large. Maximum 10MB allowed.');
      return;
    }
    
    setFile(selectedFile);
    setProcessedImage('');
    toast.success('Image loaded successfully!');
  }, []);

  const processImage = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    try {
      setProgress(20);
      
      // Load image
      const img = await loadImage(file);
      setProgress(40);
      
      // Remove background
      const processedBlob = await removeBackground(img);
      setProgress(80);
      
      // Create download URL
      const url = URL.createObjectURL(processedBlob);
      setProcessedImage(url);
      
      setProgress(100);
      toast.success('Background removed successfully!');
      
      // Track event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "tool_used",
          tool_name: "Background-Remover",
          file_size: `${Math.round(file.size / 1024 / 1024)}MB`,
        });
      }
      
    } catch (error) {
      console.error('Background removal error:', error);
      toast.error('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Download started!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-8">
          {!file ? (
            <FileUploader
              onFileSelect={handleFileSelect}
              acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
              maxSize={10 * 1024 * 1024}
              icon={<Image className="w-12 h-12 text-primary" />}
              title="Upload Image for Background Removal"
              description="Drag and drop your image here, or click to browse"
              supportText="Supports JPG, PNG, WEBP up to 10MB"
            />
          ) : (
            <div className="space-y-6">
              {/* File Info */}
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Image className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => setFile(null)}
                >
                  Change File
                </Button>
              </div>

              {/* Process Button */}
              <Button
                onClick={processImage}
                disabled={isProcessing}
                variant="neon"
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Removing Background...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Remove Background
                  </>
                )}
              </Button>

              {/* Progress */}
              {isProcessing && (
                <ProgressBar 
                  progress={progress} 
                  label="Processing image..."
                />
              )}

              {/* Results */}
              {processedImage && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">Background Removed Successfully!</h3>
                    <DownloadButton
                      onDownload={handleDownload}
                      filename="background-removed.png"
                    />
                  </div>
                  
                  {/* Preview */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Original</h4>
                      <div className="rounded-xl overflow-hidden border border-border">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Original"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Background Removed</h4>
                      <div className="relative rounded-xl overflow-hidden border border-border">
                        <div 
                          className="absolute inset-0"
                          style={{
                            backgroundImage: 'linear-gradient(45deg, hsl(var(--secondary)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--secondary)) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, hsl(var(--secondary)) 75%), linear-gradient(-45deg, transparent 75%, hsl(var(--secondary)) 75%)',
                            backgroundSize: '20px 20px',
                            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                          }}
                        />
                        <img
                          src={processedImage}
                          alt="Background Removed"
                          className="relative w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
