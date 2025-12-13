
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string[];
  maxSize: number;
  icon?: React.ReactNode;
  title: string;
  description: string;
  supportText: string;
}

export function FileUploader({
  onFileSelect,
  acceptedTypes,
  maxSize,
  icon,
  title,
  description,
  supportText
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`text-center p-12 cursor-pointer transition-all duration-300 rounded-xl border-2 border-dashed ${
        isDragActive 
          ? 'border-primary bg-primary/10' 
          : 'border-border hover:border-primary/50 hover:bg-secondary/30'
      }`}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center space-y-4">
        {icon || <Upload className="w-12 h-12 text-muted-foreground" />}
        
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4">
            {description}
          </p>
          <p className="text-sm text-muted-foreground/70">
            {supportText}
          </p>
        </div>
      </div>
    </div>
  );
}
