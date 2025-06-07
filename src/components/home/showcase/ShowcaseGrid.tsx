
import { ShowcaseCard } from './ShowcaseCard';

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
          likes={item.likes}
          onLike={() => {}}
          onUsePrompt={() => {}}
          className={hoveredIndex === index ? "shadow-xl" : ""}
        />
      ))}
    </div>
  );
};
