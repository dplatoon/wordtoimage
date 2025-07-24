import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

// Animated Counter Component
interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export const AnimatedCounter = ({ 
  value, 
  duration = 1000, 
  prefix = '', 
  suffix = '',
  className 
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(easeOutQuart * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span className={cn("font-mono", className)}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}

// Pulse Animation Component
interface PulseAnimationProps {
  children: React.ReactNode
  isActive?: boolean
  color?: string
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

export const PulseAnimation = ({ 
  children, 
  isActive = true, 
  color = 'blue',
  intensity = 'medium',
  className 
}: PulseAnimationProps) => {
  const intensityMap = {
    low: 'animate-pulse',
    medium: 'animate-[pulse_1.5s_ease-in-out_infinite]',
    high: 'animate-[pulse_1s_ease-in-out_infinite]'
  }

  return (
    <div 
      className={cn(
        isActive && intensityMap[intensity],
        `ring-${color}-500/20`,
        isActive && 'ring-4',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}

// Floating Notification Component
interface FloatingNotificationProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose?: () => void
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

export const FloatingNotification = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  position = 'top-right'
}: FloatingNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />
  }

  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white'
  }

  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: position.includes('right') ? 100 : -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: position.includes('right') ? 100 : -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg",
            colors[type],
            positions[position],
            "max-w-sm"
          )}
        >
          {icons[type]}
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 hover:opacity-70 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Progress Ring Component
interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  showPercentage?: boolean
  className?: string
  children?: React.ReactNode
}

export const ProgressRing = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  showPercentage = true,
  className,
  children
}: ProgressRingProps) => {
  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showPercentage && (
          <span className="text-2xl font-bold text-gray-700">
            {Math.round(progress)}%
          </span>
        ))}
      </div>
    </div>
  )
}

// Shimmer Loading Component
interface ShimmerLoadingProps {
  className?: string
  lines?: number
  showAvatar?: boolean
}

export const ShimmerLoading = ({ 
  className, 
  lines = 3,
  showAvatar = false 
}: ShimmerLoadingProps) => {
  return (
    <div className={cn("animate-pulse space-y-3", className)}>
      {showAvatar && (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      )}
      
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className={cn(
            "h-4 bg-gray-300 rounded",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}></div>
        </div>
      ))}
    </div>
  )
}

// Hover Scale Animation Component
interface HoverScaleProps {
  children: React.ReactNode
  scale?: number
  duration?: number
  className?: string
}

export const HoverScale = ({ 
  children, 
  scale = 1.05, 
  duration = 0.2,
  className 
}: HoverScaleProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration }}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </motion.div>
  )
}