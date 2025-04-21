
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CreditCard, Users } from "lucide-react";

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string | null;
}

export function PaymentMethodModal({ open, onOpenChange, planName }: PaymentMethodModalProps) {
  function handleChooseMethod(method: string) {
    // Placeholder: show alert for now
    alert(
      `You selected "${method}" for the ${planName} plan.\nActual payment integration coming soon.`
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
