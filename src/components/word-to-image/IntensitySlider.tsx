
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function IntensitySlider({ value, onChange }: IntensitySliderProps) {
  return (
    <div className="mb-6">
      <label htmlFor="styleIntensity" className="block mb-1 font-medium">
        Style Intensity: {value}%
      </label>
      <Slider
        id="styleIntensity"
        min={0}
        max={100}
        value={[value]}
        onValueChange={values => onChange(values[0])}
        className="w-full"
      />
    </div>
  );
}
