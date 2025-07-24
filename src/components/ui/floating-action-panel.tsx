import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { QuickTooltip } from '@/components/ui/enhanced-tooltip'
import { 
  Plus, 
  Download, 
  Heart, 
  Share2, 
  Settings, 
  HelpCircle,
  Palette,
  History,
  Sparkles,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FloatingAction {
  id: string
  icon: React.ReactNode
  label: string
  action: () => void
  shortcut?: string
  color?: string
  disabled?: boolean
}

interface FloatingActionPanelProps {
  actions: FloatingAction[]
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  isVisible?: boolean
  autoHide?: boolean
  className?: string
}

export const FloatingActionPanel = ({
  actions,
  position = 'bottom-right',
  isVisible = true,
  autoHide = true,
  className
}: FloatingActionPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [shouldShow, setShouldShow] = useState(isVisible)

  useEffect(() => {
    if (autoHide) {
      let timeoutId: NodeJS.Timeout
      
      const handleScroll = () => {
        setShouldShow(true)
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => setShouldShow(false), 3000)
      }

      const handleMouseMove = () => {
        setShouldShow(true)
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => setShouldShow(false), 3000)
      }

      window.addEventListener('scroll', handleScroll)
      window.addEventListener('mousemove', handleMouseMove)
      
      // Initial timeout
      timeoutId = setTimeout(() => setShouldShow(false), 3000)

      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('mousemove', handleMouseMove)
        clearTimeout(timeoutId)
      }
    }
  }, [autoHide])

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  }

  const getActionPosition = (index: number) => {
    const spacing = 60
    const isBottom = position.includes('bottom')
    const offset = isBottom ? -(index + 1) * spacing : (index + 1) * spacing
    
    return {
      y: offset,
      x: 0
    }
  }

  if (!shouldShow && autoHide) return null

  return (
    <div 
      className={cn(
        "fixed z-50 flex flex-col items-center",
        positionClasses[position],
        className
      )}
      onMouseEnter={() => autoHide && setShouldShow(true)}
    >
      <AnimatePresence>
        {isExpanded && (
          <>
            {actions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  ...getActionPosition(index)
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="absolute"
              >
                <QuickTooltip
                  content={
                    <div>
                      {action.label}
                      {action.shortcut && (
                        <div className="text-xs opacity-70 mt-1">
                          Press {action.shortcut}
                        </div>
                      )}
                    </div>
                  }
                  side={position.includes('right') ? 'left' : 'right'}
                  variant="dark"
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={action.action}
                    disabled={action.disabled}
                    className={cn(
                      "h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200",
                      "bg-white hover:bg-gray-50 border-2 border-gray-200",
                      action.color && `text-${action.color}-600 hover:text-${action.color}-700`,
                      action.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {action.icon}
                  </Button>
                </QuickTooltip>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
            "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700",
            "text-white border-2 border-white/20"
          )}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {isExpanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
          </motion.div>
        </Button>
      </motion.div>
    </div>
  )
}

// Preset action sets
export const defaultActions: FloatingAction[] = [
  {
    id: 'generate',
    icon: <Sparkles className="h-5 w-5" />,
    label: 'Generate Image',
    action: () => console.log('Generate'),
    shortcut: 'Ctrl+Enter',
    color: 'purple'
  },
  {
    id: 'download',
    icon: <Download className="h-5 w-5" />,
    label: 'Download All',
    action: () => console.log('Download'),
    shortcut: 'Ctrl+D',
    color: 'blue'
  },
  {
    id: 'styles',
    icon: <Palette className="h-5 w-5" />,
    label: 'Browse Styles',
    action: () => console.log('Styles'),
    color: 'pink'
  },
  {
    id: 'history',
    icon: <History className="h-5 w-5" />,
    label: 'View History',
    action: () => console.log('History'),
    color: 'green'
  },
  {
    id: 'help',
    icon: <HelpCircle className="h-5 w-5" />,
    label: 'Get Help',
    action: () => console.log('Help'),
    color: 'orange'
  }
]