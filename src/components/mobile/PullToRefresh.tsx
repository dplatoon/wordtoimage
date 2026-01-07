import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  className?: string;
  threshold?: number;
  disabled?: boolean;
}

/**
 * Pull-to-refresh container component
 * Provides native-like pull-to-refresh with haptic feedback
 */
export function PullToRefresh({
  children,
  onRefresh,
  className,
  threshold = 80,
  disabled = false,
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredHaptic = useRef(false);
  
  const haptics = useHapticFeedback();

  const progress = Math.min(pullDistance / threshold, 1);
  const isReady = progress >= 1;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;
    if (window.scrollY > 0) return;
    
    startY.current = e.touches[0].clientY;
    hasTriggeredHaptic.current = false;
    setIsPulling(true);
  }, [disabled, isRefreshing]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled || isRefreshing || !isPulling) return;
    if (window.scrollY > 0) {
      setPullDistance(0);
      return;
    }

    currentY.current = e.touches[0].clientY;
    const distance = Math.max(0, currentY.current - startY.current);
    
    // Apply resistance for overscroll effect
    const dampedDistance = distance * 0.5;
    setPullDistance(dampedDistance);

    // Haptic at threshold
    if (dampedDistance >= threshold && !hasTriggeredHaptic.current) {
      haptics.medium();
      hasTriggeredHaptic.current = true;
    }
  }, [disabled, isRefreshing, isPulling, threshold, haptics]);

  const handleTouchEnd = useCallback(async () => {
    if (disabled) return;
    
    setIsPulling(false);

    if (isReady && !isRefreshing) {
      setIsRefreshing(true);
      haptics.success();
      
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  }, [disabled, isReady, isRefreshing, haptics, onRefresh]);

  return (
    <div
      ref={containerRef}
      className={cn("relative min-h-screen", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <AnimatePresence>
        {(pullDistance > 10 || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ 
              opacity: 1, 
              y: isRefreshing ? 20 : Math.min(pullDistance - 30, 40),
            }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-50"
          >
            <motion.div
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full",
                "glass-card border-2",
                isReady || isRefreshing ? "border-primary" : "border-primary/30"
              )}
              animate={isRefreshing ? { rotate: 360 } : { rotate: progress * 360 }}
              transition={isRefreshing ? { 
                duration: 1, 
                repeat: Infinity, 
                ease: "linear" 
              } : { duration: 0 }}
            >
              {isRefreshing ? (
                <RefreshCw className="w-5 h-5 text-primary" />
              ) : (
                <motion.div
                  animate={{ rotate: isReady ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowDown className={cn(
                    "w-5 h-5 transition-colors",
                    isReady ? "text-primary" : "text-muted-foreground"
                  )} />
                </motion.div>
              )}
            </motion.div>
            
            {/* Progress ring */}
            <svg
              className="absolute inset-0 w-12 h-12 -rotate-90"
              viewBox="0 0 48 48"
            >
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="hsl(var(--primary) / 0.2)"
                strokeWidth="2"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={126}
                strokeDashoffset={126 - (126 * progress)}
                style={{ filter: 'drop-shadow(0 0 4px hsl(var(--primary)))' }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with pull offset */}
      <motion.div
        animate={{ 
          y: isRefreshing ? 60 : isPulling ? pullDistance * 0.3 : 0 
        }}
        transition={{ 
          type: isRefreshing || isPulling ? "tween" : "spring",
          stiffness: 400,
          damping: 40
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default PullToRefresh;
