import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, Sparkles } from 'lucide-react';

interface ModernStyleSelectorProps {
  selectedStyle: string | null;
  onStyleChange: (style: string) => void;
}

const QUICK_STYLES = [
  { id: 'auto', label: 'Auto', emoji: '✨', description: 'AI picks best' },
  { id: 'photorealistic', label: 'Photo', emoji: '📷', description: 'Ultra realistic' },
  { id: 'digital-art', label: 'Digital', emoji: '🎨', description: 'Modern art' },
  { id: 'anime', label: 'Anime', emoji: '🎌', description: 'Japanese style' },
  { id: 'oil-painting', label: 'Oil', emoji: '🖼️', description: 'Classical art' },
  { id: 'watercolor', label: 'Watercolor', emoji: '💧', description: 'Soft strokes' },
];

export function ModernStyleSelector({
  selectedStyle,
  onStyleChange
}: ModernStyleSelectorProps) {
  const currentStyle = selectedStyle || 'auto';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Quick Style Selection
        </h3>
        {currentStyle !== 'auto' && (
          <button
            onClick={() => onStyleChange('auto')}
            className="text-xs text-primary hover:underline"
          >
            Reset to Auto
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
        {QUICK_STYLES.map((style) => {
          const isSelected = currentStyle === style.id;
          
          return (
            <motion.button
              key={style.id}
              onClick={() => onStyleChange(style.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative flex flex-col items-center p-3 md:p-4 rounded-xl",
                "border-2 transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border/50 bg-card/50 hover:border-border hover:bg-card"
              )}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="h-3 w-3 text-primary-foreground" />
                </motion.div>
              )}

              <span className="text-2xl mb-1.5">{style.emoji}</span>
              <span className={cn(
                "text-xs md:text-sm font-medium",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {style.label}
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground mt-0.5 hidden sm:block">
                {style.description}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
