
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  gradient?: boolean
  children?: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
  loadingText?: string
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, gradient, children, isLoading, loadingText, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "font-medium",
          gradient
            ? "bg-gradient-to-r from-violet-600 to-indigo-600 focus:ring-violet-500"
            : "bg-violet-600 hover:bg-violet-700 focus:ring-violet-500",
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText || 'Loading...'}
          </>
        ) : (
          children
        )}
      </Button>
    )
  }
)
PrimaryButton.displayName = "PrimaryButton"
