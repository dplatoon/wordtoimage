
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation select-none active:scale-[0.97] min-h-[48px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-neon hover:shadow-neon-lg hover:brightness-110",
        destructive: "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90",
        outline: "border-2 border-primary/50 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary hover:shadow-neon",
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 hover:border-primary/30",
        ghost: "text-foreground hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline min-h-0",
        
        // Neon gradient variants
        neon: "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-white shadow-neon hover:shadow-neon-lg animate-gradient-shift hover:brightness-110",
        "neon-outline": "bg-transparent border-2 border-primary text-primary shadow-inner-glow hover:bg-primary/10 hover:shadow-neon",
        
        // Glass variants
        glass: "bg-white/5 backdrop-blur-xl border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 shadow-glass",
        "glass-primary": "bg-primary/10 backdrop-blur-xl border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 shadow-glass",
        
        // Cyber variants
        cyber: "bg-gradient-to-r from-primary to-accent text-white font-bold tracking-wide uppercase shadow-neon-lg hover:shadow-[0_0_40px_hsl(24_95%_55%_/_0.6)] relative overflow-hidden",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 text-sm min-h-[40px]",
        lg: "h-14 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-12 w-12 min-h-[48px]",
        "icon-sm": "h-10 w-10 min-h-[40px]",
        "icon-lg": "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
