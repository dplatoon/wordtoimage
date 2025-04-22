
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface EditImageModalProps {
  imageUrl: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditImageModal({ imageUrl, open, onOpenChange }: EditImageModalProps) {
  if (!imageUrl) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[725px]">
        <img src={imageUrl} alt="To edit" className="w-full mb-4" />
        <div className="flex gap-4">
          <Button>Crop</Button>
          <Button>Rotate</Button>
          <Button>Filter</Button>
        </div>
        <Button className="mt-4 w-full" onClick={() => onOpenChange(false)}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}
