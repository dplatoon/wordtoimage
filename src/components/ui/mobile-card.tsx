import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MobileCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  elevated?: boolean;
}

/**
 * Mobile-optimized card component with touch feedback
 */
export function MobileCard({ 
  children, 
  className, 
  onClick,
  elevated = false 
}: MobileCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "mobile-card p-6",
        elevated && "shadow-lg hover:shadow-xl",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
    >
      {children}
    </div>
  );
}
