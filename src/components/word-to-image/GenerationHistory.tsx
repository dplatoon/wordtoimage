
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface HistoryItemProps {
  prompt: string;
  timestamp: Date;
  onSelect: (prompt: string) => void;
}

function HistoryItem({ prompt, timestamp, onSelect }: HistoryItemProps) {
  return (
    <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => onSelect(prompt)}>
      <p className="text-sm font-medium line-clamp-2">{prompt}</p>
      <p className="text-xs text-gray-500 mt-1">
        {timestamp.toLocaleTimeString()} - {timestamp.toLocaleDateString()}
      </p>
    </div>
  );
}

interface GenerationHistoryProps {
  history: { prompt: string; timestamp: Date }[];
  onSelectPrompt: (prompt: string) => void;
  onClearHistory: () => void;
}

export function GenerationHistory({ history, onSelectPrompt, onClearHistory }: GenerationHistoryProps) {
  if (!history.length) {
    return (
      <div className="text-center p-4 text-gray-500 text-sm">
        No generation history yet.
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-sm">Generation History</h3>
        <Button variant="ghost" size="sm" onClick={onClearHistory} className="text-xs h-7">
          Clear
        </Button>
      </div>
      <ScrollArea className="h-[300px]">
        {history.map((item, index) => (
          <HistoryItem
            key={index}
            prompt={item.prompt}
            timestamp={item.timestamp}
            onSelect={onSelectPrompt}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
