
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button"

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  gradient?: boolean
  children?: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, gradient, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "font-medium transition-all duration-300",
          gradient
            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-600/20"
            : "bg-blue-600 hover:bg-blue-700",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
PrimaryButton.displayName = "PrimaryButton"
