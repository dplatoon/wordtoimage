
import React from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  onGenerateClick: () => void;
}

export function EmptyState({ onGenerateClick }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-dashed border-gray-200 transition-all duration-300 hover:shadow-md">
      <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mb-4 transition-transform duration-500 hover:scale-110 hover:rotate-3">
        <ImagePlus className="h-8 w-8 text-indigo-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No images generated yet</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        Enter a prompt above and click Generate to create your first AI-powered image.
      </p>
      <Button 
        variant="outline" 
        onClick={onGenerateClick}
        className="bg-white group transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white border-gray-200 hover:border-transparent"
      >
        Try it now
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}
