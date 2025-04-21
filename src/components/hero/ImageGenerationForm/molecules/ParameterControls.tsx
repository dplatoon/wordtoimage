
import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info } from "lucide-react";

interface ParameterControlsProps {
  style: string;
  resolution: string;
  count: number;
  onStyleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onResolutionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCountChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  styleOptions: string[];
  resolutionOptions: string[];
  countOptions: number[];
  isAuthenticated?: boolean;
}

export const ParameterControls = ({
  style,
  resolution,
  count,
  onStyleChange,
  onResolutionChange,
  onCountChange,
  styleOptions,
  resolutionOptions,
  countOptions,
  isAuthenticated = false
}: ParameterControlsProps) => {
  // Validate count based on resolution and auth status
  const isHighResolution = resolution === '1024x1024';
  const maxCount = isAuthenticated ? 4 : (isHighResolution ? 2 : 4);
  
  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-between md:flex-nowrap" role="group" aria-label="Image generation parameters">
      <div className="flex flex-col relative">
        <label htmlFor="style" className="text-xs text-gray-700 mb-1 ml-1">Style</label>
        <select
          id="style"
          value={style}
          onChange={onStyleChange}
          className="rounded-md border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        >
          {styleOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      
      <div className="flex flex-col relative">
        <div className="flex items-center gap-1">
          <label htmlFor="resolution" className="text-xs text-gray-700 mb-1 ml-1">Resolution</label>
          <HoverCard>
            <HoverCardTrigger>
              <Info className="h-3 w-3 text-gray-400" />
            </HoverCardTrigger>
            <HoverCardContent>
              Higher resolutions may limit the number of images you can generate at once
            </HoverCardContent>
          </HoverCard>
        </div>
        <select
          id="resolution"
          value={resolution}
          onChange={onResolutionChange}
          className="rounded-md border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        >
          {resolutionOptions.map((res) => (
            <option key={res} value={res}>{res}</option>
          ))}
        </select>
      </div>
      
      <div className="flex flex-col relative">
        <label htmlFor="count" className="text-xs text-gray-700 mb-1 ml-1">
          Count {!isAuthenticated && "(Free: max 2)"}
        </label>
        <select
          id="count"
          value={Math.min(count, maxCount)}
          onChange={onCountChange}
          className="rounded-md border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        >
          {countOptions.filter(n => n <= maxCount).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
