
import React from 'react';
import { DEFAULT_STYLES } from '../../constants';
import { Label } from '@/components/ui/label';

interface StyleSelectorProps {
  value: string;
  onChange: (value: React.SetStateAction<string>) => void;
}

export const StyleSelector = ({ value, onChange }: StyleSelectorProps) => {
  const labelClass = "block text-xs font-medium text-gray-600 mb-1 ml-1";
  const dropdownClass = "rounded-lg border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-sm w-full";

  return (
    <div>
      <Label htmlFor="style-select" className={labelClass}>Art Style</Label>
      <select 
        id="style-select"
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className={dropdownClass} 
        aria-label="Art Style"
      >
        {DEFAULT_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  );
};
