
import { useState, useRef } from 'react';
import { toast } from '@/components/ui/sonner';

interface UseCameraUploadProps {
  onImageCapture: (imageData: string) => void;
}

export const useCameraUpload = ({ onImageCapture }: UseCameraUploadProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please capture or select an image file');
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be smaller than 10MB');
      return false;
    }

    return true;
  };

  const processFile = (file: File, successMessage: string) => {
    if (!validateFile(file)) return;

    setIsCapturing(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCapturedImage(result);
      onImageCapture(result);
      setIsCapturing(false);
      
      toast.success(successMessage, {
        description: 'Ready to transform your room with AI'
      });
    };
    
    reader.onerror = () => {
      toast.error('Failed to process image');
      setIsCapturing(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file, 'Image captured successfully!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file, 'Image uploaded successfully!');
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

  return {
    capturedImage,
    isCapturing,
    fileInputRef,
    cameraInputRef,
    handleCameraCapture,
    handleFileUpload,
    openCamera,
    openFileUpload,
    removeImage
  };
};
