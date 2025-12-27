import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { InteractiveButton } from '@/components/ui/interactive-button'
import { QuickTooltip } from '@/components/ui/enhanced-tooltip'
import { HoverScale } from '@/components/ui/micro-interactions'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { 
  Palette, 
  Sparkles, 
  Heart, 
  Star, 
  Zap,
  Camera,
  Brush,
  Image
} from 'lucide-react'

interface StyleOption {
  id: string
  name: string
  description: string
  preview: string
  category: 'realistic' | 'artistic' | 'digital' | 'fantasy'
  popularity: number
  tags: string[]
  icon: React.ReactNode
}

interface EnhancedStyleSelectorProps {
  styles: StyleOption[]
  selectedStyle?: string
  onStyleSelect: (styleId: string) => void
  onStylePreview?: (styleId: string) => void
  maxVisible?: number
  showCategories?: boolean
  className?: string
}

const categoryIcons = {
  realistic: <Camera className="h-4 w-4" />,
  artistic: <Brush className="h-4 w-4" />,
  digital: <Zap className="h-4 w-4" />,
  fantasy: <Sparkles className="h-4 w-4" />
}

const categoryColors = {
  realistic: 'blue',
  artistic: 'purple',
  digital: 'green',
  fantasy: 'pink'
}

export const EnhancedStyleSelector = ({
  styles,
  selectedStyle,
  onStyleSelect,
  onStylePreview,
  maxVisible = 6,
  showCategories = true,
  className
}: EnhancedStyleSelectorProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null)

  const categories = showCategories 
    ? Object.keys(categoryIcons) as Array<keyof typeof categoryIcons>
    : []

  const visibleStyles = showAll ? styles : styles.slice(0, maxVisible)
  const groupedStyles = categories.length > 0 
    ? categories.reduce((acc, category) => {
        acc[category] = styles.filter(style => style.category === category)
        return acc
      }, {} as Record<string, StyleOption[]>)
    : { all: styles }

  const handleStyleClick = (styleId: string) => {
    onStyleSelect(styleId)
  }

  const handleStyleHover = (styleId: string | null) => {
    setHoveredStyle(styleId)
    if (styleId && onStylePreview) {
      onStylePreview(styleId)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Category Filter */}
      {showCategories && (
        <div className="flex flex-wrap gap-2 mb-4">
          <InteractiveButton
            variant={expandedCategory === null ? "primary" : "outline"}
            size="sm"
            onClick={() => setExpandedCategory(null)}
            className="text-xs"
            rippleEffect={false}
          >
            <Image className="h-3 w-3 mr-1" />
            All Styles
          </InteractiveButton>
          
          {categories.map((category) => (
            <QuickTooltip
              key={category}
              content={`View ${category} styles`}
              variant="default"
            >
              <InteractiveButton
                variant={expandedCategory === category ? "primary" : "outline"}
                size="sm"
                onClick={() => setExpandedCategory(
                  expandedCategory === category ? null : category
                )}
                className="text-xs"
                rippleEffect={false}
              >
                {categoryIcons[category]}
                <span className="ml-1 capitalize">{category}</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  {groupedStyles[category]?.length || 0}
                </Badge>
              </InteractiveButton>
            </QuickTooltip>
          ))}
        </div>
      )}

      {/* Style Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <AnimatePresence mode="wait">
          {(expandedCategory ? groupedStyles[expandedCategory] || [] : visibleStyles).map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              <QuickTooltip
                content={
                  <div className="space-y-2">
                    <div className="font-semibold">{style.name}</div>
                    <div className="text-xs opacity-90">{style.description}</div>
                    <div className="flex flex-wrap gap-1">
                      {style.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{style.popularity}/5 popularity</span>
                    </div>
                  </div>
                }
                side="top"
                variant="dark"
              >
                <HoverScale scale={1.02}>
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-lg border-2 transition-all duration-200 cursor-pointer group",
                      selectedStyle === style.id 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-gray-200 hover:border-gray-300",
                      hoveredStyle === style.id && "shadow-lg"
                    )}
                    onClick={() => handleStyleClick(style.id)}
                    onMouseEnter={() => handleStyleHover(style.id)}
                    onMouseLeave={() => handleStyleHover(null)}
                  >
                    {/* Preview Image */}
                    <div className="aspect-square bg-gradient-to-br from-muted to-secondary relative overflow-hidden">
                      <img
                        src={style.preview}
                        alt={style.name}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <InteractiveButton
                          size="sm"
                          variant="outline"
                          className="bg-white/90 text-gray-900 hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStyleClick(style.id)
                          }}
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          Use Style
                        </InteractiveButton>
                      </div>
                    </div>

                    {/* Style Info */}
                    <div className="p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium truncate">{style.name}</h4>
                        <div className="flex items-center gap-1">
                          {style.icon}
                          {selectedStyle === style.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-primary"
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {style.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs capitalize",
                            `border-${categoryColors[style.category]}-200 text-${categoryColors[style.category]}-700`
                          )}
                        >
                          {categoryIcons[style.category]}
                          <span className="ml-1">{style.category}</span>
                        </Badge>
                        
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-2 w-2",
                                i < style.popularity 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {selectedStyle === style.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 bg-primary text-white rounded-full p-1"
                      >
                        <Heart className="h-3 w-3 fill-current" />
                      </motion.div>
                    )}
                  </div>
                </HoverScale>
              </QuickTooltip>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More Button */}
      {!showCategories && !showAll && styles.length > maxVisible && (
        <div className="text-center">
          <InteractiveButton
            variant="outline"
            onClick={() => setShowAll(true)}
            className="text-sm"
          >
            <Palette className="h-4 w-4 mr-2" />
            Show {styles.length - maxVisible} More Styles
          </InteractiveButton>
        </div>
      )}
    </div>
  )
}