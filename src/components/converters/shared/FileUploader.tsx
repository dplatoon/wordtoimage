
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
      className={`text-center p-12 cursor-pointer transition-colors ${
        isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center space-y-4">
        {icon || <Upload className="w-12 h-12 text-gray-400" />}
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-4">
            {description}
          </p>
          <p className="text-sm text-gray-500">
            {supportText}
          </p>
        </div>
      </div>
    </div>
  );
}
