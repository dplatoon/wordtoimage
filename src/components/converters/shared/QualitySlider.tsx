
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface QualitySliderProps {
  quality: number;
  onQualityChange: (value: number[]) => void;
  min?: number;
  max?: number;
}

export function QualitySlider({ 
  quality, 
  onQualityChange, 
  min = 50, 
  max = 600 
}: QualitySliderProps) {
  const getQualityLabel = (dpi: number) => {
    if (dpi <= 100) return 'Web Quality';
    if (dpi <= 200) return 'Standard';
    if (dpi <= 400) return 'High Quality';
    return 'Print Quality';
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label htmlFor="quality-slider">
          Output Quality: {quality} DPI
        </Label>
        <span className="text-sm text-gray-500">
          {getQualityLabel(quality)}
        </span>
      </div>
      
      <Slider
        id="quality-slider"
        min={min}
        max={max}
        step={50}
        value={[quality]}
        onValueChange={onQualityChange}
        className="w-full"
      />
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Smaller file</span>
        <span>Larger file</span>
      </div>
    </div>
  );
}
