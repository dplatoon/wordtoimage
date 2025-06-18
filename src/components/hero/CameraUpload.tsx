
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, Image as ImageIcon, X, Smartphone } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface CameraUploadProps {
  onImageCapture: (imageData: string) => void;
  disabled?: boolean;
}

export const CameraUpload = ({ onImageCapture, disabled = false }: CameraUploadProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      toast.error('Please capture or select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be smaller than 10MB');
      return;
    }

    setIsCapturing(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCapturedImage(result);
      onImageCapture(result);
      setIsCapturing(false);
      
      toast.success('Image captured successfully!', {
        description: 'Ready to transform your room with AI'
      });
    };
    
    reader.onerror = () => {
      toast.error('Failed to process image');
      setIsCapturing(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be smaller than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCapturedImage(result);
      onImageCapture(result);
      
      toast.success('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  const openFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setCapturedImage(null);
    onImageCapture('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    toast.success('Image removed');
  };

  if (capturedImage) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <img 
              src={capturedImage} 
              alt="Captured room" 
              className="w-20 h-20 object-cover rounded-lg border-2 border-green-300"
            />
            <div className="flex-1">
              <h4 className="font-medium text-green-800 mb-1">Image Ready for AI Transform</h4>
              <p className="text-sm text-green-600 mb-2">
                Your room photo is loaded and ready for AI-powered redesign
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={removeImage}
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  <X className="h-3 w-3 mr-1" />
                  Remove
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={openCamera}
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  <Camera className="h-3 w-3 mr-1" />
                  Retake
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              {isMobile ? <Camera className="h-8 w-8 text-purple-600" /> : <ImageIcon className="h-8 w-8 text-purple-600" />}
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {isMobile ? 'Capture Your Room' : 'Upload Room Photo'}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {isMobile 
              ? 'Take a photo of your room to get AI design suggestions' 
              : 'Upload a photo of your room for AI-powered redesign ideas'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isMobile && (
              <Button 
                onClick={openCamera}
                disabled={disabled || isCapturing}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Camera className="h-4 w-4 mr-2" />
                {isCapturing ? 'Processing...' : 'Take Photo'}
              </Button>
            )}
            
            <Button 
              onClick={openFileUpload}
              variant="outline"
              disabled={disabled || isCapturing}
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </div>

          {isMobile && (
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
              <Smartphone className="h-3 w-3" />
              <span>Camera optimized for iOS 16+ and Android</span>
            </div>
          )}
        </div>

        {/* Hidden file inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCameraCapture}
          className="hidden"
          disabled={disabled}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          disabled={disabled}
        />

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Supports PNG, JPG, WEBP • Max 10MB • Privacy protected
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
