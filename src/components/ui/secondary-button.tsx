
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
  loadingText?: string
}

export const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, children, isLoading, loadingText, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        className={cn(
          "font-medium border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
          "hover:border-gray-400 hover:text-gray-800 transition-all duration-200",
          "focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
          "shadow-sm hover:shadow-md",
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
SecondaryButton.displayName = "SecondaryButton"
