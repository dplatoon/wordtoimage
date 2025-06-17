
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Images } from 'lucide-react';

interface CountSelectProps {
  value: number;
  onChange: (value: number) => void;
}

export const CountSelect = ({ value, onChange }: CountSelectProps) => {
  const counts = [1, 2, 3, 4];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Images className="h-4 w-4" />
        Images
      </label>
      <Select value={value.toString()} onValueChange={(val) => onChange(Number(val))}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {counts.map((count) => (
            <SelectItem key={count} value={count.toString()}>
              {count} image{count > 1 ? 's' : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
