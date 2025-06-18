
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, Image as ImageIcon, Smartphone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CameraUploadInterfaceProps {
  onCameraClick: () => void;
  onFileUpload: () => void;
  disabled: boolean;
  isCapturing: boolean;
}

export const CameraUploadInterface = ({ 
  onCameraClick, 
  onFileUpload, 
  disabled, 
  isCapturing 
}: CameraUploadInterfaceProps) => {
  const isMobile = useIsMobile();

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
                onClick={onCameraClick}
                disabled={disabled || isCapturing}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Camera className="h-4 w-4 mr-2" />
                {isCapturing ? 'Processing...' : 'Take Photo'}
              </Button>
            )}
            
            <Button 
              onClick={onFileUpload}
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

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Supports PNG, JPG, WEBP • Max 10MB • Privacy protected
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
