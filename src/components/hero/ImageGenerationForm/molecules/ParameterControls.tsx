
import React from "react";

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
}: ParameterControlsProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-between md:flex-nowrap">
      <div className="flex flex-col">
        <label className="text-xs text-gray-700 mb-1 ml-1">Style</label>
        <select
          value={style}
          onChange={onStyleChange}
          className="rounded-md border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          aria-label="Art Style"
        >
          {styleOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-700 mb-1 ml-1">Resolution</label>
        <select
          value={resolution}
          onChange={onResolutionChange}
          className="rounded-md border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          aria-label="Resolution"
        >
          {resolutionOptions.map((res) => (
            <option key={res} value={res}>
              {res}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-700 mb-1 ml-1">Count</label>
        <select
          value={count}
          onChange={onCountChange}
          className="rounded-md border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          aria-label="Number of Images"
        >
          {countOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
