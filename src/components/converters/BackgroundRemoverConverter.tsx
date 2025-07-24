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
      
      // Show appropriate processing message based on capabilities
      const webGPUSupported = await checkWebGPUSupport();
      const mobile = isMobileDevice();
      
      if (webGPUSupported && !mobile) {
        toast('Processing image with WebGPU acceleration...', {
          description: 'This should be fast with your browser\'s GPU acceleration.'
        });
      } else if (mobile) {
        toast('Processing image on mobile device...', {
          description: 'This may take longer on mobile devices. Please be patient.'
        });
      } else {
        toast('Processing image with CPU...', {
          description: 'This may take longer without GPU acceleration. Consider using Chrome or Edge for faster processing.'
        });
      }

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

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Show compatibility info banner */}
      {browserSupported === false && (
        <Card className="border-2 border-amber-200 bg-amber-50 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="text-amber-600 text-xl">⚠️</div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-amber-800 mb-1">Slower Processing Expected</h4>
                <p className="text-sm text-amber-700 mb-2">
                  Your browser will use CPU processing instead of GPU acceleration, which may be slower.
                </p>
                <p className="text-xs text-amber-600">
                  For faster processing, consider using Chrome or Edge with WebGPU enabled.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
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