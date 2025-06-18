
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StyleRecommendation {
  styleId: string;
  reason: string;
  confidence: number;
}

interface StyleRecommendationsProps {
  recommendations: StyleRecommendation[];
  onSelectStyle: (styleId: string) => void;
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

export function StyleRecommendations({ 
  recommendations, 
  onSelectStyle, 
  className 
}: StyleRecommendationsProps) {
  if (recommendations.length === 0) return null;

  return (
    <Card className={cn("border-amber-200 bg-amber-50", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-amber-600" />
          <h4 className="text-sm font-semibold text-amber-800">
            Recommended Styles
          </h4>
        </div>
        
        <div className="space-y-2">
          {recommendations.map((rec) => (
            <div key={rec.styleId} className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectStyle(rec.styleId)}
                  className="bg-white hover:bg-amber-100 border-amber-300 text-amber-700"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {STYLE_NAMES[rec.styleId] || rec.styleId}
                </Button>
                
                <Badge 
                  variant="secondary" 
                  className="bg-amber-100 text-amber-700 text-xs"
                >
                  {Math.round(rec.confidence * 100)}% match
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-amber-600 mt-2">
          💡 These styles match keywords in your prompt
        </p>
      </CardContent>
    </Card>
  );
}
