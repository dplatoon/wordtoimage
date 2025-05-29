
import { motion } from 'framer-motion';
import { ShowcaseCard } from './ShowcaseCard';

interface ShowcaseItem {
  id: number;
  imageUrl: string;
  prompt: string;
  style: string;
  author: string;
  likes: number;
  altText?: string;
}

interface ShowcaseGridProps {
  items: ShowcaseItem[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

export const ShowcaseGrid = ({ items, hoveredIndex, setHoveredIndex }: ShowcaseGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <ShowcaseCard 
            item={item}
            isHovered={hoveredIndex === index}
            altText={item.altText || `AI image generation example: ${item.prompt} in ${item.style} style`}
          />
        </motion.div>
      ))}
    </div>
  );
};
