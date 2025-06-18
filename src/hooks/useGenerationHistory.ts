
import { useState, useEffect } from 'react';

interface GenerationHistoryItem {
  id: string;
  prompt: string;
  style?: string;
  imageUrl: string;
  timestamp: number;
}

const GENERATION_HISTORY_KEY = 'generation_history';
const MAX_HISTORY_ITEMS = 20;

export const useGenerationHistory = () => {
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(GENERATION_HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse generation history:', error);
      }
    }
  }, []);

  const addToHistory = (item: Omit<GenerationHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: GenerationHistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };

    setHistory(prev => {
      const updated = [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
      
      try {
        localStorage.setItem(GENERATION_HISTORY_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save generation history:', error);
      }
      
      return updated;
    });
  };

  const regenerateFromHistory = (item: GenerationHistoryItem) => {
    return {
      prompt: item.prompt,
      style: item.style
    };
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(GENERATION_HISTORY_KEY);
  };

  return {
    history,
    addToHistory,
    regenerateFromHistory,
    clearHistory
  };
};
