
import React from 'react';
import { CapturedImageDisplay } from './camera/CapturedImageDisplay';
import { CameraUploadInterface } from './camera/CameraUploadInterface';
import { useCameraUpload } from '@/hooks/useCameraUpload';

interface CameraUploadProps {
  onImageCapture: (imageData: string) => void;
  disabled?: boolean;
}

export const CameraUpload = ({ onImageCapture, disabled = false }: CameraUploadProps) => {
  const {
    capturedImage,
    isCapturing,
    fileInputRef,
    cameraInputRef,
    handleCameraCapture,
    handleFileUpload,
    openCamera,
    openFileUpload,
    removeImage
  } = useCameraUpload({ onImageCapture });

  if (capturedImage) {
    return (
      <CapturedImageDisplay
        imageUrl={capturedImage}
        onRemove={removeImage}
        onRetake={openCamera}
      />
    );
  }

  return (
    <>
      <CameraUploadInterface
        onCameraClick={openCamera}
        onFileUpload={openFileUpload}
        disabled={disabled}
        isCapturing={isCapturing}
      />
      
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
    </>
  );
};
