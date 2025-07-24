import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2, Sparkles, Zap } from "lucide-react"

const interactiveButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none overflow-hidden group",
  {
    variants: {
      variant: {
        primary: 
          "bg-gradient-to-r from-primary to-blue-600 text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transform-gpu",
        secondary: 
          "bg-gradient-to-r from-secondary to-gray-200 text-secondary-foreground hover:shadow-md hover:scale-[1.02] transform-gpu",
        outline: 
          "border-2 border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/40 hover:shadow-sm",
        ghost: 
          "hover:bg-accent/50 hover:text-accent-foreground backdrop-blur-sm",
        ai: 
          "bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-violet-500/25 hover:scale-105 transform-gpu",
        magical: 
          "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 transform-gpu animate-pulse",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-4",
        lg: "h-14 rounded-lg px-8 text-base",
        icon: "h-12 w-12",
      },
      state: {
        default: "",
        loading: "cursor-not-allowed",
        success: "bg-green-500 hover:bg-green-600",
        error: "bg-red-500 hover:bg-red-600",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      state: "default",
    },
  }
)

interface InteractiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof interactiveButtonVariants> {
  asChild?: boolean
  loading?: boolean
  success?: boolean
  error?: boolean
  children: React.ReactNode
  glowEffect?: boolean
  rippleEffect?: boolean
}

const InteractiveButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false, 
    success = false, 
    error = false,
    children,
    glowEffect = false,
    rippleEffect = true,
    onClick,
    ...props 
  }, ref) => {
    const [isPressed, setIsPressed] = React.useState(false)
    const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([])
    const rippleId = React.useRef(0)

    const state = loading ? "loading" : success ? "success" : error ? "error" : "default"
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) return
      
      if (rippleEffect) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const newRipple = {
          id: rippleId.current++,
          x,
          y
        }
        
        setRipples(prev => [...prev, newRipple])
        
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
        }, 600)
      }
      
      setIsPressed(true)
      setTimeout(() => setIsPressed(false), 150)
      
      onClick?.(e)
    }

    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(
          interactiveButtonVariants({ variant, size, state, className }),
          isPressed && "scale-95",
          glowEffect && "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
          loading && "cursor-not-allowed opacity-80"
        )}
        ref={ref}
        onClick={handleClick}
        disabled={loading || props.disabled}
        {...props}
      >
        {/* Ripple Effect */}
        {rippleEffect && (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute bg-white/30 rounded-full animate-ping"
                style={{
                  left: ripple.x - 10,
                  top: ripple.y - 10,
                  width: 20,
                  height: 20,
                  animationDuration: '0.6s',
                }}
              />
            ))}
          </div>
        )}
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {success && <Sparkles className="h-4 w-4" />}
          {variant === "magical" && !loading && <Zap className="h-4 w-4" />}
          {children}
        </span>
        
        {/* Background shine effect */}
        {(variant === "ai" || variant === "magical") && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000" />
        )}
      </Comp>
    )
  }
)
InteractiveButton.displayName = "InteractiveButton"

export { InteractiveButton, interactiveButtonVariants }