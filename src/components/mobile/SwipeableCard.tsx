import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

interface SwipeableCardProps {
  children: React.ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  threshold?: number;
  disabled?: boolean;
}

/**
 * Swipeable card component with left/right actions
 * Features smooth animations and haptic feedback
 */
export function SwipeableCard({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  threshold = 100,
  disabled = false,
}: SwipeableCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const haptics = useHapticFeedback();
  const hasTriggeredHaptic = useRef(false);

  // Transform values for visual feedback
  const leftOpacity = useTransform(x, [-threshold, -50, 0], [1, 0.5, 0]);
  const rightOpacity = useTransform(x, [0, 50, threshold], [0, 0.5, 1]);
  const scale = useTransform(x, [-threshold, 0, threshold], [0.95, 1, 0.95]);
  const rotate = useTransform(x, [-threshold * 2, 0, threshold * 2], [-5, 0, 5]);

  const handleDragStart = useCallback(() => {
    if (disabled) return;
    setIsDragging(true);
    hasTriggeredHaptic.current = false;
  }, [disabled]);

  const handleDrag = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (disabled) return;
    
    const absOffset = Math.abs(info.offset.x);
    
    // Trigger haptic at threshold
    if (absOffset >= threshold && !hasTriggeredHaptic.current) {
      haptics.medium();
      hasTriggeredHaptic.current = true;
    } else if (absOffset < threshold) {
      hasTriggeredHaptic.current = false;
    }
  }, [disabled, threshold, haptics]);

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (disabled) return;
    setIsDragging(false);

    if (info.offset.x <= -threshold && onSwipeLeft) {
      haptics.success();
      onSwipeLeft();
    } else if (info.offset.x >= threshold && onSwipeRight) {
      haptics.success();
      onSwipeRight();
    }
  }, [disabled, threshold, onSwipeLeft, onSwipeRight, haptics]);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Left action background */}
      {leftAction && (
        <motion.div
          className="absolute inset-y-0 left-0 flex items-center justify-start px-6 bg-destructive/20 w-full"
          style={{ opacity: leftOpacity }}
        >
          {leftAction}
        </motion.div>
      )}

      {/* Right action background */}
      {rightAction && (
        <motion.div
          className="absolute inset-y-0 right-0 flex items-center justify-end px-6 bg-primary/20 w-full"
          style={{ opacity: rightOpacity }}
        >
          {rightAction}
        </motion.div>
      )}

      {/* Main card */}
      <motion.div
        drag={disabled ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ x, scale, rotate }}
        className={cn(
          "relative glass-card touch-pan-y",
          isDragging && "cursor-grabbing",
          !disabled && "cursor-grab",
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default SwipeableCard;
