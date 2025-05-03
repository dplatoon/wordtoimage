
import { StyleSelect } from './StyleSelect';
import { ResolutionSelect } from './ResolutionSelect';
import { CountSelect } from './CountSelect';
import { Separator } from '@/components/ui/separator';
import { ImageUploader } from './ImageUploader';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface GenerationControlsProps {
  style: string;
  resolution: string;
  count: number;
  onStyleChange: (style: string) => void;
  onResolutionChange: (resolution: string) => void;
  onCountChange: (count: string) => void;
  onSourceImageChange?: (imageData: string) => void;
}

export const GenerationControls = ({
  style,
  resolution,
  count,
  onStyleChange,
  onResolutionChange,
  onCountChange,
  onSourceImageChange = () => {},
}: GenerationControlsProps) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const isMobile = useIsMobile();

  const handleImageSelected = (imageData: string) => {
    onSourceImageChange(imageData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StyleSelect value={style} onChange={onStyleChange} />
        <ResolutionSelect value={resolution} onChange={onResolutionChange} isMobile={isMobile} />
        <CountSelect value={count} onChange={onCountChange} />
      </div>
      
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setShowImageUpload(!showImageUpload)}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
        >
          <span>{showImageUpload ? 'Hide' : 'Show'} Image-to-Image options</span>
        </button>
        <Separator className="flex-1 mx-4" />
      </div>
      
      {showImageUpload && (
        <ImageUploader onImageSelected={handleImageSelected} />
      )}
    </div>
  );
}
