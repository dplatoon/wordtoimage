
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
  ({ className, gradient, children, isLoading, loadingText, size = "default", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
          "min-h-[48px] touch-target-large", // Enhanced touch targets
          "focus-visible:outline-3 focus-visible:outline-yellow-400 focus-visible:outline-offset-2", // High contrast focus
          gradient
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/25"
            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25",
          size === "lg" && "px-8 py-4 text-lg min-h-[52px]",
          size === "sm" && "px-4 py-2 text-sm min-h-[40px]",
          className
        )}
        disabled={isLoading || props.disabled}
        size={size}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
            <span>{loadingText || 'Loading...'}</span>
          </>
        ) : (
          children
        )}
      </Button>
    )
  }
)
PrimaryButton.displayName = "PrimaryButton"
