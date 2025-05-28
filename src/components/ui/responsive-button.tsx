
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

const responsiveButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10"
      },
      responsive: {
        mobile: "",
        tablet: "",
        desktop: "",
        touch: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      responsive: "mobile"
    }
  }
);

export interface ResponsiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof responsiveButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const ResponsiveButton = React.forwardRef<HTMLButtonElement, ResponsiveButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    loadingText = "Loading...",
    children,
    disabled,
    ...props 
  }, ref) => {
    const { isMobile, isTablet, isTouch } = useResponsiveDesign();
    const Comp = asChild ? Slot : "button";

    // Determine responsive size
    const responsiveSize = React.useMemo(() => {
      if (size) return size;
      
      if (isMobile) {
        return isTouch ? "lg" : "default";
      } else if (isTablet) {
        return "lg";
      }
      return "default";
    }, [size, isMobile, isTablet, isTouch]);

    // Enhanced touch target classes for mobile
    const touchClasses = React.useMemo(() => {
      if (!isTouch) return "";
      
      return cn(
        "min-h-[44px] min-w-[44px]", // Minimum touch target size
        size === "sm" && "min-h-[44px]",
        size === "lg" && "min-h-[48px]",
        size === "xl" && "min-h-[52px]"
      );
    }, [isTouch, size]);

    // Mobile-specific enhancements
    const mobileClasses = React.useMemo(() => {
      if (!isMobile) return "";
      
      return cn(
        "active:scale-[0.98]", // Subtle press feedback
        "transition-transform duration-150",
        variant === "outline" && "active:bg-accent/60"
      );
    }, [isMobile, variant]);

    return (
      <Comp
        className={cn(
          responsiveButtonVariants({ variant, size: responsiveSize }),
          touchClasses,
          mobileClasses,
          loading && "pointer-events-none",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {loadingText && <span>{loadingText}</span>}
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

ResponsiveButton.displayName = "ResponsiveButton";

export { ResponsiveButton, responsiveButtonVariants };
