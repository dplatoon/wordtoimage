
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

// Product IDs for reference
const STRIPE_PRODUCTS = {
  PRO: 'prod_SEe2MxYit85qLo', // Word To Image Pro
  BUSINESS: 'prod_SEe3iHfdBt84EE' // Word To Image Business
};

export function SettingsModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const handleManageSubscription = () => {
    toast.info("Subscription management is now available through the pricing section");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">  
          <p className="text-sm text-muted-foreground">
            Settings and API keys are managed securely through your Supabase project settings.
          </p>
          <div className="border rounded-md p-3 bg-gray-50">
            <h3 className="font-medium text-sm mb-2">Product Information</h3>
            <p className="text-xs text-gray-500 mb-2">Word To Image Pro: {STRIPE_PRODUCTS.PRO}</p>
            <p className="text-xs text-gray-500">Word To Image Business: {STRIPE_PRODUCTS.BUSINESS}</p>
          </div>
          <Button onClick={handleManageSubscription} className="w-full">
            Manage Subscription
          </Button>
          <Button onClick={() => onOpenChange(false)} variant="outline" className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
