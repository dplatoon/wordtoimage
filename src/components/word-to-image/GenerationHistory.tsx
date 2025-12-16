
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
    <Card className={cn("border-primary/20 bg-card/30 backdrop-blur-xl", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardContent className="p-4 cursor-pointer hover:bg-card/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">
                  Generation History ({history.length})
                </h4>
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-primary" />
              ) : (
                <ChevronDown className="h-4 w-4 text-primary" />
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
                className="text-primary hover:bg-primary/10"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.slice(0, 10).map((item) => (
                <div 
                  key={item.id}
                  className="bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20 p-3 hover:border-primary/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate" title={item.prompt}>
                        "{item.prompt}"
                      </p>
                      {item.style && (
                        <p className="text-xs text-primary mt-1">
                          Style: {item.style.replace('-', ' ')}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                    
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => onRegenerate(item.prompt, item.style)}
                      className="flex-shrink-0"
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
