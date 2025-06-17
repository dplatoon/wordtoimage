import { memo, useState } from 'react';
import { StyleSelect } from './StyleSelect';
import { ResolutionSelect } from './ResolutionSelect';
import { CountSelect } from './CountSelect';
import { ImageUploader } from './ImageUploader';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Image } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface GenerationControlsProps {
  style: string;
  resolution: string;
  count: number;
  onStyleChange: (style: string) => void;
  onResolutionChange: (resolution: string) => void;
  onCountChange: (count: number) => void;
  onSourceImageChange?: (imageData: string) => void;
}

export const GenerationControls = memo(({
  style,
  resolution,
  count,
  onStyleChange,
  onResolutionChange,
  onCountChange,
  onSourceImageChange = () => {},
}: GenerationControlsProps) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [hasSourceImage, setHasSourceImage] = useState(false);
  const isMobile = useIsMobile();

  const handleImageSelected = (imageData: string) => {
    setHasSourceImage(!!imageData);
    onSourceImageChange(imageData);
    if (imageData) {
      // Auto-collapse the section when image is uploaded on mobile
      if (isMobile) {
        setShowImageUpload(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StyleSelect value={style} onChange={onStyleChange} />
        <ResolutionSelect value={resolution} onChange={onResolutionChange} isMobile={isMobile} />
        <CountSelect value={count} onChange={onCountChange} />
      </div>
      
      {/* Image-to-Image Section */}
      <Collapsible open={showImageUpload} onOpenChange={setShowImageUpload}>
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-between p-4 h-auto bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:from-purple-100 hover:to-blue-100 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                hasSourceImage ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
              }`}>
                <Image className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">
                  {hasSourceImage ? 'Image uploaded!' : 'Image-to-Image Generation'}
                </div>
                <div className="text-sm text-gray-600">
                  {hasSourceImage ? 'Click to change or remove image' : 'Transform an existing image with AI'}
                </div>
              </div>
            </div>
            {showImageUpload ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-4">
          <ImageUploader onImageSelected={handleImageSelected} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
});

GenerationControls.displayName = 'GenerationControls';
