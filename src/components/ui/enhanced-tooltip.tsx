import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-lg border px-3 py-2 text-sm text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-popover border-border",
        dark: "bg-card border-border text-foreground",
        ai: "bg-gradient-to-r from-primary to-violet-500 border-primary text-primary-foreground",
        success: "bg-green-500 border-green-400 text-white",
        warning: "bg-amber-500 border-amber-400 text-white",
        error: "bg-destructive border-destructive text-destructive-foreground",
      },
      size: {
        sm: "text-xs px-2 py-1",
        default: "text-sm px-3 py-2",
        lg: "text-base px-4 py-3",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface EnhancedTooltipProps extends 
  VariantProps<typeof tooltipVariants>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  title?: string
  description?: string
  shortcut?: string
  icon?: React.ReactNode
  showArrow?: boolean
  delayDuration?: number
}

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  EnhancedTooltipProps
>(({ 
  className, 
  variant, 
  size, 
  title,
  description,
  shortcut,
  icon,
  showArrow = true,
  sideOffset = 4, 
  children,
  ...props 
}, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipVariants({ variant, size }), className)}
    {...props}
  >
    {showArrow && <TooltipPrimitive.Arrow className="fill-current" />}
    
    <div className="flex items-start gap-2">
      {icon && <div className="mt-0.5 opacity-80">{icon}</div>}
      
      <div className="space-y-1">
        {title && (
          <div className="font-semibold leading-tight">
            {title}
          </div>
        )}
        
        {description && (
          <div className="text-xs opacity-90 leading-relaxed">
            {description}
          </div>
        )}
        
        {children && !title && !description && children}
        
        {shortcut && (
          <div className="flex items-center gap-1 mt-2">
            <kbd className="px-1.5 py-0.5 text-xs bg-black/20 rounded border border-white/20">
              {shortcut}
            </kbd>
          </div>
        )}
      </div>
    </div>
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Quick tooltip wrapper component
interface QuickTooltipProps {
  content: string | React.ReactNode
  children: React.ReactNode
  variant?: VariantProps<typeof tooltipVariants>['variant']
  side?: "top" | "right" | "bottom" | "left"
  delayDuration?: number
}

const QuickTooltip = ({ 
  content, 
  children, 
  variant = "default", 
  side = "top",
  delayDuration = 300 
}: QuickTooltipProps) => (
  <TooltipProvider delayDuration={delayDuration}>
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} variant={variant}>
        {content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider,
  QuickTooltip,
  tooltipVariants 
}