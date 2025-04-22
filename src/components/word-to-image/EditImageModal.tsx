
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';

interface EditImageModalProps {
  imageUrl: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditImageModal({ imageUrl, open, onOpenChange }: EditImageModalProps) {
  if (!imageUrl) return null;
  
  const handleSaveChanges = () => {
    toast.success("Changes saved successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[725px]">
        <img src={imageUrl} alt="To edit" className="w-full mb-4" />
        <div className="flex gap-4">
          <Button onClick={() => toast.info("Crop feature coming soon!")}>Crop</Button>
          <Button onClick={() => toast.info("Rotate feature coming soon!")}>Rotate</Button>
          <Button onClick={() => toast.info("Filter feature coming soon!")}>Filter</Button>
        </div>
        <Button className="mt-4 w-full" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}
