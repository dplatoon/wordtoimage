
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { FileUploader } from './FileUploader';
import { Layers } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ImageUploadAreaProps {
  files: File[];
  onFileSelect: (file: File) => void;
  onRemoveFile: (index: number) => void;
  maxFiles?: number;
}

export function ImageUploadArea({ 
  files, 
  onFileSelect, 
  onRemoveFile, 
  maxFiles = 20 
}: ImageUploadAreaProps) {
  const handleFileSelect = useCallback((file: File) => {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    
    if (!supportedTypes.includes(file.type)) {
      toast.error('Please select an image file (JPG, PNG, WEBP, or GIF)');
      return;
    }
    
    if (files.length >= maxFiles) {
      toast.error(`Maximum ${maxFiles} images allowed in batch mode`);
      return;
    }
    
    onFileSelect(file);
    toast.success('Image added successfully!');
  }, [files.length, maxFiles, onFileSelect]);

  if (files.length === 0) {
    return (
      <FileUploader
        onFileSelect={handleFileSelect}
        acceptedTypes={['image/jpeg', 'image/png', 'image/webp', 'image/gif']}
        maxSize={10 * 1024 * 1024}
        icon={<Layers className="w-12 h-12 text-orange-500" />}
        title="Upload Images for PDF"
        description="Drag and drop images here, or click to browse"
        supportText="Supports JPG, PNG, WEBP, GIF up to 10MB each (max 20 files)"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Images to Combine ({files.length}/{maxFiles})</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
          disabled={files.length >= maxFiles}
        >
          Add More Images
        </Button>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
        {files.map((file, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(file)}
              alt={`Image ${index + 1}`}
              className="w-full h-20 object-cover rounded border"
            />
            <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
              {index + 1}
            </div>
            <button
              onClick={() => onRemoveFile(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
