
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { FileUploader } from './FileUploader';
import { Layers, X } from 'lucide-react';
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
        icon={<Layers className="w-12 h-12 text-primary" />}
        title="Upload Images for PDF"
        description="Drag and drop images here, or click to browse"
        supportText="Supports JPG, PNG, WEBP, GIF up to 10MB each (max 20 files)"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Images to Combine ({files.length}/{maxFiles})</h3>
        <Button
          variant="glass"
          size="sm"
          onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
          disabled={files.length >= maxFiles}
        >
          Add More Images
        </Button>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
        {files.map((file, index) => (
          <div key={index} className="relative group rounded-lg overflow-hidden border border-border">
            <img
              src={URL.createObjectURL(file)}
              alt={`Image ${index + 1}`}
              className="w-full h-20 object-cover"
            />
            <div className="absolute bottom-1 left-1 bg-background/80 text-foreground text-xs px-2 py-0.5 rounded">
              {index + 1}
            </div>
            <button
              onClick={() => onRemoveFile(index)}
              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
