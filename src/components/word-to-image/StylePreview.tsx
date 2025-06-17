
import React from 'react';
import { EnhancedStyleBrowser } from './EnhancedStyleBrowser';
import { cn } from '@/lib/utils';

interface StylePreviewProps {
  selectedStyles: string[];
  onStyleToggle: (styleId: string) => void;
  onStyleCombine: (styles: string[]) => void;
  className?: string;
}

export function StylePreview({ 
  selectedStyles, 
  onStyleToggle, 
  onStyleCombine,
  className 
}: StylePreviewProps) {
  return (
    <div className={cn("w-full", className)}>
      <EnhancedStyleBrowser
        selectedStyles={selectedStyles}
        onStyleToggle={onStyleToggle}
        onGenerateWithStyles={onStyleCombine}
        maxSelections={3}
      />
    </div>
  );
}
