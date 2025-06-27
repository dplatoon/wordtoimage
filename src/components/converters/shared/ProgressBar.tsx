
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  progress: number;
  label?: string;
}

export function ProgressBar({ progress, label }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{label}</span>
          <span className="text-gray-900 font-medium">{Math.round(progress)}%</span>
        </div>
      )}
      <Progress value={progress} className="h-2" />
    </div>
  );
}
