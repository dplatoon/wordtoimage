import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

interface ImagePreviewState {
  scale: number;
  x: number;
  y: number;
}

interface PinchToZoomImageProps {
  src: string;
  alt: string;
  className?: string;
  maxScale?: number;
  minScale?: number;
  onZoomChange?: (scale: number) => void;
}

/**
 * Pinch-to-zoom image component with smooth gestures
 * Supports touch gestures for mobile zoom interactions
 */
export function PinchToZoomImage({
  src,
  alt,
  className,
  maxScale = 3,
  minScale = 1,
  onZoomChange,
}: PinchToZoomImageProps) {
  const [state, setState] = useState<ImagePreviewState>({ scale: 1, x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchDistanceRef = useRef<number>(0);
  const lastTouchCenterRef = useRef({ x: 0, y: 0 });
  const haptics = useHapticFeedback();

  const getDistance = (touches: React.TouchList): number => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getTouchCenter = (touches: React.TouchList) => ({
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      setIsZooming(true);
      lastTouchDistanceRef.current = getDistance(e.touches);
      lastTouchCenterRef.current = getTouchCenter(e.touches);
      haptics.selection();
    }
  }, [haptics]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 2 || !isZooming) return;
    e.preventDefault();

    const newDistance = getDistance(e.touches);
    const distanceDelta = newDistance / lastTouchDistanceRef.current;
    
    const newCenter = getTouchCenter(e.touches);
    const centerDelta = {
      x: newCenter.x - lastTouchCenterRef.current.x,
      y: newCenter.y - lastTouchCenterRef.current.y,
    };

    setState((prev) => {
      const newScale = Math.min(maxScale, Math.max(minScale, prev.scale * distanceDelta));
      
      // Only allow panning when zoomed in
      const newX = newScale > 1 ? prev.x + centerDelta.x : 0;
      const newY = newScale > 1 ? prev.y + centerDelta.y : 0;

      return { scale: newScale, x: newX, y: newY };
    });

    lastTouchDistanceRef.current = newDistance;
    lastTouchCenterRef.current = newCenter;
  }, [isZooming, maxScale, minScale]);

  const handleTouchEnd = useCallback(() => {
    setIsZooming(false);
    
    // Snap back if scale is near 1
    if (state.scale < 1.1) {
      setState({ scale: 1, x: 0, y: 0 });
      haptics.light();
    }
    
    onZoomChange?.(state.scale);
  }, [state.scale, haptics, onZoomChange]);

  // Double tap to zoom
  const lastTapRef = useRef(0);
  const handleDoubleTap = useCallback((e: React.TouchEvent) => {
    const now = Date.now();
    const timeSince = now - lastTapRef.current;
    
    if (timeSince < 300 && timeSince > 0) {
      e.preventDefault();
      haptics.medium();
      
      if (state.scale > 1) {
        setState({ scale: 1, x: 0, y: 0 });
      } else {
        // Zoom to 2x at tap location
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const tapX = e.touches[0].clientX - rect.left - rect.width / 2;
          const tapY = e.touches[0].clientY - rect.top - rect.height / 2;
          setState({ scale: 2, x: -tapX, y: -tapY });
        }
      }
    }
    
    lastTapRef.current = now;
  }, [state.scale, haptics]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden touch-none select-none',
        isZooming && 'cursor-grabbing',
        className
      )}
      onTouchStart={(e) => {
        handleDoubleTap(e);
        handleTouchStart(e);
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        animate={{
          scale: state.scale,
          x: state.x,
          y: state.y,
        }}
        transition={{
          type: isZooming ? 'tween' : 'spring',
          stiffness: 300,
          damping: 30,
          duration: isZooming ? 0 : undefined,
        }}
        className="w-full h-full object-contain"
      />

      {/* Zoom indicator */}
      <AnimatePresence>
        {state.scale > 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={cn(
              'absolute top-4 right-4 px-3 py-1.5 rounded-full',
              'glass-card text-sm font-medium text-foreground'
            )}
          >
            {Math.round(state.scale * 100)}%
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PinchToZoomImage;
