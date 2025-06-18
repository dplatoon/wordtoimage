
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, X } from 'lucide-react';

interface CapturedImageDisplayProps {
  imageUrl: string;
  onRemove: () => void;
  onRetake: () => void;
}

export const CapturedImageDisplay = ({ imageUrl, onRemove, onRetake }: CapturedImageDisplayProps) => {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <img 
            src={imageUrl} 
            alt="Captured room" 
            className="w-20 h-20 object-cover rounded-lg border-2 border-green-300"
          />
          <div className="flex-1">
            <h4 className="font-medium text-green-800 mb-1">Image Ready for AI Transform</h4>
            <p className="text-sm text-green-600 mb-2">
              Your room photo is loaded and ready for AI-powered redesign
            </p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onRemove}
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                <X className="h-3 w-3 mr-1" />
                Remove
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onRetake}
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                <Camera className="h-3 w-3 mr-1" />
                Retake
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
