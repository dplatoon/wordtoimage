
import { ShowcaseCard } from './ShowcaseCard';
import { useState } from 'react';

interface ShowcaseGridProps {
  items: Array<{
    id: number;
    imageUrl: string;
    prompt: string;
    style: string;
    author: string;
    likes: number;
  }>;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

export const ShowcaseGrid = ({ items, hoveredIndex, setHoveredIndex }: ShowcaseGridProps) => {
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const handleLike = (itemId: number) => {
    setLikedItems(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(itemId)) {
        newLiked.delete(itemId);
      } else {
        newLiked.add(itemId);
      }
      return newLiked;
    });
  };

  const handleUsePrompt = (prompt: string, style: string) => {
    console.log('Using prompt:', prompt, 'with style:', style);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <ShowcaseCard
          key={item.id}
          title={`AI Generated ${item.style}`}
          prompt={item.prompt}
          imageUrl={item.imageUrl}
          style={item.style}
          category={item.style}
          likes={likedItems.has(item.id) ? item.likes + 1 : item.likes}
          onLike={() => handleLike(item.id)}
          onUsePrompt={() => handleUsePrompt(item.prompt, item.style)}
          className={hoveredIndex === index ? "shadow-xl" : ""}
        />
      ))}
    </div>
  );
};
