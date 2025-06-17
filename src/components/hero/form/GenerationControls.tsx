
import { memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { StyleSelect } from './controls/StyleSelect';
import { CountSelect } from './controls/CountSelect';
import { ResolutionSelect } from './controls/ResolutionSelect';

interface GenerationControlsProps {
  style: string;
  resolution: string;
  count: number;
  onStyleChange: React.Dispatch<React.SetStateAction<string>>;
  onResolutionChange: React.Dispatch<React.SetStateAction<string>>;
  onCountChange: (value: number) => void; // Fixed: now accepts number
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
  
  return (
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3 mb-4`}>
      <StyleSelect value={style} onChange={onStyleChange} />
      <CountSelect value={count} onChange={onCountChange} />
      <ResolutionSelect value={resolution} onChange={onResolutionChange} isMobile={isMobile} />
    </div>
  );
});

// Add display name for better debugging
GenerationControls.displayName = 'GenerationControls';
