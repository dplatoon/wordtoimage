
import { IMAGE_COUNTS } from '../../constants';
import { Label } from '@/components/ui/label';

interface CountSelectProps {
  value: number;
  onChange: (value: string) => void;
}

export const CountSelect = ({ value, onChange }: CountSelectProps) => {
  const labelClass = "block text-xs font-medium text-gray-600 mb-1 ml-1";
  const dropdownClass = "rounded-lg border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-sm w-full";

  return (
    <div>
      <Label htmlFor="count-select" className={labelClass}>Images</Label>
      <select 
        id="count-select"
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className={dropdownClass} 
        aria-label="Number of Images"
      >
        {IMAGE_COUNTS.map(n => <option key={n} value={n}>{n} image{n > 1 ? 's' : ''}</option>)}
      </select>
    </div>
  );
};
