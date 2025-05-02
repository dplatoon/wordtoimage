
import { Button } from '@/components/ui/button';
import { ImageOff } from 'lucide-react';

interface EmptyStateProps {
  onGenerateClick: () => void;
}

export function EmptyState({ onGenerateClick }: EmptyStateProps) {
  return (
    <div className="mt-8 border border-dashed border-gray-300 rounded-xl bg-gray-50 p-8 flex flex-col items-center justify-center text-center">
      <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ImageOff className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">No Images Generated Yet</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        Enter a prompt and generate your first AI image. Your creations will appear here.
      </p>
      <Button 
        variant="outline" 
        onClick={onGenerateClick}
        className="bg-white"
      >
        Generate Your First Image
      </Button>
    </div>
  );
}
