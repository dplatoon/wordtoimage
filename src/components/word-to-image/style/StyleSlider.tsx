
import { IntensitySlider } from '../IntensitySlider';

interface StyleSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const StyleSlider = ({ value, onChange }: StyleSliderProps) => {
  return (
    <div className="mb-6">
      <IntensitySlider
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
