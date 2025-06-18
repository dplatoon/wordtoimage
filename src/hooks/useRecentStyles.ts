
import { useState, useEffect } from 'react';

const RECENT_STYLES_KEY = 'recent_styles';
const MAX_RECENT_STYLES = 5;

export const useRecentStyles = () => {
  const [recentStyles, setRecentStyles] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_STYLES_KEY);
    if (saved) {
      try {
        setRecentStyles(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse recent styles:', error);
      }
    }
  }, []);

  const addRecentStyle = (styleId: string) => {
    if (!styleId) return;

    setRecentStyles(prev => {
      const filtered = prev.filter(id => id !== styleId);
      const updated = [styleId, ...filtered].slice(0, MAX_RECENT_STYLES);
      
      try {
        localStorage.setItem(RECENT_STYLES_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save recent styles:', error);
      }
      
      return updated;
    });
  };

  const clearRecentStyles = () => {
    setRecentStyles([]);
    localStorage.removeItem(RECENT_STYLES_KEY);
  };

  return {
    recentStyles,
    addRecentStyle,
    clearRecentStyles
  };
};
