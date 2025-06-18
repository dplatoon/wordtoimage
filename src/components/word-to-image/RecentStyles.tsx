
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentStylesProps {
  recentStyles: string[];
  onSelectStyle: (styleId: string) => void;
  onClearRecent: () => void;
  className?: string;
}

const STYLE_NAMES: Record<string, string> = {
  'photorealistic': 'Photorealistic',
  'digital-art': 'Digital Art',
  'oil-painting': 'Oil Painting',
  'watercolor': 'Watercolor',
  'cyberpunk': 'Cyberpunk',
  'anime': 'Anime'
};

export function RecentStyles({ 
  recentStyles, 
  onSelectStyle, 
  onClearRecent,
  className 
}: RecentStylesProps) {
  if (recentStyles.length === 0) return null;

  return (
    <Card className={cn("border-blue-200 bg-blue-50", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <h4 className="text-sm font-semibold text-blue-800">
              Recently Used
            </h4>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearRecent}
            className="h-6 w-6 p-0 text-blue-600 hover:bg-blue-100"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {recentStyles.map((styleId) => (
            <Button
              key={styleId}
              variant="outline"
              size="sm"
              onClick={() => onSelectStyle(styleId)}
              className="bg-white hover:bg-blue-100 border-blue-300 text-blue-700 text-xs"
            >
              {STYLE_NAMES[styleId] || styleId}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
