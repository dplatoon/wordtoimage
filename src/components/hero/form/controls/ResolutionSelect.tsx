
import { RESOLUTIONS } from '../../constants';
import { Label } from '@/components/ui/label';

interface ResolutionSelectProps {
  value: string;
  onChange: (value: React.SetStateAction<string>) => void;
  isMobile: boolean;
}

export const ResolutionSelect = ({ value, onChange, isMobile }: ResolutionSelectProps) => {
  const labelClass = "block text-xs font-medium text-gray-600 mb-1 ml-1";
  const dropdownClass = "rounded-lg border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-sm w-full";

  return (
    <div className={isMobile ? "col-span-2" : ""}>
      <Label htmlFor="resolution-select" className={labelClass}>Resolution</Label>
      <select 
        id="resolution-select"
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className={dropdownClass} 
        aria-label="Resolution"
      >
        {RESOLUTIONS.map(res => <option key={res} value={res}>{res}</option>)}
      </select>
    </div>
  );
};
