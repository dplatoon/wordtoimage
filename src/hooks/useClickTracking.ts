
import { useCallback } from 'react';

export const useClickTracking = (
  pageId: string,
  onFeatureInteraction: (featureId: string, isGeneration: boolean) => void,
  incrementClickCount: () => void
) => {
  const handleClick = useCallback((event: MouseEvent) => {
    incrementClickCount();
    
    const target = event.target as HTMLElement;
    const elementType = target.tagName.toLowerCase();
    const elementClass = target.className;
    const elementText = target.textContent?.slice(0, 50) || '';
    
    // Track feature interactions
    const featureElements = ['button', 'input', 'select', 'textarea'];
    if (featureElements.includes(elementType)) {
      const featureId = `${elementType}_${elementClass}_${elementText}`.slice(0, 100);
      
      // Check if it's a generation-related interaction
      const isGeneration = elementText.toLowerCase().includes('generate') || 
                          elementText.toLowerCase().includes('create') ||
                          elementClass.includes('generate');
      
      onFeatureInteraction(featureId, isGeneration);
    }
  }, [onFeatureInteraction, incrementClickCount]);

  return { handleClick };
};
