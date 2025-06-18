
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { History, ChevronDown, ChevronUp, RotateCcw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenerationHistoryItem {
  id: string;
  prompt: string;
  style?: string;
  imageUrl: string;
  timestamp: number;
}

interface GenerationHistoryProps {
  history: GenerationHistoryItem[];
  onRegenerate: (prompt: string, style?: string) => void;
  onClearHistory: () => void;
  className?: string;
}

export function GenerationHistory({
  history,
  onRegenerate,
  onClearHistory,
  className
}: GenerationHistoryProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (history.length === 0) return null;

  return (
    <Card className={cn("border-purple-200 bg-purple-50", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardContent className="p-4 cursor-pointer hover:bg-purple-100 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-purple-600" />
                <h4 className="text-sm font-semibold text-purple-800">
                  Generation History ({history.length})
                </h4>
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-purple-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-purple-600" />
              )}
            </div>
          </CardContent>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 px-4 pb-4">
            <div className="flex justify-end mb-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearHistory}
                className="text-purple-600 hover:bg-purple-100"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.slice(0, 10).map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-lg border border-purple-200 p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate" title={item.prompt}>
                        "{item.prompt}"
                      </p>
                      {item.style && (
                        <p className="text-xs text-purple-600 mt-1">
                          Style: {item.style.replace('-', ' ')}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRegenerate(item.prompt, item.style)}
                      className="flex-shrink-0 bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-700"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
