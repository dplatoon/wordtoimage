import React, { useState, useEffect } from 'react';
import { Check, Copy, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlashMessageProps {
  show: boolean;
  type: 'copy' | 'style' | 'success';
  message: string;
  duration?: number;
  onHide?: () => void;
}

export const FlashMessage = ({ show, type, message, duration = 2000, onHide }: FlashMessageProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onHide?.(), 300); // Allow exit animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onHide]);

  if (!show && !isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'copy':
        return <Copy className="h-4 w-4" />;
      case 'style':
        return <Palette className="h-4 w-4" />;
      case 'success':
        return <Check className="h-4 w-4" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'copy':
        return 'bg-blue-500 text-white';
      case 'style':
        return 'bg-purple-500 text-white';
      case 'success':
        return 'bg-green-500 text-white';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={cn(
          'flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform',
          getColors(),
          isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
        )}
      >
        {getIcon()}
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};

// Hook for easy flash message management
export const useFlashMessage = () => {
  const [flashState, setFlashState] = useState<{
    show: boolean;
    type: 'copy' | 'style' | 'success';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: ''
  });

  const showFlash = (type: 'copy' | 'style' | 'success', message: string) => {
    setFlashState({ show: true, type, message });
  };

  const hideFlash = () => {
    setFlashState(prev => ({ ...prev, show: false }));
  };

  return {
    flashState,
    showFlash,
    hideFlash
  };
};