
import { Button } from '@/components/ui/button';
import { ImageOff } from 'lucide-react';

interface EmptyStateProps {
  onGenerateClick: () => void;
}

export function EmptyState({ onGenerateClick }: EmptyStateProps) {
  return (
    <div className="mt-8 border border-dashed border-border rounded-xl bg-secondary p-8 flex flex-col items-center justify-center text-center">
      <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <ImageOff className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">No Images Generated Yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Enter a prompt and generate your first AI image. Your creations will appear here.
      </p>
      <Button 
        variant="outline" 
        onClick={onGenerateClick}
        className="bg-card"
      >
        Generate Your First Image
      </Button>
    </div>
  );
}
