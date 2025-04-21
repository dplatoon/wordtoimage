
import { Select } from '@/components/ui/select';
import { DEFAULT_STYLES, RESOLUTIONS, IMAGE_COUNTS } from './constants';

interface GenerationControlsProps {
  style: string;
  resolution: string;
  count: number;
  onStyleChange: (value: string) => void;
  onResolutionChange: (value: string) => void;
  onCountChange: (value: string) => void;
}

export const GenerationControls = ({
  style,
  resolution,
  count,
  onStyleChange,
  onResolutionChange,
  onCountChange
}: GenerationControlsProps) => {
  const dropdownClass = "rounded-md border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <div>
        <select value={style} onChange={(e) => onStyleChange(e.target.value)} className={dropdownClass} aria-label="Art Style">
          {DEFAULT_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <select value={count} onChange={(e) => onCountChange(e.target.value)} className={dropdownClass} aria-label="Number of Images">
          {IMAGE_COUNTS.map(n => <option key={n} value={n}>{n} image{n > 1 ? 's' : ''}</option>)}
        </select>
      </div>
      <div>
        <select value={resolution} onChange={(e) => onResolutionChange(e.target.value)} className={dropdownClass} aria-label="Resolution">
          {RESOLUTIONS.map(res => <option key={res} value={res}>{res}</option>)}
        </select>
      </div>
    </div>
  );
};
