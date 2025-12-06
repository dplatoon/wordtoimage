
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium gradient variants
        "gradient-primary": "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl",
        "gradient-accent": "bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-lg hover:from-pink-600 hover:to-orange-500 hover:shadow-xl",
        "gradient-neon": "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]",
        // Glass variant
        "glass": "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
        "glass-dark": "bg-black/20 backdrop-blur-md border border-black/10 text-foreground hover:bg-black/30",
        // AI theme variants  
        "ai-primary": "bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-teal-600 hover:shadow-xl",
        "ai-secondary": "border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800 shadow-sm hover:shadow-md font-medium",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
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
