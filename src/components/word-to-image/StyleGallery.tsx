
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';
import { EnhancedStyleBrowser } from './EnhancedStyleBrowser';

interface StyleGalleryProps {
  selectedStyles: string[];
  onStyleToggle: (styleId: string) => void;
  onGenerateWithStyles: (styles: string[]) => void;
  maxSelections?: number;
}

export function StyleGallery({ 
  selectedStyles, 
  onStyleToggle, 
  onGenerateWithStyles, 
  maxSelections = 3 
}: StyleGalleryProps) {
  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Palette className="h-6 w-6 text-violet-600" />
          AI Style Gallery
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <EnhancedStyleBrowser
          selectedStyles={selectedStyles}
          onStyleToggle={onStyleToggle}
          onGenerateWithStyles={onGenerateWithStyles}
          maxSelections={maxSelections}
        />
      </CardContent>
    </Card>
  );
}
