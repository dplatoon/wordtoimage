import { useRef, useCallback, useState, useEffect } from 'react';
import { useHapticFeedback } from './useHapticFeedback';

interface SwipeState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  velocity: number;
  isSwiping: boolean;
}

interface PinchState {
  scale: number;
  initialDistance: number;
  isPinching: boolean;
}

interface GestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onPullToRefresh?: () => Promise<void>;
  swipeThreshold?: number;
  velocityThreshold?: number;
  pullRefreshThreshold?: number;
  enableHaptics?: boolean;
}

const initialSwipeState: SwipeState = {
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  deltaX: 0,
  deltaY: 0,
  direction: null,
  velocity: 0,
  isSwiping: false,
};

const initialPinchState: PinchState = {
  scale: 1,
  initialDistance: 0,
  isPinching: false,
};

/**
 * Advanced gesture controls hook for mobile interactions
 * Supports swipe, pinch-to-zoom, and pull-to-refresh
 */
export function useGestureControls<T extends HTMLElement = HTMLElement>(options: GestureOptions = {}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPinch,
    onPullToRefresh,
    swipeThreshold = 50,
    velocityThreshold = 0.3,
    pullRefreshThreshold = 100,
    enableHaptics = true,
  } = options;

  const ref = useRef<T>(null);
  const [swipeState, setSwipeState] = useState<SwipeState>(initialSwipeState);
  const [pinchState, setPinchState] = useState<PinchState>(initialPinchState);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  
  const startTimeRef = useRef<number>(0);
  const haptics = useHapticFeedback({ enabled: enableHaptics });

  const getDistance = useCallback((touches: TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    startTimeRef.current = Date.now();

    setSwipeState({
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
      direction: null,
      velocity: 0,
      isSwiping: true,
    });

    // Handle pinch start
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches);
      setPinchState({
        scale: 1,
        initialDistance: distance,
        isPinching: true,
      });
    }
  }, [getDistance]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - swipeState.startX;
    const deltaY = touch.clientY - swipeState.startY;
    
    let direction: SwipeState['direction'] = null;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      direction = deltaY > 0 ? 'down' : 'up';
    }

    setSwipeState(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX,
      deltaY,
      direction,
    }));

    // Handle pull-to-refresh
    if (onPullToRefresh && direction === 'down' && window.scrollY === 0) {
      const progress = Math.min(deltaY / pullRefreshThreshold, 1);
      setPullProgress(progress);
      
      if (progress >= 1 && !isRefreshing) {
        haptics.medium();
      }
    }

    // Handle pinch
    if (e.touches.length === 2 && pinchState.isPinching) {
      const distance = getDistance(e.touches);
      const scale = distance / pinchState.initialDistance;
      setPinchState(prev => ({ ...prev, scale }));
      onPinch?.(scale);
    }
  }, [swipeState.startX, swipeState.startY, onPullToRefresh, pullRefreshThreshold, isRefreshing, haptics, pinchState.isPinching, pinchState.initialDistance, getDistance, onPinch]);

  const handleTouchEnd = useCallback(async () => {
    const elapsed = Date.now() - startTimeRef.current;
    const velocity = Math.sqrt(
      swipeState.deltaX * swipeState.deltaX + 
      swipeState.deltaY * swipeState.deltaY
    ) / elapsed;

    const isValidSwipe = Math.abs(swipeState.deltaX) > swipeThreshold || 
                         Math.abs(swipeState.deltaY) > swipeThreshold ||
                         velocity > velocityThreshold;

    if (isValidSwipe && swipeState.direction) {
      haptics.light();
      
      switch (swipeState.direction) {
        case 'left':
          onSwipeLeft?.();
          break;
        case 'right':
          onSwipeRight?.();
          break;
        case 'up':
          onSwipeUp?.();
          break;
        case 'down':
          if (onPullToRefresh && pullProgress >= 1 && window.scrollY === 0) {
            setIsRefreshing(true);
            haptics.success();
            try {
              await onPullToRefresh();
            } finally {
              setIsRefreshing(false);
              setPullProgress(0);
            }
          } else {
            onSwipeDown?.();
          }
          break;
      }
    }

    setSwipeState(initialSwipeState);
    setPinchState(initialPinchState);
    setPullProgress(0);
  }, [swipeState, swipeThreshold, velocityThreshold, haptics, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPullToRefresh, pullProgress]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    ref,
    swipeState,
    pinchState,
    isRefreshing,
    pullProgress,
    isSwiping: swipeState.isSwiping,
    isPinching: pinchState.isPinching,
  };
}

export default useGestureControls;
