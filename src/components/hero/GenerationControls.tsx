
import { memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { DEFAULT_STYLES, RESOLUTIONS, IMAGE_COUNTS } from './constants';
import { Dispatch, SetStateAction } from 'react';

interface GenerationControlsProps {
  style: string;
  resolution: string;
  count: number;
  onStyleChange: Dispatch<SetStateAction<string>>;
  onResolutionChange: Dispatch<SetStateAction<string>>;
  onCountChange: (value: string) => void;
}

export const GenerationControls = memo(({
  style,
  resolution,
  count,
  onStyleChange,
  onResolutionChange,
  onCountChange
}: GenerationControlsProps) => {
  const isMobile = useIsMobile();
  
  const dropdownClass = "rounded-lg border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-sm";
  
  const labelClass = "block text-xs font-medium text-gray-600 mb-1 ml-1";

  return (
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3 mb-4`}>
      <div>
        <label htmlFor="style-select" className={labelClass}>Art Style</label>
        <select 
          id="style-select"
          value={style} 
          onChange={(e) => onStyleChange(e.target.value)} 
          className={dropdownClass} 
          aria-label="Art Style"
        >
          {DEFAULT_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      
      <div>
        <label htmlFor="count-select" className={labelClass}>Images</label>
        <select 
          id="count-select"
          value={count} 
          onChange={(e) => onCountChange(e.target.value)} 
          className={dropdownClass} 
          aria-label="Number of Images"
        >
          {IMAGE_COUNTS.map(n => <option key={n} value={n}>{n} image{n > 1 ? 's' : ''}</option>)}
        </select>
      </div>
      
      <div className={isMobile ? "col-span-2" : ""}>
        <label htmlFor="resolution-select" className={labelClass}>Resolution</label>
        <select 
          id="resolution-select"
          value={resolution} 
          onChange={(e) => onResolutionChange(e.target.value)} 
          className={dropdownClass} 
          aria-label="Resolution"
        >
          {RESOLUTIONS.map(res => <option key={res} value={res}>{res}</option>)}
        </select>
      </div>
    </div>
  );
});

// Add display name for better debugging
GenerationControls.displayName = 'GenerationControls';
