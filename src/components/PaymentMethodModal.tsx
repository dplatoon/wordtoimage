
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CreditCard, Users } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useAuthState } from "@/hooks/useAuthState";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string | null;
}

export function PaymentMethodModal({ open, onOpenChange, planName }: PaymentMethodModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuthState();
  const { checkSubscription } = useSubscription();

  const getProductId = () => {
    switch (planName) {
      case 'Standard':
        return 'prod_SGdyRu7i1RabBb';
      case 'Pro':
        return 'prod_SEe2MxYit85qLo';
      case 'Business':
        return 'prod_SEe3iHfdBt84EE';
      default:
        return '';
    }
  };

  async function handleChooseMethod(method: string) {
    if (!planName) return;
    
    if (!session?.access_token) {
      toast.error("Please log in to subscribe");
      return;
    }
    
    const productId = getProductId();
    if (!productId) {
      toast.error("Invalid plan selected");
      return;
    }

    setIsLoading(true);

    try {
      if (method === "Stripe (Credit/Debit Card)") {
        const { data, error } = await supabase.functions.invoke('create-checkout', {
          body: { planId: productId },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (error) {
          throw new Error(error.message);
        }

        if (data && data.url) {
          // Open Stripe checkout in a new tab
          window.open(data.url, '_blank');
          onOpenChange(false);
          
          // Check subscription status after a delay (user might complete payment)
          setTimeout(() => {
            checkSubscription();
          }, 5000);
        } else {
          throw new Error("No checkout URL returned");
        }
      } else {
        toast.info(`${method} payment option will be available soon`, { 
          description: `You selected the ${planName} plan` 
        });
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("Payment processing failed", { 
        description: error instanceof Error ? error.message : "Please try again later" 
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!planName) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
          <DialogDescription>
            {planName === "Standard" && "Subscribe to Standard plan for $9.99/month"}
            {planName === "Pro" && "Subscribe to Pro plan for $14.99/month"}
            {planName === "Business" && "Subscribe to Business plan for $29.99/month"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            className="w-full flex items-center gap-2"
            variant="default"
            onClick={() => handleChooseMethod("Stripe (Credit/Debit Card)")}
            disabled={isLoading}
          >
            <CreditCard className="h-5 w-5" />
            Stripe (Credit/Debit Card)
            {isLoading && <span className="ml-2 animate-spin">⊚</span>}
          </Button>
          <Button
            className="w-full flex items-center gap-2"
            variant="outline"
            onClick={() => handleChooseMethod("Other (bKash, Nagad, SSLCommerz)")}
            disabled={isLoading}
          >
            <Users className="h-5 w-5" />
            Other (bKash, Nagad, SSLCommerz)
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            More payment options coming soon!
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
