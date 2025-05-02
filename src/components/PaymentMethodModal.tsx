
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CreditCard, Users } from "lucide-react";

// Product IDs for reference
const STRIPE_PRODUCTS = {
  PRO: 'prod_SEe2MxYit85qLo', // Word To Image Pro
  BUSINESS: 'prod_SEe3iHfdBt84EE' // Word To Image Business
};

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string | null;
}

export function PaymentMethodModal({ open, onOpenChange, planName }: PaymentMethodModalProps) {
  function handleChooseMethod(method: string) {
    // Get the appropriate product ID based on the plan name
    let productId = '';
    
    if (planName === 'Pro') {
      productId = STRIPE_PRODUCTS.PRO;
    } else if (planName === 'Business') {
      productId = STRIPE_PRODUCTS.BUSINESS;
    }
    
    // Placeholder: show alert with product information
    alert(
      `You selected "${method}" for the ${planName} plan.\nProduct ID: ${productId}\nActual payment integration coming soon.`
    );
    onOpenChange(false);
  }

  if (!planName) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
          <DialogDescription>
            {planName === "Pro" && "Subscribe to Pro for $9.99/month"}
            {planName === "Business" && "Subscribe to Business for $19.99/month"}
            {planName === "Free" && "No payment required for Free plan"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            className="w-full flex items-center gap-2"
            variant="default"
            onClick={() => handleChooseMethod("Stripe (Credit/Debit Card)")}
          >
            <CreditCard className="h-5 w-5" />
            Stripe (Credit/Debit Card)
          </Button>
          <Button
            className="w-full flex items-center gap-2"
            variant="outline"
            onClick={() => handleChooseMethod("Other (bKash, Nagad, SSLCommerz)")}
          >
            <Users className="h-5 w-5" />
            Other (bKash, Nagad, SSLCommerz)
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            More payment options coming soon!
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
