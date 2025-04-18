
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ButtonProps } from "@radix-ui/react-button"
import { forwardRef } from "react"

export interface PrimaryButtonProps extends ButtonProps {
  gradient?: boolean
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, gradient, ...props }, ref) => {
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
      />
    )
  }
)
PrimaryButton.displayName = "PrimaryButton"
