import React, { useState, useCallback } from 'react';
import { Upload, Download, RotateCcw, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileUploader } from './shared/FileUploader';
import { removeBackground, loadImage, checkWebGPUSupport, isMobileDevice } from '@/utils/backgroundRemoval';
import { toast } from 'sonner';

export function BackgroundRemoverConverter() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [browserSupported, setBrowserSupported] = useState<boolean | null>(null);

  // Check browser compatibility on mount
  React.useEffect(() => {
    const checkSupport = async () => {
      const webGPUSupported = await checkWebGPUSupport();
      const mobile = isMobileDevice();
      setBrowserSupported(webGPUSupported && !mobile);
    };
    checkSupport();
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      // Store original image
      const imageUrl = URL.createObjectURL(file);
      setOriginalImage(imageUrl);
      setFileName(file.name.replace(/\.[^/.]+$/, '') + '_no_bg.png');
      setProcessedImage(null);
      
      // Start processing
      setIsProcessing(true);
      toast('Processing image...', {
        description: 'Our AI is removing the background from your image.'
      });

      // Load image element for processing
      const img = await loadImage(file);
      
      // Remove background
      const processedBlob = await removeBackground(img);
      
      // Create URL for processed image
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImage(processedUrl);
      
      toast.success('Background removed successfully!', {
        description: 'Your image is ready for download.'
      });
    } catch (error) {
      console.error('Background removal failed:', error);
      toast.error('Failed to remove background', {
        description: 'Please try again with a different image or check your browser compatibility.'
      });
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setOriginalImage(null);
    setProcessedImage(null);
    setFileName('');
    setIsProcessing(false);
  }, []);

  const handleDownload = useCallback(() => {
    if (processedImage && fileName) {
      const a = document.createElement('a');
      a.href = processedImage;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success('Image downloaded!', {
        description: 'Your background-free image has been saved to your downloads.'
      });
    }
  }, [processedImage, fileName]);

  // Show compatibility warning if not supported
  if (browserSupported === false) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="border-2 border-destructive/50 bg-destructive/5">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="text-destructive text-6xl">⚠️</div>
              <h3 className="text-xl font-semibold text-destructive">Feature Not Available</h3>
              <p className="text-muted-foreground">
                Background removal requires WebGPU support and is not available on your current browser or device.
              </p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Supported browsers:</strong> Chrome 113+, Edge 113+ (with WebGPU enabled)</p>
                <p><strong>Note:</strong> Not available on mobile devices due to memory limitations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!originalImage ? (
        <Card className="border-2 border-dashed border-border">
          <CardContent className="p-0">
            <FileUploader
              onFileSelect={handleFileSelect}
              acceptedTypes={['image/png', 'image/jpeg', 'image/webp']}
              maxSize={10 * 1024 * 1024} // 10MB
              icon={<Upload className="w-12 h-12 text-muted-foreground" />}
              title="Upload Your Image"
              description="Drag and drop your image here, or click to browse"
              supportText="Supports PNG, JPG, and WebP files up to 10MB"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Image Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Image */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4 text-center">Original</h3>
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Processed Image */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  {isProcessing ? 'Processing...' : 'Background Removed'}
                </h3>
                <div className="aspect-square bg-transparent rounded-lg overflow-hidden flex items-center justify-center relative"
                     style={{
                       backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                       backgroundSize: '20px 20px',
                       backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                     }}>
                  {isProcessing ? (
                    <div className="flex flex-col items-center space-y-4">
                      <Loader className="w-8 h-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Processing with AI...</p>
                    </div>
                  ) : processedImage ? (
                    <img
                      src={processedImage}
                      alt="Background removed"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-muted-foreground text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <p>Processed image will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            
            <Button
              onClick={handleDownload}
              disabled={!processedImage || isProcessing}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}