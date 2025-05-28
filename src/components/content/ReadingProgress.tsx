
import React, { useState, useEffect } from 'react';
import { trackEvent } from '@/utils/analytics';

interface ReadingProgressProps {
  target?: string;
  className?: string;
  showPercentage?: boolean;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({
  target = 'main',
  className = '',
  showPercentage = false,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targetElement = document.querySelector(target) || document.body;
    
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const targetRect = targetElement.getBoundingClientRect();
      const targetTop = targetRect.top + scrollTop;
      const targetHeight = targetRect.height;
      
      const startReading = targetTop;
      const endReading = targetTop + targetHeight - clientHeight;
      
      if (scrollTop < startReading) {
        setProgress(0);
      } else if (scrollTop > endReading) {
        setProgress(100);
      } else {
        const progressPercentage = ((scrollTop - startReading) / (endReading - startReading)) * 100;
        setProgress(Math.min(100, Math.max(0, progressPercentage)));
      }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress);

    // Track reading milestones
    const trackMilestone = (milestone: number) => {
      trackEvent({
        action: 'reading_progress',
        category: 'engagement',
        label: `${milestone}%`,
        value: milestone,
      });
    };

    // Track reading milestones
    let trackedMilestones = new Set<number>();
    const checkMilestones = () => {
      [25, 50, 75, 100].forEach(milestone => {
        if (progress >= milestone && !trackedMilestones.has(milestone)) {
          trackMilestone(milestone);
          trackedMilestones.add(milestone);
        }
      });
    };

    checkMilestones();

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, [target, progress]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div 
        className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
        aria-label={`Reading progress: ${Math.round(progress)}%`}
      />
      {showPercentage && (
        <div className="absolute top-2 right-4 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};
