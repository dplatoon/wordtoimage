
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Upload, Image as ImageIcon, X, Wand2, Info } from 'lucide-react';
import { trackEvent, events } from '@/utils/analytics';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ImageUploaderProps {
  onImageSelected: (imageData: string) => void;
  disabled?: boolean;
}

export function ImageUploader({ onImageSelected, disabled = false }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = useCallback((file: File) => {
    // Validate file type
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file (PNG, JPG, WEBP)');
      return false;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be smaller than 10MB');
      return false;
    }

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewUrl(result);
      onImageSelected(result);
      setIsLoading(false);
      
      trackEvent(events.IMAGE_LOADED, {
        fileType: file.type,
        fileSize: file.size
      });
      
      toast.success('Image uploaded successfully!', {
        description: 'Your image is ready for AI transformation'
      });
    };
    
    reader.onerror = () => {
      toast.error('Failed to read the image file');
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
    return true;
  }, [onImageSelected]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    validateAndProcessFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  }, [validateAndProcessFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelected('');
    toast.success('Image removed');
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-2">
        <Wand2 className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">Image-to-Image Generation</h3>
      </div>
      
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Upload an image and describe how you want to transform it. Our AI will use your image as a starting point.
        </AlertDescription>
      </Alert>
      
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-white transition-all duration-200 hover:border-purple-400 hover:bg-purple-50/50">
        {!previewUrl ? (
          <div 
            className={`flex flex-col items-center justify-center py-8 cursor-pointer transition-all duration-200 ${
              isDragOver ? 'bg-purple-100 border-purple-500' : ''
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={!disabled ? handleUploadClick : undefined}
            onDrop={!disabled ? handleDrop : undefined}
            onDragOver={!disabled ? handleDragOver : undefined}
            onDragLeave={!disabled ? handleDragLeave : undefined}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
              disabled={disabled}
            />
            
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-purple-600" />
            </div>
            
            <h4 className="text-lg font-medium text-gray-800 mb-2">
              Drop your image here or click to upload
            </h4>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              Supports PNG, JPG, WEBP • Max 10MB
            </p>
            
            {isDragOver && (
              <div className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
                Release to upload
              </div>
            )}
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <Skeleton className="w-full h-full" />
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Upload preview" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleUploadClick}
                      className="bg-white text-gray-800 hover:bg-gray-100"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Replace
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex items-start space-x-2 text-sm text-gray-600">
        <ImageIcon className="h-4 w-4 mt-0.5 text-purple-600" />
        <div>
          <p className="font-medium">Tips for best results:</p>
          <ul className="mt-1 space-y-1 text-xs">
            <li>• Use clear, well-lit images</li>
            <li>• Describe specific changes you want</li>
            <li>• Try prompts like "make it more colorful" or "change to cartoon style"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
