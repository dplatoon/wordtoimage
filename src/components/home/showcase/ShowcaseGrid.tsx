
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
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <ShowcaseCard
          key={item.id}
          item={item}
          index={index}
          isHovered={hoveredIndex === index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
};
