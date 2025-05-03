
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { upload, image as imageIcon, x } from 'lucide-react';
import { trackEvent, events } from '@/utils/analytics';

interface ImageUploaderProps {
  onImageSelected: (imageData: string) => void;
  disabled?: boolean;
}

export function ImageUploader({ onImageSelected, disabled = false }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be smaller than 10MB');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewUrl(result);
      onImageSelected(result);
      setIsLoading(false);
      
      trackEvent(events.IMAGE_UPLOADED, {
        fileType: file.type,
        fileSize: file.size
      });
    };
    
    reader.onerror = () => {
      toast.error('Failed to read the image file');
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelected('');
  };

  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium text-gray-700">Image to Image Generation</div>
      
      <div className="border border-gray-300 rounded-md p-2 bg-white">
        {!previewUrl ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-md h-32 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={handleUploadClick}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
              disabled={disabled}
            />
            <upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Click to upload an image</span>
            <span className="text-xs text-gray-400 mt-1">or drag and drop</span>
          </div>
        ) : (
          <div className="relative h-32 rounded-md overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="w-full h-full" />
              </div>
            )}
            <img 
              src={previewUrl} 
              alt="Uploaded" 
              className="h-full w-full object-contain"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-80 hover:opacity-100"
              onClick={handleRemoveImage}
            >
              <x className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-500 mt-1 flex items-center">
        <imageIcon className="h-3 w-3 mr-1 inline" />
        <span>For best results, use clear images with good lighting</span>
      </div>
    </div>
  );
}
